"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, BedDouble, Briefcase, Clock, CheckCircle2,
  XCircle, Loader2, Eye, EyeOff, ChevronDown, ChevronUp,
  ShieldCheck, LogOut, ShoppingBag,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { supabase } from "../lib/supabase";
import { TYPE_LABELS } from "../types/logement";
import type { Logement } from "../types/logement";
import type { OffreEmploi } from "../types/emploi";
import type { Boutique } from "../types/boutique";
import { CATEGORIE_BOUTIQUE_LABELS } from "../types/boutique";

/* ─── Constantes ───────────────────────────────────────────────── */

const ADMIN_EMAIL = "em.djatika@gmail.com";

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
  particulier: "Particulier", agence: "Agence",
  hotel: "Hôtel", auberge: "Auberge",
};

type Tab = "overview" | "users" | "logements" | "offres" | "boutiques";
type LogementFilter  = "tous" | "pending" | "approved";
type OffreFilter     = "tous" | "pending" | "approved";
type BoutiqueFilter  = "tous" | "pending" | "approved";

interface Profile {
  id: string;
  full_name: string;
  email: string;
  type: string;
  created_at: string;
}

/* ─── Page ──────────────────────────────────────────────────────── */

export default function AdminPage() {
  const router = useRouter();

  const [authChecked, setAuthChecked] = useState(false);
  const [isAdmin, setIsAdmin]         = useState(false);

  const [tab, setTab]                         = useState<Tab>("overview");
  const [logFilter, setLogFilter]             = useState<LogementFilter>("tous");
  const [offFilter, setOffFilter]             = useState<OffreFilter>("tous");
  const [boutFilter, setBoutFilter]           = useState<BoutiqueFilter>("tous");

  const [profiles,  setProfiles]  = useState<Profile[]>([]);
  const [logements, setLogements] = useState<Logement[]>([]);
  const [offres,    setOffres]    = useState<OffreEmploi[]>([]);
  const [boutiques, setBoutiques] = useState<Boutique[]>([]);
  const [loading,   setLoading]   = useState(true);

  const [actionId, setActionId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  /* ── Auth guard ── */
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const email = data.session?.user?.email;
      if (!email || email !== ADMIN_EMAIL) {
        router.replace("/");
        return;
      }
      setIsAdmin(true);
      setAuthChecked(true);
    });
  }, [router]);

  /* ── Fetch data ── */
  const fetchAll = useCallback(async () => {
    setLoading(true);
    const [{ data: profs }, { data: logs }, { data: offs }, { data: bouts }] = await Promise.all([
      supabase.from("profiles").select("*").order("created_at", { ascending: false }),
      supabase.from("logements").select("*").order("created_at", { ascending: false }),
      supabase.from("offres_emploi").select("*").order("created_at", { ascending: false }),
      supabase.from("boutiques").select("*").order("created_at", { ascending: false }),
    ]);
    setProfiles((profs as Profile[]) ?? []);
    setLogements((logs as Logement[]) ?? []);
    setOffres((offs as OffreEmploi[]) ?? []);
    setBoutiques((bouts as Boutique[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { if (authChecked) fetchAll(); }, [authChecked, fetchAll]);

  /* ── Actions logements ── */
  const approveLogement = async (id: string) => {
    setActionId(id);
    await supabase.from("logements").update({ approuve: true, disponible: true }).eq("id", id);
    setLogements(prev => prev.map(l => l.id === id ? { ...l, approuve: true, disponible: true } : l));
    setActionId(null);
  };
  const rejectLogement = async (id: string) => {
    setActionId(id);
    await supabase.from("logements").update({ approuve: false, disponible: false }).eq("id", id);
    setLogements(prev => prev.map(l => l.id === id ? { ...l, approuve: false, disponible: false } : l));
    setActionId(null);
  };
  const deleteLogement = async (id: string) => {
    if (!confirm("Supprimer définitivement ce logement ?")) return;
    setActionId(id);
    await supabase.from("logements").delete().eq("id", id);
    setLogements(prev => prev.filter(l => l.id !== id));
    setActionId(null);
  };

  /* ── Actions boutiques ── */
  const approveBoutique = async (id: string) => {
    setActionId(id);
    await supabase.from("boutiques").update({ approuve: true, actif: true }).eq("id", id);
    setBoutiques(prev => prev.map(b => b.id === id ? { ...b, approuve: true, actif: true } : b));
    setActionId(null);
  };
  const rejectBoutique = async (id: string) => {
    setActionId(id);
    await supabase.from("boutiques").update({ approuve: false, actif: false }).eq("id", id);
    setBoutiques(prev => prev.map(b => b.id === id ? { ...b, approuve: false, actif: false } : b));
    setActionId(null);
  };
  const deleteBoutique = async (id: string) => {
    if (!confirm("Supprimer définitivement cette boutique ?")) return;
    setActionId(id);
    await supabase.from("boutiques").delete().eq("id", id);
    setBoutiques(prev => prev.filter(b => b.id !== id));
    setActionId(null);
  };

  /* ── Actions offres ── */
  const approveOffre = async (id: string) => {
    setActionId(id);
    await supabase.from("offres_emploi").update({ approuve: true, active: true }).eq("id", id);
    setOffres(prev => prev.map(o => o.id === id ? { ...o, approuve: true, active: true } : o));
    setActionId(null);
  };
  const rejectOffre = async (id: string) => {
    setActionId(id);
    await supabase.from("offres_emploi").update({ approuve: false, active: false }).eq("id", id);
    setOffres(prev => prev.map(o => o.id === id ? { ...o, approuve: false, active: false } : o));
    setActionId(null);
  };
  const deleteOffre = async (id: string) => {
    if (!confirm("Supprimer définitivement cette offre ?")) return;
    setActionId(id);
    await supabase.from("offres_emploi").delete().eq("id", id);
    setOffres(prev => prev.filter(o => o.id !== id));
    setActionId(null);
  };

  /* ── Loading / guard ── */
  if (!authChecked || !isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <Loader2 className="w-7 h-7 animate-spin" style={{ color: "#CE1126" }} />
      </div>
    );
  }

  /* ── Stats ── */
  const pendingLogements = logements.filter(l => !l.approuve);
  const pendingOffres    = offres.filter(o => !o.approuve);
  const pendingBoutiques = boutiques.filter(b => !b.approuve);
  const totalPending     = pendingLogements.length + pendingOffres.length + pendingBoutiques.length;

  const filteredLogements = logFilter === "tous"   ? logements
                          : logFilter === "pending" ? logements.filter(l => !l.approuve)
                          : logements.filter(l => l.approuve);

  const filteredOffres = offFilter === "tous"   ? offres
                       : offFilter === "pending" ? offres.filter(o => !o.approuve)
                       : offres.filter(o => o.approuve);

  const filteredBoutiques = boutFilter === "tous"   ? boutiques
                          : boutFilter === "pending" ? boutiques.filter(b => !b.approuve)
                          : boutiques.filter(b => b.approuve);

  const TABS: { id: Tab; label: string; badge?: number }[] = [
    { id: "overview",  label: "Vue d'ensemble" },
    { id: "users",     label: "Comptes",   badge: profiles.length },
    { id: "logements", label: "Logements", badge: pendingLogements.length || undefined },
    { id: "offres",    label: "Offres",    badge: pendingOffres.length || undefined },
    { id: "boutiques", label: "Boutiques", badge: pendingBoutiques.length || undefined },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 font-poppins">
      <Navbar />

      <main className="flex-grow pt-24 pb-20 px-4">
        <div className="max-w-5xl mx-auto">

          {/* ── Header admin ── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between mb-10"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(206,17,38,0.08)", border: "1px solid rgba(206,17,38,0.2)" }}>
                <ShieldCheck className="w-5 h-5" style={{ color: "#CE1126" }} />
              </div>
              <div>
                <h1 className="font-clash text-2xl text-black leading-tight">Administration</h1>
                <p className="text-black/40 text-xs">{ADMIN_EMAIL}</p>
              </div>
            </div>
            <button
              onClick={() => { supabase.auth.signOut(); router.push("/"); }}
              className="flex items-center gap-2 text-sm text-black/40 hover:text-black transition-colors duration-200"
            >
              <LogOut className="w-4 h-4" />
              Déconnexion
            </button>
          </motion.div>

          {/* ── Tabs ── */}
          <div className="flex gap-1 mb-8 bg-white border border-black/[0.07] p-1 rounded-xl w-fit shadow-sm">
            {TABS.map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className="relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                style={{
                  background: tab === t.id ? "#006A4E" : "transparent",
                  color: tab === t.id ? "white" : "rgba(0,0,0,0.5)",
                }}
              >
                {t.label}
                {t.badge !== undefined && t.badge > 0 && (
                  <span className="flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold"
                    style={{ background: tab === t.id ? "rgba(255,255,255,0.25)" : "#CE1126", color: "white" }}>
                    {t.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">

            {/* ══ VUE D'ENSEMBLE ══ */}
            {tab === "overview" && (
              <motion.div key="overview"
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}
              >
                {/* Stat cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                  {[
                    { label: "Comptes créés",  value: profiles.length,  color: "#006A4E", icon: <Users className="w-5 h-5" /> },
                    { label: "Logements",      value: logements.length, color: "#006A4E", icon: <BedDouble className="w-5 h-5" /> },
                    { label: "Offres d'emploi",value: offres.length,    color: "#CE1126", icon: <Briefcase className="w-5 h-5" /> },
                    { label: "Boutiques",      value: boutiques.length, color: "#8a6d00", icon: <ShoppingBag className="w-5 h-5" /> },
                    { label: "En attente",     value: totalPending,     color: "#CE1126", icon: <Clock className="w-5 h-5" /> },
                  ].map(({ label, value, color, icon }) => (
                    <div key={label} className="bg-white border border-black/[0.07] rounded-2xl p-5 shadow-sm">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                        style={{ background: `${color}10`, color }}>
                        {icon}
                      </div>
                      <p className="text-3xl font-bold text-black mb-1">{loading ? "—" : value}</p>
                      <p className="text-black/40 text-xs">{label}</p>
                    </div>
                  ))}
                </div>

                {/* En attente d'approbation */}
                {totalPending > 0 && (
                  <div>
                    <h2 className="font-clash text-xl text-black mb-4">
                      En attente d'approbation{" "}
                      <span className="text-base font-normal text-black/40">({totalPending})</span>
                    </h2>

                    <div className="space-y-3">
                      {pendingLogements.map((l, i) => (
                        <PendingRow
                          key={l.id}
                          index={i}
                          title={l.titre}
                          meta={`Logement · ${TYPE_LABELS[l.type]} · ${l.ville}`}
                          date={l.created_at}
                          image={l.images?.[0]}
                          icon={<BedDouble className="w-4 h-4" />}
                          color="#006A4E"
                          isLoading={actionId === l.id}
                          onApprove={() => approveLogement(l.id)}
                          onReject={() => rejectLogement(l.id)}
                        />
                      ))}
                      {pendingOffres.map((o, i) => (
                        <PendingRow
                          key={o.id}
                          index={i + pendingLogements.length}
                          title={o.titre}
                          meta={`Offre · ${CONTRAT_LABELS[o.type_contrat]} · ${DOMAINE_LABELS[o.domaine]} · ${o.lieu}`}
                          date={o.created_at}
                          icon={<Briefcase className="w-4 h-4" />}
                          color="#CE1126"
                          isLoading={actionId === o.id}
                          onApprove={() => approveOffre(o.id)}
                          onReject={() => rejectOffre(o.id)}
                        />
                      ))}
                      {pendingBoutiques.map((b, i) => (
                        <PendingRow
                          key={b.id}
                          index={i + pendingLogements.length + pendingOffres.length}
                          title={b.nom}
                          meta={`Boutique · ${CATEGORIE_BOUTIQUE_LABELS[b.categorie]} · ${b.localite}`}
                          date={b.created_at}
                          image={b.image_couverture ?? undefined}
                          icon={<ShoppingBag className="w-4 h-4" />}
                          color="#8a6d00"
                          isLoading={actionId === b.id}
                          onApprove={() => approveBoutique(b.id)}
                          onReject={() => rejectBoutique(b.id)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {totalPending === 0 && !loading && (
                  <div className="flex flex-col items-center py-16 gap-3 bg-white border border-black/[0.07] rounded-2xl">
                    <CheckCircle2 className="w-10 h-10" style={{ color: "#006A4E" }} />
                    <p className="text-black/50 text-sm">Tout est à jour — aucune publication en attente.</p>
                  </div>
                )}
              </motion.div>
            )}

            {/* ══ COMPTES ══ */}
            {tab === "users" && (
              <motion.div key="users"
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}
              >
                <h2 className="font-clash text-xl text-black mb-5">
                  Comptes utilisateurs <span className="text-base font-normal text-black/40">({profiles.length})</span>
                </h2>

                {loading ? <Spinner /> : (
                  <div className="bg-white border border-black/[0.07] rounded-2xl overflow-hidden shadow-sm">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-black/[0.06]" style={{ background: "rgba(0,0,0,0.02)" }}>
                          <th className="text-left px-5 py-3 text-black/40 font-medium text-xs uppercase">Nom</th>
                          <th className="text-left px-5 py-3 text-black/40 font-medium text-xs uppercase">Email</th>
                          <th className="text-left px-5 py-3 text-black/40 font-medium text-xs uppercase hidden md:table-cell">Type</th>
                          <th className="text-left px-5 py-3 text-black/40 font-medium text-xs uppercase hidden md:table-cell">Inscrit le</th>
                        </tr>
                      </thead>
                      <tbody>
                        {profiles.map((p, i) => (
                          <tr key={p.id}
                            className="border-b border-black/[0.04] last:border-0 hover:bg-black/[0.015] transition-colors"
                          >
                            <td className="px-5 py-3.5">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                                  style={{ background: i % 2 === 0 ? "#006A4E" : "#CE1126" }}>
                                  {p.full_name?.split(" ").map((w: string) => w[0]).slice(0, 2).join("").toUpperCase() || "?"}
                                </div>
                                <span className="font-medium text-black text-sm">{p.full_name || "—"}</span>
                              </div>
                            </td>
                            <td className="px-5 py-3.5 text-black/60 text-sm">{p.email}</td>
                            <td className="px-5 py-3.5 hidden md:table-cell">
                              <span className="inline-block text-[11px] font-medium px-2.5 py-0.5 rounded-full"
                                style={{ background: "rgba(0,106,78,0.07)", color: "#006A4E", border: "1px solid rgba(0,106,78,0.18)" }}>
                                {ACCOUNT_TYPE_LABELS[p.type] ?? p.type}
                              </span>
                            </td>
                            <td className="px-5 py-3.5 text-black/40 text-xs hidden md:table-cell">
                              {new Date(p.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" })}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {profiles.length === 0 && (
                      <p className="text-center text-black/40 text-sm py-12">Aucun compte enregistré.</p>
                    )}
                  </div>
                )}
              </motion.div>
            )}

            {/* ══ LOGEMENTS ══ */}
            {tab === "logements" && (
              <motion.div key="logements"
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
                  <h2 className="font-clash text-xl text-black">
                    Logements <span className="text-base font-normal text-black/40">({filteredLogements.length})</span>
                  </h2>
                  <FilterTabs
                    value={logFilter}
                    onChange={(v) => setLogFilter(v as LogementFilter)}
                    counts={{ tous: logements.length, pending: pendingLogements.length, approved: logements.filter(l => l.approuve).length }}
                  />
                </div>

                {loading ? <Spinner /> : (
                  <div className="space-y-3">
                    {filteredLogements.map((l, i) => (
                      <AdminRow
                        key={l.id}
                        index={i}
                        title={l.titre}
                        meta={`${TYPE_LABELS[l.type]} · ${l.adresse || l.ville}${l.prix_par_nuit ? ` · ${l.prix_par_nuit.toLocaleString("fr-FR")} FCFA/nuit` : ""}`}
                        date={l.created_at}
                        approved={l.approuve}
                        active={l.disponible}
                        image={l.images?.[0]}
                        images={l.images ?? []}
                        icon={<BedDouble className="w-4 h-4" />}
                        color="#006A4E"
                        isLoading={actionId === l.id}
                        expanded={expandedId === l.id}
                        onExpand={() => setExpandedId(expandedId === l.id ? null : l.id)}
                        onApprove={() => approveLogement(l.id)}
                        onReject={() => rejectLogement(l.id)}
                        onDelete={() => deleteLogement(l.id)}
                        details={[
                          { label: "Type",        value: TYPE_LABELS[l.type] },
                          { label: "Capacité",    value: `${l.capacite} pers.` },
                          { label: "Adresse",     value: l.adresse || l.ville },
                          { label: "Prix / nuit", value: l.prix_par_nuit ? `${l.prix_par_nuit.toLocaleString("fr-FR")} FCFA` : "Non renseigné" },
                          { label: "Contact réel (privé)", value: `${l.contact_nom} · ${l.contact_telephone}${l.contact_email ? ` · ${l.contact_email}` : ""}` },
                          ...(l.description ? [{ label: "Description", value: l.description }] : []),
                        ]}
                      />
                    ))}
                    {filteredLogements.length === 0 && (
                      <EmptyAdmin message="Aucun logement dans cette catégorie." />
                    )}
                  </div>
                )}
              </motion.div>
            )}

            {/* ══ OFFRES ══ */}
            {tab === "offres" && (
              <motion.div key="offres"
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
                  <h2 className="font-clash text-xl text-black">
                    Offres d'emploi <span className="text-base font-normal text-black/40">({filteredOffres.length})</span>
                  </h2>
                  <FilterTabs
                    value={offFilter}
                    onChange={(v) => setOffFilter(v as OffreFilter)}
                    counts={{ tous: offres.length, pending: pendingOffres.length, approved: offres.filter(o => o.approuve).length }}
                  />
                </div>

                {loading ? <Spinner /> : (
                  <div className="space-y-3">
                    {filteredOffres.map((o, i) => (
                      <AdminRow
                        key={o.id}
                        index={i}
                        title={o.titre}
                        meta={`${CONTRAT_LABELS[o.type_contrat]} · ${DOMAINE_LABELS[o.domaine]} · ${o.lieu}`}
                        date={o.created_at}
                        approved={o.approuve}
                        active={o.active}
                        icon={<Briefcase className="w-4 h-4" />}
                        color="#CE1126"
                        isLoading={actionId === o.id}
                        expanded={expandedId === o.id}
                        onExpand={() => setExpandedId(expandedId === o.id ? null : o.id)}
                        onApprove={() => approveOffre(o.id)}
                        onReject={() => rejectOffre(o.id)}
                        onDelete={() => deleteOffre(o.id)}
                        details={[
                          { label: "Type de mission",  value: CONTRAT_LABELS[o.type_contrat] },
                          { label: "Domaine",          value: DOMAINE_LABELS[o.domaine] },
                          { label: "Lieu",             value: o.lieu },
                          ...(o.date_debut ? [{ label: "Période", value: `${o.date_debut}${o.date_fin ? ` → ${o.date_fin}` : ""}` }] : []),
                          ...(o.salaire    ? [{ label: "Rémunération", value: o.salaire }] : []),
                          ...(o.competences?.length ? [{ label: "Compétences", value: o.competences.join(", ") }] : []),
                          { label: "Contact réel (privé)", value: `${o.contact_nom} · ${o.contact_telephone}${o.contact_email ? ` · ${o.contact_email}` : ""}` },
                          ...(o.description ? [{ label: "Description", value: o.description }] : []),
                        ]}
                      />
                    ))}
                    {filteredOffres.length === 0 && (
                      <EmptyAdmin message="Aucune offre dans cette catégorie." />
                    )}
                  </div>
                )}
              </motion.div>
            )}

            {/* ══ BOUTIQUES ══ */}
            {tab === "boutiques" && (
              <motion.div key="boutiques"
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
                  <h2 className="font-clash text-xl text-black">
                    Boutiques <span className="text-base font-normal text-black/40">({filteredBoutiques.length})</span>
                  </h2>
                  <FilterTabs
                    value={boutFilter}
                    onChange={(v) => setBoutFilter(v as BoutiqueFilter)}
                    counts={{ tous: boutiques.length, pending: pendingBoutiques.length, approved: boutiques.filter(b => b.approuve).length }}
                  />
                </div>

                {loading ? <Spinner /> : (
                  <div className="space-y-3">
                    {filteredBoutiques.map((b, i) => (
                      <AdminRow
                        key={b.id}
                        index={i}
                        title={b.nom}
                        meta={`${CATEGORIE_BOUTIQUE_LABELS[b.categorie]} · ${b.localite}`}
                        date={b.created_at}
                        approved={b.approuve}
                        active={b.actif}
                        image={b.image_couverture ?? undefined}
                        images={b.image_couverture ? [b.image_couverture] : []}
                        icon={<ShoppingBag className="w-4 h-4" />}
                        color="#8a6d00"
                        link={`/boutique/${b.slug}`}
                        isLoading={actionId === b.id}
                        expanded={expandedId === b.id}
                        onExpand={() => setExpandedId(expandedId === b.id ? null : b.id)}
                        onApprove={() => approveBoutique(b.id)}
                        onReject={() => rejectBoutique(b.id)}
                        onDelete={() => deleteBoutique(b.id)}
                        details={[
                          { label: "Catégorie",  value: CATEGORIE_BOUTIQUE_LABELS[b.categorie] },
                          { label: "Localité",   value: b.localite },
                          ...(b.description ? [{ label: "Description", value: b.description }] : []),
                        ]}
                      />
                    ))}
                    {filteredBoutiques.length === 0 && (
                      <EmptyAdmin message="Aucune boutique dans cette catégorie." />
                    )}
                  </div>
                )}
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
}

/* ─── Sub-components ────────────────────────────────────────────── */

function Spinner() {
  return (
    <div className="flex justify-center py-16">
      <Loader2 className="w-6 h-6 animate-spin" style={{ color: "#006A4E" }} />
    </div>
  );
}

function EmptyAdmin({ message }: { message: string }) {
  return (
    <div className="flex items-center justify-center py-16 bg-white border border-black/[0.07] rounded-2xl">
      <p className="text-black/40 text-sm">{message}</p>
    </div>
  );
}

function FilterTabs({ value, onChange, counts }: {
  value: string;
  onChange: (v: string) => void;
  counts: { tous: number; pending: number; approved: number };
}) {
  return (
    <div className="flex gap-1 bg-white border border-black/[0.07] p-1 rounded-lg">
      {[
        { id: "tous",    label: `Tous (${counts.tous})` },
        { id: "pending", label: `En attente (${counts.pending})`, color: "#8a6d00" },
        { id: "approved",label: `Approuvés (${counts.approved})`, color: "#006A4E" },
      ].map(f => (
        <button key={f.id} onClick={() => onChange(f.id)}
          className="px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200"
          style={{
            background: value === f.id ? (f.color ?? "#000") : "transparent",
            color: value === f.id ? "white" : "rgba(0,0,0,0.45)",
          }}>
          {f.label}
        </button>
      ))}
    </div>
  );
}

function PendingRow({ index, title, meta, date, image, icon, color, isLoading, onApprove, onReject }: {
  index: number; title: string; meta: string; date: string;
  image?: string; icon: React.ReactNode; color: string;
  isLoading: boolean; onApprove: () => void; onReject: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className="flex flex-col sm:flex-row sm:items-center gap-4 bg-white border border-black/[0.07] rounded-xl p-4 shadow-sm"
      style={{ borderLeft: `3px solid ${color}` }}
    >
      {image && (
        <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-gray-100">
          <img src={image} alt={title} className="w-full h-full object-cover" loading="lazy" />
        </div>
      )}
      {!image && (
        <div className="w-14 h-14 rounded-lg shrink-0 flex items-center justify-center"
          style={{ background: `${color}10`, color }}>
          {icon}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-black text-sm truncate">{title}</p>
        <p className="text-black/40 text-xs mt-0.5">{meta}</p>
        <p className="text-black/30 text-[11px] mt-1">
          {new Date(date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
        </p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin text-black/30" />
        ) : (
          <>
            <button onClick={onApprove}
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-all"
              style={{ background: "rgba(0,106,78,0.08)", color: "#006A4E" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#006A4E"; e.currentTarget.style.color = "white"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(0,106,78,0.08)"; e.currentTarget.style.color = "#006A4E"; }}>
              <CheckCircle2 className="w-3.5 h-3.5" /> Approuver
            </button>
            <button onClick={onReject}
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-all"
              style={{ background: "rgba(206,17,38,0.08)", color: "#CE1126" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#CE1126"; e.currentTarget.style.color = "white"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(206,17,38,0.08)"; e.currentTarget.style.color = "#CE1126"; }}>
              <XCircle className="w-3.5 h-3.5" /> Refuser
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
}

function AdminRow({ index, title, meta, date, approved, active, image, images, icon, color, isLoading,
  expanded, onExpand, onApprove, onReject, onDelete, details, link }: {
  index: number; title: string; meta: string; date: string;
  approved: boolean; active: boolean;
  image?: string; images?: string[]; icon: React.ReactNode; color: string;
  isLoading: boolean; expanded: boolean;
  onExpand: () => void; onApprove: () => void; onReject: () => void; onDelete: () => void;
  details: { label: string; value: string }[];
  link?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className="bg-white border border-black/[0.07] rounded-xl overflow-hidden shadow-sm"
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4">
        {/* Miniature */}
        {image ? (
          <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-gray-100">
            <img src={image} alt={title} className="w-full h-full object-cover" loading="lazy" />
          </div>
        ) : (
          <div className="w-14 h-14 rounded-lg shrink-0 flex items-center justify-center"
            style={{ background: `${color}10`, color }}>
            {icon}
          </div>
        )}

        {/* Infos */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-0.5">
            {link ? (
              <a href={link} target="_blank" rel="noopener noreferrer"
                className="font-semibold text-black text-sm truncate hover:underline underline-offset-2">
                {title}
              </a>
            ) : (
              <p className="font-semibold text-black text-sm truncate">{title}</p>
            )}
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-full"
              style={approved
                ? { background: "rgba(0,106,78,0.08)", color: "#006A4E", border: "1px solid rgba(0,106,78,0.2)" }
                : { background: "rgba(255,205,0,0.1)", color: "#8a6d00", border: "1px solid rgba(255,205,0,0.3)" }}>
              {approved ? "Approuvé" : "En attente"}
            </span>
            {approved && !active && (
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full"
                style={{ background: "rgba(0,0,0,0.04)", color: "#999", border: "1px solid rgba(0,0,0,0.1)" }}>
                Désactivé
              </span>
            )}
          </div>
          <p className="text-black/40 text-xs">{meta}</p>
          <p className="text-black/25 text-[11px] mt-0.5">
            {new Date(date).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" })}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5 shrink-0">
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin text-black/30" />
          ) : (
            <>
              {!approved && (
                <button onClick={onApprove} title="Approuver"
                  className="p-2 rounded-lg transition-all text-black/30"
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,106,78,0.08)"; e.currentTarget.style.color = "#006A4E"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = ""; e.currentTarget.style.color = ""; }}>
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              )}
              {approved && (
                <button onClick={onReject} title="Retirer l'approbation"
                  className="p-2 rounded-lg transition-all text-black/30"
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,205,0,0.1)"; e.currentTarget.style.color = "#8a6d00"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = ""; e.currentTarget.style.color = ""; }}>
                  <EyeOff className="w-4 h-4" />
                </button>
              )}
              <button onClick={onDelete} title="Supprimer"
                className="p-2 rounded-lg transition-all text-black/30"
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(206,17,38,0.08)"; e.currentTarget.style.color = "#CE1126"; }}
                onMouseLeave={e => { e.currentTarget.style.background = ""; e.currentTarget.style.color = ""; }}>
                <XCircle className="w-4 h-4" />
              </button>
              <button onClick={onExpand} title={expanded ? "Réduire" : "Voir les détails"}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg transition-all text-xs font-medium"
                style={expanded
                  ? { background: "rgba(0,0,0,0.06)", color: "rgba(0,0,0,0.6)" }
                  : { background: "rgba(0,0,0,0.03)", color: "rgba(0,0,0,0.4)" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,0,0,0.08)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = expanded ? "rgba(0,0,0,0.06)" : "rgba(0,0,0,0.03)"; }}>
                {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                {expanded ? "Réduire" : "Détails"}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Détails dépliables */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-3 border-t border-black/[0.05] space-y-4">

              {/* Galerie d'images */}
              {images && images.length > 0 && (
                <div>
                  <p className="text-[10px] uppercase font-medium text-black/30 mb-2">Photos</p>
                  <div className="flex gap-2 flex-wrap">
                    {images.map((src, i) => (
                      <a key={i} href={src} target="_blank" rel="noopener noreferrer"
                        className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 block shrink-0 hover:opacity-80 transition-opacity">
                        <img src={src} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Champs détails */}
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3">
                {details.map(({ label, value }) => (
                  <div key={label}>
                    <dt className="text-[10px] uppercase font-semibold mb-0.5"
                      style={{ color: label.includes("privé") ? "#CE1126" : "rgba(0,0,0,0.3)" }}>
                      {label}
                    </dt>
                    <dd className="text-black/75 text-sm leading-relaxed">{value}</dd>
                  </div>
                ))}
              </dl>

              {/* Lien externe */}
              {link && (
                <a href={link} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium transition-opacity hover:opacity-70"
                  style={{ color: color }}>
                  <Eye className="w-3.5 h-3.5" />
                  Voir la page publique
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
