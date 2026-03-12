import SenescytLookup from "@/components/SenescytLookup";

const Senescyt = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground font-serif">Consulta de Títulos - Senescyt</h1>
        <p className="text-muted-foreground mt-1">
          Consulta los títulos de educación superior registrados en la Senescyt.
        </p>
      </div>

      <SenescytLookup />
    </div>
  );
};

export default Senescyt;
