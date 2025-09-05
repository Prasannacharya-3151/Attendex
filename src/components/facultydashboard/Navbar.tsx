import { motion } from "framer-motion";
import { useState } from "react";
import { LayoutDashboard, Users, ClipboardList, BarChart2, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../lib/utils"; // if you have it; else remove cn and inline classes
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import type { JSX } from "react/jsx-runtime";

type TabKey = "overview" | "students" | "attendance" | "reports";

interface NavbarProps {
  active: TabKey;
  onNavigate: (tab: TabKey) => void;
}

export const Navbar = ({ active, onNavigate }: NavbarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const items: { key: TabKey; name: string; icon: JSX.Element }[] = [
    { key: "overview",   name: "Overview",           icon: <LayoutDashboard className="h-5 w-5" /> },
    { key: "students",   name: "Student Management", icon: <Users className="h-5 w-5" /> },
    { key: "attendance", name: "Mark Attendance",    icon: <ClipboardList className="h-5 w-5" /> },
    { key: "reports",    name: "Reports",            icon: <BarChart2 className="h-5 w-5" /> },
  ];

  return (
    <TooltipProvider delayDuration={0}>
      <motion.aside
        animate={{ width: collapsed ? 72 : 256 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="h-screen bg-white border-r shadow-sm flex flex-col"
      >
        {/* Collapse button */}
        <div className="p-3 flex justify-end">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setCollapsed((c) => !c)}
            className="h-8 w-8"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        {/* Title */}
        <div className="px-4 pb-4">
          {!collapsed && <h2 className="text-lg font-semibold">Faculty Panel</h2>}
          {collapsed && <div className="h-6" />}
        </div>

        {/* Menu */}
        <nav className="space-y-1 px-2">
          {items.map((item) => {
            const isActive = active === item.key;
            const btn = (
              <Button
                key={item.key}
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3",
                  isActive ? "bg-primary text-primary-foreground" : "text-gray-700 hover:bg-gray-100"
                )}
                onClick={() => onNavigate(item.key)}
              >
                {item.icon}
                {!collapsed && <span className="truncate">{item.name}</span>}
              </Button>
            );

            return collapsed ? (
              <Tooltip key={item.key}>
                <TooltipTrigger asChild>{btn}</TooltipTrigger>
                <TooltipContent side="right">{item.name}</TooltipContent>
              </Tooltip>
            ) : (
              btn
            );
          })}
        </nav>

        <div className="mt-auto p-4 text-xs text-muted-foreground">
          {!collapsed && <p>© {new Date().getFullYear()} Faculty Portal</p>}
        </div>
      </motion.aside>
    </TooltipProvider>
  );
};
