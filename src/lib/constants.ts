import { 
  AgeRange, 
  Gender, 
  Ethnicity, 
  CreatorPersona, 
  VideoType, 
  Duration, 
  AspectRatio, 
  LocationSetting, 
  CameraStyle, 
  TargetPlatform,
  ProductData,
  UgcSettings
} from '@/types';

export const AGE_RANGES: { value: AgeRange; label: string; desc: string }[] = [
  { value: '18-24', label: '18-24 (Gen Z)', desc: 'Ekspresif, cepat, trend-setter, bahasa gaul' },
  { value: '25-34', label: '25-34 (Millennial)', desc: 'Relatable, profesional muda, thoughtful' },
  { value: '35-50+', label: '35-50+ (Mature)', desc: 'Terpercaya, matang, bijak, value-oriented' },
];

export const GENDERS: { value: Gender; label: string; icon: string }[] = [
  { value: 'Wanita', label: 'Wanita', icon: 'User' },
  { value: 'Pria', label: 'Pria', icon: 'User' },
  { value: 'Netral / Couple', label: 'Netral / Couple', icon: 'Users' },
];

export const ETHNICITIES: { value: Ethnicity; label: string }[] = [
  { value: 'Indonesian / Southeast Asian', label: 'Indonesian / Southeast Asian (Default)' },
  { value: 'East Asian', label: 'East Asian (Korean / Japanese / Chinese look)' },
  { value: 'Caucasian', label: 'Caucasian / Western look' },
  { value: 'Global / Multi-ethnic', label: 'Global / Multi-ethnic' },
];

export const PERSONAS: { value: CreatorPersona; label: string; icon: string; desc: string }[] = [
  { value: 'Casual Daily', label: 'Casual Daily', icon: 'Smile', desc: 'Gaya santai sehari-hari di rumah' },
  { value: 'Skincare Enthusiast', label: 'Skincare Enthusiast', icon: 'Sparkles', desc: 'Fokus tekstur, glow kulit, & review jujur' },
  { value: 'Tech Reviewer', label: 'Tech Reviewer', icon: 'Cpu', desc: 'Detail fitur spesifikasi, unboxing presisi' },
  { value: 'Energetic Seller / TikTok Affiliate', label: 'Energetic Seller / TikTok Affiliate', icon: 'Flame', desc: 'Antusias tinggi, hook kuat, urgency CTA' },
  { value: 'Soft Aesthetic ASMR', label: 'Soft Aesthetic ASMR', icon: 'Volume2', desc: 'Tenang, visual memanjakan mata, audio crisp' },
  { value: 'Professional Doctor / Expert', label: 'Professional Doctor / Expert', icon: 'Award', desc: 'Edukasi kredibel, berbasis bukti & otoritas' },
];

export const VIDEO_TYPES: { value: VideoType; label: string; desc: string }[] = [
  { value: 'Problem-Solution (Strong Visual Hook)', label: 'Problem-Solution (Strong Visual Hook)', desc: 'Mulai dari keluhan umum lalu solusi produk memuaskan' },
  { value: 'Direct Testimonial', label: 'Direct Testimonial', desc: 'Pengalaman pribadi pemakaian langsung di depan kamera' },
  { value: 'Unboxing & First Impression', label: 'Unboxing & First Impression', desc: 'Buka paket, sensasi pertama, impresi bahan/kemasan' },
  { value: 'ASMR Aesthetic Showcase', label: 'ASMR Aesthetic Showcase', desc: 'Close-up sinematik fokus estetika & tekstur produk' },
  { value: 'Skit Drama Lucu', label: 'Skit Drama Lucu', desc: 'Cerita komedi situasi singkat yang relatable' },
];

export const DURATIONS: { value: Duration; label: string; scenesCount: number; badge: string }[] = [
  { value: '10s', label: '10 Detik (1 Scene)', scenesCount: 1, badge: 'Quick Hook' },
  { value: '20s', label: '20 Detik (2 Scene)', scenesCount: 2, badge: 'Standard TikTok' },
  { value: '30s', label: '30 Detik (3 Scene)', scenesCount: 3, badge: 'Reels / Shorts Optimal' },
  { value: '60s', label: '60 Detik (6 Scene)', scenesCount: 6, badge: 'Full Storytelling' },
];

