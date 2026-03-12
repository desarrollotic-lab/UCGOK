import { useState } from "react";
import MaestriaSelector from "@/components/MaestriaSelector";
import PaymentCalculator from "@/components/PaymentCalculator";
import WhatsAppMessages from "@/components/WhatsAppMessages";
import { Maestria } from "@/data/maestrias";

const Calculadora = () => {
  const [selectedMaestria, setSelectedMaestria] = useState<Maestria | null>(null);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground font-serif">Calculadora de Pagos</h1>
        <p className="text-muted-foreground mt-1">
          Calcula cuotas, genera tablas de amortización y mensajes WhatsApp.
        </p>
      </div>

      <div className="mb-8">
        <MaestriaSelector selectedMaestria={selectedMaestria} onSelect={setSelectedMaestria} />
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <PaymentCalculator maestria={selectedMaestria} />
        <WhatsAppMessages maestria={selectedMaestria} />
      </div>
    </div>
  );
};

export default Calculadora;
