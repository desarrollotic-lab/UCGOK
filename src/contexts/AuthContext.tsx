import { createContext, useContext, ReactNode } from "react";

interface UserPermissions {
  role: "admin" | "supervisor" | "asesor";
  moduleAccess: Record<string, boolean>;
  maestriaIds: number[];
}

interface AuthContextType {
  user: { id: string; email: string };
  profile: { full_name: string; email: string };
  permissions: UserPermissions;
  loading: boolean;
  isAdmin: boolean;
  isSupervisor: boolean;
  hasModuleAccess: (moduleKey: string) => boolean;
  hasMaestriaAccess: (maestriaId: number) => boolean;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const value: AuthContextType = {
    user: { id: "mock-admin-001", email: "admin@ucg.edu.ec" },
    profile: { full_name: "Asesor", email: "asesor@ucg.edu.ec" },
    permissions: {
      role: "admin",
      moduleAccess: {
        calculadora: true,
        senescyt: true,
        configuracion: true,
        equipo: true,
      },
      maestriaIds: [],
    },
    loading: false,
    isAdmin: true,
    isSupervisor: false,
    hasModuleAccess: () => true,
    hasMaestriaAccess: () => true,
    signOut: () => {},
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