export const ASPECT_RATIOS: { value: AspectRatio; label: string; desc: string; icon: string }[] = [
  { value: '9:16', label: '9:16 (Vertical)', desc: 'TikTok, Reels, YouTube Shorts', icon: 'Smartphone' },
  { value: '16:9', label: '16:9 (Landscape)', desc: 'YouTube Video & Web Ads', icon: 'Tv' },
  { value: '1:1', label: '1:1 (Square)', desc: 'Instagram Feed & Carousel', icon: 'Square' },
];

export const LOCATIONS: { value: LocationSetting; label: string; icon: string }[] = [
  { value: 'Kamar Estetik', label: 'Kamar Estetik (Cozy Bedroom)', icon: 'Home' },
  { value: 'Meja Kerja Minimalis', label: 'Meja Kerja Minimalis (Desk Setup)', icon: 'Laptop' },
  { value: 'Wastafel / Bathroom Mewah', label: 'Wastafel / Bathroom Mewah (Marble Basin)', icon: 'Bath' },
  { value: 'Kafe Modern', label: 'Kafe Modern (Coffee Shop Ambience)', icon: 'Coffee' },
  { value: 'Dapur Bersih', label: 'Dapur Bersih (Bright Kitchen)', icon: 'Utensils' },
  { value: 'Mobil', label: 'Mobil (Car Interior Dashboard)', icon: 'Car' },
  { value: 'Outdoor / Street Style', label: 'Outdoor / Street Style (Urban Sunlight)', icon: 'Sun' },
];

export const CAMERA_STYLES: { value: CameraStyle; label: string; desc: string }[] = [
  { value: 'iPhone Front Camera (Handheld natural shake)', label: 'iPhone Front Camera', desc: 'Handheld natural subtle camera shake, real UGC feel' },
  { value: 'Cinematic Golden Hour', label: 'Cinematic Golden Hour', desc: 'Warm directional sunlight, shallow depth of field, 35mm f/1.8' },
  { value: 'Ring Light Studio', label: 'Ring Light Studio', desc: 'Soft frontal even illumination, vibrant color pop, clean reflection' },
  { value: 'Macro Close-up', label: 'Macro Close-up', desc: 'Extreme detail, droplet textures, crisp product labeling' },
  { value: 'Soft Diffused Daylight', label: 'Soft Diffused Daylight', desc: 'Window indirect natural light, airy bright tones' },
];

export const TARGET_PLATFORMS: { value: TargetPlatform; label: string; tag: string; color: string }[] = [
  { value: 'Google Flow', label: 'Google Flow / Veo', tag: 'Primary AI Video', color: 'from-blue-600 to-indigo-600' },
  { value: 'Dreamina', label: 'Dreamina (CapCut AI)', tag: 'CapCut Video', color: 'from-purple-600 to-pink-600' },
  { value: 'Kling AI', label: 'Kling AI', tag: 'High-Motion Video', color: 'from-amber-600 to-red-600' },
  { value: 'Midjourney', label: 'Midjourney v6.1', tag: 'Ultra Image / Still Photorealism', color: 'from-emerald-600 to-teal-600' },
];

export const DEFAULT_UGC_SETTINGS: UgcSettings = {
  ageRange: '25-34',
  gender: 'Wanita',
  ethnicity: 'Indonesian / Southeast Asian',
  persona: 'Skincare Enthusiast',
  videoType: 'Problem-Solution (Strong Visual Hook)',
  duration: '30s',
  aspectRatio: '9:16',
  location: 'Kamar Estetik',
  cameraStyle: 'iPhone Front Camera (Handheld natural shake)',
  targetPlatform: 'Google Flow',
};

