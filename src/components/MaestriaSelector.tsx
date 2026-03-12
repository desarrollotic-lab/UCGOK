import { GraduationCap } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Maestria } from "@/data/maestrias";
import { useMaestrias } from "@/contexts/MaestriasContext";
import { useAuth } from "@/contexts/AuthContext";

interface MaestriaSelectorProps {
  selectedMaestria: Maestria | null;
  onSelect: (maestria: Maestria | null) => void;
}

const MaestriaSelector = ({ selectedMaestria, onSelect }: MaestriaSelectorProps) => {
  const { visibleMaestrias } = useMaestrias();
  const { hasMaestriaAccess } = useAuth();
  const filteredMaestrias = visibleMaestrias.filter((m) => hasMaestriaAccess(m.id));

  const handleChange = (value: string) => {
    const maestria = filteredMaestrias.find(m => m.id.toString() === value);
    onSelect(maestria || null);
  };

  return (
    <div className="card-elevated p-6">
      <div className="section-title mb-4">
        <div className="icon-badge">
          <GraduationCap className="w-5 h-5" />
        </div>
        <span>Selecciona tu Maestría</span>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-2">
          Programa de Maestría
        </label>
        <Select 
          value={selectedMaestria?.id.toString() || ""} 
          onValueChange={handleChange}
        >
          <SelectTrigger className="w-full bg-card">
            <SelectValue placeholder="Selecciona un programa..." />
          </SelectTrigger>
          <SelectContent className="bg-card">
            {filteredMaestrias.map((maestria) => (
              <SelectItem key={maestria.id} value={maestria.id.toString()}>
                {maestria.nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedMaestria && (
        <div className="mt-4 p-4 rounded-lg bg-secondary/50 border border-border">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Precio Bruto:</span>
              <span className="ml-2 font-semibold">${selectedMaestria.precioBruto.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Inscripción:</span>
              <span className="ml-2 font-semibold">${selectedMaestria.inscripcion}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Con 50% Beca:</span>
              <span className="ml-2 font-semibold text-primary">${selectedMaestria.precioCon50Beca.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Con 55% (Contado):</span>
              <span className="ml-2 font-semibold text-success">${selectedMaestria.precioContado55.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MaestriaSelector;
