import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Maestria, maestrias as defaultMaestrias } from "@/data/maestrias";

interface MaestriasContextType {
  maestrias: Maestria[];
  visibleMaestrias: Maestria[];
  updateMaestria: (id: number, updates: Partial<Maestria>) => void;
  addMaestria: (maestria: Omit<Maestria, "id">) => void;
  deleteMaestria: (id: number) => void;
  toggleVisibility: (id: number) => void;
  resetToDefaults: () => void;
}

const MaestriasContext = createContext<MaestriasContextType | null>(null);

const STORAGE_KEY = "ucg-maestrias-config";

export const MaestriasProvider = ({ children }: { children: ReactNode }) => {
  const [maestrias, setMaestrias] = useState<Maestria[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Maestria[];
        return parsed.map(m => ({ ...m, visible: m.visible !== false }));
      }
    } catch {}
    return defaultMaestrias.map(m => ({ ...m, visible: true }));
  });

  const visibleMaestrias = maestrias.filter(m => m.visible !== false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(maestrias));
  }, [maestrias]);

  const updateMaestria = (id: number, updates: Partial<Maestria>) => {
    setMaestrias((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updates } : m))
    );
  };

  const addMaestria = (maestria: Omit<Maestria, "id">) => {
    const maxId = maestrias.reduce((max, m) => Math.max(max, m.id), 0);
    setMaestrias((prev) => [...prev, { ...maestria, id: maxId + 1, visible: true }]);
  };

  const deleteMaestria = (id: number) => {
    setMaestrias((prev) => prev.filter((m) => m.id !== id));
  };

  const toggleVisibility = (id: number) => {
    setMaestrias((prev) =>
      prev.map((m) => (m.id === id ? { ...m, visible: !m.visible } : m))
    );
  };

  const resetToDefaults = () => {
    setMaestrias(defaultMaestrias.map(m => ({ ...m, visible: true })));
  };

  return (
    <MaestriasContext.Provider value={{ maestrias, visibleMaestrias, updateMaestria, addMaestria, deleteMaestria, toggleVisibility, resetToDefaults }}>
      {children}
    </MaestriasContext.Provider>
  );
};

export const useMaestrias = () => {
  const ctx = useContext(MaestriasContext);
  if (!ctx) throw new Error("useMaestrias must be used within MaestriasProvider");
  return ctx;
};
