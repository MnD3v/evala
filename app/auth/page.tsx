"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, Building2, Hotel, Home,
  Mail, Lock, Eye, EyeOff, Loader2,
  CheckCircle2, ArrowLeft, ChevronRight,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "../lib/supabase";

/* ─── Couleurs thème ─────────────────────────────────────── */
const C = {
  green:  "#006A4E",
  yellow: "#FFCD00",
  red:    "#CE1126",
};

/* ─── Types de compte ─────────────────────────────────────── */

type AccountType = "particulier" | "agence" | "hotel" | "auberge";

const ACCOUNT_TYPES: { id: AccountType; label: string; desc: string; icon: React.ReactNode }[] = [
  { id: "particulier", label: "Particulier",         desc: "Je loue mon logement personnel",                 icon: <User      className="w-5 h-5" /> },
  { id: "agence",      label: "Agence immobilière",  desc: "Je gère plusieurs biens pour des propriétaires", icon: <Building2 className="w-5 h-5" /> },
  { id: "hotel",       label: "Hôtel",               desc: "Établissement hôtelier professionnel",            icon: <Hotel     className="w-5 h-5" /> },
  { id: "auberge",     label: "Auberge / Pension",   desc: "Auberge de jeunesse ou maison d'hôtes",          icon: <Home      className="w-5 h-5" /> },
];

/* ─── Helpers UI ──────────────────────────────────────────── */

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-[12px] font-medium text-white/40 mb-1.5 tracking-wide uppercase">{children}</label>;
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <Label>{label}</Label>
      {children}
      {error && <p className="text-[#CE1126] text-[11px] mt-1.5">{error}</p>}
    </div>
  );
}

