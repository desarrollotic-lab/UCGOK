import { Users } from "lucide-react";

const Equipo = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground font-serif flex items-center gap-3">
          <div className="icon-badge">
            <Users className="h-5 w-5" />
          </div>
          Equipo
        </h1>
        <p className="text-muted-foreground mt-1">
          Gestiona los asesores, roles y permisos de acceso.
        </p>
      </div>

      <div className="card-elevated p-12 text-center">
        <Users className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
        <p className="text-muted-foreground">Módulo de equipo deshabilitado en modo local.</p>
        <p className="text-xs text-muted-foreground mt-1">Conéctate a la base de datos para gestionar el equipo.</p>
      </div>
    </div>
  );
};

export default Equipo;