export const SAMPLE_PRODUCTS: {
  title: string;
  badge: string;
  data: ProductData;
  settings: Partial<UgcSettings>;
}[] = [
  {
    title: 'Glow Serum 10% Niacinamide',
    badge: 'Skincare Beauty',
    data: {
      name: 'Lumina Skin Brightening Booster Serum',
      category: 'Skincare & Beauty',
      type: 'Serum Botol Pipet Kaca 30ml',
      brand: 'Lumina Botanica',
      dominantColor: 'Amber Glass & Soft Pastel Pink Label',
      benefits: 'Mencerahkan kulit kusam dalam 14 hari, memudarkan noda hitam bekas jerawat, tekstur watery cepat meresap',
      targetAudience: 'Wanita muda & pria 18-35 tahun yang memiliki masalah kulit kusam dan bekas jerawat',
    },
    settings: {
      gender: 'Wanita',
      persona: 'Skincare Enthusiast',
      videoType: 'Problem-Solution (Strong Visual Hook)',
      location: 'Wastafel / Bathroom Mewah',
      duration: '30s',
    }
  },
  {
    title: 'Oversized Heavyweight T-Shirt',
    badge: 'Streetwear Fashion',
    data: {
      name: 'Raw Studio Heavy Cotton Boxy Tee 240gsm',
      category: 'Fashion & Apparel',
      type: 'Kaos Oversized Katun Tebal Kerah Ribbed',
      brand: 'Raw Studio Urban',
      dominantColor: 'Washed Charcoal Black & Vintage Off-White',
      benefits: 'Fitting boxy tegap tidak mudah melar, bahan katun sejuk anti-gerah meski tebal, jahitan rantai rapi premium',
      targetAudience: 'Gen Z & Millennial urban yang gemar outfit streetwear minimalis dan hypebeast',
    },
    settings: {
      gender: 'Pria',
      persona: 'Casual Daily',
      videoType: 'Unboxing & First Impression',
      location: 'Kamar Estetik',
      duration: '20s',
    }
  },
  {
    title: 'Smart Vacuum Insulated Tumbler',
    badge: 'Lifestyle & Gadget',
    data: {
      name: 'HydroPro Thermo LED Smart Tumbler 750ml',
      category: 'Home & Kitchen / Gadget',
      type: 'Botol Minum Termos Stainless dengan Indikator Suhu Digital',
      brand: 'HydroPro Labs',
      dominantColor: 'Matte Forest Green & Brushed Steel Ring',
      benefits: 'Menahan dingin hingga 24 jam dan panas 12 jam, tutup sentuh sensor suhu LED, anti-bocor 100%',
      targetAudience: 'Pekerja kantoran, mahasiswa, dan gym goers aktif',
    },
    settings: {
      gender: 'Netral / Couple',
      persona: 'Tech Reviewer',
      videoType: 'Direct Testimonial',
      location: 'Meja Kerja Minimalis',
      duration: '30s',
    }
  },
  {
    title: 'Single Origin Specialty Coffee Beans',
    badge: 'F&B Artisan',
    data: {
      name: 'Gunung Halu Honey Processed Arabica 250g',
      category: 'Food & Beverage',
      type: 'Biji Kopi Sangrai Specialty Roasted Beans',
      brand: 'Karsa Roastery',
      dominantColor: 'Kraft Matte Black Pouch & Gold Foil Accent',
      benefits: 'Tasting notes floral melati dan manis buah mangga segar, acidity seimbang halus di lambung',
      targetAudience: 'Pecinta kopi manual brew dan home brewers',
    },
    settings: {
      gender: 'Pria',
      persona: 'Soft Aesthetic ASMR',
      videoType: 'ASMR Aesthetic Showcase',
      location: 'Dapur Bersih',
      duration: '30s',
    }
  }
];

export const STANDARD_NEGATIVE_PROMPT = 
  'blurry, distorted product label, wrong brand spelling, low resolution, bad anatomy, deformed hands, extra fingers, missing fingers, plastic doll skin, unnatural eye blinking, oversaturated, glitchy transitions, jump cuts, jittery camera motion, watermark, logo distortion, artificial rendering artifacts.';
