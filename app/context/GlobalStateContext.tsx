"use client"
import { createContext, useContext, useState, ReactNode, SetStateAction, Dispatch } from "react";

// Définit les types pour l'état et la fonction de mise à jour
interface GlobalStateContextType {
  drawerIsOpen: boolean;
  setDrawerIsOpen: (drawerIsOpen: boolean) => void;

  menuIsOpen: boolean;
  setmenuIsOpen: (menuIsOpen: boolean) => void;

  categorie: string;
  setCategorie: (categorie: string) => void;

  siege: string;
  setSiege: (categorie: string) => void;

  contact: string | null | undefined;
  setContact: Dispatch<SetStateAction<string | null | undefined>>;
}

// Crée le contexte avec un type par défaut (ou null initialement)
const GlobalStateContext = createContext<GlobalStateContextType | undefined>(undefined);

// Crée un hook pour utiliser le contexte
export const useMyGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error("globalState doit être utilisé dans un GlobalStateProvider");
  }
  return context;
};

// Définit les props du fournisseur
interface GlobalStateProviderProps {
  children: ReactNode;
}

// Composant fournisseur pour l'état global
export const GlobalStateProvider = ({ children }: GlobalStateProviderProps) => {
  const [menuIsOpen, setmenuIsOpen] = useState(false);
  const [categorie, setCategorie] = useState("");
  const [siege, setSiege] = useState("");
  const [contact, setContact] = useState<string | null | undefined>(null); // Définition explicite du type

  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  return (
    <GlobalStateContext.Provider value={{ menuIsOpen, setmenuIsOpen, categorie, setCategorie, siege, setSiege, drawerIsOpen, setDrawerIsOpen, contact, setContact }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
