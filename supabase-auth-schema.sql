-- ============================================================
-- SCHEMA AUTH — EVALA LOGEMENTS
-- À exécuter dans Supabase Dashboard > SQL Editor
-- APRÈS avoir exécuté supabase-schema.sql
-- ============================================================

-- 1. Table profiles (liée à auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id          UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  created_at  TIMESTAMPTZ DEFAULT now() NOT NULL,
  full_name   TEXT NOT NULL,
  email       TEXT NOT NULL,
  type        TEXT NOT NULL CHECK (type IN ('particulier', 'agence', 'hotel', 'auberge'))
);

-- 2. RLS sur profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Chaque utilisateur voit uniquement son propre profil
CREATE POLICY "Lecture profil personnel"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

-- Insertion uniquement par l'utilisateur lui-même
CREATE POLICY "Création profil personnel"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Mise à jour uniquement par l'utilisateur lui-même
CREATE POLICY "Mise à jour profil personnel"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- 3. Ajouter user_id à la table logements
ALTER TABLE public.logements
  ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_logements_user_id ON public.logements (user_id);

-- 4. Mettre à jour la politique RLS d'insertion des logements
-- (remplace l'ancienne politique si elle existe)
DROP POLICY IF EXISTS "Soumission publique de logements" ON public.logements;

CREATE POLICY "Soumission logement authentifié"
  ON public.logements
  FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL AND approuve = false);

-- 5. Permettre à un utilisateur de voir/modifier ses propres logements
CREATE POLICY "Lecture logements personnels"
  ON public.logements
  FOR SELECT
  USING (auth.uid() = user_id OR (approuve = true AND disponible = true));

DROP POLICY IF EXISTS "Lecture publique des logements approuvés" ON public.logements;

CREATE POLICY "Mise à jour logements personnels"
  ON public.logements
  FOR UPDATE
  USING (auth.uid() = user_id);

-- 6. Fonction trigger : créer automatiquement un profil à l'inscription
-- (optionnel, en complément de l'insertion depuis le frontend)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, type)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', 'Utilisateur'),
    new.email,
    COALESCE(new.raw_user_meta_data->>'account_type', 'particulier')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- FIN DU SCRIPT
-- ============================================================
