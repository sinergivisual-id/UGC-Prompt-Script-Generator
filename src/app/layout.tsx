import type { Metadata, Viewport } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';

const roboto = Roboto({
  weight: ['300', '400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'Sinergi Visual - UGC Prompt Generator Studio | AI Vision & Google Flow',
  description: 'Aplikasi AI Vision & UGC Prompt Engineering untuk menghasilkan Master Prompt, alur scene video AI Google Flow, Kling, Dreamina, serta naskah voiceover Bahasa Indonesia natural.',
  keywords: ['UGC Prompt Generator', 'Google Flow', 'Veo', 'Sinergi Visual', 'OpenAI Vision', 'Kling AI', 'Dreamina', 'AI Video Prompt'],
  authors: [{ name: 'Sinergi Visual' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F8FAFC' },
    { media: '(prefers-color-scheme: dark)', color: '#0B0F19' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`dark ${roboto.variable}`}>
      <body className={`${roboto.className} font-sans bg-[#F8FAFC] dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 min-h-screen transition-colors duration-200`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
