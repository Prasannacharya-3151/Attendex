import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, ClipboardList, BarChart2 } from "lucide-react";

const Navbar = () => {
  const location = useLocation();

  const menuItems = [
    { name: "Overview", icon: <LayoutDashboard className="h-5 w-5" />, path: "/overview" },
    { name: "Student Management", icon: <Users className="h-5 w-5" />, path: "/student-management" },
    { name: "Mark Attendance", icon: <ClipboardList className="h-5 w-5" />, path: "/mark-attendance" },
    { name: "Reports", icon: <BarChart2 className="h-5 w-5" />, path: "/reports" },
  ];

  return (
    <aside className="w-64 h-screen bg-white border-r shadow-sm p-4">
      <h2 className="text-lg font-semibold mb-6">Faculty Panel</h2>
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors
                ${isActive ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"}
              `}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Navbar;
