import { ProductData, UgcSettings, GeneratedOutput, ScenePrompt } from '@/types';
import { STANDARD_NEGATIVE_PROMPT } from './constants';

export const VISION_SYSTEM_PROMPT = `
You are an expert AI Product Vision Specialist & E-Commerce UGC Creative Director.
Analyze the uploaded product image in extreme detail and return a strictly valid JSON object with exactly these 7 keys:
{
  "name": "Exact or inferred brand product name in Indonesian/English",
  "category": "High-level category (e.g., Skincare & Beauty, Fashion, Tech & Gadget, F&B, Home Living, Health)",
  "type": "Specific form/packaging (e.g., Serum botol pipet kaca 30ml, Boxy oversized t-shirt, Stainless tumbler LED, Roasted coffee pouch)",
  "brand": "Visible brand name or inferred aesthetic brand name",
  "dominantColor": "Accurate dominant color palette and packaging accents (e.g., Pastel Mint Green with Matte White Cap)",
  "benefits": "Key product benefits, functions, or problems it solves (in Indonesian, clear and persuasive)",
  "targetAudience": "Ideal target consumer demographics and persona (in Indonesian)"
}

Do NOT output markdown ticks or explanation outside the JSON. Return only the raw JSON.
`;

export const GENERATOR_SYSTEM_PROMPT = `
You are the Principal UGC Creative Director & Master Consistency AI Prompt Engineer at "Sinergi Visual".
Your mission is to generate HIGH-DENSITY, CINEMATIC, HIGHLY-DETAILED AI Video Prompts (~100-150 words per visual prompt) optimized for Google Flow/Veo, Kling AI, Dreamina, and Midjourney, paired with natural, high-converting Indonesian UGC scripts.

================================================================================
CRITICAL MANDATORY RULES (100% STRICT ADHERENCE REQUIRED):
================================================================================

1. STRICT PARAMETER INJECTION & GENDER INTEGRITY:
   - If Gender is "Pria": The character MUST be described as an attractive Indonesian young man in his late 20s/early 30s with a clean-cut modern textured dark haircut, well-groomed masculine facial features, and stylish casual menswear. Under NO circumstances should any female terms (she, her, woman, girl, feminine, skirt, blouse) appear!
   - If Gender is "Wanita": The character MUST be described as an attractive Indonesian young woman in her 20s with radiant healthy skin, aesthetic hairstyle, and stylish casual womenswear. Under NO circumstances should male pronouns or masculine terms appear!
   - If Gender is "Netral / Couple": Describe as a relatable Indonesian creator with modern aesthetic streetwear styling.
   - Setting / Location: Describe the chosen location in rich architectural, lighting, and ambient detail (e.g., "Kafe Modern" must feature minimalist wooden cafe tables, blurred barista station, warm interior bokeh, and daylight streaming through floor-to-ceiling glass windows).

2. 6-PART HIGH-DENSITY VISUAL PROMPT STRUCTURE (EVERY PROMPT MUST HAVE 4-5 DENSE SENTENCES):
   Each visual prompt (Master Prompt and EVERY Scene Prompt) MUST strictly follow this exact 6-part order:
   - Part 1 [Shot Type & Camera Specs]: Lens focal length (e.g., 35mm f/1.8 prime), aspect ratio (9:16 vertical), camera body (iPhone 15 Pro front selfie camera / cinematic handheld rig), natural micro-shake.
   - Part 2 [Subject DNA]: Exact age, gender, ethnicity, skin tone with authentic pore texture, exact hairstyle & hair color, exact clothing outfit with specific textures and colors. Repeat this EXACT Character DNA across all scenes.
   - Part 3 [Exact Product Interaction]: The exact brand name, product name, packaging form factor, container finish (e.g., frosted gradient glass), dispenser mechanism, crisp brand label typography, and exact hand grip/application gesture. Repeat this EXACT Product DNA across all scenes.
   - Part 4 [Environment & Background Details]: Deep environmental description of the selected location with realistic background props and shallow depth of field.
   - Part 5 [Lighting & Color Grading]: Detailed lighting setup (e.g., soft diffused window daylight, warm interior golden rim light), cinematic color grade with rich natural tones.
   - Part 6 [Motion & Action Dynamics]: Dynamic creator facial expressions, eye contact with the smartphone camera, fluid hand gestures, authentic creator energy.

3. CONTINUITY INSTRUCTIONS FOR SCENE 2 ONWARDS:
   - Scene 1 establishes the hook.
   - Scene 2, 3, 4, 5, 6 MUST begin with:
     "[Continuity: Same scene and character as previous shot. Same outfit, hairstyle, facial identity, product bottle, and lighting environment] ..."

4. DURATION & SCENE COUNT CADENCE (Google Flow 10s per scene):
   - 10s: exactly 1 scene ("0-10s" - Hook & Instant Punch)
   - 20s: exactly 2 scenes ("0-10s" - Hook & Problem, "10-20s" - Product Solution & CTA)
   - 30s: exactly 3 scenes ("0-10s" - Hook & Frustration, "10-20s" - Live Demo & Texture, "20-30s" - Result & Strong CTA)
   - 60s: exactly 6 scenes ("0-10s" Hook, "10-20s" Agitate Problem, "20-30s" Unboxing/Intro, "30-40s" Live Demo/Texture, "40-50s" Social Proof/Benefits, "50-60s" CTA & Urgency Promo)

5. NATURAL INDONESIAN UGC SCRIPT:
   - Spoken scripts must sound 100% natural, relatable, and authentic to Indonesian TikTok/Reels creators (using natural conversational hooks, phrases like 'Jujur awalnya aku skeptis...', 'Liat deh teksturnya...', 'Langsung klik keranjang kuning ya!').

================================================================================
JSON OUTPUT FORMAT:
================================================================================
Generate a strictly valid JSON object adhering to this structure:
{
  "masterPrompt": "High-density master visual prompt in English (~120-160 words) following the 6-part structure.",
  "scenes": [
    {
      "sceneNumber": 1,
      "duration": "0-10s",
      "sceneTitle": "Hook & Problem Statement",
      "visualPrompt": "High-density visual prompt in English (~100-140 words) with 6-part structure.",
      "voiceoverScript": "Natural spoken voiceover script in BAHASA INDONESIA.",
      "cameraDirection": "Handheld selfie camera with subtle natural motion, focus pull to product label."
    }
  ],
  "negativePrompt": "photorealistic negative prompt tags to prevent distortion, morphing face, changing clothes, extra limbs, bad hands, plastic skin.",
  "metaNotes": "💡 Tips Google Flow: Lampirkan foto produk asli via tombol (+) atau gunakan fitur Extend dari scene sebelumnya agar bentuk botol & wajah aktor tidak berubah."
}

Return ONLY the raw JSON object. No markdown backticks or extra text.
`;

