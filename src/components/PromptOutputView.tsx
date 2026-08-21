'use client';

import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  Sparkles, 
  RotateCw, 
  Download, 
  FileText, 
  Video, 
  Mic, 
  ShieldAlert, 
  Clock, 
  Layers, 
  Film,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Share2,
  Zap,
  Info
} from 'lucide-react';
import { GeneratedOutput, ScenePrompt } from '@/types';

interface PromptOutputViewProps {
  output: GeneratedOutput | null;
  isGenerating: boolean;
  onRegenerate: () => void;
  onOpenSettings: () => void;
}

export const PromptOutputView: React.FC<PromptOutputViewProps> = ({
  output,
  isGenerating,
  onRegenerate,
  onOpenSettings,
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'scenes' | 'master'>('all');

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);
  };

  const handleExportText = () => {
    if (!output) return;

    let content = `====================================================\n`;
    content += `SINERGI VISUAL - UGC PROMPT STUDIO GENERATOR\n`;
    content += `Produk: ${output.product.name || 'Produk'} (${output.product.brand || 'Brand'})\n`;
    content += `Target Platform: ${output.settings.targetPlatform} | Durasi: ${output.settings.duration}\n`;
    content += `Tanggal: ${new Date(output.createdAt).toLocaleString('id-ID')}\n`;
    content += `====================================================\n\n`;

    content += `[TIPS GOOGLE FLOW KONSISTENSI VISUAL]\n`;
    content += `Tips Google Flow: Lampirkan foto produk asli via tombol (+) atau gunakan fitur Extend dari scene sebelumnya agar bentuk botol & wajah aktor tidak berubah.\n\n`;

    content += `----------------------------------------------------\n`;
    content += `[1. MASTER FULL PROMPT (ENGLISH)]\n`;
    content += `----------------------------------------------------\n`;
    content += `${output.masterPromptEn}\n\n`;

    content += `----------------------------------------------------\n`;
    content += `[2. SCENE-BY-SCENE BREAKDOWN (${output.scenes.length} Scenes)]\n`;
    content += `----------------------------------------------------\n\n`;

    output.scenes.forEach((scene) => {
      content += `--- SCENE ${scene.sceneNumber}: ${scene.sceneTitle} (${scene.timeRange}) ---\n`;
      content += `VISUAL PROMPT (EN):\n${scene.visualPromptEn}\n\n`;
      content += `VOICEOVER SCRIPT (BAHASA INDONESIA):\n"${scene.spokenScriptId}"\n\n`;
      if (scene.cameraDirection) {
        content += `CAMERA DIRECTION: ${scene.cameraDirection}\n\n`;
      }
    });

    content += `----------------------------------------------------\n`;
    content += `[3. NEGATIVE PROMPT (ANTI-ARTIFACT)]\n`;
    content += `----------------------------------------------------\n`;
    content += `${output.negativePrompt}\n\n`;

    if (output.metaNotes) {
      content += `[CREATIVE NOTES & TIPS]\n${output.metaNotes}\n`;
    }

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `UGC-Prompt-${output.product.name ? output.product.name.replace(/\s+/g, '-').toLowerCase() : 'sinergi'}-${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm min-h-[480px]">
        <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 mb-4 shadow-md">
          <Sparkles className="w-8 h-8 animate-spin text-blue-600 dark:text-blue-400" />
          <div className="absolute -inset-1 rounded-2xl bg-blue-500/20 blur-md animate-pulse"></div>
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
          Menyusun UGC Prompt Studio...
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mb-6">
          GPT-4o-mini sedang meracik Character & Product Anchor DNA, kontinuitas multi-scene Google Flow, dan naskah voiceover natural Bahasa Indonesia.
        </p>

        {/* Loading Skeleton */}
        <div className="w-full max-w-md space-y-3">
          <div className="h-12 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse"></div>
          <div className="h-24 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse"></div>
          <div className="h-16 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (!output) {
    return (
      <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-800 min-h-[480px]">
        <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800/80 text-slate-400 dark:text-slate-500 mb-4">
          <Film className="w-8 h-8" />
        </div>
        <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-200 mb-1">
          Hasil Studio Prompt Belum Tersedia
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mb-6 leading-relaxed">
          Unggah foto produk di panel kiri atau pilih salah satu contoh preset, sesuaikan preferensi kreator, lalu klik tombol <strong className="text-blue-600 dark:text-blue-400">Generate UGC Prompt Studio</strong>.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-left w-full max-w-md">
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 text-[11px]">
            <span className="font-semibold block text-slate-700 dark:text-slate-300">1. Master Prompt</span>
            <span className="text-slate-400">Photorealistic EN</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 text-[11px]">
            <span className="font-semibold block text-slate-700 dark:text-slate-300">2. Scene Prompts</span>
            <span className="text-slate-400">Anchor DNA 10s</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 text-[11px]">
            <span className="font-semibold block text-slate-700 dark:text-slate-300">3. Naskah UGC</span>
            <span className="text-slate-400">Bahasa Indonesia</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 text-[11px]">
            <span className="font-semibold block text-slate-700 dark:text-slate-300">4. Negative Box</span>
            <span className="text-slate-400">Anti-Morphing</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Top Banner with Actions */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-600/10 via-indigo-600/5 to-purple-600/10 dark:from-blue-950/40 dark:via-slate-900/40 dark:to-purple-950/40 border border-blue-200/80 dark:border-blue-900/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-600 text-white shadow-sm">
              {output.settings.targetPlatform}
            </span>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              {output.settings.duration} • {output.scenes.length} Scenes
            </span>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              Rasio {output.settings.aspectRatio}
            </span>
          </div>
          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
            {output.product.name || 'UGC Video Prompt Studio'}
          </h3>
        </div>

        {/* Top Action Buttons */}
        <div className="flex items-center gap-2 self-stretch sm:self-auto">
          <button
            onClick={onRegenerate}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition shadow-sm"
            title="Variasikan Ulang dengan parameter yang sama"
          >
            <RotateCw className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Variasikan Ulang</span>
          </button>

          <button
            onClick={handleExportText}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition shadow-sm shadow-blue-500/20"
            title="Download TXT Dokumen Lengkap"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export TXT</span>
          </button>
        </div>
      </div>

      {/* Google Flow Scene Continuity Pro-Tip Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 dark:from-amber-950/40 dark:via-orange-950/30 dark:to-amber-950/40 border border-amber-300 dark:border-amber-700/60 flex items-start gap-3 shadow-sm">
        <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-amber-500 text-white flex-shrink-0 shadow-sm mt-0.5">
          <Zap className="w-4 h-4 fill-white" />
        </div>
        <div className="space-y-1">
          <h4 className="text-xs sm:text-sm font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
            <span>Tips Google Flow / AI Video (100% Konsistensi Visual):</span>
          </h4>
          <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
            Tips Google Flow: Lampirkan foto produk asli via tombol (+) atau gunakan fitur <strong>Extend</strong> dari scene sebelumnya agar bentuk botol & wajah aktor tidak berubah.
          </p>
        </div>
      </div>

      {/* 1. MASTER FULL PROMPT BOX */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="px-4 py-3 bg-slate-50/80 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 font-bold text-xs">
              1
            </span>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                Master Full Prompt (English)
              </h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">
                Instruksi visual menyeluruh (Character & Product Anchor DNA, Lighting, Camera, Environment)
              </p>
            </div>
          </div>

          <button
            onClick={() => handleCopy(output.masterPromptEn, 'master')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              copiedKey === 'master'
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-200/80 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-blue-600 hover:text-white'
            }`}
          >
            {copiedKey === 'master' ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Tersalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Salin Master</span>
              </>
            )}
          </button>
        </div>

        <div className="p-4 bg-slate-950 font-mono text-xs sm:text-sm text-slate-200 leading-relaxed overflow-x-auto whitespace-pre-wrap select-all">
          {output.masterPromptEn}
        </div>
      </div>

      {/* 2. SCENE-BY-SCENE PROMPTS (GOOGLE FLOW / VEO ALUR) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 font-bold text-xs">
              2
            </span>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                Scene-by-Scene Prompt Engine
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
                  Google Flow 10s Continuity
                </span>
              </h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">
                Visual prompt dengan Character & Product Anchor DNA yang konsisten + Naskah Voiceover Bahasa Indonesia
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              const allScenesText = output.scenes
                .map((s) => `[SCENE ${s.sceneNumber} (${s.timeRange}) - ${s.sceneTitle}]\nVisual Prompt:\n${s.visualPromptEn}\n\nVoiceover Script (ID):\n"${s.spokenScriptId}"\n\nCamera: ${s.cameraDirection}`)
                .join('\n\n--------------------\n\n');
              handleCopy(allScenesText, 'all_scenes');
            }}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              copiedKey === 'all_scenes'
                ? 'bg-emerald-600 text-white'
                : 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-600 hover:text-white'
            }`}
          >
            {copiedKey === 'all_scenes' ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Semua Scene Tersalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Salin Semua Scene</span>
              </>
            )}
          </button>
        </div>

        {/* Scene Cards Grid */}
        <div className="space-y-4">
          {output.scenes.map((scene, idx) => (
            <div 
              key={scene.sceneNumber || idx}
              className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-all duration-200 hover:border-indigo-400/50"
            >
              {/* Scene Card Header */}
              <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-indigo-600 text-white shadow-sm">
                    Scene {scene.sceneNumber}
                  </span>
                  <span className="px-2 py-0.5 rounded-md text-xs font-semibold bg-slate-200/80 dark:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {scene.timeRange}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                    {scene.sceneTitle}
                  </span>
                </div>

                {scene.cameraDirection && (
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 italic bg-white dark:bg-slate-900 px-2.5 py-0.5 rounded-full border border-slate-200 dark:border-slate-700">
                    🎥 {scene.cameraDirection}
                  </span>
                )}
              </div>

              <div className="p-4 sm:p-5 space-y-4">
                {/* 1. English Visual Prompt */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <Video className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                      Visual Prompt (English - Siap Paste ke Google Flow/AI Video)
                    </span>
                    <button
                      onClick={() => handleCopy(scene.visualPromptEn, `visual_${scene.sceneNumber}`)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-semibold transition ${
                        copiedKey === `visual_${scene.sceneNumber}`
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-600 hover:text-white'
                      }`}
                    >
                      {copiedKey === `visual_${scene.sceneNumber}` ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>Tersalin</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Salin Visual</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-950 font-mono text-xs text-slate-200 leading-relaxed select-all">
                    {scene.visualPromptEn}
                  </div>
                </div>

                {/* 2. Spoken Voiceover Script (Bahasa Indonesia) */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <Mic className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      Naskah Voiceover / Dialog (Bahasa Indonesia Natural UGC)
                    </span>
                    <button
                      onClick={() => handleCopy(scene.spokenScriptId, `script_${scene.sceneNumber}`)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-semibold transition ${
                        copiedKey === `script_${scene.sceneNumber}`
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-emerald-600 hover:text-white'
                      }`}
                    >
                      {copiedKey === `script_${scene.sceneNumber}` ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Tersalin</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Salin Naskah VO</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-900/60 text-xs sm:text-sm text-emerald-950 dark:text-emerald-100 font-medium leading-relaxed select-all">
                    "{scene.spokenScriptId}"
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. NEGATIVE PROMPT BOX */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="px-4 py-3 bg-red-50/60 dark:bg-red-950/30 border-b border-red-200/80 dark:border-red-900/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 font-bold text-xs">
              3
            </span>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-red-500" />
                Negative Prompt (Anti-Distorsi & Anti-Morphing)
              </h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">
                Mencegah perubahan wajah/karakter, morphing baju, bad hands, blurry logo, plastic skin, jittery frame
              </p>
            </div>
          </div>

          <button
            onClick={() => handleCopy(output.negativePrompt, 'negative')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              copiedKey === 'negative'
                ? 'bg-emerald-600 text-white'
                : 'bg-red-100 dark:bg-red-900/60 text-red-700 dark:text-red-300 hover:bg-red-600 hover:text-white'
            }`}
          >
            {copiedKey === 'negative' ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Tersalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Salin Negative</span>
              </>
            )}
          </button>
        </div>

        <div className="p-4 bg-slate-950 font-mono text-xs text-rose-300 leading-relaxed overflow-x-auto select-all">
          {output.negativePrompt}
        </div>
      </div>

      {/* Meta Notes / Tips */}
      {output.metaNotes && (
        <div className="p-3.5 rounded-xl bg-blue-50/80 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 text-xs text-blue-800 dark:text-blue-300 flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="font-semibold">Panduan Creative Director:</strong> {output.metaNotes}
          </div>
        </div>
      )}

    </div>
  );
};
