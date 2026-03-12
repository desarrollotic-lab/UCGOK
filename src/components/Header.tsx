import ucgLogo from "@/assets/ucg-logo.png";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

const Header = () => {
  const { signOut } = useAuth();

  return (
    <header className="glass-header py-4 px-6 shadow-sm">
      <div className="container mx-auto flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-white/10 rounded-xl p-1.5">
            <img src={ucgLogo} alt="Universidad Casa Grande" className="h-8 object-contain" />
          </div>
          <div className="border-l border-white/20 pl-3">
            <h1 className="text-white font-bold text-sm tracking-wide">Universidad Casa Grande</h1>
            <p className="text-white/50 text-[10px] uppercase tracking-wider">Posgrados</p>
          </div>
        </div>

        <div className="flex-1" />

        <Button
          variant="ghost"
          size="sm"
          onClick={signOut}
          className="text-white/50 hover:text-white hover:bg-white/10 gap-1.5 text-xs"
        >
          <LogOut className="h-3.5 w-3.5" />
          Salir
        </Button>
      </div>
    </header>
  );
};

export default Header;