/**
 * Rich environment description generator based on selected location
 */
export function getLocationEnvironmentDesc(location: string): string {
  switch (location) {
    case 'Kafe Modern':
      return 'sitting at a minimalist polished terrazzo coffee shop table, blurred warm ambient cafe interior background with Scandinavian wooden accents, indoor plants, and natural daylight streaming through large floor-to-ceiling glass windows';
    case 'Kamar Estetik':
    case 'Kamar Tidur / Meja Rias':
      return 'inside a cozy aesthetic minimalist bedroom interior with a softly illuminated vanity mirror desk, warm ambient fairy lights in soft bokeh, pastel linen textures, and curated modern room decor';
    case 'Meja Kerja Minimalis':
      return 'at a sleek organized modern workstation with a minimalist laptop setup, warm matte desk lamp glow, ceramic coffee mug, and a clean shallow-depth-of-field background';
    case 'Wastafel / Bathroom Mewah':
      return 'standing in front of a luxurious modern minimalist bathroom vanity, illuminated by bright frosted ring lighting reflecting off a pristine white marble sink and polished silver chrome fixtures';
    case 'Dapur Bersih':
      return 'in a bright contemporary open-concept kitchen with sleek quartz countertops, minimalist glass spice jars, and soft warm morning sunlight streaming across the kitchen island';
    case 'Mobil':
      return 'seated inside the passenger seat of a modern premium car, natural diffused daylight pouring through tinted panoramic windows with dynamic out-of-focus street bokeh in the background';
    case 'Outdoor / Street Style':
      return 'outdoors on a trendy sunlit urban sidewalk surrounded by lush tropical greenery, modern architectural glass facades, and soft cinematic golden afternoon sunlight';
    default:
      return `in a beautifully styled aesthetic ${location.toLowerCase()} setting with soft ambient depth of field and premium modern interior accents`;
  }
}

/**
 * Character DNA builder respecting strict gender, age, ethnicity and styling
 */
