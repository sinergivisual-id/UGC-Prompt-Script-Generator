-- ==============================================================================
-- SINERGI VISUAL UGC STUDIO - SUPABASE DATABASE SCHEMA (INVITE ONLY / ADMIN CREATED)
-- ==============================================================================

-- 1. Create Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  credits INTEGER NOT NULL DEFAULT 50 CHECK (credits >= 0),
  role TEXT NOT NULL DEFAULT 'client' CHECK (role IN ('admin', 'client', 'agency')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 3. RLS Policies
-- Users can view their own profile
CREATE POLICY "Users can view own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Users can update their basic profile (name) but not directly alter credits
CREATE POLICY "Users can update own basic profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Service role / Admin has full access
CREATE POLICY "Service role full access"
  ON public.profiles
  FOR ALL
  USING (auth.jwt() ->> 'role' = 'service_role');

-- 4. Atomic Credit Deduction Function
CREATE OR REPLACE FUNCTION public.deduct_credits(
  user_id UUID,
  amount INTEGER DEFAULT 1
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  current_credits INTEGER;
  new_credits INTEGER;
BEGIN
  -- Lock row for update
  SELECT credits INTO current_credits
  FROM public.profiles
  WHERE id = user_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', 'User profile not found');
  END IF;

  IF current_credits < amount THEN
    RETURN jsonb_build_object(
      'success', false, 
      'error', 'Kredit Anda telah habis. Hubungi Admin Sinergi Visual untuk top up kuota.',
      'credits', current_credits
    );
  END IF;

  new_credits := current_credits - amount;

  UPDATE public.profiles
  SET credits = new_credits,
      updated_at = NOW()
  WHERE id = user_id;

  RETURN jsonb_build_object(
    'success', true, 
    'credits', new_credits,
    'deducted', amount
  );
END;
$$;

-- 5. Trigger to automatically create profile when user is created in auth.users by Admin
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  initial_credits INTEGER := 50;
  assigned_role TEXT := 'client';
  user_full_name TEXT := '';
BEGIN
  -- Read initial credits and role if provided in user metadata by Admin
  IF (NEW.raw_user_meta_data->>'credits') IS NOT NULL THEN
    initial_credits := (NEW.raw_user_meta_data->>'credits')::INTEGER;
  END IF;

  IF (NEW.raw_user_meta_data->>'role') IS NOT NULL THEN
    assigned_role := NEW.raw_user_meta_data->>'role';
  END IF;

  IF (NEW.raw_user_meta_data->>'full_name') IS NOT NULL THEN
    user_full_name := NEW.raw_user_meta_data->>'full_name';
  END IF;

  INSERT INTO public.profiles (id, email, full_name, credits, role, created_at, updated_at)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(user_full_name, split_part(NEW.email, '@', 1)),
    initial_credits,
    assigned_role,
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO UPDATE
  SET email = EXCLUDED.email;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ==============================================================================
-- EXAMPLE: Cara Admin Menambahkan User Baru (Via Supabase Dashboard atau SQL):
-- 1. Buat user di menu Authentication > Users > Add User (Email + Password)
-- 2. Atau jalankan fungsi / SQL untuk atur kuota user:
--    UPDATE public.profiles SET credits = 100 WHERE email = 'klien@perusahaan.com';
-- ==============================================================================
