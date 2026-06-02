export type CategorieBoutique =
  | "tissage"
  | "poterie"
  | "sculpture"
  | "bijoux"
  | "gastronomie"
  | "maroquinerie"
  | "peinture"
  | "autre";

export type CategorieProduit = CategorieBoutique;

export const CATEGORIE_BOUTIQUE_LABELS: Record<CategorieBoutique, string> = {
  tissage:     "Tissage & Textiles",
  poterie:     "Poterie & Céramique",
  sculpture:   "Sculpture & Bois",
  bijoux:      "Bijoux & Ornements",
  gastronomie: "Gastronomie & Épices",
  maroquinerie:"Maroquinerie & Cuir",
  peinture:    "Peinture & Art",
  autre:       "Autre artisanat",
};

export interface Boutique {
  id: string;
  user_id: string;
  nom: string;
  description: string | null;
  categorie: CategorieBoutique;
  image_couverture: string | null;
  localite: string;
  actif: boolean;
  approuve: boolean;
  created_at: string;
  slug: string;
}

export interface Produit {
  id: string;
  boutique_id: string;
  user_id: string;
  nom: string;
  description: string | null;
  prix: number | null;
  images: string[];
  categorie: CategorieProduit;
  disponible: boolean;
  created_at: string;
}

export type BoutiqueInsert = Omit<Boutique, "id" | "created_at" | "approuve">;
export type ProduitInsert  = Omit<Produit,  "id" | "created_at">;
