import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { VISION_SYSTEM_PROMPT } from '@/lib/prompt-templates';
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
    const { imageBase64 } = body;

    if (!imageBase64) {
      return NextResponse.json(
        { success: false, error: 'Foto produk (base64 image) wajib disertakan.' },
        { status: 400 }
      );
    }

    // 2. Pure Server-Side OpenAI API Key
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'OPENAI_API_KEY server belum dikonfigurasi di file environment (.env.local).' 
        },
        { status: 500 }
      );
    }

    const openai = new OpenAI({ apiKey });

    // Format image URL for OpenAI Vision
    const imageUrl = imageBase64.startsWith('data:') 
      ? imageBase64 
      : `data:image/jpeg;base64,${imageBase64}`;

    // 3. Call OpenAI Vision
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: VISION_SYSTEM_PROMPT,
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Tolong analisa foto produk ini secara detail untuk kebutuhan pembuatan prompt video UGC dan naskah iklan e-commerce.',
            },
            {
              type: 'image_url',
              image_url: {
                url: imageUrl,
                detail: 'high',
              },
            },
          ],
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.3,
      max_tokens: 1000,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('Tidak ada respon dari model OpenAI Vision.');
    }

    const parsedData = JSON.parse(content);

    // 4. Deduct 1 Credit upon successful Vision analysis
    const deductRes = await deductServerCredit(authCheck.user.id, 1);
    const newRemainingCredits = deductRes.newCredits ?? Math.max(0, (authCheck.remainingCredits ?? 1) - 1);

    return NextResponse.json({
      success: true,
      data: parsedData,
      remainingCredits: newRemainingCredits,
    });
  } catch (error: any) {
    console.error('Vision analysis error:', error);
    const errorMessage = error?.message || 'Gagal menganalisis gambar produk.';
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
