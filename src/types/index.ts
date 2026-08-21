export interface ProductData {
  name: string;
  category: string;
  type: string;
  brand: string;
  dominantColor: string;
  benefits: string;
  targetAudience: string;
  imagePreview?: string;
}

export type AgeRange = '18-24' | '25-34' | '35-50+';
export type Gender = 'Wanita' | 'Pria' | 'Netral / Couple';
export type Ethnicity = 'Indonesian / Southeast Asian' | 'East Asian' | 'Caucasian' | 'Global / Multi-ethnic';
export type CreatorPersona = 
  | 'Casual Daily' 
  | 'Skincare Enthusiast' 
  | 'Tech Reviewer' 
  | 'Energetic Seller / TikTok Affiliate' 
  | 'Soft Aesthetic ASMR' 
  | 'Professional Doctor / Expert';

export type VideoType = 
  | 'Direct Testimonial' 
  | 'Problem-Solution (Strong Visual Hook)' 
  | 'Unboxing & First Impression' 
  | 'ASMR Aesthetic Showcase' 
  | 'Skit Drama Lucu';

export type Duration = '10s' | '20s' | '30s' | '60s';
export type AspectRatio = '9:16' | '16:9' | '1:1';
export type LocationSetting = 
  | 'Kamar Estetik' 
  | 'Meja Kerja Minimalis' 
  | 'Wastafel / Bathroom Mewah' 
  | 'Kafe Modern' 
  | 'Dapur Bersih' 
  | 'Mobil'
  | 'Outdoor / Street Style';

export type CameraStyle = 
  | 'iPhone Front Camera (Handheld natural shake)' 
  | 'Cinematic Golden Hour' 
  | 'Ring Light Studio' 
  | 'Macro Close-up' 
  | 'Soft Diffused Daylight';

export type TargetPlatform = 'Google Flow' | 'Dreamina' | 'Kling AI' | 'Midjourney';

export interface UgcSettings {
  ageRange: AgeRange;
  gender: Gender;
  ethnicity: Ethnicity;
  persona: CreatorPersona;
  videoType: VideoType;
  duration: Duration;
  aspectRatio: AspectRatio;
  location: LocationSetting;
  cameraStyle: CameraStyle;
  targetPlatform: TargetPlatform;
  customHookNote?: string;
}

export interface ScenePrompt {
  sceneNumber: number;
  timeRange: string;
  sceneTitle: string;
  visualPromptEn: string;
  spokenScriptId: string;
  cameraDirection: string;
}

export interface GeneratedOutput {
  id: string;
  createdAt: string;
  product: ProductData;
  settings: UgcSettings;
  masterPromptEn: string;
  scenes: ScenePrompt[];
  negativePrompt: string;
  estimatedTokens?: number;
  metaNotes?: string;
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  productName: string;
  brand: string;
  category: string;
  duration: Duration;
  targetPlatform: TargetPlatform;
  thumbnail?: string;
  output: GeneratedOutput;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  credits: number;
  role: 'admin' | 'client' | 'agency';
  created_at?: string;
  updated_at?: string;
}

export interface AnalysisResponse {
  success: boolean;
  data?: Partial<ProductData>;
  remainingCredits?: number;
  error?: string;
}

export interface GenerateResponse {
  success: boolean;
  data?: GeneratedOutput;
  remainingCredits?: number;
  isSimulation?: boolean;
  message?: string;
  error?: string;
}