export function getCharacterDna(settings: UgcSettings): {
  characterDna: string;
  pronoun: string;
  pronounPossessive: string;
  genderTerm: string;
} {
  const isMan = settings.gender === 'Pria';
  const isWoman = settings.gender === 'Wanita';

  if (isMan) {
    const ageDesc = settings.ageRange === '18-24' ? 'early 20s' : settings.ageRange === '25-34' ? 'late 20s to early 30s' : 'mid 30s';
    const outfit = 'wearing a stylish minimalist relaxed-fit textured overshirt in earthy sage-olive layered over a clean heavyweight white cotton crewneck t-shirt';
    const hair = 'clean-cut modern textured dark crop haircut with neatly groomed edges and well-maintained facial features';
    return {
      characterDna: `an attractive Indonesian young man in his ${ageDesc} with healthy warm golden-undertone skin, authentic subtle facial pore texture, ${hair}, ${outfit}`,
      pronoun: 'he',
      pronounPossessive: 'his',
      genderTerm: 'young Indonesian man',
    };
  }

  if (isWoman) {
    const ageDesc = settings.ageRange === '18-24' ? 'early 20s' : settings.ageRange === '25-34' ? 'mid 20s' : 'early 30s';
    const outfit = 'wearing an aesthetic oversized pastel oat-beige ribbed knit cardigan effortlessly draped over a clean white ribbed square-neck tee';
    const hair = 'shoulder-length natural glossy wavy dark brown hair parted gracefully with subtle curtain bangs';
    return {
      characterDna: `an attractive and charismatic Indonesian young woman in her ${ageDesc} with radiant dewy skin, authentic pore texture, delicate natural soft-glam makeup, ${hair}, ${outfit}`,
      pronoun: 'she',
      pronounPossessive: 'her',
      genderTerm: 'young Indonesian woman',
    };
  }

  // Neutral / Couple
  return {
    characterDna: `a stylish and relatable Indonesian creator in their ${settings.ageRange}s with authentic skin texture, contemporary modern haircut, wearing a minimalist pastel urban streetwear outfit`,
    pronoun: 'they',
    pronounPossessive: 'their',
    genderTerm: 'relatable Indonesian creator',
  };
}

