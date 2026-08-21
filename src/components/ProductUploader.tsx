'use client';

import React, { useRef, useState, useCallback } from 'react';
import { 
  UploadCloud, 
  Image as ImageIcon, 
  Sparkles, 
  Loader2, 
  X, 
  CheckCircle2, 
  AlertCircle,
  Camera,
  RefreshCw
} from 'lucide-react';

interface ProductUploaderProps {
  onImageSelected: (base64: string) => void;
  onClearImage: () => void;
  imagePreview: string | null;
  isAnalyzing: boolean;
  analysisSuccess: boolean;
  analysisError: string | null;
  onRetryAnalysis: () => void;
}

export const ProductUploader: React.FC<ProductUploaderProps> = ({
  onImageSelected,
  onClearImage,
  imagePreview,
  isAnalyzing,
  analysisSuccess,
  analysisError,
  onRetryAnalysis,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Helper to compress & convert image to Base64
  const processFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Mohon pilih file gambar yang valid (PNG, JPG, JPEG, atau WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        // Optional client-side image scaling to keep payload efficient
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxDim = 1200;
          let { width, height } = img;

          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const compressedBase64 = canvas.toDataURL('image/jpeg', 0.85);
            onImageSelected(compressedBase64);
          } else {
            onImageSelected(result);
          }
        };
        img.src = result;
      }
    };
    reader.readAsDataURL(file);
  }, [onImageSelected]);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg, image/webp"
        className="hidden"
        onChange={handleFileInput}
      />

      {!imagePreview ? (
        // Dropzone Area
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={`group relative flex flex-col items-center justify-center p-6 sm:p-8 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-200 ${
            isDragOver
              ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/30 scale-[1.01]'
              : 'border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/40 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-slate-50 dark:hover:bg-slate-900/80'
          }`}
        >
          <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 mb-3.5 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition duration-300 shadow-sm">
            <UploadCloud className="w-7 h-7" />
          </div>

          <h3 className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-200 text-center mb-1">
            Unggah Foto Produk Anda
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 text-center max-w-xs mb-3">
            Tarik & lepas foto di sini, atau klik untuk memilih file dari galeri (PNG, JPG, WebP)
          </p>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 animate-pulse" />
            <span>Auto-detect otomatis via Vision AI</span>
          </div>
        </div>
      ) : (
        // Image Preview & Detection Status
        <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-900 shadow-md group">
          <div className="relative aspect-[4/3] sm:aspect-[16/9] w-full flex items-center justify-center bg-black/60 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imagePreview}
              alt="Foto Produk Terpilih"
              className="w-full h-full object-contain max-h-72 transition-transform duration-300 group-hover:scale-105"
            />
            
            {/* Gradient Overlay for bottom text */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

            {/* Top Action Buttons */}
            <div className="absolute top-3 right-3 flex items-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-1.5 rounded-lg bg-black/60 text-white hover:bg-black/80 backdrop-blur-md transition border border-white/20 text-xs flex items-center gap-1"
                title="Ganti Foto"
              >
                <Camera className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Ganti</span>
              </button>
              <button
                type="button"
                onClick={onClearImage}
                className="p-1.5 rounded-lg bg-red-600/80 text-white hover:bg-red-600 backdrop-blur-md transition border border-red-400/30"
                title="Hapus Foto"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Bottom Status Banner */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
              {isAnalyzing ? (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-600/90 text-white backdrop-blur-md text-xs font-medium shadow-lg animate-pulse">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>AI sedang mendeteksi data produk...</span>
                </div>
              ) : analysisSuccess ? (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-600/90 text-white backdrop-blur-md text-xs font-medium shadow-lg">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>7 Atribut produk berhasil diekstrak otomatis!</span>
                </div>
              ) : analysisError ? (
                <div className="flex items-center justify-between w-full gap-2 px-3 py-1.5 rounded-xl bg-amber-600/90 text-white backdrop-blur-md text-xs font-medium shadow-lg">
                  <div className="flex items-center gap-1.5 truncate">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{analysisError}</span>
                  </div>
                  <button
                    onClick={onRetryAnalysis}
                    className="flex items-center gap-1 px-2 py-0.5 rounded bg-black/30 hover:bg-black/50 text-[11px] font-semibold transition"
                  >
                    <RefreshCw className="w-3 h-3" /> Coba Lagi
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/70 text-white/90 backdrop-blur-md text-xs font-medium">
                  <ImageIcon className="w-3.5 h-3.5 text-blue-400" />
                  <span>Foto produk siap digunakan</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
