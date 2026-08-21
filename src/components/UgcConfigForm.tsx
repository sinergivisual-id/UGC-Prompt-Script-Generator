'use client';

import React from 'react';
import { 
  User, 
  Video, 
  Clock, 
  Tv, 
  MapPin, 
  Camera, 
  Layers, 
  Sparkles,
  Smartphone,
  Check
} from 'lucide-react';
import { UgcSettings } from '@/types';
import {
  AGE_RANGES,
  GENDERS,
  ETHNICITIES,
  PERSONAS,
  VIDEO_TYPES,
  DURATIONS,
  ASPECT_RATIOS,
  LOCATIONS,
  CAMERA_STYLES,
  TARGET_PLATFORMS,
} from '@/lib/constants';

interface UgcConfigFormProps {
  settings: UgcSettings;
  onChange: <K extends keyof UgcSettings>(key: K, value: UgcSettings[K]) => void;
}

export const UgcConfigForm: React.FC<UgcConfigFormProps> = ({
  settings,
  onChange,
}) => {
  return (
    <div className="space-y-6">
      
      {/* 1. CREATOR PROFILE SECTION */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
            <User className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Profil Kreator UGC
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Karakter model visual AI yang akan membawakan video produk
            </p>
          </div>
        </div>

        {/* Gender & Age Range */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Gender */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Gender Kreator
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {GENDERS.map((item) => {
                const isSelected = settings.gender === item.value;
                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => onChange('gender', item.value)}
                    className={`py-2 px-2 text-xs rounded-xl border transition-all text-center ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-500/20 font-semibold'
                        : 'bg-white dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 font-medium'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Age Range */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Rentang Usia
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {AGE_RANGES.map((item) => {
                const isSelected = settings.ageRange === item.value;
                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => onChange('ageRange', item.value)}
                    className={`py-2 px-1 text-xs rounded-xl border transition-all text-center ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-500/20 font-semibold'
                        : 'bg-white dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 font-medium'
                    }`}
                  >
                    {item.value}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Ethnicity & Persona */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Ethnicity */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Etnis / Look Wajah
            </label>
            <select
              value={settings.ethnicity}
              onChange={(e) => onChange('ethnicity', e.target.value as any)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-sm"
            >
              {ETHNICITIES.map((eth) => (
                <option key={eth.value} value={eth.value}>
                  {eth.label}
                </option>
              ))}
            </select>
          </div>

          {/* Persona */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Persona / Vibe Gaya Bicara
            </label>
            <select
              value={settings.persona}
              onChange={(e) => onChange('persona', e.target.value as any)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-sm"
            >
              {PERSONAS.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label} - {p.desc}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 2. TECHNICAL VIDEO CONFIGURATION */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400">
            <Video className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Format & Konfigurasi Teknis Video
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Struktur alur video, durasi scene Google Flow, dan aspek visual
            </p>
          </div>
        </div>

        {/* Video Type & Duration */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Video Type */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Tipe Konsep Video
            </label>
            <select
              value={settings.videoType}
              onChange={(e) => onChange('videoType', e.target.value as any)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-sm"
            >
              {VIDEO_TYPES.map((v) => (
                <option key={v.value} value={v.value}>
                  {v.label}
                </option>
              ))}
            </select>
          </div>

          {/* Duration */}
          <div>
            <label className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              <span>Durasi Video (Google Flow 10s/scene)</span>
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {DURATIONS.map((d) => {
                const isSelected = settings.duration === d.value;
                return (
                  <button
                    key={d.value}
                    type="button"
                    onClick={() => onChange('duration', d.value)}
                    className={`py-2 px-1 text-xs rounded-xl border transition-all text-center flex flex-col items-center justify-center ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-500/20 font-bold'
                        : 'bg-white dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 font-medium'
                    }`}
                  >
                    <span>{d.value}</span>
                    <span className={`text-[9px] ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                      {d.scenesCount} Scene
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Aspect Ratio & Location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Aspect Ratio */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Aspek Rasio
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {ASPECT_RATIOS.map((item) => {
                const isSelected = settings.aspectRatio === item.value;
                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => onChange('aspectRatio', item.value)}
                    className={`py-2 px-1 text-xs rounded-xl border transition-all text-center ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-500/20 font-semibold'
                        : 'bg-white dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 font-medium'
                    }`}
                  >
                    {item.value}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Setting Lokasi
            </label>
            <select
              value={settings.location}
              onChange={(e) => onChange('location', e.target.value as any)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-sm"
            >
              {LOCATIONS.map((loc) => (
                <option key={loc.value} value={loc.value}>
                  {loc.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Camera Style & Target Platform */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Camera Style */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Gaya Kamera & Lighting
            </label>
            <select
              value={settings.cameraStyle}
              onChange={(e) => onChange('cameraStyle', e.target.value as any)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-sm"
            >
              {CAMERA_STYLES.map((cam) => (
                <option key={cam.value} value={cam.value}>
                  {cam.label}
                </option>
              ))}
            </select>
          </div>

          {/* Platform Preset */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Target Platform AI
            </label>
            <select
              value={settings.targetPlatform}
              onChange={(e) => onChange('targetPlatform', e.target.value as any)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-sm font-medium"
            >
              {TARGET_PLATFORMS.map((plat) => (
                <option key={plat.value} value={plat.value}>
                  {plat.label} - ({plat.tag})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Custom Hook / Note */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Catatan Tambahan / Hook Khusus (Opsional)
          </label>
          <input
            type="text"
            value={settings.customHookNote || ''}
            onChange={(e) => onChange('customHookNote', e.target.value)}
            placeholder="Contoh: Awali dengan ekspresi terkejut di depan cermin, sebutkan promo diskon 50%"
            className="w-full px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-sm"
          />
        </div>

      </div>

    </div>
  );
};
