'use client';

import React from 'react';
import Image from 'next/image';
import { 
  Sparkles, 
  Moon, 
  Sun, 
  History, 
  Settings, 
  Coins, 
  Layers,
  LogOut,
  User,
  ShieldCheck
} from 'lucide-react';
import { UserProfile } from '@/types';

interface NavbarProps {
  darkMode: boolean;
  onToggleTheme: () => void;
  credits: number;
  userEmail?: string;
  profile?: UserProfile | null;
  onOpenHistory: () => void;
  onOpenSettings: () => void;
  onOpenPresets: () => void;
  onLogout: () => void;
  historyCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  onToggleTheme,
  credits,
  userEmail,
  profile,
  onOpenHistory,
  onOpenSettings,
  onOpenPresets,
  onLogout,
  historyCount,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md border-b transition-colors duration-200 bg-white/85 dark:bg-[#0F172A]/85 border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Brand Logo & Badges - Dynamic Dark/Light Theme */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              {/* Light Mode Logo */}
              <Image
                src="/logo.png"
                alt="Sinergi Visual Logo"
                width={150}
                height={38}
                priority
                className="h-8 sm:h-9 w-auto object-contain dark:hidden"
              />
              {/* Dark Mode Logo */}
              <Image
                src="/logo1.png"
                alt="Sinergi Visual Logo"
                width={150}
                height={38}
                priority
                className="h-8 sm:h-9 w-auto object-contain hidden dark:block"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 border border-blue-200 dark:border-blue-700/50">
                UGC Studio Pro
              </span>
              {profile?.role === 'admin' && (
                <span className="hidden md:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                  Admin
                </span>
              )}
            </div>
          </div>

          {/* Quick Action Links & Tools */}
          <div className="flex items-center space-x-1.5 sm:space-x-2.5">
            
            {/* Template Presets Button */}
            <button
              onClick={onOpenPresets}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-medium rounded-lg text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 transition border border-slate-200 dark:border-slate-700"
              title="Pilih Template Contoh Produk"
            >
              <Layers className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span className="hidden sm:inline">Contoh Preset</span>
            </button>

            {/* Real-time Token Credits Counter */}
            <div 
              onClick={onOpenSettings}
              className={`cursor-pointer inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition border ${
                credits > 0
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-800 hover:border-blue-400'
                  : 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-800 hover:border-rose-400 animate-pulse'
              }`}
              title="Klik untuk detail lisensi & kuota kredit"
            >
              <Coins className={`w-3.5 h-3.5 ${credits > 0 ? 'text-amber-500 dark:text-amber-400' : 'text-rose-500'}`} />
              <span>{credits}</span>
              <span className="text-[10px] text-slate-400 hidden sm:inline">Kredit</span>
            </div>

            {/* History Drawer Trigger */}
            <button
              onClick={onOpenHistory}
              className="relative p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
              title="Buka Riwayat Prompt Tersimpan"
              aria-label="Riwayat"
            >
              <History className="w-4 h-4" />
              {historyCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[16px] h-4 px-1 rounded-full text-[9px] font-bold bg-blue-600 text-white shadow-sm">
                  {historyCount}
                </span>
              )}
            </button>

            {/* Settings Modal Trigger */}
            <button
              onClick={onOpenSettings}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
              title="Pengaturan & Status Lisensi"
              aria-label="Pengaturan"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Dark / Light Mode Switch */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
              title={darkMode ? 'Ganti ke Mode Terang (Light Mode)' : 'Ganti ke Mode Gelap (Dark Mode)'}
              aria-label="Toggle Mode Gelap/Terang"
            >
              {darkMode ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            {/* User Profile & Logout Section */}
            <div className="h-5 w-[1px] bg-slate-200 dark:bg-slate-700 mx-0.5 hidden sm:block" />

            <div className="flex items-center gap-1.5">
              {userEmail && (
                <div 
                  onClick={onOpenSettings}
                  className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-xs text-slate-700 dark:text-slate-300 cursor-pointer hover:bg-slate-200/80 dark:hover:bg-slate-800 transition"
                  title={`Akun: ${userEmail}`}
                >
                  <User className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span className="max-w-[120px] truncate font-medium">{userEmail}</span>
                </div>
              )}

              {/* Logout Button */}
              <button
                onClick={() => {
                  if (confirm('Apakah Anda yakin ingin keluar dari akun?')) {
                    onLogout();
                  }
                }}
                className="p-2 rounded-lg text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition border border-transparent hover:border-red-200 dark:hover:border-red-900/50"
                title="Keluar / Logout"
                aria-label="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
