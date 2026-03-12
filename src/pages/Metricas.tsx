import { BarChart3 } from "lucide-react";

const Metricas = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground font-serif">Métricas</h1>
        <p className="text-muted-foreground text-sm mt-1">Análisis de actividad del equipo</p>
      </div>

      <div className="card-elevated p-12 text-center">
        <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
        <p className="text-muted-foreground">Métricas deshabilitadas en modo local.</p>
        <p className="text-xs text-muted-foreground mt-1">Conéctate a la base de datos para ver métricas de actividad.</p>
      </div>
    </div>
  );
};

export default Metricas;
