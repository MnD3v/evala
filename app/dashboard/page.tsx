"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Plus, BedDouble, Briefcase, CheckCircle2, Clock,
  Loader2, Trash2, Eye, EyeOff, ShoppingBag, Pencil,
  Package, ChevronDown, ChevronUp,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { supabase } from "../lib/supabase";
import { getSession, getUserProfile } from "../lib/auth";
import type { Logement } from "../types/logement";
import type { OffreEmploi } from "../types/emploi";
import type { Boutique, Produit } from "../types/boutique";
import { TYPE_LABELS } from "../types/logement";
import { CATEGORIE_BOUTIQUE_LABELS } from "../types/boutique";

/* ─── Helpers ───────────────────────────────────────────────── */

const CONTRAT_LABELS: Record<string, string> = {
  cdi: "CDI", cdd: "CDD", freelance: "Freelance",
  stage: "Stage", benevolat: "Bénévolat", temps_partiel: "Temps partiel",
};

const DOMAINE_LABELS: Record<string, string> = {
  securite: "Sécurité", restauration: "Restauration", logistique: "Logistique",
  communication: "Communication", animation: "Animation", transport: "Transport",
  sante: "Santé", artisanat: "Artisanat", technique: "Technique",
  administration: "Administration", autre: "Autre",
};

const ACCOUNT_TYPE_LABELS: Record<string, string> = {
  particulier: "Particulier",
  agence:      "Agence immobilière",
  hotel:       "Hôtel",
  auberge:     "Auberge / Pension",
};

function logementStatus(l: Logement) {
  if (!l.disponible) return "inactive";
  if (!l.approuve)   return "pending";
  return "approved";
}

function emploiStatus(o: OffreEmploi) {
  if (!o.active)   return "inactive";
  if (!o.approuve) return "pending";
  return "approved";
}

