'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { UserProfile } from '@/types';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

interface AuthContextType {
  user: { id: string; email: string } | null;
  profile: UserProfile | null;
  credits: number;
  isLoading: boolean;
  token: string | null;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  updateCredits: (credits: number) => void;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_AUTH_KEY = 'sinergi_auth_user_v1';
const COOKIE_NAME = 'sinergi_auth_session';

function setAuthCookie(value: string, days: number = 7) {
  if (typeof document === 'undefined') return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(value)}; path=/; expires=${expires}; SameSite=Lax`;
}

function clearAuthCookie() {
  if (typeof document === 'undefined') return;
  document.cookie = `${COOKIE_NAME}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
}

async function withTimeout<T>(promise: Promise<T> | PromiseLike<T>, ms: number = 2000): Promise<T | null> {
  let timer: NodeJS.Timeout;
  const timeoutPromise = new Promise<null>((resolve) => {
    timer = setTimeout(() => resolve(null), ms);
  });
  return Promise.race([Promise.resolve(promise), timeoutPromise]).finally(() => clearTimeout(timer));
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [credits, setCredits] = useState<number>(50);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load user profile from Supabase with safe timeout
  const fetchSupabaseProfile = useCallback(async (userId: string, userEmail: string) => {
    if (!supabase) return null;
    try {
      const res = await withTimeout(
        supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single(),
        2000
      );

      const data = res?.data;
      const error = res?.error;

      if (error || !data) {
        const fallbackProfile: UserProfile = {
          id: userId,
          email: userEmail,
          credits: 50,
          role: 'client',
        };
        setProfile(fallbackProfile);
        setCredits(50);
        return fallbackProfile;
      }

      const userProf: UserProfile = data as UserProfile;
      setProfile(userProf);
      setCredits(userProf.credits ?? 50);
      return userProf;
    } catch (err) {
      console.warn('Error fetching Supabase profile, using fallback:', err);
      const fallbackProfile: UserProfile = {
        id: userId,
        email: userEmail,
        credits: 50,
        role: 'client',
      };
      setProfile(fallbackProfile);
      setCredits(50);
      return fallbackProfile;
    }
  }, []);

  // Initialize Auth state with guaranteed try-catch-finally & hard safety timeout
  useEffect(() => {
    let isMounted = true;

    // Hard safety timeout: guarantee isLoading is false within 1.5s
    const hardTimeout = setTimeout(() => {
      if (isMounted) {
        setIsLoading(false);
      }
    }, 1500);

    async function initAuth() {
      try {
        // Mode 1: Supabase Auth
        if (isSupabaseConfigured && supabase) {
          try {
            const sessionRes = await withTimeout(
              supabase.auth.getSession().catch(() => ({ data: { session: null }, error: null })),
              1500
            );

            const session = sessionRes?.data?.session;

            if (session?.user && isMounted) {
              setUser({ id: session.user.id, email: session.user.email || '' });
              setToken(session.access_token);
              setAuthCookie(session.access_token);
              await fetchSupabaseProfile(session.user.id, session.user.email || '');
            } else if (isMounted) {
              setUser(null);
              setProfile(null);
              clearAuthCookie();
            }
          } catch (supaErr) {
            console.warn('Supabase getSession issue, falling back:', supaErr);
          }
        } else if (isMounted) {
          // Mode 2: Local Session Fallback
          try {
            const stored = localStorage.getItem(LOCAL_AUTH_KEY);
            if (stored) {
              const parsed = JSON.parse(stored);
              if (parsed && parsed.email) {
                setUser({ id: parsed.id, email: parsed.email });
                setProfile(parsed);
                setCredits(parsed.credits ?? 50);
                setToken(encodeURIComponent(JSON.stringify(parsed)));
                setAuthCookie(JSON.stringify(parsed));
              }
            }
          } catch (e) {
            console.error('Error reading local session:', e);
          }
        }
      } catch (globalErr) {
        console.error('Unexpected auth initialization error:', globalErr);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    initAuth();

    // Supabase Auth listener
    let authListener: { subscription: { unsubscribe: () => void } } | null = null;
    if (isSupabaseConfigured && supabase) {
      try {
        const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
          if (!isMounted) return;
          if (session?.user) {
            setUser({ id: session.user.id, email: session.user.email || '' });
            setToken(session.access_token);
            setAuthCookie(session.access_token);
            await fetchSupabaseProfile(session.user.id, session.user.email || '');
          } else {
            setUser(null);
            setProfile(null);
            setToken(null);
            clearAuthCookie();
          }
        });
        authListener = data;
      } catch {}
    }

    return () => {
      isMounted = false;
      clearTimeout(hardTimeout);
      if (authListener) {
        authListener.subscription.unsubscribe();
      }
    };
  }, [fetchSupabaseProfile]);

  // Sign In function (Invite Only)
  const signIn = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);

    // Case 1: Supabase Sign In
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim().toLowerCase(),
          password: password,
        });

        if (error) {
          setIsLoading(false);
          if (error.message.includes('Invalid login credentials')) {
            return {
              success: false,
              error: 'Email atau password salah. Pastikan akun telah didaftarkan oleh Admin Sinergi Visual.',
            };
          }
          return { success: false, error: error.message };
        }

        if (data.session?.user) {
          setUser({ id: data.session.user.id, email: data.session.user.email || '' });
          setToken(data.session.access_token);
          setAuthCookie(data.session.access_token);
          await fetchSupabaseProfile(data.session.user.id, data.session.user.email || '');
          setIsLoading(false);
          return { success: true };
        }
      } catch (err: any) {
        setIsLoading(false);
        return { success: false, error: err?.message || 'Gagal melakukan login ke server.' };
      }
    }

    // Case 2: Local Demo Fallback
    try {
      const cleanEmail = email.trim().toLowerCase();
      if (!cleanEmail.includes('@') || password.length < 6) {
        setIsLoading(false);
        return {
          success: false,
          error: 'Format email tidak valid atau password minimal 6 karakter.',
        };
      }

      const localProfile: UserProfile = {
        id: `usr-${cleanEmail.replace(/[^a-zA-Z0-9]/g, '-')}`,
        email: cleanEmail,
        full_name: cleanEmail.split('@')[0].toUpperCase(),
        credits: 50,
        role: cleanEmail.includes('admin') ? 'admin' : 'client',
      };

      localStorage.setItem(LOCAL_AUTH_KEY, JSON.stringify(localProfile));
      setUser({ id: localProfile.id, email: localProfile.email });
      setProfile(localProfile);
      setCredits(localProfile.credits);
      const sessionString = JSON.stringify(localProfile);
      setToken(sessionString);
      setAuthCookie(sessionString);

      setIsLoading(false);
      return { success: true };
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, error: err?.message || 'Gagal login.' };
    }
  };

  // Sign Out function
  const signOut = async () => {
    setIsLoading(true);
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.auth.signOut();
      } catch (e) {
        console.warn('Supabase sign out warning:', e);
      }
    }
    localStorage.removeItem(LOCAL_AUTH_KEY);
    clearAuthCookie();
    setUser(null);
    setProfile(null);
    setToken(null);
    setIsLoading(false);
  };

  // Update credits in memory & local state
  const updateCredits = (newCredits: number) => {
    setCredits(newCredits);
    setProfile((prev) => (prev ? { ...prev, credits: newCredits } : null));

    if (!isSupabaseConfigured) {
      const stored = localStorage.getItem(LOCAL_AUTH_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          parsed.credits = newCredits;
          localStorage.setItem(LOCAL_AUTH_KEY, JSON.stringify(parsed));
          setAuthCookie(JSON.stringify(parsed));
        } catch {}
      }
    }
  };

  // Refresh profile from database
  const refreshProfile = async () => {
    if (user && isSupabaseConfigured && supabase) {
      await fetchSupabaseProfile(user.id, user.email);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        credits,
        isLoading,
        token,
        signIn,
        signOut,
        updateCredits,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
