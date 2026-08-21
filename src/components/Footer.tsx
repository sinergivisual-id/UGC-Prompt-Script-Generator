'use client';

import React from 'react';
import Image from 'next/image';
import { 
  Sparkles, 
  Globe, 
  Video, 
  MessageCircle, 
  ArrowUpRight,
  ShieldCheck, 
  Zap,
  Code
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t bg-white dark:bg-[#0F172A] border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center space-x-3">
              <div className="flex items-center">
                {/* Light Mode Logo */}
                <Image
                  src="/logo.png"
                  alt="Sinergi Visual"
                  width={140}
                  height={35}
                  className="h-7 sm:h-8 w-auto object-contain dark:hidden"
                />
                {/* Dark Mode Logo */}
                <Image
                  src="/logo1.png"
                  alt="Sinergi Visual"
                  width={140}
                  height={35}
                  className="h-7 sm:h-8 w-auto object-contain hidden dark:block"
                />
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300">
                UGC STUDIO
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
              Platform AI Vision & UGC Prompt Engineering terdepan untuk kreator, agensi, dan brand e-commerce. Menghasilkan Master Prompt & alur scene video AI Google Flow, Kling, Dreamina, serta naskah voiceover natural siap viral.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-2">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                Optimized for Google Flow / Veo
              </span>
              <span className="flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                Powered by GPT-4o-mini
              </span>
            </div>
          </div>

          {/* Social & Official Channels */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Media Sosial & Portofolio
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a 
                  href="https://sinergivisual.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  <Globe className="w-4 h-4 text-slate-400" />
                  <span>Website & Portofolio</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a 
                  href="https://instagram.com/sinergivisual" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-pink-600 dark:hover:text-pink-400 transition"
                >
                  <svg className="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                  <span>Instagram @sinergivisual</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a 
                  href="https://tiktok.com/@sinergivisual" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition"
                >
                  <Video className="w-4 h-4 text-slate-400" />
                  <span>TikTok @sinergivisual</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Contact & Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Konsultasi & Kustomisasi
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 leading-relaxed">
              Butuh produksi video UGC berskala besar atau integrasi workflow AI kustom untuk brand Anda?
            </p>
            <a 
              href="https://wa.me/6281234567890?text=Halo%20Sinergi%20Visual,%20saya%20tertarik%20dengan%20layanan%20produksi%20video%20UGC%20dan%20AI%20Prompt%20Studio."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Hubungi WhatsApp Sinergi Visual</span>
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-3">
          <p>© {new Date().getFullYear()} Sinergi Visual. All rights reserved. UGC Prompt Generator Studio.</p>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-[11px] text-slate-400">
              <Code className="w-3.5 h-3.5" /> Made for Next-Gen Creators
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
