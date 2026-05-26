-- ============================================================
-- SCHEMA SUPABASE — LOGEMENTS EVALA
-- À exécuter dans l'éditeur SQL de votre projet Supabase
-- ============================================================

-- 1. Table principale
CREATE TABLE IF NOT EXISTS public.logements (
  id                UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at        TIMESTAMPTZ DEFAULT now() NOT NULL,

  -- Infos du logement
  titre             TEXT NOT NULL,
  description       TEXT,
  type              TEXT NOT NULL CHECK (type IN ('hotel', 'appartement', 'airbnb', 'chambre_hote')),
  prix_par_nuit     DECIMAL(10, 2),
  adresse           TEXT,
  ville             TEXT NOT NULL DEFAULT 'Kara',
  capacite          INTEGER NOT NULL DEFAULT 1 CHECK (capacite >= 1),

  -- Équipements & photos
  equipements       TEXT[] DEFAULT '{}',
  images            TEXT[] DEFAULT '{}',

  -- Contact propriétaire
  contact_nom       TEXT NOT NULL,
  contact_telephone TEXT NOT NULL,
  contact_email     TEXT,

  -- Statuts
  disponible        BOOLEAN NOT NULL DEFAULT true,
  approuve          BOOLEAN NOT NULL DEFAULT false,

  -- Notation
  note              DECIMAL(3, 2) DEFAULT 0 CHECK (note >= 0 AND note <= 5),
  nombre_avis       INTEGER DEFAULT 0 CHECK (nombre_avis >= 0)
);

-- 2. Index pour les requêtes fréquentes
CREATE INDEX IF NOT EXISTS idx_logements_approuve ON public.logements (approuve);
CREATE INDEX IF NOT EXISTS idx_logements_type ON public.logements (type);
CREATE INDEX IF NOT EXISTS idx_logements_disponible ON public.logements (disponible);
CREATE INDEX IF NOT EXISTS idx_logements_created_at ON public.logements (created_at DESC);

-- 3. Row Level Security (RLS)
ALTER TABLE public.logements ENABLE ROW LEVEL SECURITY;

-- Lecture publique : uniquement les logements approuvés et disponibles
CREATE POLICY "Lecture publique des logements approuvés"
  ON public.logements
  FOR SELECT
  USING (approuve = true AND disponible = true);

-- Insertion publique : tout le monde peut soumettre un logement
-- (approuve = false par défaut — validation manuelle requise)
CREATE POLICY "Soumission publique de logements"
  ON public.logements
  FOR INSERT
  WITH CHECK (approuve = false);

-- Mise à jour et suppression : réservées aux administrateurs
-- (remplacer 'votre-uid-admin' par l'UID réel de votre compte Supabase admin)
-- CREATE POLICY "Admin update"
--   ON public.logements
--   FOR UPDATE
--   USING (auth.uid() = 'votre-uid-admin');

-- 4. Vue publique (optionnel) pour simplifier les requêtes frontend
CREATE OR REPLACE VIEW public.logements_actifs AS
SELECT
  id, titre, description, type, prix_par_nuit,
  adresse, ville, capacite, equipements, images,
  contact_nom, contact_telephone,
  note, nombre_avis, created_at
FROM public.logements
WHERE approuve = true AND disponible = true
ORDER BY created_at DESC;

-- 5. Données d'exemple (optionnel — à supprimer en production)
INSERT INTO public.logements (
  titre, description, type, prix_par_nuit, adresse, ville, capacite,
  equipements, images, contact_nom, contact_telephone, contact_email,
  disponible, approuve, note, nombre_avis
) VALUES
(
  'Hôtel Kara Palace',
  'Hôtel de standing au cœur de Kara, idéal pour le festival Evala. Chambres climatisées, restaurant, bar.',
  'hotel', 25000, 'Centre-ville de Kara', 'Kara', 2,
  ARRAY['wifi','climatisation','petit_dejeuner','parking'],
  ARRAY[]::TEXT[], 'Réception Palace', '+228 90 00 00 00', 'contact@karapalace.tg',
  true, true, 4.5, 12
),
(
  'Appartement meublé Quartier Nord',
  'Grand appartement 3 pièces entièrement meublé avec groupe électrogène. Proche du stade Evala.',
  'appartement', 15000, 'Quartier Nord, près du stade', 'Kara', 4,
  ARRAY['wifi','cuisine','eau_chaude','generatrice'],
  ARRAY[]::TEXT[], 'M. Alassane', '+228 91 23 45 67', NULL,
  true, true, 4.2, 7
),
(
  'Chambre chez l''habitant — Famille Tchamdja',
  'Chambre confortable dans une famille kabyè chaleureuse. Petit-déjeuner inclus. Expérience culturelle authentique.',
  'chambre_hote', 8000, 'Village Lama-Kara', 'Kara', 2,
  ARRAY['eau_chaude','petit_dejeuner','securite'],
  ARRAY[]::TEXT[], 'Famille Tchamdja', '+228 99 87 65 43', NULL,
  true, true, 5.0, 3
);

-- ============================================================
-- FIN DU SCRIPT
-- ============================================================
