export type TypeContrat = "cdi" | "cdd" | "freelance" | "stage" | "benevolat" | "temps_partiel";

export type DomaineEmploi =
  | "securite"
  | "restauration"
  | "logistique"
  | "communication"
  | "animation"
  | "transport"
  | "sante"
  | "artisanat"
  | "technique"
  | "administration"
  | "autre";

export interface OffreEmploi {
  id: string;
  created_at: string;
  titre: string;
  description: string;
  type_contrat: TypeContrat;
  domaine: DomaineEmploi;
  lieu: string;
  salaire?: string;
  date_debut?: string;
  date_fin?: string;
  contact_nom: string;
  contact_telephone: string;
  contact_email?: string;
  competences: string[];
  approuve: boolean;
  active: boolean;
  user_id?: string;
}

export type Database = {
  public: {
    Tables: {
      offres_emploi: {
        Row: OffreEmploi;
        Insert: Omit<OffreEmploi, "id" | "created_at">;
        Update: Partial<Omit<OffreEmploi, "id" | "created_at">>;
      };
    };
  };
};
