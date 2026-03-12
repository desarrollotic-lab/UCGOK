import { useState } from "react";
import { Globe, Save, Plus, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface AppSetting {
  id: string;
  setting_key: string;
  setting_value: string;
  label: string;
  description: string;
}

const DEFAULT_SETTINGS: AppSetting[] = [
  {
    id: "1",
    setting_key: "senescyt_api_url",
    setting_value: "https://getdatasenescyt.unemi.edu.ec/ConsulaTitulosEducacionSuperiorSenecyt",
    label: "API Senescyt",
    description: "URL para consulta de títulos registrados",
  },
];

const ConfigAPI = () => {
  const [settings, setSettings] = useState<AppSetting[]>(() => {
    try {
      const saved = localStorage.getItem("ucg-api-settings");
      if (saved) return JSON.parse(saved);
    } catch {}
    return DEFAULT_SETTINGS;
  });
  const [editValues, setEditValues] = useState<Record<string, string>>({});
  const [showAdd, setShowAdd] = useState(false);
  const [newSetting, setNewSetting] = useState({ setting_key: "", setting_value: "", label: "", description: "" });

  const save = (updated: AppSetting[]) => {
    setSettings(updated);
    localStorage.setItem("ucg-api-settings", JSON.stringify(updated));
  };

  const handleUpdate = (id: string, value: string) => {
    save(settings.map((s) => (s.id === id ? { ...s, setting_value: value } : s)));
    setEditValues({});
    toast.success("Configuración actualizada");
  };

  const handleAdd = () => {
    const id = Date.now().toString();
    save([...settings, { ...newSetting, id }]);
    setShowAdd(false);
    setNewSetting({ setting_key: "", setting_value: "", label: "", description: "" });
    toast.success("Configuración agregada");
  };

  const handleDelete = (id: string) => {
    save(settings.filter((s) => s.id !== id));
    toast.success("Configuración eliminada");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-serif flex items-center gap-3">
            <div className="icon-badge"><Globe className="h-5 w-5" /></div>
            Config. APIs
          </h1>
          <p className="text-muted-foreground mt-1">Configura las URLs de las APIs externas.</p>
        </div>
        <Button onClick={() => setShowAdd(true)} className="gap-2" disabled={showAdd}>
          <Plus className="h-4 w-4" /> Agregar
        </Button>
      </div>

      {showAdd && (
        <div className="card-elevated p-5 mb-4 border-2 border-primary/30">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-primary text-sm">Nueva configuración</h3>
            <Button size="sm" variant="ghost" onClick={() => setShowAdd(false)}><X className="h-4 w-4" /></Button>
          </div>
          <div className="grid sm:grid-cols-2 gap-3 mb-3">
            <div>
              <label className="text-[11px] text-muted-foreground font-medium uppercase">Etiqueta</label>
              <Input value={newSetting.label} onChange={(e) => setNewSetting((p) => ({ ...p, label: e.target.value }))} placeholder="Nombre visible" className="mt-1" />
            </div>
            <div>
              <label className="text-[11px] text-muted-foreground font-medium uppercase">Clave</label>
              <Input value={newSetting.setting_key} onChange={(e) => setNewSetting((p) => ({ ...p, setting_key: e.target.value }))} placeholder="mi_api_url" className="mt-1" />
            </div>
          </div>
          <div className="mb-3">
            <label className="text-[11px] text-muted-foreground font-medium uppercase">Valor (URL)</label>
            <Input value={newSetting.setting_value} onChange={(e) => setNewSetting((p) => ({ ...p, setting_value: e.target.value }))} placeholder="https://..." className="mt-1" />
          </div>
          <div className="mb-3">
            <label className="text-[11px] text-muted-foreground font-medium uppercase">Descripción</label>
            <Input value={newSetting.description} onChange={(e) => setNewSetting((p) => ({ ...p, description: e.target.value }))} placeholder="Para qué sirve esta URL" className="mt-1" />
          </div>
          <Button onClick={handleAdd} disabled={!newSetting.setting_key} className="gap-2">
            <Save className="h-4 w-4" /> Guardar
          </Button>
        </div>
      )}

      {settings.length === 0 ? (
        <div className="card-elevated p-12 text-center">
          <Globe className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
          <p className="text-muted-foreground">No hay configuraciones de API aún</p>
        </div>
      ) : (
        <div className="space-y-4">
          {settings.map((s) => {
            const isEditing = s.id in editValues;
            return (
              <div key={s.id} className="card-elevated p-5">
                <div className="flex items-start justify-between mb-2 gap-2">
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">{s.label}</h3>
                    {s.description && <p className="text-xs text-muted-foreground">{s.description}</p>}
                    <p className="text-[10px] text-muted-foreground mt-1 font-mono">clave: {s.setting_key}</p>
                  </div>
                  <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive" onClick={() => handleDelete(s.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Input
                    value={isEditing ? editValues[s.id] : s.setting_value}
                    onChange={(e) => setEditValues((prev) => ({ ...prev, [s.id]: e.target.value }))}
                    onFocus={() => { if (!isEditing) setEditValues((prev) => ({ ...prev, [s.id]: s.setting_value })); }}
                    className="font-mono text-xs"
                  />
                  {isEditing && (
                    <Button size="sm" onClick={() => handleUpdate(s.id, editValues[s.id])} className="gap-1 shrink-0">
                      <Save className="h-4 w-4" /> Guardar
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ConfigAPI;
