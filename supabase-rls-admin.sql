-- ============================================================
-- Policies RLS Supabase — Evala Admin
-- À coller dans : Supabase Dashboard > SQL Editor > New query
-- ============================================================
-- Ces policies garantissent que même si quelqu'un contourne
-- le garde côté client, il ne peut pas modifier les données
-- sans être authentifié en tant qu'admin dans Supabase.
-- ============================================================

-- ── LOGEMENTS ────────────────────────────────────────────────

-- Supprime les anciens doublons éventuels avant de recréer
DROP POLICY IF EXISTS "Admin peut modifier les logements"  ON public.logements;
DROP POLICY IF EXISTS "Admin peut supprimer les logements" ON public.logements;
DROP POLICY IF EXISTS "Admin peut lire tous les logements" ON public.logements;

-- L'admin peut lire TOUS les logements (y compris non approuvés)
CREATE POLICY "Admin peut lire tous les logements"
ON public.logements FOR SELECT
USING (
  auth.jwt() ->> 'email' = 'em.djatika@gmail.com'
  OR (approuve = true AND disponible = true)
);

-- L'admin peut mettre à jour n'importe quel logement
CREATE POLICY "Admin peut modifier les logements"
ON public.logements FOR UPDATE
USING (auth.jwt() ->> 'email' = 'em.djatika@gmail.com');

-- L'admin peut supprimer n'importe quel logement
CREATE POLICY "Admin peut supprimer les logements"
ON public.logements FOR DELETE
USING (auth.jwt() ->> 'email' = 'em.djatika@gmail.com');

-- Propriétaire peut modifier son propre logement
DROP POLICY IF EXISTS "Proprietaire peut modifier son logement" ON public.logements;
CREATE POLICY "Proprietaire peut modifier son logement"
ON public.logements FOR UPDATE
USING (auth.uid() = user_id);


-- ── OFFRES D'EMPLOI ──────────────────────────────────────────

DROP POLICY IF EXISTS "Admin peut modifier les offres"  ON public.offres_emploi;
DROP POLICY IF EXISTS "Admin peut supprimer les offres" ON public.offres_emploi;
DROP POLICY IF EXISTS "Admin peut lire toutes les offres" ON public.offres_emploi;

CREATE POLICY "Admin peut lire toutes les offres"
ON public.offres_emploi FOR SELECT
USING (
  auth.jwt() ->> 'email' = 'em.djatika@gmail.com'
  OR approuve = true
);

CREATE POLICY "Admin peut modifier les offres"
ON public.offres_emploi FOR UPDATE
USING (auth.jwt() ->> 'email' = 'em.djatika@gmail.com');

CREATE POLICY "Admin peut supprimer les offres"
ON public.offres_emploi FOR DELETE
USING (auth.jwt() ->> 'email' = 'em.djatika@gmail.com');

DROP POLICY IF EXISTS "Proprietaire peut modifier son offre" ON public.offres_emploi;
CREATE POLICY "Proprietaire peut modifier son offre"
ON public.offres_emploi FOR UPDATE
USING (auth.uid() = user_id);


-- ── BOUTIQUES ────────────────────────────────────────────────

DROP POLICY IF EXISTS "Admin peut modifier les boutiques"  ON public.boutiques;
DROP POLICY IF EXISTS "Admin peut supprimer les boutiques" ON public.boutiques;
DROP POLICY IF EXISTS "Admin peut lire toutes les boutiques" ON public.boutiques;

CREATE POLICY "Admin peut lire toutes les boutiques"
ON public.boutiques FOR SELECT
USING (
  auth.jwt() ->> 'email' = 'em.djatika@gmail.com'
  OR (approuve = true AND actif = true)
);

CREATE POLICY "Admin peut modifier les boutiques"
ON public.boutiques FOR UPDATE
USING (auth.jwt() ->> 'email' = 'em.djatika@gmail.com');

CREATE POLICY "Admin peut supprimer les boutiques"
ON public.boutiques FOR DELETE
USING (auth.jwt() ->> 'email' = 'em.djatika@gmail.com');

DROP POLICY IF EXISTS "Proprietaire peut modifier sa boutique" ON public.boutiques;
CREATE POLICY "Proprietaire peut modifier sa boutique"
ON public.boutiques FOR UPDATE
USING (auth.uid() = user_id);


-- ── PRODUITS (boutiques) ─────────────────────────────────────

DROP POLICY IF EXISTS "Proprietaire peut gerer ses produits" ON public.produits;

CREATE POLICY "Proprietaire peut gerer ses produits"
ON public.produits FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.boutiques b
    WHERE b.id = boutique_id AND b.user_id = auth.uid()
  )
);

DROP POLICY IF EXISTS "Admin peut gerer tous les produits" ON public.produits;
CREATE POLICY "Admin peut gerer tous les produits"
ON public.produits FOR ALL
USING (auth.jwt() ->> 'email' = 'em.djatika@gmail.com');


-- ── PROFILES ─────────────────────────────────────────────────

-- L'admin peut lire tous les profils
DROP POLICY IF EXISTS "Admin peut lire tous les profils" ON public.profiles;
CREATE POLICY "Admin peut lire tous les profils"
ON public.profiles FOR SELECT
USING (
  auth.jwt() ->> 'email' = 'em.djatika@gmail.com'
  OR auth.uid() = id
);

-- Chaque utilisateur peut lire/modifier son propre profil
DROP POLICY IF EXISTS "Utilisateur gere son profil" ON public.profiles;
CREATE POLICY "Utilisateur gere son profil"
ON public.profiles FOR ALL
USING (auth.uid() = id);
