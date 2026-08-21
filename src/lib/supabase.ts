import { createClient } from '@supabase/supabase-js';
import { NextRequest } from 'next/server';
import { UserProfile } from '@/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('placeholder') &&
  !supabaseAnonKey.includes('placeholder')
);

// Client-side Supabase client
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;

// Server-side Admin client (bypasses RLS with service role key if provided)
export const supabaseAdmin = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  : null;

/**
 * Server-side helper to verify user session and credits
 */
export async function verifyUserAndCredits(
  req: NextRequest, 
  requiredCredits: number = 1
): Promise<{
  success: boolean;
  user?: { id: string; email: string };
  profile?: UserProfile;
  remainingCredits?: number;
  status?: number;
  error?: string;
}> {
  // 1. Check Authorization Header or Cookie
  const authHeader = req.headers.get('authorization');
  const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null;
  const cookieSession = req.cookies.get('sinergi_auth_session')?.value;

  const rawToken = token || cookieSession;

  // Case A: Supabase is actively configured
  if (isSupabaseConfigured && supabaseAdmin && rawToken) {
    try {
      const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(rawToken);

      if (authError || !user) {
        return {
          success: false,
          status: 401,
          error: 'Sesi login Anda tidak valid atau telah berakhir. Silakan login kembali.',
        };
      }

      // Fetch user profile
      const { data: profile, error: profileError } = await supabaseAdmin
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError || !profile) {
        return {
          success: false,
          status: 404,
          error: 'Data profil user tidak ditemukan di database.',
        };
      }

      // Validate credit balance
      if (profile.credits < requiredCredits) {
        return {
          success: false,
          status: 403,
          error: 'Kredit Anda telah habis (0). Hubungi Admin Sinergi Visual untuk top up kuota lisensi.',
          remainingCredits: profile.credits,
        };
      }

      return {
        success: true,
        user: { id: user.id, email: user.email || '' },
        profile: profile as UserProfile,
        remainingCredits: profile.credits,
      };
    } catch (err: any) {
      console.error('Error verifying Supabase user:', err);
      return {
        success: false,
        status: 500,
        error: 'Terjadi kesalahan sistem saat memvalidasi sesi user.',
      };
    }
  }

  // Case B: Simulation / Local Session Mode (when Supabase credentials not yet populated in .env.local)
  if (rawToken) {
    try {
      const sessionData = JSON.parse(decodeURIComponent(rawToken));
      if (sessionData && sessionData.email) {
        const userCredits = typeof sessionData.credits === 'number' ? sessionData.credits : 50;
        
        if (userCredits < requiredCredits) {
          return {
            success: false,
            status: 403,
            error: 'Kredit Anda telah habis (0). Hubungi Admin Sinergi Visual untuk top up kuota lisensi.',
            remainingCredits: userCredits,
          };
        }

        return {
          success: true,
          user: { id: sessionData.id || 'usr-local-demo', email: sessionData.email },
          profile: {
            id: sessionData.id || 'usr-local-demo',
            email: sessionData.email,
            full_name: sessionData.full_name || 'Licensed User',
            credits: userCredits,
            role: sessionData.role || 'client',
          },
          remainingCredits: userCredits,
        };
      }
    } catch {
      // invalid token format
    }
  }

  return {
    success: false,
    status: 401,
    error: 'Akses ditolak. Silakan login terlebih dahulu untuk menggunakan Studio Generator.',
  };
}

/**
 * Server-side helper to deduct user credits after successful AI call
 */
export async function deductServerCredit(
  userId: string, 
  amount: number = 1
): Promise<{ success: boolean; newCredits: number }> {
  if (isSupabaseConfigured && supabaseAdmin) {
    try {
      // Call RPC function deduct_credits
      const { data, error } = await supabaseAdmin.rpc('deduct_credits', {
        user_id: userId,
        amount: amount,
      });

      if (!error && data && data.success) {
        return { success: true, newCredits: data.credits };
      }

      // Fallback manual query if RPC is not installed
      const { data: profile } = await supabaseAdmin
        .from('profiles')
        .select('credits')
        .eq('id', userId)
        .single();

      if (profile) {
        const next = Math.max(0, profile.credits - amount);
        await supabaseAdmin
          .from('profiles')
          .update({ credits: next, updated_at: new Date().toISOString() })
          .eq('id', userId);
        return { success: true, newCredits: next };
      }
    } catch (err) {
      console.error('Failed to deduct credit in Supabase:', err);
    }
  }

  return { success: true, newCredits: 0 };
}
