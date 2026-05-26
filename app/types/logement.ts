export type LogementType = 'hotel' | 'appartement' | 'airbnb' | 'chambre_hote';

export type Equipement =
  | 'wifi'
  | 'climatisation'
  | 'cuisine'
  | 'piscine'
  | 'parking'
  | 'eau_chaude'
  | 'tv'
  | 'petit_dejeuner'
  | 'generatrice'
  | 'securite';

export interface Logement {
  id: string;
  created_at: string;
  titre: string;
  description: string | null;
  type: LogementType;
  prix_par_nuit: number | null;
  adresse: string | null;
  ville: string;
  capacite: number;
  equipements: Equipement[];
  images: string[];
  contact_nom: string;
  contact_telephone: string;
  contact_email: string | null;
  disponible: boolean;
  approuve: boolean;
  note: number;
  nombre_avis: number;
}

export interface LogementInsert {
  titre: string;
  description: string;
  type: LogementType;
  prix_par_nuit: number | null;
  adresse: string;
  ville: string;
  capacite: number;
  equipements: Equipement[];
  images: string[];
  contact_nom: string;
  contact_telephone: string;
  contact_email: string;
}

// Type Supabase database généré
export interface Database {
  public: {
    Tables: {
      logements: {
        Row: Logement;
        Insert: Omit<Logement, 'id' | 'created_at' | 'note' | 'nombre_avis' | 'disponible' | 'approuve'>;
        Update: Partial<Logement>;
      };
    };
  };
}

export const TYPE_LABELS: Record<LogementType, string> = {
  hotel: 'Hôtel',
  appartement: 'Appartement',
  airbnb: 'Airbnb',
  chambre_hote: "Chambre d'hôte",
};

export const TYPE_COLORS: Record<LogementType, string> = {
  hotel: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  appartement: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  airbnb: 'bg-evala/20 text-red-400 border-red-500/30',
  chambre_hote: 'bg-green-500/20 text-green-400 border-green-500/30',
};

export const EQUIPEMENT_LABELS: Record<Equipement, string> = {
  wifi: 'Wifi',
  climatisation: 'Climatisation',
  cuisine: 'Cuisine équipée',
  piscine: 'Piscine',
  parking: 'Parking',
  eau_chaude: 'Eau chaude',
  tv: 'Télévision',
  petit_dejeuner: 'Petit-déjeuner inclus',
  generatrice: 'Groupe électrogène',
  securite: 'Sécurité 24h/24',
};
