-- ============================================================
-- Table : offres_emploi
-- Projet Evala Festival — Section Emplois
-- ============================================================

create table if not exists public.offres_emploi (
  id               uuid primary key default gen_random_uuid(),
  created_at       timestamptz not null default now(),

  -- Offre
  titre            text not null,
  description      text not null,
  type_contrat     text not null check (type_contrat in ('cdi','cdd','freelance','stage','benevolat','temps_partiel')),
  domaine          text not null check (domaine in ('securite','restauration','logistique','communication','animation','transport','sante','artisanat','technique','administration','autre')),
  lieu             text not null,
  salaire          text,
  date_debut       date,
  date_fin         date,
  competences      text[] not null default '{}',

  -- Contact
  contact_nom      text not null,
  contact_telephone text not null,
  contact_email    text,

  -- Statut
  approuve         boolean not null default false,
  active           boolean not null default true,

  -- Auteur
  user_id          uuid references auth.users(id) on delete set null
);

-- Index
create index if not exists idx_offres_emploi_approuve_active
  on public.offres_emploi (approuve, active);

create index if not exists idx_offres_emploi_user_id
  on public.offres_emploi (user_id);

create index if not exists idx_offres_emploi_domaine
  on public.offres_emploi (domaine);

create index if not exists idx_offres_emploi_created_at
  on public.offres_emploi (created_at desc);

-- ─── Row Level Security ───────────────────────────────────────

alter table public.offres_emploi enable row level security;

-- Lecture publique : offres approuvées et actives
create policy "offres_emploi_select_public"
  on public.offres_emploi
  for select
  using (approuve = true and active = true);

-- Insertion : utilisateurs authentifiés seulement
create policy "offres_emploi_insert_authenticated"
  on public.offres_emploi
  for insert
  with check (auth.uid() is not null);

-- Mise à jour : propriétaire uniquement
create policy "offres_emploi_update_owner"
  on public.offres_emploi
  for update
  using (auth.uid() = user_id);

-- Suppression : propriétaire uniquement
create policy "offres_emploi_delete_owner"
  on public.offres_emploi
  for delete
  using (auth.uid() = user_id);

-- ─── Donnée de test (à retirer en production) ────────────────
-- insert into public.offres_emploi
--   (titre, description, type_contrat, domaine, lieu, salaire, competences, contact_nom, contact_telephone, approuve, active)
-- values
--   ('Agent de sécurité', 'Assurer la sécurité du périmètre du festival.', 'cdd', 'securite', 'Kara, Togo', '60 000 FCFA/mois', ARRAY['Permis B', 'Premiers secours'], 'Organisation Evala', '+228 90 00 00 00', true, true),
--   ('Cuisinier', 'Préparer les repas pour les participants du festival.', 'cdd', 'restauration', 'Kara, Togo', '50 000 FCFA/mois', ARRAY['HACCP', 'Cuisine africaine'], 'Restaurant Kara', '+228 91 00 00 00', true, true);
