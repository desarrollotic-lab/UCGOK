import { useState } from "react";
import { useMaestrias } from "@/contexts/MaestriasContext";
import { Settings, RotateCcw, Edit2, Check, X, Plus, Trash2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Maestria } from "@/data/maestrias";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const emptyMaestria: Omit<Maestria, "id"> = {
  nombre: "",
  precioBruto: 0,
  inscripcion: 100,
  vFinal20Dscto: 0,
  cuotas12_20Dscto: null,
  cuotas16_20Dscto: null,
  cuotas18_20Dscto: null,
  vFinal25Dscto: 0,
  cuotas12_25Dscto: null,
  cuotas16_25Dscto: null,
};

const Configuracion = () => {
  const { maestrias, updateMaestria, addMaestria, deleteMaestria, toggleVisibility, resetToDefaults } = useMaestrias();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<Maestria>>({});
  const [isAdding, setIsAdding] = useState(false);
  const [newForm, setNewForm] = useState<Omit<Maestria, "id">>(emptyMaestria);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  const startEdit = (m: Maestria) => {
    setEditingId(m.id);
    setEditForm({
      nombre: m.nombre,
      precioBruto: m.precioBruto,
      inscripcion: m.inscripcion,
      vFinal20Dscto: m.vFinal20Dscto,
      cuotas12_20Dscto: m.cuotas12_20Dscto,
      cuotas16_20Dscto: m.cuotas16_20Dscto,
      cuotas18_20Dscto: m.cuotas18_20Dscto,
      vFinal25Dscto: m.vFinal25Dscto,
      cuotas12_25Dscto: m.cuotas12_25Dscto,
      cuotas16_25Dscto: m.cuotas16_25Dscto,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEdit = () => {
    if (editingId === null) return;
    updateMaestria(editingId, editForm);
    setEditingId(null);
    setEditForm({});
    toast.success("Maestría actualizada correctamente");
  };

  const handleAdd = () => {
    if (!newForm.nombre.trim()) {
      toast.error("El nombre de la maestría es obligatorio");
      return;
    }
    addMaestria(newForm);
    setNewForm(emptyMaestria);
    setIsAdding(false);
    toast.success("Maestría agregada correctamente");
  };

  const handleDelete = (id: number) => {
    deleteMaestria(id);
    setConfirmDeleteId(null);
    toast.success("Maestría eliminada");
  };

  const handleReset = () => {
    resetToDefaults();
    toast.success("Precios restaurados a los valores originales");
  };

  const numericFields: { key: keyof Maestria; label: string }[] = [
    { key: "precioBruto", label: "Precio Bruto" },
    { key: "inscripcion", label: "Inscripción" },
    { key: "vFinal20Dscto", label: "V. Final 20% Dsc" },
    { key: "cuotas12_20Dscto", label: "12 Cuotas 20%" },
    { key: "cuotas16_20Dscto", label: "16 Cuotas 20%" },
    { key: "cuotas18_20Dscto", label: "18 Cuotas 20%" },
    { key: "vFinal25Dscto", label: "V. Final 25% Dsc" },
    { key: "cuotas12_25Dscto", label: "12 Cuotas 25%" },
    { key: "cuotas16_25Dscto", label: "16 Cuotas 25%" },
  ];

  const visibleCount = maestrias.filter(m => m.visible !== false).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-serif flex items-center gap-3">
            <div className="icon-badge">
              <Settings className="h-5 w-5" />
            </div>
            Configuración
          </h1>
          <p className="text-muted-foreground mt-1">
            Agrega, edita o elimina maestrías. Los cambios se reflejan automáticamente.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReset} className="gap-2">
            <RotateCcw className="h-4 w-4" />
            Restaurar
          </Button>
          <Button onClick={() => setIsAdding(true)} className="gap-2" disabled={isAdding}>
            <Plus className="h-4 w-4" />
            Agregar
          </Button>
        </div>
      </div>

      <Tabs defaultValue="precios" className="space-y-6">
        <TabsList>
          <TabsTrigger value="precios">Precios</TabsTrigger>
          <TabsTrigger value="visibilidad" className="gap-2">
            <Eye className="h-4 w-4" />
            Visibilidad
          </TabsTrigger>
        </TabsList>

        <TabsContent value="visibilidad">
          <div className="card-elevated p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-foreground">Maestrías visibles en Calculadora</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Activa o desactiva las maestrías que se muestran en el selector. {visibleCount} de {maestrias.length} activas.
                </p>
              </div>
            </div>
            <div className="space-y-3">
              {maestrias.map((m) => (
                <div
                  key={m.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {m.visible !== false ? (
                      <Eye className="h-4 w-4 text-primary shrink-0" />
                    ) : (
                      <EyeOff className="h-4 w-4 text-muted-foreground shrink-0" />
                    )}
                    <span className={`text-sm ${m.visible !== false ? "text-foreground" : "text-muted-foreground line-through"}`}>
                      {m.nombre}
                    </span>
                  </div>
                  <Switch
                    checked={m.visible !== false}
                    onCheckedChange={() => toggleVisibility(m.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="precios">
          {/* Add new maestría form */}
          {isAdding && (
            <div className="card-elevated p-5 mb-4 border-2 border-primary/30">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-primary text-sm">Nueva Maestría</h3>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" onClick={() => { setIsAdding(false); setNewForm(emptyMaestria); }}>
                    <X className="h-4 w-4" />
                  </Button>
                  <Button size="sm" onClick={handleAdd} className="gap-1">
                    <Check className="h-4 w-4" />
                    Guardar
                  </Button>
                </div>
              </div>
              <div className="mb-3">
                <label className="text-[11px] text-muted-foreground font-medium uppercase tracking-wide">
                  Nombre del programa
                </label>
                <Input
                  value={newForm.nombre}
                  onChange={(e) => setNewForm((prev) => ({ ...prev, nombre: e.target.value }))}
                  placeholder="Ej: Maestría en..."
                  className="mt-1"
                />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {numericFields.map((f) => (
                  <div key={f.key}>
                    <label className="text-[11px] text-muted-foreground font-medium uppercase tracking-wide">
                      {f.label}
                    </label>
                    <Input
                      type="number"
                      step="0.01"
                      value={(newForm[f.key as keyof typeof newForm] as number) ?? ""}
                      onChange={(e) =>
                        setNewForm((prev) => ({
                          ...prev,
                          [f.key]: parseFloat(e.target.value) || 0,
                        }))
                      }
                      className="h-8 text-sm mt-1"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-4">
            {maestrias.map((m) => {
              const isEditing = editingId === m.id;
              const isConfirmingDelete = confirmDeleteId === m.id;

              return (
                <div key={m.id} className={`card-elevated p-5 ${m.visible === false ? "opacity-50" : ""}`}>
                  <div className="flex items-start justify-between mb-3 gap-2">
                    {isEditing ? (
                      <Input
                        value={editForm.nombre ?? ""}
                        onChange={(e) => setEditForm((prev) => ({ ...prev, nombre: e.target.value }))}
                        className="text-sm font-semibold max-w-md"
                      />
                    ) : (
                      <div className="flex items-center gap-2">
                        {m.visible === false && <EyeOff className="h-4 w-4 text-muted-foreground shrink-0" />}
                        <h3 className="font-semibold text-foreground text-sm">{m.nombre}</h3>
                      </div>
                    )}

                    <div className="flex gap-1 shrink-0">
                      {isEditing ? (
                        <>
                          <Button size="sm" variant="ghost" onClick={cancelEdit}>
                            <X className="h-4 w-4" />
                          </Button>
                          <Button size="sm" onClick={saveEdit} className="gap-1">
                            <Check className="h-4 w-4" />
                            Guardar
                          </Button>
                        </>
                      ) : isConfirmingDelete ? (
                        <>
                          <Button size="sm" variant="ghost" onClick={() => setConfirmDeleteId(null)}>
                            Cancelar
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleDelete(m.id)} className="gap-1">
                            <Trash2 className="h-4 w-4" />
                            Confirmar
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button size="sm" variant="ghost" onClick={() => startEdit(m)} className="gap-1">
                            <Edit2 className="h-4 w-4" />
                            Editar
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => setConfirmDeleteId(m.id)} className="text-destructive hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {numericFields.map((f) => (
                      <div key={f.key}>
                        <label className="text-[11px] text-muted-foreground font-medium uppercase tracking-wide">
                          {f.label}
                        </label>
                        {isEditing ? (
                          <Input
                            type="number"
                            step="0.01"
                            value={(editForm[f.key] as number) ?? ""}
                            onChange={(e) =>
                              setEditForm((prev) => ({
                                ...prev,
                                [f.key]: parseFloat(e.target.value) || 0,
                              }))
                            }
                            className="h-8 text-sm mt-1"
                          />
                        ) : (
                          <p className="text-sm font-medium text-foreground mt-1">
                            ${(m[f.key] as number).toFixed(2)}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Configuracion;
