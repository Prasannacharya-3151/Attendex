import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { AppSidebar } from "../layout/AppSidebar";
import { Outlet } from "react-router-dom";

interface FacultyDashboardProps {
  user: { name: string; id: string; department: string };
  onLogout: () => void;
}

const FacultyDashboard = ({ user, onLogout }: FacultyDashboardProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar user={user} onLogout={onLogout} />

        <div className="flex-1">
          {/* Header */}
          <header className="h-16 border-b bg-background flex items-center px-4">
            <SidebarTrigger className="mr-4" />
            <div className="flex-1">
              <h1 className="text-xl font-semibold">Faculty Portal</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                Welcome, {user.name}
              </span>
            </div>
          </header>

          {/* Main Content */}
          <main className="p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default FacultyDashboard;