function TextInput({ type = "text", value, onChange, placeholder, icon, right }: {
  type?: string; value: string; onChange: (v: string) => void;
  placeholder?: string; icon?: React.ReactNode; right?: React.ReactNode;
}) {
  return (
    <div className="relative">
      {icon && (
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25">{icon}</span>
      )}
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full bg-white/[0.05] border border-white/[0.1] hover:border-white/25 rounded-xl py-3 text-white text-sm placeholder:text-white/20 outline-none transition-all duration-200 ${icon ? "pl-10" : "pl-4"} ${right ? "pr-10" : "pr-4"}`}
        style={{ "--tw-ring-color": C.green } as React.CSSProperties}
        onFocus={e  => { e.currentTarget.style.borderColor = `${C.green}80`; e.currentTarget.style.background = "rgba(0,106,78,0.06)"; }}
        onBlur={e   => { e.currentTarget.style.borderColor = ""; e.currentTarget.style.background = ""; }}
      />
      {right && (
        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/25 cursor-pointer">{right}</span>
      )}
    </div>
  );
}

/* ─── Contenu principal ───────────────────────────────────── */

function AuthContent() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const redirect     = searchParams.get("redirect") ?? "/logement/proposer";

  const [mode, setMode] = useState<"login" | "register">("login");

  const [loginEmail,    setLoginEmail]    = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPwd,  setShowLoginPwd]  = useState(false);
  const [loginError,    setLoginError]    = useState<string | null>(null);
  const [loginLoading,  setLoginLoading]  = useState(false);

  const [regStep,      setRegStep]      = useState<"type" | "info">("type");
  const [accountType,  setAccountType]  = useState<AccountType | null>(null);
  const [regName,      setRegName]      = useState("");
  const [regEmail,     setRegEmail]     = useState("");
  const [regPassword,  setRegPassword]  = useState("");
  const [regConfirm,   setRegConfirm]   = useState("");
  const [showRegPwd,   setShowRegPwd]   = useState(false);
  const [regErrors,    setRegErrors]    = useState<Record<string, string>>({});
  const [regLoading,   setRegLoading]   = useState(false);
  const [regSuccess,   setRegSuccess]   = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.replace(redirect);
    });
  }, [redirect, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoginLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email: loginEmail, password: loginPassword });
      if (error) throw error;
      router.push(redirect);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erreur de connexion.";
      setLoginError(msg.includes("Invalid login credentials") ? "Email ou mot de passe incorrect." : msg);
    } finally {
      setLoginLoading(false);
    }
  };

  const validateReg = () => {
    const errs: Record<string, string> = {};
    if (!regName.trim())                errs.name     = "Requis.";
    if (!/\S+@\S+\.\S+/.test(regEmail)) errs.email   = "Email invalide.";
    if (regPassword.length < 8)          errs.password = "Minimum 8 caractères.";
    if (regPassword !== regConfirm)      errs.confirm  = "Les mots de passe ne correspondent pas.";
    return errs;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateReg();
    if (Object.keys(errs).length) { setRegErrors(errs); return; }
    setRegErrors({});
    setRegLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: regEmail,
        password: regPassword,
        options: { data: { full_name: regName, account_type: accountType } },
      });
      if (error) throw error;
      if (data.user) {
        await supabase.from("profiles").insert({ id: data.user.id, full_name: regName, email: regEmail, type: accountType });
      }
      setRegSuccess(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erreur lors de l'inscription.";
      setRegErrors({ global: msg.includes("already registered") ? "Cet email est déjà utilisé. Connectez-vous." : msg });
    } finally {
      setRegLoading(false);
    }
  };

  /* ── Succès inscription ── */
  if (regSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center text-center gap-5 py-8"
      >
        <div className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ background: `${C.green}15`, border: `1px solid ${C.green}40` }}>
          <CheckCircle2 className="w-7 h-7" style={{ color: C.green }} />
        </div>
        <div>
          <h3 className="font-clash text-white text-xl mb-2">Compte créé !</h3>
          <p className="text-white/40 text-sm leading-relaxed max-w-xs mx-auto">
            Un lien de confirmation a été envoyé à{" "}
            <span className="text-white/70">{regEmail}</span>.
            Confirmez votre email puis connectez-vous.
          </p>
        </div>
        <button
          onClick={() => { setMode("login"); setRegSuccess(false); }}
          className="text-sm font-medium transition-opacity hover:opacity-70"
          style={{ color: C.green }}
        >
          Se connecter →
        </button>
      </motion.div>
    );
  }

  return (
    <>
      {/* ── Tabs ── */}
      <div className="flex bg-white/[0.04] rounded-xl p-1 mb-7 gap-1">
        {(["login", "register"] as const).map(m => (
          <button
            key={m}
            onClick={() => { setMode(m); setRegStep("type"); }}
            className="flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-200"
            style={mode === m
              ? { background: C.green, color: "white" }
              : { background: "transparent", color: "rgba(255,255,255,0.35)" }}
          >
            {m === "login" ? "Se connecter" : "Créer un compte"}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">

        {/* ── CONNEXION ── */}
        {mode === "login" && (
          <motion.form
            key="login"
            initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }} transition={{ duration: 0.2 }}
            onSubmit={handleLogin}
            className="space-y-4"
          >
            <Field label="Adresse email">
              <TextInput
                type="email" value={loginEmail} onChange={setLoginEmail}
                placeholder="vous@exemple.com" icon={<Mail className="w-4 h-4" />}
              />
            </Field>

            <Field label="Mot de passe">
              <TextInput
                type={showLoginPwd ? "text" : "password"}
                value={loginPassword} onChange={setLoginPassword}
                placeholder="••••••••" icon={<Lock className="w-4 h-4" />}
                right={
                  <button type="button" onClick={() => setShowLoginPwd(v => !v)}>
                    {showLoginPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                }
              />
            </Field>

            {loginError && (
              <p className="text-[12px] rounded-xl px-3 py-2.5"
                style={{ color: "#CE1126", background: "rgba(206,17,38,0.08)", border: "1px solid rgba(206,17,38,0.2)" }}>
                {loginError}
              </p>
            )}

            <motion.button
              whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
              type="submit" disabled={loginLoading}
              className="w-full flex items-center justify-center gap-2 text-white font-semibold py-3 rounded-xl text-sm transition-all disabled:opacity-40 mt-2"
              style={{ background: C.green }}
              onMouseEnter={e => { if (!loginLoading) e.currentTarget.style.background = "#005a41"; }}
              onMouseLeave={e => { e.currentTarget.style.background = C.green; }}
            >
              {loginLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Connexion…</> : "Se connecter"}
            </motion.button>

            <p className="text-center text-white/25 text-xs pt-1">
              Pas encore de compte ?{" "}
              <button type="button" onClick={() => setMode("register")}
                className="text-white/50 hover:text-white underline transition-colors">
                Créer un compte
              </button>
            </p>
          </motion.form>
        )}

        {/* ── INSCRIPTION — Étape 1 : Type de compte ── */}
        {mode === "register" && regStep === "type" && (
          <motion.div
            key="reg-type"
            initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <div>
              <p className="font-clash text-white text-base mb-1">Vous êtes…</p>
              <p className="text-white/30 text-xs mb-4">
                Ce choix définit le type de votre compte et la façon dont vos biens seront présentés.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {ACCOUNT_TYPES.map(({ id, label, desc, icon }) => {
                const selected = accountType === id;
                return (
                  <button
                    key={id}
                    onClick={() => setAccountType(id)}
                    className="flex flex-col gap-2 p-4 rounded-xl border text-left transition-all duration-200"
                    style={selected
                      ? { borderColor: `${C.green}60`, background: `${C.green}10` }
                      : { borderColor: "rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}
                    onMouseEnter={e => { if (!selected) e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; }}
                    onMouseLeave={e => { if (!selected) e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; }}
                  >
                    <span style={{ color: selected ? C.green : "rgba(255,255,255,0.25)" }}>{icon}</span>
                    <span className="text-[13px] font-semibold leading-tight"
                      style={{ color: selected ? "white" : "rgba(255,255,255,0.5)" }}>{label}</span>
                    <span className="text-[11px] text-white/25 leading-snug">{desc}</span>
                  </button>
                );
              })}
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
              onClick={() => accountType && setRegStep("info")}
              disabled={!accountType}
              className="w-full flex items-center justify-center gap-2 text-white font-semibold py-3 rounded-xl text-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed mt-1"
              style={{ background: C.green }}
              onMouseEnter={e => { if (accountType) e.currentTarget.style.background = "#005a41"; }}
              onMouseLeave={e => { e.currentTarget.style.background = C.green; }}
            >
              Continuer <ChevronRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        )}

        {/* ── INSCRIPTION — Étape 2 : Infos ── */}
        {mode === "register" && regStep === "info" && (
          <motion.form
            key="reg-info"
            initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.2 }}
            onSubmit={handleRegister}
            className="space-y-4"
          >
            <button
              type="button"
              onClick={() => setRegStep("type")}
              className="flex items-center gap-2 text-xs text-white/30 hover:text-white/60 transition-colors mb-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              {ACCOUNT_TYPES.find(t => t.id === accountType)?.label}
            </button>

            <Field label="Nom complet / Raison sociale" error={regErrors.name}>
              <TextInput value={regName} onChange={setRegName}
                placeholder="Votre nom ou nom de l'établissement"
                icon={<User className="w-4 h-4" />} />
            </Field>

            <Field label="Adresse email" error={regErrors.email}>
              <TextInput type="email" value={regEmail} onChange={setRegEmail}
                placeholder="vous@exemple.com" icon={<Mail className="w-4 h-4" />} />
            </Field>

            <Field label="Mot de passe" error={regErrors.password}>
              <TextInput
                type={showRegPwd ? "text" : "password"}
                value={regPassword} onChange={setRegPassword}
                placeholder="Minimum 8 caractères" icon={<Lock className="w-4 h-4" />}
                right={
                  <button type="button" onClick={() => setShowRegPwd(v => !v)}>
                    {showRegPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                }
              />
            </Field>

            <Field label="Confirmer le mot de passe" error={regErrors.confirm}>
              <TextInput type="password" value={regConfirm} onChange={setRegConfirm}
                placeholder="••••••••" icon={<Lock className="w-4 h-4" />} />
            </Field>

            {regErrors.global && (
              <p className="text-[12px] rounded-xl px-3 py-2.5"
                style={{ color: "#CE1126", background: "rgba(206,17,38,0.08)", border: "1px solid rgba(206,17,38,0.2)" }}>
                {regErrors.global}
              </p>
            )}

            <motion.button
              whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
              type="submit" disabled={regLoading}
              className="w-full flex items-center justify-center gap-2 text-white font-semibold py-3 rounded-xl text-sm transition-all disabled:opacity-40"
              style={{ background: C.green }}
              onMouseEnter={e => { if (!regLoading) e.currentTarget.style.background = "#005a41"; }}
              onMouseLeave={e => { e.currentTarget.style.background = C.green; }}
            >
              {regLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Création…</> : "Créer mon compte"}
            </motion.button>

            <p className="text-center text-white/25 text-[11px]">
              En créant un compte, vous acceptez nos{" "}
              <span className="text-white/40">conditions d&apos;utilisation</span>.
            </p>
          </motion.form>
        )}

      </AnimatePresence>
    </>
  );
}

/* ─── Page ──────────────────────────────────────────────────── */

export default function AuthPage() {
  return (
    <div
      className="min-h-screen flex flex-col font-clash text-white"
      style={{
        backgroundImage: "url('/images/bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay dégradé */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-16"
        style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.88) 100%)" }}>

        {/* ── Logo ── */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          {/* Ligne décorative */}
          <div className="flex items-center gap-3 justify-center mb-5">
            <div className="h-px w-10 opacity-30" style={{ background: C.yellow }} />
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/30">Festival Evala</span>
            <div className="h-px w-10 opacity-30" style={{ background: C.yellow }} />
          </div>

          {/* EVALA */}
          <div className="flex items-center justify-center gap-0.5 mb-3">
            {[
              { l: "E", c: C.green  },
              { l: "V", c: C.yellow },
              { l: "A", c: C.red    },
              { l: "L", c: C.green  },
              { l: "A", c: C.yellow },
            ].map(({ l, c }, i) => (
              <span key={i} className="font-mercado text-4xl leading-none" style={{ color: c }}>{l}</span>
            ))}
          </div>

          <p className="text-white/30 text-xs tracking-widest uppercase">Espace propriétaires</p>
        </motion.div>

        {/* ── Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="w-full max-w-md rounded-2xl p-7"
          style={{
            background: "rgba(10,10,10,0.92)",
            border: "1px solid rgba(255,255,255,0.07)",
            boxShadow: "0 24px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(0,106,78,0.08)",
            backdropFilter: "blur(12px)",
          }}
        >
          {/* Bandeau tricolore */}
          <div className="flex h-0.5 rounded-full overflow-hidden mb-6">
            <div className="flex-1" style={{ background: C.green }} />
            <div className="flex-1" style={{ background: C.yellow }} />
            <div className="flex-1" style={{ background: C.red }} />
          </div>

          <Suspense fallback={
            <div className="flex justify-center py-10">
              <Loader2 className="w-6 h-6 animate-spin" style={{ color: C.green }} />
            </div>
          }>
            <AuthContent />
          </Suspense>
        </motion.div>

        {/* Lien retour site */}
        <motion.a
          href="/"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-white/25 text-xs hover:text-white/50 transition-colors"
        >
          ← Retour au site
        </motion.a>

      </div>
    </div>
  );
}