const STATUS_STYLE = {
  approved: { label: "Publié",     color: "#006A4E", bg: "rgba(0,106,78,0.08)",  border: "rgba(0,106,78,0.25)",  icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
  pending:  { label: "En attente", color: "#8a6d00", bg: "rgba(255,205,0,0.10)", border: "rgba(255,205,0,0.35)", icon: <Clock className="w-3.5 h-3.5" /> },
  inactive: { label: "Désactivé",  color: "#999",    bg: "rgba(0,0,0,0.04)",     border: "rgba(0,0,0,0.1)",      icon: <EyeOff className="w-3.5 h-3.5" /> },
};

/* ─── Page ──────────────────────────────────────────────────── */

export default function DashboardPage() {
  const router = useRouter();

  const [authChecked, setAuthChecked] = useState(false);
  const [userId, setUserId]           = useState<string | null>(null);
  const [profile, setProfile]         = useState<{ full_name: string; email: string; type: string } | null>(null);

  const [logements, setLogements]     = useState<Logement[]>([]);
  const [offres, setOffres]           = useState<OffreEmploi[]>([]);
  const [boutiques, setBoutiques]     = useState<Boutique[]>([]);
  const [isLoading, setIsLoading]     = useState(true);

  const [produits, setProduits]                     = useState<Produit[]>([]);
  const [showAllProducts, setShowAllProducts]       = useState<Record<string, boolean>>({});
  const [deletingId, setDeletingId]                 = useState<string | null>(null);
  const [togglingId, setTogglingId]           = useState<string | null>(null);
  const [deletingProductId, setDeletingProductId]   = useState<string | null>(null);

  /* Auth */
  useEffect(() => {
    getSession().then(async (session) => {
      if (!session) { router.replace("/auth?redirect=/dashboard"); return; }
      setUserId(session.user.id);
      setAuthChecked(true);
      const prof = await getUserProfile(session.user.id);
      setProfile(prof
        ? { full_name: prof.full_name, email: prof.email, type: prof.type }
        : {
            full_name: session.user.user_metadata?.full_name ?? "Mon compte",
            email: session.user.email ?? "",
            type: session.user.user_metadata?.account_type ?? "particulier",
          }
      );
    });
  }, [router]);

  /* Fetch */
  useEffect(() => {
    if (!userId) return;
    const load = async () => {
      setIsLoading(true);
      const [{ data: logs }, { data: offs }, { data: bouts }, { data: prods }] = await Promise.all([
        supabase.from("logements").select("*").eq("user_id", userId).order("created_at", { ascending: false }),
        supabase.from("offres_emploi").select("*").eq("user_id", userId).order("created_at", { ascending: false }),
        supabase.from("boutiques").select("*").eq("user_id", userId).order("created_at", { ascending: false }),
        supabase.from("produits").select("*").eq("user_id", userId).order("created_at", { ascending: false }),
      ]);
      setLogements((logs as Logement[]) ?? []);
      setOffres((offs as OffreEmploi[]) ?? []);
      setBoutiques((bouts as Boutique[]) ?? []);
      setProduits((prods as Produit[]) ?? []);
      setIsLoading(false);
    };
    load();
  }, [userId]);

  /* Supprimer logement */
  const deleteLogement = async (id: string) => {
    if (!confirm("Supprimer ce logement définitivement ?")) return;
    setDeletingId(id);
    await supabase.from("logements").delete().eq("id", id);
    setLogements(prev => prev.filter(l => l.id !== id));
    setDeletingId(null);
  };

  /* Toggle logement */
  const toggleLogement = async (l: Logement) => {
    setTogglingId(l.id);
    const next = !l.disponible;
    await supabase.from("logements").update({ disponible: next }).eq("id", l.id);
    setLogements(prev => prev.map(x => x.id === l.id ? { ...x, disponible: next } : x));
    setTogglingId(null);
  };

  /* Supprimer boutique */
  const deleteBoutique = async (id: string) => {
    if (!confirm("Supprimer cette boutique et tous ses produits ?")) return;
    setDeletingId(id);
    await supabase.from("boutiques").delete().eq("id", id);
    setBoutiques(prev => prev.filter(b => b.id !== id));
    setDeletingId(null);
  };

  /* Toggle boutique */
  const toggleBoutique = async (b: Boutique) => {
    setTogglingId(b.id);
    const next = !b.actif;
    await supabase.from("boutiques").update({ actif: next }).eq("id", b.id);
    setBoutiques(prev => prev.map(x => x.id === b.id ? { ...x, actif: next } : x));
    setTogglingId(null);
  };

  /* Supprimer offre */
  const deleteOffre = async (id: string) => {
    if (!confirm("Supprimer cette offre définitivement ?")) return;
    setDeletingId(id);
    await supabase.from("offres_emploi").delete().eq("id", id);
    setOffres(prev => prev.filter(o => o.id !== id));
    setDeletingId(null);
  };

  /* Supprimer produit */
  const deleteProduct = async (id: string) => {
    if (!confirm("Supprimer ce produit définitivement ?")) return;
    setDeletingProductId(id);
    await supabase.from("produits").delete().eq("id", id);
    setProduits(prev => prev.filter(p => p.id !== id));
    setDeletingProductId(null);
  };

  /* Toggle offre */
  const toggleOffre = async (o: OffreEmploi) => {
    setTogglingId(o.id);
    const next = !o.active;
    await supabase.from("offres_emploi").update({ active: next }).eq("id", o.id);
    setOffres(prev => prev.map(x => x.id === o.id ? { ...x, active: next } : x));
    setTogglingId(null);
  };

  if (!authChecked) {
    return (
      <PageShell>
        <div className="flex justify-center items-center py-32">
          <Loader2 className="w-7 h-7 animate-spin" style={{ color: "#CE1126" }} />
        </div>
      </PageShell>
    );
  }

  /* Stats */
  const statsLogements = {
    total:    logements.length,
    publiés:  logements.filter(l => l.approuve && l.disponible).length,
    attente:  logements.filter(l => !l.approuve).length,
    inactifs: logements.filter(l => !l.disponible).length,
  };
  const statsOffres = {
    total:    offres.length,
    publiées: offres.filter(o => o.approuve && o.active).length,
    attente:  offres.filter(o => !o.approuve).length,
    inactives: offres.filter(o => !o.active).length,
  };

  return (
    <PageShell>
      <div className="max-w-4xl mx-auto">

        {/* Profil */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-bold shrink-0"
              style={{ background: "#CE1126", border: "2px solid rgba(206,17,38,0.3)" }}>
              {profile?.full_name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase()}
            </div>
            <div>
              <h1 className="font-clash text-black text-2xl leading-tight">{profile?.full_name}</h1>
              <p className="text-black text-sm">{profile?.email}</p>
              <span className="inline-block mt-1 text-[11px] text-black rounded-full px-2.5 py-0.5 border"
                style={{ background: "rgba(0,106,78,0.07)", borderColor: "rgba(0,106,78,0.2)", color: "#006A4E" }}>
                {ACCOUNT_TYPE_LABELS[profile?.type ?? "particulier"]}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/logement/proposer">
              <motion.span whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 text-white font-semibold px-4 py-2.5 rounded-full text-sm transition-all cursor-pointer"
                style={{ background: "#006A4E" }}>
                <Plus className="w-3.5 h-3.5" />
                Logement
              </motion.span>
            </Link>
            <Link href="/emplois/proposer">
              <motion.span whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 text-white font-semibold px-4 py-2.5 rounded-full text-sm transition-all cursor-pointer"
                style={{ background: "#CE1126" }}>
                <Plus className="w-3.5 h-3.5" />
                Offre d'emploi
              </motion.span>
            </Link>
            <Link href="/boutique/creer">
              <motion.span whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 text-white font-semibold px-4 py-2.5 rounded-full text-sm transition-all cursor-pointer"
                style={{ background: "#8a6d00" }}>
                <ShoppingBag className="w-3.5 h-3.5" />
                Boutique
              </motion.span>
            </Link>
          </div>
        </motion.div>

        {/* ── SECTION BOUTIQUES ── */}
        <SectionHeader icon={<ShoppingBag className="w-4 h-4" />} title="Mes boutiques" color="#8a6d00" />

        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="grid grid-cols-3 gap-3 mb-6"
        >
          {[
            { label: "Total",     value: boutiques.length,                                          color: "#000" },
            { label: "Publiées",  value: boutiques.filter(b => b.approuve && b.actif).length,       color: "#006A4E" },
            { label: "Attente",   value: boutiques.filter(b => !b.approuve).length,                 color: "#8a6d00" },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-white border border-black/[0.07] rounded-xl p-4 text-center shadow-sm">
              <p className="text-2xl font-bold" style={{ color }}>{value}</p>
              <p className="text-black text-xs mt-0.5">{label}</p>
            </div>
          ))}
        </motion.div>

        {isLoading ? <LoadingRow /> : boutiques.length === 0 ? (
          <EmptyState
            icon={<ShoppingBag className="w-6 h-6" />}
            message="Aucune boutique créée"
            sub="Ouvrez votre première boutique artisanale."
            link="/boutique/creer"
            linkLabel="Créer une boutique"
            color="#8a6d00"
          />
        ) : (
          <div className="space-y-6 mb-14">
            {boutiques.map((b, i) => {
              const st              = !b.actif ? "inactive" : !b.approuve ? "pending" : "approved";
              const s               = STATUS_STYLE[st];
              const boutiqueProducts = produits.filter(p => p.boutique_id === b.id);
              const PREVIEW         = 3;
              const showAll         = !!showAllProducts[b.id];
              const visible         = showAll ? boutiqueProducts : boutiqueProducts.slice(0, PREVIEW);
              const remaining       = boutiqueProducts.length - PREVIEW;

              return (
                <motion.div
                  key={b.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="bg-white border border-black/[0.07] rounded-2xl shadow-sm overflow-hidden"
                >
                  {/* ── En-tête boutique ── */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 border-b border-black/[0.05]">
                    {/* Miniature */}
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 shrink-0 flex items-center justify-center">
                      {b.image_couverture
                        ? <img src={b.image_couverture} alt={b.nom} className="w-full h-full object-cover" />
                        : <ShoppingBag className="w-6 h-6 text-black/20" />}
                    </div>

                    {/* Infos */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <Link href={`/boutique/${b.slug}`}
                          className="font-clash font-bold text-black text-base truncate hover:underline">
                          {b.nom}
                        </Link>
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full border"
                          style={{ color: s.color, background: s.bg, borderColor: s.border }}>
                          {s.icon}{s.label}
                        </span>
                      </div>
                      <p className="text-black/40 text-xs">{CATEGORIE_BOUTIQUE_LABELS[b.categorie]} · {b.localite}</p>
                    </div>

                    {/* Actions boutique */}
                    <div className="flex items-center gap-2 shrink-0">
                      <Link href={`/boutique/${b.slug}/modifier`} title="Modifier la boutique"
                        className="p-2 rounded-lg transition-all text-black/30 hover:text-black/70 hover:bg-black/[0.05]">
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <button onClick={() => toggleBoutique(b)} disabled={togglingId === b.id}
                        title={b.actif ? "Désactiver" : "Activer"}
                        className="p-2 rounded-lg transition-all disabled:opacity-40 text-black/30 hover:text-black/70 hover:bg-black/[0.05]">
                        {togglingId === b.id ? <Loader2 className="w-4 h-4 animate-spin" /> : b.actif ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                      <button onClick={() => deleteBoutique(b.id)} disabled={deletingId === b.id}
                        title="Supprimer la boutique"
                        className="p-2 rounded-lg transition-all disabled:opacity-40 text-black/30 hover:text-red-500 hover:bg-red-50">
                        {deletingId === b.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* ── Section produits ── */}
                  <div className="p-5">
                    {/* Header produits */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-black/30" />
                        <span className="text-sm font-semibold text-black">
                          Produits
                          {boutiqueProducts.length > 0 && (
                            <span className="ml-1.5 text-xs font-normal text-black/40">
                              ({boutiqueProducts.length})
                            </span>
                          )}
                        </span>
                      </div>
                      <Link href={`/boutique/${b.slug}/ajouter`}
                        className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg text-white transition-opacity hover:opacity-80"
                        style={{ background: "#006A4E" }}>
                        <Plus className="w-3.5 h-3.5" />
                        Ajouter un produit
                      </Link>
                    </div>

                    {/* Liste produits */}
                    {boutiqueProducts.length === 0 ? (
                      <div className="flex flex-col items-center py-10 gap-3 rounded-xl border border-dashed border-black/[0.1] bg-black/[0.01]">
                        <Package className="w-8 h-8 text-black/15" />
                        <div className="text-center">
                          <p className="text-black/50 text-sm font-medium">Aucun produit encore</p>
                          <p className="text-black/30 text-xs mt-0.5">Ajoutez votre première création à cette boutique.</p>
                        </div>
                        <Link href={`/boutique/${b.slug}/ajouter`}
                          className="text-xs font-medium px-4 py-2 rounded-full text-white mt-1"
                          style={{ background: "#006A4E" }}>
                          + Ajouter un produit
                        </Link>
                      </div>
                    ) : (
                      <>
                        <div className="divide-y divide-black/[0.04]">
                          {visible.map(p => (
                            <div key={p.id}
                              className="flex items-center gap-3 py-3 first:pt-0 hover:bg-black/[0.01] -mx-1 px-1 rounded-lg transition-colors">
                              {/* Miniature */}
                              <div className="w-11 h-11 rounded-lg overflow-hidden bg-gray-100 shrink-0 flex items-center justify-center">
                                {p.images?.[0]
                                  ? <img src={p.images[0]} alt={p.nom} className="w-full h-full object-cover" />
                                  : <Package className="w-4 h-4 text-black/20" />}
                              </div>

                              {/* Infos */}
                              <div className="flex-1 min-w-0">
                                <p className="text-black text-sm font-medium truncate">{p.nom}</p>
                                <div className="flex items-center gap-2 mt-0.5">
                                  <span className="text-black/40 text-xs">
                                    {p.prix ? `${p.prix.toLocaleString("fr-FR")} FCFA` : "Prix non défini"}
                                  </span>
                                  <span className="inline-flex items-center text-[10px] font-medium px-1.5 py-0.5 rounded-full"
                                    style={p.disponible
                                      ? { color: "#006A4E", background: "rgba(0,106,78,0.08)" }
                                      : { color: "#999", background: "rgba(0,0,0,0.05)" }}>
                                    {p.disponible ? "Disponible" : "Épuisé"}
                                  </span>
                                </div>
                              </div>

                              {/* Actions produit */}
                              <div className="flex items-center gap-1 shrink-0">
                                <Link href={`/boutique/${b.slug}/produit/${p.id}/modifier`}
                                  title="Modifier"
                                  className="p-2 rounded-lg transition-all text-black/25 hover:text-black/70 hover:bg-black/[0.05]">
                                  <Pencil className="w-3.5 h-3.5" />
                                </Link>
                                <button onClick={() => deleteProduct(p.id)}
                                  disabled={deletingProductId === p.id}
                                  title="Supprimer"
                                  className="p-2 rounded-lg transition-all disabled:opacity-40 text-black/25 hover:text-red-500 hover:bg-red-50">
                                  {deletingProductId === p.id
                                    ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                    : <Trash2 className="w-3.5 h-3.5" />}
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Voir plus / Voir moins */}
                        {boutiqueProducts.length > PREVIEW && (
                          <button
                            onClick={() => setShowAllProducts(prev => ({ ...prev, [b.id]: !showAll }))}
                            className="mt-3 w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-medium transition-colors border border-black/[0.07] hover:border-black/20 text-black/50 hover:text-black"
                          >
                            {showAll
                              ? <><ChevronUp className="w-3.5 h-3.5" /> Voir moins</>
                              : <><ChevronDown className="w-3.5 h-3.5" /> Voir {remaining} produit{remaining > 1 ? "s" : ""} de plus</>}
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* ── SECTION LOGEMENTS ── */}
        <SectionHeader icon={<BedDouble className="w-4 h-4" />} title="Mes logements" color="#006A4E" />

        {/* Stats logements */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="grid grid-cols-4 gap-3 mb-6"
        >
          {[
            { label: "Total",      value: statsLogements.total,    color: "#000" },
            { label: "Publiés",    value: statsLogements.publiés,  color: "#006A4E" },
            { label: "Attente",    value: statsLogements.attente,  color: "#8a6d00" },
            { label: "Désactivés", value: statsLogements.inactifs, color: "#999" },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-white border border-black/[0.07] rounded-xl p-4 text-center shadow-sm">
              <p className="text-2xl font-bold" style={{ color }}>{value}</p>
              <p className="text-black text-xs mt-0.5">{label}</p>
            </div>
          ))}
        </motion.div>

        {/* Liste logements */}
        {isLoading ? (
          <LoadingRow />
        ) : logements.length === 0 ? (
          <EmptyState
            icon={<BedDouble className="w-6 h-6" />}
            message="Aucun logement publié"
            sub="Commencez par ajouter votre premier bien."
            link="/logement/proposer"
            linkLabel="Proposer un logement"
            color="#006A4E"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-14">
            {logements.map((l, i) => {
              const st = logementStatus(l);
              const s  = STATUS_STYLE[st];
              return (
                <PublicationCard
                  key={l.id}
                  index={i}
                  accentColor="#006A4E"
                  title={l.titre}
                  statusStyle={s}
                  active={l.disponible}
                  thumbnail={l.images?.[0]}
                  thumbnailFallback={<BedDouble className="w-7 h-7" style={{ color: "#006A4E" }} />}
                  thumbnailBg="rgba(0,106,78,0.06)"
                  chips={[
                    TYPE_LABELS[l.type],
                    l.adresse || l.ville,
                    ...(l.prix_par_nuit ? [`${l.prix_par_nuit.toLocaleString("fr-FR")} FCFA/nuit`] : []),
                  ]}
                  date={l.created_at}
                  editLink={`/logement/${l.id}/modifier`}
                  isToggling={togglingId === l.id}
                  isDeleting={deletingId === l.id}
                  onToggle={() => toggleLogement(l)}
                  onDelete={() => deleteLogement(l.id)}
                />
              );
            })}
          </div>
        )}

        {/* ── SECTION EMPLOIS ── */}
        <SectionHeader icon={<Briefcase className="w-4 h-4" />} title="Mes offres d'emploi" color="#CE1126" />

        {/* Stats offres */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="grid grid-cols-4 gap-3 mb-6"
        >
          {[
            { label: "Total",      value: statsOffres.total,     color: "#000" },
            { label: "Publiées",   value: statsOffres.publiées,  color: "#006A4E" },
            { label: "Attente",    value: statsOffres.attente,   color: "#8a6d00" },
            { label: "Désactivées",value: statsOffres.inactives, color: "#999" },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-white border border-black/[0.07] rounded-xl p-4 text-center shadow-sm">
              <p className="text-2xl font-bold" style={{ color }}>{value}</p>
              <p className="text-black text-xs mt-0.5">{label}</p>
            </div>
          ))}
        </motion.div>

        {/* Liste offres */}
        {isLoading ? (
          <LoadingRow />
        ) : offres.length === 0 ? (
          <EmptyState
            icon={<Briefcase className="w-6 h-6" />}
            message="Aucune offre publiée"
            sub="Publiez votre première offre d'emploi."
            link="/emplois/proposer"
            linkLabel="Publier une offre"
            color="#CE1126"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {offres.map((o, i) => {
              const st = emploiStatus(o);
              const s  = STATUS_STYLE[st];
              return (
                <PublicationCard
                  key={o.id}
                  index={i}
                  accentColor="#CE1126"
                  title={o.titre}
                  statusStyle={s}
                  active={o.active}
                  thumbnailFallback={<Briefcase className="w-7 h-7" style={{ color: "#CE1126" }} />}
                  thumbnailBg="rgba(206,17,38,0.06)"
                  chips={[
                    CONTRAT_LABELS[o.type_contrat],
                    DOMAINE_LABELS[o.domaine],
                    o.lieu,
                  ]}
                  date={o.created_at}
                  editLink={`/emplois/${o.id}/modifier`}
                  isToggling={togglingId === o.id}
                  isDeleting={deletingId === o.id}
                  onToggle={() => toggleOffre(o)}
                  onDelete={() => deleteOffre(o.id)}
                />
              );
            })}
          </div>
        )}

      </div>
    </PageShell>
  );
}

/* ─── Sub-components ─────────────────────────────────────────── */

function SectionHeader({ icon, title, color }: { icon: React.ReactNode; title: string; color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-center gap-2.5 mb-5"
    >
      <span style={{ color }}>{icon}</span>
      <h2 className="font-clash font-bold text-black text-xl">{title}</h2>
      <div className="flex-1 h-px ml-2" style={{ background: `linear-gradient(to right, ${color}30, transparent)` }} />
    </motion.div>
  );
}

function LoadingRow() {
  return (
    <div className="flex justify-center py-14">
      <Loader2 className="w-6 h-6 animate-spin" style={{ color: "#CE1126" }} />
    </div>
  );
}

function EmptyState({ icon, message, sub, link, linkLabel, color }: {
  icon: React.ReactNode; message: string; sub: string;
  link: string; linkLabel: string; color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="flex flex-col items-center text-center py-16 gap-4 bg-white border border-black/[0.07] rounded-2xl mb-14"
    >
      <div className="w-14 h-14 rounded-full flex items-center justify-center"
        style={{ background: `${color}10`, border: `1px solid ${color}20` }}>
        <span style={{ color }}>{icon}</span>
      </div>
      <div>
        <p className="text-black text-sm font-medium">{message}</p>
        <p className="text-black text-xs mt-1">{sub}</p>
      </div>
      <Link href={link}>
        <span className="text-sm font-medium cursor-pointer" style={{ color }}>{linkLabel}</span>
      </Link>
    </motion.div>
  );
}

function PublicationCard({
  index, title, statusStyle, active, thumbnail, thumbnailFallback, thumbnailBg,
  accentColor, chips, date, editLink, isToggling, isDeleting, onToggle, onDelete,
}: {
  index: number;
  title: string;
  statusStyle: typeof STATUS_STYLE["approved"];
  active: boolean;
  thumbnail?: string;
  thumbnailFallback: React.ReactNode;
  thumbnailBg?: string;
  accentColor: string;
  chips: string[];
  date: string;
  editLink?: string;
  isToggling: boolean;
  isDeleting: boolean;
  onToggle: () => void;
  onDelete: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="bg-white border border-black/[0.07] rounded-2xl shadow-sm overflow-hidden flex flex-col"
    >
      {/* Bande accent couleur */}
      <div className="h-1 shrink-0" style={{ background: accentColor }} />

      <div className="p-5 flex-1 flex flex-col gap-4">

        {/* Haut : miniature + titre + badge */}
        <div className="flex gap-4">
          {/* Miniature */}
          <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 flex items-center justify-center"
            style={{ background: thumbnail ? undefined : thumbnailBg ?? "rgba(0,0,0,0.04)" }}>
            {thumbnail
              ? <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
              : thumbnailFallback}
          </div>

          {/* Titre + badge + chips */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-2 flex-wrap mb-2">
              <h3 className="font-clash font-bold text-black text-sm leading-snug">{title}</h3>
              <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full border shrink-0"
                style={{ color: statusStyle.color, background: statusStyle.bg, borderColor: statusStyle.border }}>
                {statusStyle.icon}{statusStyle.label}
              </span>
            </div>
            {/* Chips détails */}
            <div className="flex flex-wrap gap-1.5">
              {chips.map((chip, ci) => (
                <span key={ci} className="text-[11px] text-black/50 bg-black/[0.04] px-2 py-0.5 rounded-full">
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Date */}
        <p className="text-[11px] text-black/30">
          Soumis le {new Date(date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-3 border-t border-black/[0.05]">
          {editLink && (
            <Link href={editLink}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-all border border-black/[0.08] text-black/60 hover:border-black/20 hover:text-black">
              <Pencil className="w-3.5 h-3.5" />
              Modifier
            </Link>
          )}
          <button onClick={onToggle} disabled={isToggling}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-all border border-black/[0.08] text-black/60 hover:border-black/20 hover:text-black disabled:opacity-40">
            {isToggling
              ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
              : active
                ? <><EyeOff className="w-3.5 h-3.5" /> Désactiver</>
                : <><Eye className="w-3.5 h-3.5" /> Activer</>}
          </button>
          <button onClick={onDelete} disabled={isDeleting}
            className="p-2 rounded-xl transition-all border border-black/[0.08] text-black/30 hover:border-red-200 hover:text-red-500 hover:bg-red-50 disabled:opacity-40">
            {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
          </button>
        </div>

      </div>
    </motion.div>
  );
}

/* ─── Shell ─────────────────────────────────────────────────── */
function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 font-poppins">
      <Navbar />
      <main className="flex-grow pt-24 pb-20 px-4">
        {children}
      </main>
      <Footer />
    </div>
  );
}
