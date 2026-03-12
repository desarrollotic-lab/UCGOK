import { useState, useEffect } from "react";
import { logActivity } from "@/lib/activityLogger";
import { Calculator, Percent, CreditCard, Users, Calendar as CalendarIcon, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Maestria } from "@/data/maestrias";
import { format, addMonths, setDate } from "date-fns";
import { es } from "date-fns/locale";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import ucgLogoFull from "@/assets/ucg-logo-full.png";

interface PaymentCalculatorProps {
  maestria: Maestria | null;
}

type PaymentType = "plan20" | "plan25";

interface AmortizationRow {
  cuota: number;
  fechaPago: Date;
  monto: number;
  saldoPendiente: number;
}

const PaymentCalculator = ({ maestria }: PaymentCalculatorProps) => {
  const [paymentType, setPaymentType] = useState<PaymentType>("plan20");
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [numCuotas, setNumCuotas] = useState<string>("12");
  const [amortizationTable, setAmortizationTable] = useState<AmortizationRow[]>([]);
  const [logoBase64, setLogoBase64] = useState<string>("");

  // Convert logo to base64 on mount
  useEffect(() => {
    const loadLogo = async () => {
      try {
        const response = await fetch(ucgLogoFull);
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = () => {
          setLogoBase64(reader.result as string);
        };
        reader.readAsDataURL(blob);
      } catch (error) {
        console.error("Error loading logo:", error);
      }
    };
    loadLogo();
  }, []);

  const getPaymentDetails = () => {
    if (!maestria) return { total: 0, cuotaMensual: 0, descuento: "0%" };

    const cuotas = parseInt(numCuotas);

    if (paymentType === "plan20") {
      const total = maestria.vFinal20Dscto;
      let cuotaMensual = total;
      if (cuotas === 12 && maestria.cuotas12_20Dscto) cuotaMensual = maestria.cuotas12_20Dscto;
      if (cuotas === 16 && maestria.cuotas16_20Dscto) cuotaMensual = maestria.cuotas16_20Dscto;
      if (cuotas === 18 && maestria.cuotas18_20Dscto) cuotaMensual = maestria.cuotas18_20Dscto;
      return { total, cuotaMensual, descuento: "20%" };
    } else {
      const total = maestria.vFinal25Dscto;
      let cuotaMensual = total;
      if (cuotas === 12 && maestria.cuotas12_25Dscto) cuotaMensual = maestria.cuotas12_25Dscto;
      if (cuotas === 16 && maestria.cuotas16_25Dscto) cuotaMensual = maestria.cuotas16_25Dscto;
      return { total, cuotaMensual, descuento: "25%" };
    }
  };

  const generateAmortizationTable = () => {
    if (!maestria || !startDate) return;

    const cuotas = parseInt(numCuotas);
    const { total, cuotaMensual } = getPaymentDetails();

    const table: AmortizationRow[] = [];
    let saldoPendiente = total;

    if (cuotas === 1) {
      const fechaPago = setDate(startDate, 5);
      table.push({
        cuota: 1,
        fechaPago,
        monto: total,
        saldoPendiente: 0,
      });
    } else {
      for (let i = 0; i < cuotas; i++) {
        const fechaPago = setDate(addMonths(startDate, i), 5);
        const montoActual = i === cuotas - 1
          ? saldoPendiente
          : cuotaMensual;
        saldoPendiente = Math.max(0, saldoPendiente - montoActual);

        table.push({
          cuota: i + 1,
          fechaPago,
          monto: montoActual,
          saldoPendiente,
        });
      }
    }

    setAmortizationTable(table);

    logActivity("calculo_pagos", {
      maestria: maestria.nombre,
      tipo_pago: paymentType,
      cuotas: cuotas,
      total,
    });
  };

  const getPaymentTypeLabel = () => {
    switch (paymentType) {
      case "plan20": return "Plan Crédito Directo (20% descuento)";
      case "plan25": return "Plan Crédito Directo (25% descuento)";
    }
  };

  const downloadPDF = () => {
    if (!maestria || amortizationTable.length === 0) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // Add logo if available
    if (logoBase64) {
      doc.addImage(logoBase64, "PNG", 14, 10, 60, 20);
    }

    // Header - Universidad Casa Grande
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text("POSGRADOS", pageWidth - 14, 18, { align: "right" });

    // Line separator
    doc.setDrawColor(230, 126, 34);
    doc.setLineWidth(0.5);
    doc.line(14, 35, pageWidth - 14, 35);

    // Title
    doc.setFontSize(18);
    doc.setTextColor(44, 62, 80);
    doc.text("Tabla de Amortización", pageWidth / 2, 48, { align: "center" });

    // Info box
    doc.setFillColor(245, 245, 245);
    doc.roundedRect(14, 55, pageWidth - 28, 35, 3, 3, "F");

    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    doc.text(`Programa: ${maestria.nombre}`, 20, 65);
    doc.text(`Tipo de Pago: ${getPaymentTypeLabel()}`, 20, 73);
    doc.text(`Número de Cuotas: ${numCuotas}`, 20, 81);

    const { total } = getPaymentDetails();
    doc.setFontSize(11);
    doc.setTextColor(44, 62, 80);
    doc.text(`Total a Pagar: $${total.toFixed(2)}`, pageWidth - 20, 73, { align: "right" });
    doc.text(`Inscripción: $${maestria.inscripcion}`, pageWidth - 20, 81, { align: "right" });

    // Table
    autoTable(doc, {
      startY: 98,
      head: [["#", "Fecha de Pago", "Monto ($)", "Saldo Pendiente ($)"]],
      body: amortizationTable.map(row => [
        row.cuota.toString(),
        format(row.fechaPago, "dd/MM/yyyy"),
        row.monto.toFixed(2),
        row.saldoPendiente.toFixed(2),
      ]),
      theme: "striped",
      headStyles: {
        fillColor: [230, 126, 34],
        textColor: [255, 255, 255],
        fontStyle: "bold",
        halign: "center",
      },
      styles: {
        halign: "center",
        fontSize: 10,
      },
      columnStyles: {
        0: { cellWidth: 20 },
        1: { cellWidth: 50 },
        2: { cellWidth: 50 },
        3: { cellWidth: 60 },
      },
    });

    // Footer
    const finalY = (doc as any).lastAutoTable.finalY || 98;
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text("Este documento es informativo y no constituye un contrato.", pageWidth / 2, finalY + 15, { align: "center" });
    doc.text(`Generado el ${format(new Date(), "dd/MM/yyyy 'a las' HH:mm")}`, pageWidth / 2, finalY + 20, { align: "center" });
    doc.text("Universidad Casa Grande - Posgrados", pageWidth / 2, finalY + 25, { align: "center" });

    doc.save(`amortizacion_${maestria.nombre.slice(0, 30)}.pdf`);
  };

  if (!maestria) {
    return (
      <div className="card-elevated p-6">
        <div className="section-title mb-4">
          <div className="icon-badge">
            <Calculator className="w-5 h-5" />
          </div>
          <span>Calculadora de Cuotas</span>
        </div>
        <p className="text-muted-foreground text-center py-8">
          Selecciona una maestría para calcular las cuotas
        </p>
      </div>
    );
  }

  const { total, cuotaMensual, descuento } = getPaymentDetails();

  return (
    <div className="card-elevated p-6">
      <div className="section-title mb-6">
        <div className="icon-badge">
          <Calculator className="w-5 h-5" />
        </div>
        <span>Calculadora de Cuotas</span>
      </div>

      {/* Tipo de Descuento */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-muted-foreground mb-3">
          Plan de Descuento
        </label>
        <div className="grid grid-cols-2 gap-3">
          <div
            className={`payment-option ${paymentType === "plan20" ? "payment-option-selected" : "payment-option-unselected"}`}
            onClick={() => { setPaymentType("plan20"); if (numCuotas === "18" && maestria.cuotas18_20Dscto === null) setNumCuotas("16"); }}
          >
            <div className="flex items-center gap-2 mb-1">
              <Percent className="w-4 h-4 text-primary" />
              <span className="font-medium text-sm">Plan 20% Descuento</span>
            </div>
          </div>

          <div
            className={`payment-option ${paymentType === "plan25" ? "payment-option-selected" : "payment-option-unselected"}`}
            onClick={() => { setPaymentType("plan25"); if (numCuotas === "18") setNumCuotas("16"); }}
          >
            <div className="flex items-center gap-2 mb-1">
              <Percent className="w-4 h-4 text-primary" />
              <span className="font-medium text-sm">Plan 25% Descuento</span>
            </div>
          </div>
        </div>
      </div>

      {/* Fecha de Inicio */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-muted-foreground mb-2">
          Fecha de Inicio del Plan
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start text-left font-normal bg-card">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {startDate ? format(startDate, "PPP", { locale: es }) : "Selecciona una fecha"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-card" align="start">
            <Calendar
              mode="single"
              selected={startDate}
              onSelect={setStartDate}
              initialFocus
              className="pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
        <p className="text-xs text-muted-foreground mt-1">
          Los pagos se programarán el día 5 de cada mes
        </p>
      </div>

      {/* Número de Cuotas */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-muted-foreground mb-2">
          Número de Cuotas
        </label>
        <Select value={numCuotas} onValueChange={setNumCuotas}>
          <SelectTrigger className="w-full bg-card">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-card">
            <SelectItem value="1">1 pago (Contado)</SelectItem>
            <SelectItem value="12">12 meses</SelectItem>
            <SelectItem value="16">16 meses</SelectItem>
            {paymentType === "plan20" && maestria.cuotas18_20Dscto && (
              <SelectItem value="18">18 meses</SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>

      {/* Resumen */}
      <div className="p-4 rounded-lg bg-secondary/50 border border-border mb-6">
        <h4 className="font-semibold mb-3">Resumen del Plan</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Precio bruto:</span>
            <span className="font-medium line-through text-muted-foreground">
              ${maestria.precioBruto.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Descuento aplicado:</span>
            <span className="font-medium text-success">{descuento}</span>
          </div>
          <div className="flex justify-between border-t border-border pt-2">
            <span className="text-muted-foreground">Total a pagar:</span>
            <span className="font-bold text-lg">${total.toFixed(2)}</span>
          </div>
          {numCuotas !== "1" && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Cuota mensual:</span>
              <span className="font-medium text-primary">
                ${cuotaMensual.toFixed(2)} x {numCuotas} cuotas
              </span>
            </div>
          )}
          <div className="flex justify-between text-xs pt-1">
            <span className="text-muted-foreground">+ Inscripción:</span>
            <span className="font-medium">${maestria.inscripcion}</span>
          </div>
        </div>
      </div>

      <Button
        onClick={generateAmortizationTable}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        Generar Tabla de Amortización
      </Button>

      {/* Tabla de Amortización */}
      {amortizationTable.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold">Tabla de Amortización</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={downloadPDF}
              className="gap-2"
            >
              <Download className="w-4 h-4" />
              Descargar PDF
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="px-3 py-2 text-left rounded-tl-lg">#</th>
                  <th className="px-3 py-2 text-left">Fecha de Pago</th>
                  <th className="px-3 py-2 text-right">Monto</th>
                  <th className="px-3 py-2 text-right rounded-tr-lg">Saldo</th>
                </tr>
              </thead>
              <tbody>
                {amortizationTable.map((row, idx) => (
                  <tr
                    key={row.cuota}
                    className={idx % 2 === 0 ? "bg-secondary/30" : "bg-card"}
                  >
                    <td className="px-3 py-2 font-medium">{row.cuota}</td>
                    <td className="px-3 py-2">{format(row.fechaPago, "dd/MM/yyyy")}</td>
                    <td className="px-3 py-2 text-right font-medium">${row.monto.toFixed(2)}</td>
                    <td className="px-3 py-2 text-right text-muted-foreground">${row.saldoPendiente.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-header text-header-foreground font-semibold">
                  <td colSpan={2} className="px-3 py-2 rounded-bl-lg">Total</td>
                  <td className="px-3 py-2 text-right">
                    ${amortizationTable.reduce((sum, row) => sum + row.monto, 0).toFixed(2)}
                  </td>
                  <td className="px-3 py-2 rounded-br-lg"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentCalculator;
