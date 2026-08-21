'use client';

import React from 'react';
import { 
  Package, 
  Tag, 
  Layers, 
  Sparkles, 
  Palette, 
  Target, 
  CheckCircle2, 
  FileText,
  RotateCcw
} from 'lucide-react';
import { ProductData } from '@/types';

interface ProductFormProps {
  product: ProductData;
  onChange: (field: keyof ProductData, value: string) => void;
  onReset: () => void;
  isAnalyzing: boolean;
  hasAutoDetected: boolean;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  product,
  onChange,
  onReset,
  isAnalyzing,
  hasAutoDetected,
}) => {
  return (
    <div className="space-y-4">
      {/* Header Info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
            <Package className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Spesifikasi Produk (Editable)</span>
          </h3>
          {hasAutoDetected && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              <CheckCircle2 className="w-3 h-3" /> Auto-Detected
            </span>
          )}
        </div>

        {(product.name || product.brand || product.benefits) && (
          <button
            type="button"
            onClick={onReset}
            className="text-xs text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 flex items-center gap-1 transition"
            title="Kosongkan semua field produk"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Form</span>
          </button>
        )}
      </div>

      {isAnalyzing ? (
        // Skeleton Loading State
        <div className="space-y-3.5 animate-pulse">
          <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
            <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
            <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
          </div>
          <div className="h-20 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
          <div className="h-14 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
        </div>
      ) : (
        <div className="space-y-3.5">
          
          {/* 1. Nama Produk */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              1. Nama Produk <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={product.name}
                onChange={(e) => onChange('name', e.target.value)}
                placeholder="Contoh: Lumina Skin Brightening Booster Serum"
                className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition shadow-sm"
              />
            </div>
          </div>

          {/* 2 & 3. Kategori & Jenis Produk (2 Cols) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                2. Kategori Produk
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={product.category}
                  onChange={(e) => onChange('category', e.target.value)}
                  placeholder="e.g. Skincare, Fashion, F&B, Gadget"
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition shadow-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                3. Jenis / Bentuk Kemasan
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={product.type}
                  onChange={(e) => onChange('type', e.target.value)}
                  placeholder="e.g. Serum botol pipet 30ml, Kaos katun boxy"
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* 4 & 5. Merek Brand & Warna Dominan (2 Cols) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                4. Merek (Brand)
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={product.brand}
                  onChange={(e) => onChange('brand', e.target.value)}
                  placeholder="e.g. Lumina Botanica, Raw Studio"
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition shadow-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                5. Warna Dominan & Aksen
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={product.dominantColor}
                  onChange={(e) => onChange('dominantColor', e.target.value)}
                  placeholder="e.g. Amber Glass & Pastel Pink, Matte Black"
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* 6. Kegunaan & Manfaat Utama */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              6. Kegunaan / Manfaat Utama (Selling Points) <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={2}
              value={product.benefits}
              onChange={(e) => onChange('benefits', e.target.value)}
              placeholder="e.g. Mencerahkan kulit dalam 14 hari, memudarkan noda hitam, cepat meresap tidak lengket"
              className="w-full px-3.5 py-2 rounded-xl text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition shadow-sm resize-none"
            />
          </div>

          {/* 7. Target Konsumen Ideal */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              7. Target Konsumen Ideal
            </label>
            <input
              type="text"
              value={product.targetAudience}
              onChange={(e) => onChange('targetAudience', e.target.value)}
              placeholder="e.g. Wanita & Pria 18-35 tahun dengan masalah kulit kusam dan noda bekas jerawat"
              className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition shadow-sm"
            />
          </div>

        </div>
      )}
    </div>
  );
};