export function generateFallbackPrompt(product: ProductData, settings: UgcSettings): GeneratedOutput {
  const sceneCount = settings.duration === '10s' ? 1 : settings.duration === '20s' ? 2 : settings.duration === '30s' ? 3 : 6;
  const { characterDna, pronoun, pronounPossessive, genderTerm } = getCharacterDna(settings);
  const locationEnv = getLocationEnvironmentDesc(settings.location);

  // Locked-in Product Anchor DNA
  const productTypeClean = product.type || 'cosmetic cylinder bottle';
  const productColorsClean = product.dominantColor || 'aesthetic pastel color palette';
  const productBrandClean = product.brand || 'Premium Brand';
  const productNameClean = product.name || 'Product';

  const productAnchorDna = `holding the exact same ${productBrandClean} "${productNameClean}" (${productTypeClean} featuring a sleek ${productColorsClean} gradient finish, matching precision dispenser cap, and crisp legible typography reading "${productBrandClean}")`;

  const scenes: ScenePrompt[] = [];

  const timeIntervals: Record<string, string[]> = {
    '10s': ['0-10s'],
    '20s': ['0-10s', '10-20s'],
    '30s': ['0-10s', '10-20s', '20-30s'],
    '60s': ['0-10s', '10-20s', '20-30s', '30-40s', '40-50s', '50-60s'],
  };

  const titles = [
    'Visual Hook & Relatable Frustration',
    'Product Application & Formula Demonstration',
    'Visible Transformation & Glowing Social Proof',
    'Macro Close-up Texture & Packaging Detail',
    'Daily Routine Integration & Key Benefits',
    'Final Result & Strong Call to Action',
  ];

  const scripts = [
    `Guys, kalau kalian lagi struggle nyari ${product.name || 'produk'} yang beneran ampuh dan works, kalian wajib stop scrolling sekarang juga! Liat deh ini...`,
    `Teksturnya tuh beneran ringan banget, pas diaplikasikan langsung meresap dalam hitungan detik tanpa rasa lengket sama sekali. Kandungannya bantu ${product.benefits ? product.benefits.slice(0, 65) : 'bikin kulit makin sehat dan glowing'}!`,
    `Udah 2 minggu rutin aku pake ${product.brand || 'ini'} dan hasilnya nyata banget, temen-temenku sampe pada salfok nanyain perubahannya!`,
    `Bener-bener se-worth it itu dari segi formula maupun kualitas packagingnya, aromanya juga relaxing banget pas dipake.`,
    `Dipake setiap hari nyaman banget, bikin rutinitas harian jadi lebih simpel tapi hasilnya beneran maksimal.`,
    `Buat kalian yang mau buktiin juga, langsung checkout sekarang lewat link di bio atau klik keranjang kuning sebelum stok promonya habis ya!`,
  ];

  const intervals = timeIntervals[settings.duration] || ['0-10s', '10-20s', '20-30s'];

  for (let i = 0; i < sceneCount; i++) {
    const timeRange = intervals[i] || `${i * 10}-${(i + 1) * 10}s`;
    const title = titles[i % titles.length] || `Scene ${i + 1} - Key Moment`;
    const script = scripts[i % scripts.length] || `Kalian wajib banget cobain ${product.name || 'produk ini'} sekarang juga!`;

    const isFirstScene = i === 0;
    const continuityTag = isFirstScene
      ? `Vertical 9:16 aspect ratio framing, shot on iPhone 15 Pro front camera with a 35mm f/1.8 lens, subtle handheld micro-shake.`
      : `[Continuity: Same scene and character as previous shot. Same outfit, hairstyle, facial identity, product bottle, and lighting environment] Vertical 9:16 framing, 35mm lens.`;

    let actionDetails = '';
    if (i === 0) {
      actionDetails = `${pronoun.charAt(0).toUpperCase() + pronoun.slice(1)} faces the smartphone camera with an expressive, enthusiastic hook gesture while raising ${productAnchorDna} into clear foreground focus. Background is set ${locationEnv}. Soft diffused natural window lighting with rich cinematic contrast and Kodak Portra color tone. ${pronoun.charAt(0).toUpperCase() + pronoun.slice(1)} maintains energetic eye contact with natural facial micro-expressions.`;
    } else if (i === 1) {
      actionDetails = `Medium close-up shot ${locationEnv}. ${pronoun.charAt(0).toUpperCase() + pronoun.slice(1)} smoothly demonstrates ${productAnchorDna}, carefully interacting with the dispenser mechanism to showcase the velvety texture. Soft ambient rim lighting highlights ${pronounPossessive} confident facial expression and crisp product branding.`;
    } else if (i === 2) {
      actionDetails = `Close-up hero shot transitioning into a radiant confident smile. ${pronoun.charAt(0).toUpperCase() + pronoun.slice(1)} holds ${productAnchorDna} prominently beside ${pronounPossessive} face and points enthusiastically toward the bottom-left call to action corner. Warm golden lighting accents ${pronounPossessive} glowing skin texture and the aesthetic packaging in the background of ${locationEnv}.`;
    } else {
      actionDetails = `Dynamic eye-level angle ${locationEnv}. ${pronoun.charAt(0).toUpperCase() + pronoun.slice(1)} enthusiastically presents ${productAnchorDna} with vibrant creator energy. Crisp studio lighting, authentic skin pores, and shallow depth of field.`;
    }

    const visual = `${continuityTag} Features ${characterDna}. ${actionDetails}`;

    scenes.push({
      sceneNumber: i + 1,
      timeRange,
      sceneTitle: title,
      visualPromptEn: visual,
      spokenScriptId: script,
      cameraDirection: i === 0 
        ? 'Handheld selfie angle with subtle organic camera wobble' 
        : i === 1 
        ? 'Medium close-up dynamic focus tracking product usage' 
        : 'Selfie framing with energetic hand gestures toward CTA',
    });
  }

  const masterPrompt = `A hyper-realistic viral UGC-style video shot on iPhone 15 Pro, vertical 9:16 aspect ratio with a 35mm f/1.8 prime lens. Features ${characterDna} passionately interacting with ${productAnchorDna}. Setting is ${locationEnv}. Lighting Style: ${settings.cameraStyle}, soft natural key light paired with subtle warm ambient fill, shallow depth of field with creamy bokeh, and realistic skin texture with visible fine pores. The creator exhibits authentic creator charisma, engaging micro-expressions, and confident eye contact with the camera. 8k resolution, cinematic color grading, 100% visual consistency across all scenes, optimized for Google Flow / Veo generation.`;

  return {
    id: `ugc-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
    product,
    settings,
    masterPromptEn: masterPrompt,
    scenes,
    negativePrompt: STANDARD_NEGATIVE_PROMPT,
    metaNotes: '💡 Tips Google Flow: Lampirkan foto produk asli via tombol (+) atau gunakan fitur Extend dari scene sebelumnya agar bentuk botol & wajah aktor tidak berubah.',
  };
}
