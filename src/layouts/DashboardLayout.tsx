import { Outlet } from "react-router-dom";
import DashboardSidebar from "@/components/DashboardSidebar";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      {/* Main content offset by sidebar width */}
      <main className="lg:ml-64 min-h-screen transition-all duration-300">
        <div className="container mx-auto px-4 py-6 max-w-6xl pt-16 lg:pt-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
