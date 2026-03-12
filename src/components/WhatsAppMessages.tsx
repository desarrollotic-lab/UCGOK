import { useState } from "react";
import { MessageSquare, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Maestria } from "@/data/maestrias";
import { toast } from "sonner";

interface WhatsAppMessagesProps {
  maestria: Maestria | null;
}

const WhatsAppMessages = ({ maestria }: WhatsAppMessagesProps) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!maestria) {
    return (
      <div className="card-elevated p-6">
        <div className="section-title mb-4">
          <div className="icon-badge">
            <MessageSquare className="w-5 h-5" />
          </div>
          <span>Mensajes para WhatsApp</span>
        </div>
        <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
          <MessageSquare className="w-12 h-12 mb-3 opacity-50" />
          <p className="text-center">Selecciona una maestría para generar los mensajes</p>
        </div>
      </div>
    );
  }

  const messages = [
    {
      title: "Mensaje 1: Presentación",
      content: `¡Hola! 👋 Te escribo de la *Universidad Casa Grande*. 

Me gustaría compartirte información sobre nuestra *${maestria.nombre}*.

📚 *Precio regular:* $${maestria.precioBruto.toLocaleString()}
🎓 *Con 50% de beca:* $${maestria.precioCon50Beca.toLocaleString()}
💰 *Inscripción:* Solo $${maestria.inscripcion}

¿Te gustaría conocer nuestras opciones de financiamiento? 😊`,
    },
    {
      title: "Mensaje 2: Opciones de Pago",
      content: `✨ *OPCIONES DE PAGO - ${maestria.nombre}*

💵 *OPCIÓN 1 - CONTADO (55% descuento):*
Total: $${maestria.precioContado55.toFixed(2)}
¡Ahorras más pagando de contado!

📅 *OPCIÓN 2 - DIFERIDO 12 MESES:*
Cuota mensual: $${maestria.creditoDirecto12.toFixed(2)}
Total: $${maestria.precioCon50Beca.toFixed(2)}

📅 *OPCIÓN 3 - DIFERIDO 16 MESES:*
Cuota mensual: $${maestria.creditoDirecto16.toFixed(2)}
Total: $${maestria.precioCon50Beca.toFixed(2)}

¿Cuál opción te interesa más? 🤔`,
    },
    {
      title: "Mensaje 3: Cierre",
      content: `🎯 *¿Por qué elegir la ${maestria.nombre}?*

✅ Modalidad flexible 
✅ Docentes de primer nivel
✅ Título con validez internacional
✅ Red de contactos profesionales

📞 *¡Los cupos son limitados!*

¿Te reservo un espacio? Puedo ayudarte con el proceso de inscripción ahora mismo. 

El valor de inscripción es de solo *$${maestria.inscripcion}* 💪`,
    },
  ];

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      toast.success("Mensaje copiado al portapapeles");
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      toast.error("Error al copiar el mensaje");
    }
  };

  return (
    <div className="card-elevated p-6">
      <div className="section-title mb-6">
        <div className="icon-badge">
          <MessageSquare className="w-5 h-5" />
        </div>
        <span>Mensajes para WhatsApp</span>
      </div>

      <div className="space-y-4">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className="p-4 rounded-lg bg-secondary/50 border border-border hover:border-primary/30 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-sm">{msg.title}</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(msg.content, index)}
                className="gap-2 h-8"
              >
                {copiedIndex === index ? (
                  <>
                    <Check className="w-4 h-4 text-success" />
                    <span className="text-success">Copiado</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copiar</span>
                  </>
                )}
              </Button>
            </div>
            <pre className="whitespace-pre-wrap text-sm text-muted-foreground font-sans leading-relaxed">
              {msg.content}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhatsAppMessages;
