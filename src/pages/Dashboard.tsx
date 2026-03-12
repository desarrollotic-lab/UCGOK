import { Calculator, GraduationCap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const allModules = [
  {
    title: "Calc. Pagos",
    description: "Calcula cuotas, genera tablas de amortización y mensajes WhatsApp",
    icon: Calculator,
    to: "/calculadora",
    accent: "hsl(var(--primary))",
  },
  {
    title: "Consulta Títulos",
    description: "Consulta títulos registrados en Senescyt por cédula",
    icon: GraduationCap,
    to: "/senescyt",
    accent: "hsl(var(--header-bg))",
  },
];

const Dashboard = () => {
  const { profile } = useAuth();

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[hsl(var(--header-bg))] to-[hsl(var(--header-bg)/0.85)] p-8 text-white">
        <div className="absolute top-0 right-0 w-64 h-64 opacity-10" style={{
          background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)",
        }} />
        <div className="relative">
          <p className="text-white/60 text-sm font-medium mb-1">Administrador</p>
          <h1 className="text-3xl font-bold font-serif">Tablero Pancake</h1>
          <p className="text-white/70 mt-2">
            Bienvenido{profile?.full_name ? `, ${profile.full_name}` : ""}. Herramienta para Asesores de Posgrados UCG.
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4 flex items-center gap-2">
          <span className="w-8 h-px bg-primary/40" />
          Módulos
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {allModules.map((mod) => (
            <Link key={mod.to} to={mod.to} className="module-card group">
              <div className="absolute top-0 left-0 right-0 h-1 group-hover:h-1.5 transition-all duration-300 rounded-t-2xl" style={{ backgroundColor: mod.accent }} />
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${mod.accent}15` }}>
                  <mod.icon className="h-6 w-6" style={{ color: mod.accent }} />
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground/20 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
              </div>
              <h3 className="font-bold text-foreground text-base mb-1 group-hover:text-primary transition-colors">{mod.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{mod.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
