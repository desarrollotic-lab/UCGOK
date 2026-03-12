import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import {
  Calculator,
  GraduationCap,
  Settings,
  Menu,
  X,
  LayoutDashboard,
  ChevronRight,
  ChevronLeft,
  Globe,
} from "lucide-react";
import ucgLogo from "@/assets/ucg-logo.png";

const DashboardSidebar = () => {
  const location = useLocation();
  const { profile } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: "Tablero Pancake", icon: LayoutDashboard, to: "/tablero" },
    { label: "Calc. Pagos", icon: Calculator, to: "/calculadora" },
    { label: "Consulta Títulos", icon: GraduationCap, to: "/senescyt" },
  ];

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-card shadow-md border border-border"
      >
        <Menu className="h-5 w-5 text-foreground" />
      </button>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setMobileOpen(false)} />
      )}

      <aside
        className={cn(
          "fixed left-0 top-0 h-full bg-card border-r border-border z-50 flex flex-col transition-all duration-300",
          collapsed ? "w-[68px]" : "w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <img src={ucgLogo} alt="UCG" className="h-9 w-9 object-contain shrink-0" />
            {!collapsed && (
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-foreground truncate">Tablero Pancake</p>
                <p className="text-[10px] text-muted-foreground truncate">Posgrados UCG</p>
              </div>
            )}
            <button onClick={() => setMobileOpen(false)} className="lg:hidden ml-auto p-1 rounded hover:bg-muted">
              <X className="h-4 w-4" />
            </button>
          </div>
          <Link
            to="/"
            className="flex items-center gap-1 mt-2 text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            <ChevronLeft className="h-3 w-3" />
            {!collapsed && <span>Volver a módulos</span>}
          </Link>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {!collapsed && <span className="truncate">{item.label}</span>}
                {!collapsed && isActive && <ChevronRight className="h-4 w-4 ml-auto shrink-0" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-border space-y-2">
          <div className="flex items-center px-3 py-2">
            {!collapsed && (
              <div className="min-w-0">
                <p className="text-xs font-medium text-foreground truncate">
                  {profile?.full_name || "Usuario"}
                </p>
                <p className="text-[10px] text-muted-foreground">Admin</p>
              </div>
            )}
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-foreground w-full transition-colors"
          >
            <Menu className="h-5 w-5 shrink-0" />
            {!collapsed && <span>Colapsar</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
