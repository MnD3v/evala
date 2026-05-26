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

/* ─── Types de compte ─────────────────────────────────────── */

type AccountType = "particulier" | "agence" | "hotel" | "auberge";

const ACCOUNT_TYPES: {
  id: AccountType;
  label: string;
  desc: string;
  icon: React.ReactNode;
}[] = [
  {
    id: "particulier",
    label: "Particulier",
    desc: "Je loue mon logement personnel",
    icon: <User className="w-5 h-5" />,
  },
  {
    id: "agence",
    label: "Agence immobilière",
    desc: "Je gère plusieurs biens pour des propriétaires",
    icon: <Building2 className="w-5 h-5" />,
  },
  {
    id: "hotel",
    label: "Hôtel",
    desc: "Établissement hôtelier professionnel",
    icon: <Hotel className="w-5 h-5" />,
  },
  {
    id: "auberge",
    label: "Auberge / Pension",
    desc: "Auberge de jeunesse ou maison d'hôtes",
    icon: <Home className="w-5 h-5" />,
  },
];

/* ─── Helpers UI ──────────────────────────────────────────── */

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-[13px] font-medium text-white/40 mb-1.5">
      {children}
    </label>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label>{label}</Label>
      {children}
      {error && <p className="text-red-400 text-[11px] mt-1.5">{error}</p>}
    </div>
  );
}

