import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import iconTableroPancake from "@/assets/icon-tablero-pancake.svg";
import iconConfiguraciones from "@/assets/icon-configuraciones.svg";
import { ArrowRight } from "lucide-react";

const modules = [
  {
    id: "tablero-pancake",
    title: "Tablero Pancake",
    description: "Herramienta para Asesores de Posgrados UCG",
    icon: iconTableroPancake,
    to: "/tablero",
    accent: "hsl(var(--primary))",
  },
  {
    id: "configuraciones",
    title: "Configuraciones",
    description: "Administra ajustes del sistema y APIs",
    icon: iconConfiguraciones,
    to: "/configuraciones",
    accent: "hsl(var(--muted-foreground))",
  },
];

const ModuleSelection = () => {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const firstName = profile?.full_name?.split(" ")[0] || "";

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "radial-gradient(circle at 25% 25%, hsl(var(--primary)) 0%, transparent 50%), radial-gradient(circle at 75% 75%, hsl(var(--primary)) 0%, transparent 50%)",
        }} />

        <div className="container mx-auto px-4 py-16 max-w-5xl relative">
          <div className="mb-12">
            <p className="text-sm font-medium text-primary mb-2 tracking-wide uppercase">
              Panel de Control
            </p>
            <h1 className="text-4xl font-bold text-foreground font-serif leading-tight">
              ¡Hola{firstName ? ` ${firstName}` : ""}!
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Selecciona un módulo para comenzar a trabajar.
            </p>
          </div>

          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-6 flex items-center gap-2">
            <span className="w-8 h-px bg-primary/40" />
            Mis Módulos
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((mod) => (
              <button
                key={mod.id}
                onClick={() => navigate(mod.to)}
                className="module-card group text-center relative"
                style={{ "--accent": mod.accent } as React.CSSProperties}
              >
                {/* Top accent bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 group-hover:h-1.5 transition-all duration-300 rounded-t-2xl"
                  style={{ backgroundColor: mod.accent }}
                />

                <div className="flex flex-col items-center mb-5">
                  <div
                    className="w-20 h-20 rounded-xl flex items-center justify-center shadow-sm"
                    style={{ backgroundColor: `${mod.accent}15` }}
                  >
                    <img src={mod.icon} alt={mod.title} className="w-14 h-14" />
                  </div>
                  <ArrowRight
                    className="h-5 w-5 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 absolute top-6 right-6"
                  />
                </div>

                <h3 className="font-bold text-foreground text-lg mb-1.5 group-hover:text-primary transition-colors font-serif">
                  {mod.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{mod.description}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleSelection;
