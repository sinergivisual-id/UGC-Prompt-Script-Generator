import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { 
  GENERATOR_SYSTEM_PROMPT, 
  generateFallbackPrompt, 
  getCharacterDna, 
  getLocationEnvironmentDesc 
} from '@/lib/prompt-templates';
import { ProductData, UgcSettings, GeneratedOutput, ScenePrompt } from '@/types';
import { verifyUserAndCredits, deductServerCredit } from '@/lib/supabase';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    // 1. Verify User Session & Credit Balance Server-Side
    const authCheck = await verifyUserAndCredits(req, 1);
    if (!authCheck.success || !authCheck.user) {
      return NextResponse.json(
        { 
          success: false, 
          error: authCheck.error || 'Akses tidak diizinkan.',
          remainingCredits: authCheck.remainingCredits ?? 0
        },
        { status: authCheck.status || 401 }
      );
    }

    const body = await req.json();
    const { product, settings }: { product: ProductData; settings: UgcSettings } = body;

    if (!product || !settings) {
      return NextResponse.json(
        { success: false, error: 'Data produk dan konfigurasi UGC wajib diisi.' },
        { status: 400 }
      );
    }

    // 2. Pure Server-Side OpenAI API Key
    const apiKey = process.env.OPENAI_API_KEY;

    // Fallback mode if server API key is not yet set in .env.local
    if (!apiKey) {
      const fallbackData = generateFallbackPrompt(product, settings);
      
      // Deduct credit
      const deductRes = await deductServerCredit(authCheck.user.id, 1);
      const newRemainingCredits = deductRes.newCredits ?? Math.max(0, (authCheck.remainingCredits ?? 1) - 1);

      return NextResponse.json({
        success: true,
        data: fallbackData,
        remainingCredits: newRemainingCredits,
        isSimulation: true,
        message: 'Dihasilkan menggunakan Generator Engine Internal (Tambahkan OPENAI_API_KEY di .env.local server untuk live OpenAI model).'
      });
    }

    const openai = new OpenAI({ apiKey });

    // Generate strict DNA parameters
    const { characterDna, pronoun, pronounPossessive, genderTerm } = getCharacterDna(settings);
    const locationEnv = getLocationEnvironmentDesc(settings.location);
    const isMan = settings.gender === 'Pria';
    const isWoman = settings.gender === 'Wanita';

    const userPrompt = `
Generate a HIGH-DENSITY, CINEMATIC UGC PROMPT STUDIO PACKAGE (~100-150 words per visual prompt) adhering strictly to the user parameters below:

=======================================================
1. USER CONFIGURATION & LOCKED PARAMETERS
=======================================================
- TARGET GENDER: ${settings.gender.toUpperCase()}
  * MANDATORY SUBJECT DNA: ${characterDna}
  * PRONOUNS TO USE: ${pronoun} / ${pronounPossessive}
  ${isMan ? '* STRICT GENDER RULE: You MUST describe an Indonesian young MAN with a clean masculine haircut and stylish casual menswear. Under NO circumstances should any female terms (she, her, woman, girl, dress, blouse) appear!' : ''}
  ${isWoman ? '* STRICT GENDER RULE: You MUST describe an Indonesian young WOMAN with radiant skin and stylish womenswear. Under NO circumstances should male pronouns (he, him, his) or masculine facial hair appear!' : ''}

- LOCATION / ENVIRONMENT: ${settings.location}
  * MANDATORY ENVIRONMENT DETAILS: ${locationEnv}

- VIDEO TYPE / CONCEPT: ${settings.videoType}
- TOTAL DURATION: ${settings.duration} (Split into strict 10s intervals: ${settings.duration === '10s' ? '1 scene' : settings.duration === '20s' ? '2 scenes' : settings.duration === '30s' ? '3 scenes' : '6 scenes'})
- ASPECT RATIO: ${settings.aspectRatio}
- CAMERA & LIGHTING STYLE: ${settings.cameraStyle}
- TARGET PLATFORM: ${settings.targetPlatform}
${settings.customHookNote ? `- SPECIAL CREATIVE HOOK / NOTE: ${settings.customHookNote}` : ''}

=======================================================
2. PRODUCT SPECIFICATIONS (LOCKED PRODUCT DNA)
=======================================================
- Brand: ${product.brand || 'Premium Brand'}
- Product Name: ${product.name || 'Product'}
- Category: ${product.category || 'General Category'}
- Packaging / Form: ${product.type || 'Sleek cosmetic container'}
- Dominant Color Palette: ${product.dominantColor || 'Aesthetic modern palette'}
- Key Benefits: ${product.benefits || 'High quality transformative benefits'}
- Target Demographic: ${product.targetAudience || 'Active modern consumers'}

=======================================================
3. MANDATORY 6-PART HIGH-DENSITY PROMPT STRUCTURE
=======================================================
Every visual prompt (masterPrompt and all scenes) MUST be a rich paragraph containing 4-5 dense sentences following this exact order:
1. [Shot Type & Camera Specs]: Lens focal length (e.g. 35mm f/1.8 prime), vertical 9:16 framing, shot on iPhone 15 Pro front camera, natural micro-shake.
2. [Subject DNA]: Lock exact character (${characterDna}).
3. [Exact Product Interaction]: Holding the exact same ${product.brand || 'Brand'} "${product.name || 'Product'}" in ${product.dominantColor || 'aesthetic color'} ${product.type || 'bottle'} with matching dispenser cap and crisp legible brand typography.
4. [Environment & Background]: Set ${locationEnv}.
5. [Lighting & Color Grading]: Soft natural window key light paired with subtle warm ambient fill, cinematic rich color grade.
6. [Motion Dynamics & Expression]: Dynamic enthusiastic creator expressions, engaging eye contact, natural TikTok/Reels pacing.

For Scene 2 onwards, you MUST prepend:
"[Continuity: Same scene and character as previous shot. Same outfit, hairstyle, facial identity, product bottle, and lighting environment] ..."

Spoken scripts (voiceoverScript) MUST be in authentic, natural Indonesian UGC influencer dialogue style.

Return raw JSON only adhering to:
{
  "masterPrompt": "High-density master visual prompt in English (~120-160 words)",
  "scenes": [
    {
      "sceneNumber": 1,
      "duration": "0-10s",
      "sceneTitle": "Hook & Problem Statement",
      "visualPrompt": "High-density visual prompt in English (~100-140 words)",
      "voiceoverScript": "Natural spoken voiceover script in BAHASA INDONESIA.",
      "cameraDirection": "Handheld selfie camera with subtle natural motion, focus pull to product label."
    }
  ],
  "negativePrompt": "photorealistic negative prompt tags...",
  "metaNotes": "💡 Tips Google Flow: Lampirkan foto produk asli via tombol (+) atau gunakan fitur Extend dari scene sebelumnya agar bentuk botol & wajah aktor tidak berubah."
}
`;

    // 3. Call OpenAI GPT-4o-mini
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: GENERATOR_SYSTEM_PROMPT,
        },
        {
          role: 'user',
          content: userPrompt,
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.65,
      max_tokens: 3500,
    });

    const rawContent = response.choices[0]?.message?.content;
    if (!rawContent) {
      throw new Error('Model OpenAI tidak mengembalikan teks output.');
    }

    const parsed = JSON.parse(rawContent);

    // Normalize keys: supports both masterPrompt/masterPromptEn, visualPrompt/visualPromptEn, voiceoverScript/spokenScriptId, duration/timeRange
    const masterPrompt = parsed.masterPrompt || parsed.masterPromptEn || '';
    const rawScenes = Array.isArray(parsed.scenes) ? parsed.scenes : [];

    const processedScenes: ScenePrompt[] = rawScenes.map((s: any, idx: number) => {
      let visualText = s.visualPrompt || s.visualPromptEn || '';
      
      // Enforce continuity tag on scene >= 2
      if (idx > 0 && typeof visualText === 'string') {
        if (!visualText.startsWith('[Continuity:')) {
          visualText = `[Continuity: Same scene and character as previous shot. Same outfit, hairstyle, facial identity, product bottle, and lighting environment] ${visualText}`;
        }
      }

      return {
        sceneNumber: typeof s.sceneNumber === 'number' ? s.sceneNumber : idx + 1,
        timeRange: s.timeRange || s.duration || `${idx * 10}-${(idx + 1) * 10}s`,
        sceneTitle: s.sceneTitle || `Scene ${idx + 1}`,
        visualPromptEn: visualText,
        spokenScriptId: s.voiceoverScript || s.spokenScriptId || '',
        cameraDirection: s.cameraDirection || 'Handheld selfie camera angle with organic motion',
      };
    });

    const generatedOutput: GeneratedOutput = {
      id: `ugc-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toISOString(),
      product,
      settings,
      masterPromptEn: masterPrompt,
      scenes: processedScenes,
      negativePrompt: parsed.negativePrompt || '',
      metaNotes: parsed.metaNotes || '💡 Tips Google Flow: Lampirkan foto produk asli via tombol (+) atau gunakan fitur Extend dari scene sebelumnya agar bentuk botol & wajah aktor tidak berubah.',
      estimatedTokens: response.usage?.total_tokens,
    };

    // 4. Deduct 1 credit upon successful prompt generation
    const deductRes = await deductServerCredit(authCheck.user.id, 1);
    const newRemainingCredits = deductRes.newCredits ?? Math.max(0, (authCheck.remainingCredits ?? 1) - 1);

    return NextResponse.json({
      success: true,
      data: generatedOutput,
      remainingCredits: newRemainingCredits,
    });
  } catch (error: any) {
    console.error('Prompt generation error:', error);
    const errorMessage = error?.message || 'Gagal menghasilkan prompt UGC.';
    
    return NextResponse.json(
      { 
        success: false, 
        error: errorMessage.includes('401') || errorMessage.includes('Incorrect API key')
          ? 'API Key OpenAI server tidak valid atau kuota backend habis.' 
          : errorMessage 
      },
      { status: 500 }
    );
  }
}