function TextInput({
  type = "text",
  value,
  onChange,
  placeholder,
  icon,
  right,
}: {
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  icon?: React.ReactNode;
  right?: React.ReactNode;
}) {
  return (
    <div className="relative">
      {icon && (
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/20">
          {icon}
        </span>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full bg-white/[0.04] border border-white/[0.08] hover:border-white/20 focus:border-eorange/50 focus:bg-white/[0.06] rounded-xl py-3 text-white text-sm placeholder:text-white/20 outline-none transition-all duration-200 ${icon ? "pl-10" : "pl-4"} ${right ? "pr-10" : "pr-4"}`}
      />
      {right && (
        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/20">
          {right}
        </span>
      )}
    </div>
  );
}

/* ─── Contenu principal (séparé pour useSearchParams) ─────── */

function AuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "/logement/proposer";

  const [mode, setMode] = useState<"login" | "register">("login");

  /* ── Login state ── */
  const [loginEmail, setLoginEmail]       = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPwd, setShowLoginPwd]   = useState(false);
  const [loginError, setLoginError]       = useState<string | null>(null);
  const [loginLoading, setLoginLoading]   = useState(false);

  /* ── Register state ── */
  const [regStep, setRegStep]             = useState<"type" | "info">("type");
  const [accountType, setAccountType]     = useState<AccountType | null>(null);
  const [regName, setRegName]             = useState("");
  const [regEmail, setRegEmail]           = useState("");
  const [regPassword, setRegPassword]     = useState("");
  const [regConfirm, setRegConfirm]       = useState("");
  const [showRegPwd, setShowRegPwd]       = useState(false);
  const [regErrors, setRegErrors]         = useState<Record<string, string>>({});
  const [regLoading, setRegLoading]       = useState(false);
  const [regSuccess, setRegSuccess]       = useState(false);

  /* ── Redirect si déjà connecté ── */
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.replace(redirect);
    });
  }, [redirect, router]);

  /* ── Connexion ──────────────────────────────────────────── */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoginLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });
      if (error) throw error;
      router.push(redirect);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erreur de connexion.";
      setLoginError(
        msg.includes("Invalid login credentials")
          ? "Email ou mot de passe incorrect."
          : msg
      );
    } finally {
      setLoginLoading(false);
    }
  };

  /* ── Inscription ────────────────────────────────────────── */
  const validateReg = () => {
    const errs: Record<string, string> = {};
    if (!regName.trim())                          errs.name     = "Requis.";
    if (!/\S+@\S+\.\S+/.test(regEmail))           errs.email    = "Email invalide.";
    if (regPassword.length < 8)                    errs.password = "Minimum 8 caractères.";
    if (regPassword !== regConfirm)                errs.confirm  = "Les mots de passe ne correspondent pas.";
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

      /* Créer le profil dans la table profiles */
      if (data.user) {
        await supabase.from("profiles").insert({
          id: data.user.id,
          full_name: regName,
          email: regEmail,
          type: accountType,
        });
      }
      setRegSuccess(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erreur lors de l'inscription.";
      setRegErrors({
        global: msg.includes("already registered")
          ? "Cet email est déjà utilisé. Connectez-vous."
          : msg,
      });
    } finally {
      setRegLoading(false);
    }
  };

  /* ─── Succès inscription ─── */
  if (regSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center text-center gap-5 py-8"
      >
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
          <CheckCircle2 className="w-7 h-7 text-emerald-400" />
        </div>
        <div>
          <h3 className="text-white text-xl mb-2">Compte créé !</h3>
          <p className="text-white/40 text-sm leading-relaxed max-w-xs mx-auto">
            Un lien de confirmation a été envoyé à <span className="text-white/70">{regEmail}</span>. Confirmez votre email puis connectez-vous.
          </p>
        </div>
        <button
          onClick={() => { setMode("login"); setRegSuccess(false); }}
          className="text-eorange text-sm hover:underline"
        >
          Se connecter →
        </button>
      </motion.div>
    );
  }

  return (
    <>
      {/* Tabs */}
      <div className="flex bg-white/[0.04] rounded-xl p-1 mb-7">
        {(["login", "register"] as const).map((m) => (
          <button
            key={m}
            onClick={() => { setMode(m); setRegStep("type"); }}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              mode === m
                ? "bg-white/[0.08] text-white shadow-sm"
                : "text-white/30 hover:text-white/60"
            }`}
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
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
            transition={{ duration: 0.2 }}
            onSubmit={handleLogin}
            className="space-y-4"
          >
            <Field label="Adresse email" error={loginError ?? undefined}>
              <TextInput
                type="email"
                value={loginEmail}
                onChange={setLoginEmail}
                placeholder="vous@exemple.com"
                icon={<Mail className="w-4 h-4" />}
              />
            </Field>

            <Field label="Mot de passe">
              <TextInput
                type={showLoginPwd ? "text" : "password"}
                value={loginPassword}
                onChange={setLoginPassword}
                placeholder="••••••••"
                icon={<Lock className="w-4 h-4" />}
                right={
                  <button type="button" onClick={() => setShowLoginPwd(v => !v)}>
                    {showLoginPwd
                      ? <EyeOff className="w-4 h-4" />
                      : <Eye className="w-4 h-4" />}
                  </button>
                }
              />
            </Field>

            {loginError && (
              <p className="text-red-400 text-[12px] bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                {loginError}
              </p>
            )}

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={loginLoading}
              className="w-full flex items-center justify-center gap-2 bg-eorange hover:bg-eorange/90 text-black font-semibold py-3 rounded-xl text-sm transition-all disabled:opacity-40 mt-2"
            >
              {loginLoading
                ? <><Loader2 className="w-4 h-4 animate-spin" /> Connexion…</>
                : "Se connecter"}
            </motion.button>

            <p className="text-center text-white/25 text-xs pt-1">
              Pas encore de compte ?{" "}
              <button
                type="button"
                onClick={() => setMode("register")}
                className="text-white/50 hover:text-white underline"
              >
                Créer un compte
              </button>
            </p>
          </motion.form>
        )}

        {/* ── INSCRIPTION — Étape 1 : Choisir le type ── */}
        {mode === "register" && regStep === "type" && (
          <motion.div
            key="reg-type"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <div>
              <p className="text-white/80 text-sm font-medium mb-1">Vous êtes…</p>
              <p className="text-white/30 text-xs mb-4">
                Ce choix définit le type de votre compte et la façon dont vos biens seront présentés.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {ACCOUNT_TYPES.map(({ id, label, desc, icon }) => (
                <button
                  key={id}
                  onClick={() => setAccountType(id)}
                  className={`flex flex-col gap-2 p-4 rounded-xl border text-left transition-all duration-200 ${
                    accountType === id
                      ? "border-eorange/50 bg-eorange/[0.07]"
                      : "border-white/[0.06] bg-white/[0.02] hover:border-white/15"
                  }`}
                >
                  <span className={accountType === id ? "text-eorange" : "text-white/25"}>
                    {icon}
                  </span>
                  <span className={`text-[13px] font-semibold leading-tight ${accountType === id ? "text-white" : "text-white/50"}`}>
                    {label}
                  </span>
                  <span className="text-[11px] text-white/25 leading-snug">{desc}</span>
                </button>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => accountType && setRegStep("info")}
              disabled={!accountType}
              className="w-full flex items-center justify-center gap-2 bg-eorange hover:bg-eorange/90 text-black font-semibold py-3 rounded-xl text-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed mt-1"
            >
              Continuer <ChevronRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        )}

        {/* ── INSCRIPTION — Étape 2 : Infos & mot de passe ── */}
        {mode === "register" && regStep === "info" && (
          <motion.form
            key="reg-info"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.2 }}
            onSubmit={handleRegister}
            className="space-y-4"
          >
            {/* Résumé type choisi */}
            <button
              type="button"
              onClick={() => setRegStep("type")}
              className="flex items-center gap-2 text-xs text-white/30 hover:text-white/60 transition-colors mb-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              {ACCOUNT_TYPES.find(t => t.id === accountType)?.label}
            </button>

            <Field label="Nom complet / Raison sociale" error={regErrors.name}>
              <TextInput
                value={regName}
                onChange={setRegName}
                placeholder="Votre nom ou nom de l'établissement"
                icon={<User className="w-4 h-4" />}
              />
            </Field>

            <Field label="Adresse email" error={regErrors.email}>
              <TextInput
                type="email"
                value={regEmail}
                onChange={setRegEmail}
                placeholder="vous@exemple.com"
                icon={<Mail className="w-4 h-4" />}
              />
            </Field>

            <Field label="Mot de passe" error={regErrors.password}>
              <TextInput
                type={showRegPwd ? "text" : "password"}
                value={regPassword}
                onChange={setRegPassword}
                placeholder="Minimum 8 caractères"
                icon={<Lock className="w-4 h-4" />}
                right={
                  <button type="button" onClick={() => setShowRegPwd(v => !v)}>
                    {showRegPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                }
              />
            </Field>

            <Field label="Confirmer le mot de passe" error={regErrors.confirm}>
              <TextInput
                type="password"
                value={regConfirm}
                onChange={setRegConfirm}
                placeholder="••••••••"
                icon={<Lock className="w-4 h-4" />}
              />
            </Field>

            {regErrors.global && (
              <p className="text-red-400 text-[12px] bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                {regErrors.global}
              </p>
            )}

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={regLoading}
              className="w-full flex items-center justify-center gap-2 bg-eorange hover:bg-eorange/90 text-black font-semibold py-3 rounded-xl text-sm transition-all disabled:opacity-40"
            >
              {regLoading
                ? <><Loader2 className="w-4 h-4 animate-spin" /> Création…</>
                : "Créer mon compte"}
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
      className="min-h-screen flex flex-col font-poppins text-white"
      style={{
        backgroundImage: "url('/images/bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="flex-1 bg-black/85 flex flex-col items-center justify-center px-4 py-16">

        {/* Logo / Marque */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <div className="flex items-center justify-center gap-1 mb-1">
            <span className="font-mercado text-2xl text-[#FF9933]">E</span>
            <span className="font-mercado text-2xl text-[#339999]">V</span>
            <span className="font-mercado text-2xl text-[#FF9933]">A</span>
            <span className="font-mercado text-2xl text-[#FF3333]">L</span>
            <span className="font-mercado text-2xl text-[#FF9933]">A</span>
          </div>
          <p className="text-white/30 text-xs">Espace propriétaires</p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full max-w-md bg-[#111] border border-white/[0.07] rounded-2xl p-7 shadow-[0_8px_40px_rgba(0,0,0,0.6)]"
        >
          <Suspense fallback={
            <div className="flex justify-center py-10">
              <Loader2 className="w-6 h-6 text-eorange animate-spin" />
            </div>
          }>
            <AuthContent />
          </Suspense>
        </motion.div>

      </div>
    </div>
  );
}
