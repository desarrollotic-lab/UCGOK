import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { ArrowRight, ChevronLeft, Settings, Globe } from "lucide-react";

const subModules = [
  {
    title: "Configuración",
    description: "Gestiona los precios y datos de las maestrías",
    icon: Settings,
    to: "/configuracion",
    accent: "hsl(var(--muted-foreground))",
  },
  {
    title: "Config. APIs",
    description: "Configura las URLs de APIs externas",
    icon: Globe,
    to: "/config-api",
    accent: "hsl(var(--header-bg))",
  },
];

const Configuraciones = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-16 max-w-5xl">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ChevronLeft className="h-4 w-4" />
          Volver a módulos
        </Link>

        <div className="mb-12">
          <p className="text-sm font-medium text-primary mb-2 tracking-wide uppercase">
            Módulo
          </p>
          <h1 className="text-4xl font-bold text-foreground font-serif leading-tight">
            Configuraciones
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Administra los ajustes del sistema.
          </p>
        </div>

        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-6 flex items-center gap-2">
          <span className="w-8 h-px bg-primary/40" />
          Opciones
        </h2>

        <div className="grid sm:grid-cols-2 gap-6">
          {subModules.map((mod) => (
            <Link
              key={mod.to}
              to={mod.to}
              className="module-card group relative"
            >
              <div
                className="absolute top-0 left-0 right-0 h-1 group-hover:h-1.5 transition-all duration-300 rounded-t-2xl"
                style={{ backgroundColor: mod.accent }}
              />
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${mod.accent}15` }}
                >
                  <mod.icon className="h-7 w-7" style={{ color: mod.accent }} />
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground/20 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
              </div>
              <h3 className="font-bold text-foreground text-lg mb-1 group-hover:text-primary transition-colors font-serif">
                {mod.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {mod.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Configuraciones;
