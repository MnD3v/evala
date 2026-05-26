"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Plus, BedDouble, Briefcase, CheckCircle2, Clock,
  Loader2, Trash2, Eye, EyeOff,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { supabase } from "../lib/supabase";
import { getSession, getUserProfile } from "../lib/auth";
import type { Logement } from "../types/logement";
import type { OffreEmploi } from "../types/emploi";
import { TYPE_LABELS } from "../types/logement";

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
  const [isLoading, setIsLoading]     = useState(true);

  const [deletingId, setDeletingId]   = useState<string | null>(null);
  const [togglingId, setTogglingId]   = useState<string | null>(null);

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
      const [{ data: logs }, { data: offs }] = await Promise.all([
        supabase.from("logements").select("*").eq("user_id", userId).order("created_at", { ascending: false }),
        supabase.from("offres_emploi").select("*").eq("user_id", userId).order("created_at", { ascending: false }),
      ]);
      setLogements((logs as Logement[]) ?? []);
      setOffres((offs as OffreEmploi[]) ?? []);
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

  /* Supprimer offre */
  const deleteOffre = async (id: string) => {
    if (!confirm("Supprimer cette offre définitivement ?")) return;
    setDeletingId(id);
    await supabase.from("offres_emploi").delete().eq("id", id);
    setOffres(prev => prev.filter(o => o.id !== id));
    setDeletingId(null);
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
              <h1 className="text-black text-xl leading-tight font-bold">{profile?.full_name}</h1>
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
          </div>
        </motion.div>

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
          <div className="space-y-3 mb-14">
            {logements.map((l, i) => {
              const st = logementStatus(l);
              const s  = STATUS_STYLE[st];
              return (
                <ItemRow
                  key={l.id}
                  index={i}
                  title={l.titre}
                  meta={`${TYPE_LABELS[l.type]} · ${l.adresse || l.ville}${l.prix_par_nuit ? ` · ${l.prix_par_nuit.toLocaleString("fr-FR")} FCFA/nuit` : ""}`}
                  statusStyle={s}
                  active={l.disponible}
                  isToggling={togglingId === l.id}
                  isDeleting={deletingId === l.id}
                  onToggle={() => toggleLogement(l)}
                  onDelete={() => deleteLogement(l.id)}
                  thumbnail={l.images?.[0]}
                  thumbnailFallback={<BedDouble className="w-5 h-5 text-black/20" />}
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
          <div className="space-y-3">
            {offres.map((o, i) => {
              const st = emploiStatus(o);
              const s  = STATUS_STYLE[st];
              return (
                <ItemRow
                  key={o.id}
                  index={i}
                  title={o.titre}
                  meta={`${CONTRAT_LABELS[o.type_contrat]} · ${DOMAINE_LABELS[o.domaine]} · ${o.lieu}`}
                  statusStyle={s}
                  active={o.active}
                  isToggling={togglingId === o.id}
                  isDeleting={deletingId === o.id}
                  onToggle={() => toggleOffre(o)}
                  onDelete={() => deleteOffre(o.id)}
                  thumbnailFallback={<Briefcase className="w-5 h-5 text-black/20" />}
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
      <h2 className="font-bold text-black text-lg">{title}</h2>
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

function ItemRow({ index, title, meta, statusStyle, active, isToggling, isDeleting, onToggle, onDelete, thumbnail, thumbnailFallback }: {
  index: number;
  title: string;
  meta: string;
  statusStyle: typeof STATUS_STYLE["approved"];
  active: boolean;
  isToggling: boolean;
  isDeleting: boolean;
  onToggle: () => void;
  onDelete: () => void;
  thumbnail?: string;
  thumbnailFallback: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="flex flex-col sm:flex-row sm:items-center gap-4 bg-white border border-black/[0.07] rounded-xl p-4 hover:border-black/[0.13] transition-all shadow-sm"
    >
      {/* Miniature */}
      <div className="w-full sm:w-16 h-12 sm:h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0 flex items-center justify-center">
        {thumbnail ? (
          <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
        ) : thumbnailFallback}
      </div>

      {/* Infos */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-0.5">
          <p className="text-black text-sm font-medium truncate">{title}</p>
          <span
            className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full border"
            style={{ color: statusStyle.color, background: statusStyle.bg, borderColor: statusStyle.border }}
          >
            {statusStyle.icon}{statusStyle.label}
          </span>
        </div>
        <p className="text-black text-xs">{meta}</p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 shrink-0">
        <button onClick={onToggle} disabled={isToggling} title={active ? "Désactiver" : "Activer"}
          className="p-2 rounded-lg transition-all disabled:opacity-40 text-black/30 hover:text-black/70 hover:bg-black/[0.05]">
          {isToggling ? <Loader2 className="w-4 h-4 animate-spin" /> : active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
        </button>
        <button onClick={onDelete} disabled={isDeleting} title="Supprimer"
          className="p-2 rounded-lg transition-all disabled:opacity-40 text-black/30 hover:bg-red-50"
          style={{ ["--tw-text-opacity" as string]: 1 }}
          onMouseEnter={e => (e.currentTarget.style.color = "#CE1126")}
          onMouseLeave={e => (e.currentTarget.style.color = "")}>
          {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
        </button>
      </div>
    </motion.div>
  );
}

/* ─── Shell ─────────────────────────────────────────────────── */
function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow pt-24 pb-20 px-4">
        {children}
      </main>
      <Footer />
    </div>
  );
}
