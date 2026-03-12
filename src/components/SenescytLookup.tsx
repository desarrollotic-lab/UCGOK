import { useState } from "react";
import { logActivity } from "@/lib/activityLogger";
import { Search, User, GraduationCap, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

interface TituloDetalle {
  titulo: string;
  institucion: string;
  tipo: string;
  reconocido: string;
  numeroRegistro: string;
  fechaRegistro: string;
  areaConocimiento: string;
  observacion: string;
}

interface NivelDetalle {
  nivel: string;
  detalleTitulo: TituloDetalle[];
}

interface SenescytResponse {
  cedula: string;
  nombres: string;
  genero: string | null;
  nacionalidad: string | null;
  detalleNivel: NivelDetalle[];
}

const DEFAULT_API_URL = "https://getdatasenescyt.unemi.edu.ec/ConsulaTitulosEducacionSuperiorSenecyt";

const SenescytLookup = () => {
  const [cedula, setCedula] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<SenescytResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    const cleaned = cedula.trim();
    if (!cleaned || cleaned.length < 10) {
      setError("Por favor, ingrese un número de cédula válido (mínimo 10 dígitos).");
      return;
    }

    setLoading(true);
    setError(null);
    setData(null);
    setSearched(true);

    try {
      const res = await fetch(`${DEFAULT_API_URL}?cedula=${encodeURIComponent(cleaned)}`);
      if (!res.ok) throw new Error("Error al consultar la API");
      const json: SenescytResponse = await res.json();
      setData(json);

      logActivity("consulta_senescyt", {
        cedula: cleaned,
        nombre: json.nombres || "",
        titulos_encontrados: json.detalleNivel?.reduce(
          (acc, n) => acc + (n.detalleTitulo?.filter((t) => t.titulo).length || 0), 0
        ) || 0,
      });
    } catch {
      setError("No se pudo consultar los títulos. Intente nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const hasTitulos = data?.detalleNivel?.some(
    (n) => n.nivel !== "No registra títulos de educación superior" && n.detalleTitulo?.some((t) => t.titulo)
  );

  return (
    <div className="space-y-6">
      <div className="card-elevated p-6 max-w-2xl mx-auto">
        <h2 className="text-center text-xl font-bold text-foreground mb-4 uppercase tracking-wide">
          Consulta de Títulos Registrados
        </h2>
        <div className="flex gap-2">
          <Input
            placeholder="Por favor, ingrese un número de cédula válido"
            value={cedula}
            onChange={(e) => setCedula(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            maxLength={13}
            className="text-center"
          />
          <Button onClick={handleSearch} disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : <Search className="h-4 w-4" />}
            Buscar
          </Button>
        </div>
      </div>

      {error && (
        <div className="card-elevated p-4 max-w-2xl mx-auto flex items-center gap-3 text-destructive">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {data && (
        <div className="card-elevated p-6 space-y-6">
          <div>
            <h3 className="section-title mb-4">
              <div className="icon-badge"><User className="h-5 w-5" /></div>
              Información personal
            </h3>
            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              <div><span className="font-semibold text-foreground">Nombre: </span><span className="text-muted-foreground">{data.nombres || "—"}</span></div>
              <div><span className="font-semibold text-foreground">Cédula: </span><span className="text-muted-foreground">{data.cedula || "—"}</span></div>
              <div><span className="font-semibold text-foreground">Género: </span><span className="text-muted-foreground">{data.genero || "—"}</span></div>
              <div><span className="font-semibold text-foreground">Nacionalidad: </span><span className="text-muted-foreground">{data.nacionalidad || "—"}</span></div>
            </div>
          </div>

          <div>
            <h3 className="section-title mb-4">
              <div className="icon-badge"><GraduationCap className="h-5 w-5" /></div>
              Títulos obtenidos
            </h3>
            {hasTitulos ? (
              data.detalleNivel?.map((nivel, i) => (
                <div key={i} className="mb-4">
                  <p className="text-sm font-semibold text-primary mb-2">{nivel.nivel}</p>
                  <div className="rounded-lg border border-border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted">
                          <TableHead>Detalle</TableHead>
                          <TableHead>Tipo</TableHead>
                          <TableHead>N° Registro</TableHead>
                          <TableHead>Fecha Registro</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {nivel.detalleTitulo.filter((t) => t.titulo).map((titulo, j) => (
                          <TableRow key={j}>
                            <TableCell>
                              <div>
                                <p className="font-medium text-foreground">{titulo.titulo}</p>
                                <p className="text-xs text-muted-foreground">{titulo.institucion}</p>
                              </div>
                            </TableCell>
                            <TableCell className="text-muted-foreground">{titulo.tipo || "—"}</TableCell>
                            <TableCell className="text-muted-foreground">{titulo.numeroRegistro || "—"}</TableCell>
                            <TableCell className="text-muted-foreground">{titulo.fechaRegistro || "—"}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground italic">
                {data.detalleNivel?.[0]?.nivel || "No registra títulos de educación superior"}
              </p>
            )}
          </div>
        </div>
      )}

      {searched && !loading && !data && !error && (
        <p className="text-center text-sm text-muted-foreground">Sin resultados.</p>
      )}
    </div>
  );
};

export default SenescytLookup;
