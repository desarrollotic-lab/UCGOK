import { useState } from "react";
import { Bell } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const NotificationBell = () => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
          <Bell className="h-5 w-5 text-muted-foreground" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0 bg-card" sideOffset={8}>
        <div className="px-4 py-3 border-b border-border">
          <h4 className="font-semibold text-sm text-foreground">Notificaciones</h4>
        </div>
        <p className="text-sm text-muted-foreground text-center py-8">Sin notificaciones</p>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationBell;
