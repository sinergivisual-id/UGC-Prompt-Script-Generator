# Sinergi Visual - UGC Prompt Generator Studio (Invite-Only)

**Sinergi Visual - UGC Prompt Generator Studio** adalah platform AI Vision & Prompt Engineering kelas profesional yang terintegrasi dengan **OpenAI API (GPT-4o-mini)** dan sistem autentikasi **Admin Created / Invite-Only (Supabase Auth)**.

Aplikasi ini mendeteksi produk dari foto secara otomatis serta merancang **Master Prompt** dan **Scene-by-Scene Prompt** yang dioptimalkan untuk **Google Flow / Veo (10s/scene)**, **Dreamina (CapCut AI)**, **Kling AI**, dan **Midjourney**, lengkap dengan naskah Voiceover Bahasa Indonesia natural siap pakai.

---

## Fitur & Sistem Keamanan Baru (Invite-Only & Kuota Kredit)

1. **Model Akses Invite-Only (Tanpa Register Publik)**:
   - Akses pendaftaran publik ditiadakan secara total untuk menjaga eksklusivitas lisensi.
   - Akun hanya dapat dibuat oleh **Admin Sinergi Visual** melalui Supabase Auth Dashboard atau SQL Trigger.
   - Halaman `/login` khusus dengan validasi sesi dan proteksi route otomatis (Next.js Middleware).

2. **Manajemen Kuota Kredit Server-Side**:
   - Setiap akun memiliki saldo `credits` yang ditentukan saat pembuatan lisensi.
   - Sisa kuota ditampilkan secara real-time di Navbar dan modal Informasi Lisensi.
   - Validasi kredit diverifikasi secara ketat di sisi server sebelum API memanggil OpenAI.
   - Jika kuota habis (`credits = 0`), sistem memblokir request dengan status `403 Forbidden` dan mengarahkan user ke layanan Admin.

3. **Keamanan API Server-Side**:
   - `OPENAI_API_KEY` murni dikelola di server melalui environment variable `OPENAI_API_KEY`.
   - Tidak ada lagi input API key di sisi browser client.

4. **Auto-Detect Foto Produk & Prompt Studio**:
   - Deteksi 7 atribut produk via GPT-4o Vision.
   - Master Prompt fotorealistik (English).
   - Breakdown adegan per 10 detik Google Flow + Naskah VO Bahasa Indonesia.
   - Negative prompt anti-distorsi AI.

---

## Setup & Panduan Menjalankan Aplikasi

### 1. Salin Environment Variables
Buat file `.env.local` di root proyek:
```env
# Server-Side OpenAI Key
OPENAI_API_KEY=sk-proj-...

# Supabase Auth & Database
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 2. Setup Database Supabase
Jalankan skrip SQL di file [supabase-schema.sql](file:///d:/SINERGI%20VISUAL/PROJECT/Web%20UGC%20Generator%20Prompt%20%28v1%29/supabase-schema.sql) pada **SQL Editor** di Supabase Dashboard Anda. Skrip ini akan membuat:
- Tabel `public.profiles` dengan kuota `credits` & `role`.
- Row Level Security (RLS) policies.
- Function `deduct_credits` (atomic credit reduction).
- Trigger otomatis saat Admin menambahkan user di `auth.users`.

### 3. Cara Admin Membuat Akun Klien Baru
1. Buka Supabase Dashboard > **Authentication** > **Users**.
2. Klik **Add User** > **Create User**.
3. Masukkan Email dan Password klien.
4. Di bagian User Metadata (opsional):
   ```json
   {
     "full_name": "Nama Klien / Brand",
     "credits": 100,
     "role": "client"
   }
   ```
5. Akun langsung aktif dan profil dengan saldo kredit otomatis dibuat di database.

### 4. Jalankan Development Server
```bash
npm run dev
```
Buka browser di [http://localhost:3000](http://localhost:3000). Pengguna yang belum login akan otomatis dialihkan ke [http://localhost:3000/login](http://localhost:3000/login).

---

## Tech Stack
- **Framework**: Next.js 14 (App Router, Server Actions & Route Handlers, Middleware)
- **Auth & Database**: Supabase Auth, PostgreSQL, Row Level Security (RLS)
- **AI Engine**: OpenAI SDK (`gpt-4o-mini` Text & Vision)
- **UI & Styling**: Tailwind CSS, Lucide React, Canvas Confetti
- **Language**: TypeScript
