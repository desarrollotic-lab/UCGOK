import { History } from "lucide-react";

const Historial = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground font-serif flex items-center gap-3">
          <History className="h-6 w-6 text-primary" />
          Historial de Consultas
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Registro de todas las acciones realizadas</p>
      </div>

      <div className="card-elevated p-12 text-center">
        <History className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
        <p className="text-muted-foreground">Historial deshabilitado en modo local.</p>
        <p className="text-xs text-muted-foreground mt-1">Conéctate a la base de datos para ver el historial.</p>
      </div>
    </div>
  );
};

export default Historial;
