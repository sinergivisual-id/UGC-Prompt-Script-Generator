'use client';

import React from 'react';
import { 
  X, 
  ShieldCheck, 
  Coins, 
  Check, 
  ExternalLink,
  Info,
  MessageCircle,
  User,
  Zap,
  Server,
  KeyRound
} from 'lucide-react';
import { UserProfile } from '@/types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  credits: number;
  userEmail?: string;
  profile?: UserProfile | null;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  credits,
  userEmail,
  profile,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden p-6 sm:p-7 space-y-5">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 shadow-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Informasi Lisensi & Studio
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Detail akun, kuota kredit, dan infrastruktur engine AI
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Account Info Section */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Akun Terdaftar:
              </span>
            </div>
            <span className="text-xs font-bold text-slate-900 dark:text-white max-w-[200px] truncate">
              {userEmail || profile?.email || 'Akun Lisensi'}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Tipe Lisensi:</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
              {profile?.role === 'admin' ? 'Admin Superuser' : 'Invite-Only Licensee'}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Status Akses:</span>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> Aktif & Terverifikasi
            </span>
          </div>
        </div>

        {/* Real-time Credits Status */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50/50 dark:from-blue-950/40 dark:to-indigo-950/20 border border-blue-200/80 dark:border-blue-900/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
              <Coins className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">
                Sisa Saldo Kuota Generator
              </span>
              <span className="text-lg sm:text-xl font-black text-blue-700 dark:text-blue-300">
                {credits} <span className="text-xs font-medium text-slate-500">Kredit</span>
              </span>
            </div>
          </div>

          <a
            href="https://wa.me/6281234567890?text=Halo%20Admin%20Sinergi%20Visual,%20saya%20ingin%20melakukan%20top%20up%20kuota%20kredit%20UGC%20Studio."
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition inline-flex items-center gap-1"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Top Up Kuota</span>
          </a>
        </div>

        {/* Server-Side AI Engine Info */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 space-y-2.5 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-500 dark:text-slate-400 font-medium">Model AI Backend:</span>
            </div>
            <span className="font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
              gpt-4o-mini
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500 dark:text-slate-400 font-medium">Keamanan API Key:</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
              <KeyRound className="w-3 h-3" /> Server-Side Encrypted
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500 dark:text-slate-400 font-medium">Spesifikasi Scene:</span>
            <span className="text-slate-700 dark:text-slate-300">Google Flow (10s/scene) + Kling + Dreamina</span>
          </div>
        </div>

        {/* Help & Support CTA */}
        <div className="pt-2">
          <a
            href="https://wa.me/6281234567890?text=Halo%20Sinergi%20Visual,%20saya%20membutuhkan%20bantuan%20teknis%20terkait%20UGC%20Studio."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4 text-emerald-500" />
            <span>Hubungi Layanan Support Admin</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>
        </div>

      </div>
    </div>
  );
};
