import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MaestriasProvider } from "@/contexts/MaestriasContext";
import { AuthProvider } from "@/contexts/AuthContext";
import DashboardLayout from "@/layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Calculadora from "./pages/Calculadora";
import Senescyt from "./pages/Senescyt";
import Configuracion from "./pages/Configuracion";
import ConfigAPI from "./pages/ConfigAPI";
import ModuleSelection from "./pages/ModuleSelection";
import Configuraciones from "./pages/Configuraciones";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <MaestriasProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<ModuleSelection />} />
              <Route path="/configuraciones" element={<Configuraciones />} />
              <Route element={<DashboardLayout />}>
                <Route path="/tablero" element={<Dashboard />} />
                <Route path="/calculadora" element={<Calculadora />} />
                <Route path="/senescyt" element={<Senescyt />} />
                <Route path="/configuracion" element={<Configuracion />} />
                <Route path="/config-api" element={<ConfigAPI />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </MaestriasProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
