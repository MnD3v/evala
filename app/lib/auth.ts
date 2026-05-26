import { supabase } from "./supabase";
import type { User } from "@supabase/supabase-js";

export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  type: "particulier" | "agence" | "hotel" | "auberge";
  created_at: string;
}

/** Retourne la session courante (null si non connecté) */
export async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

/** Retourne l'utilisateur courant (null si non connecté) */
export async function getCurrentUser(): Promise<User | null> {
  const { data } = await supabase.auth.getUser();
  return data.user ?? null;
}

/** Retourne le profil complet depuis la table profiles */
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  return data ?? null;
}

/** Déconnexion */
export async function signOut() {
  await supabase.auth.signOut();
}
