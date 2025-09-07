// src/components/Navbar.tsx
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  BarChart2,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  BookOpen,
  LogOut as LogOutIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import type { JSX } from "react/jsx-runtime";

type TabKey = "overview" | "students" | "attendance" | "reports";

interface NavbarProps {
  active: TabKey;
  onNavigate: (tab: TabKey) => void;
  onLogout?: () => void;
}

export const Navbar = ({ active, onNavigate, onLogout }: NavbarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);
      if (desktop) setMobileOpen(false);
      else setCollapsed(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const items: { key: TabKey; name: string; icon: JSX.Element }[] = [
    { key: "overview", name: "Overview", icon: <LayoutDashboard className="h-5 w-5" /> },
    { key: "students", name: "Student Management", icon: <Users className="h-5 w-5" /> },
    { key: "attendance", name: "Mark Attendance", icon: <ClipboardList className="h-5 w-5" /> },
    { key: "reports", name: "Reports", icon: <BarChart2 className="h-5 w-5" /> },
  ];

  return (
    <TooltipProvider delayDuration={0}>
      {/* Mobile top bar */}
      <div className="lg:hidden p-3 border-b flex justify-between items-center bg-white z-50 relative">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Faculty Portal</h1>
            <p className="text-sm text-muted-foreground">
              Attendance Management System
            </p>
          </div>
        </div>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setMobileOpen((s) => !s)}
          aria-label="Open menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {mobileOpen && !isDesktop && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden
        />
      )}

      <motion.aside
        animate={{
          width: isDesktop ? (collapsed ? 72 : 256) : (mobileOpen ? 256 : 0),
          x: isDesktop ? 0 : (mobileOpen ? 0 : -256),
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed left-0 top-0 h-full z-50 bg-white border-r shadow-md flex flex-col lg:static lg:z-auto lg:translate-x-0 overflow-hidden"
        style={{ height: isDesktop ? '100vh' : 'auto' }}
        aria-hidden={isDesktop ? false : !mobileOpen}
      >
        {/* Top Section (Logo, Heading, Subheading, Logout, Chevron) */}
        <div className="p-3 border-b flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-md bg-primary text-white flex items-center justify-center">
                <BookOpen className="h-6 w-6" />
              </div>
              {(!collapsed || !isDesktop || mobileOpen) && (
                <div>
                  <div className="font-semibold text-sm">Faculty Portal</div>
                  <div className="text-xs text-muted-foreground">
                    Attendance Management System
                  </div>
                </div>
              )}
            </div>
            {isDesktop && (
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setCollapsed((c) => !c)}
                className="h-8 w-8"
                aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-5 w-5" />}
              </Button>
            )}
          </div>

          {/* Logout inside top section */}
          {(!collapsed || !isDesktop || mobileOpen) && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                onLogout?.();
                if (!isDesktop) setMobileOpen(false);
              }}
              className="flex items-center gap-2 w-full"
            >
              <LogOutIcon className="h-4 w-4" />
              Logout
            </Button>
          )}
        </div>

        {/* Navigation items */}
        <nav className="px-2 py-4 space-y-1 flex-1">
          {items.map((item) => {
            const isActive = active === item.key;
            const content = (
              <button
                key={item.key}
                onClick={() => {
                  onNavigate(item.key);
                  if (!isDesktop) setMobileOpen(false);
                }}
                className={`w-full text-left flex items-center gap-3 px-3 py-2 rounded-md
                  ${isActive ? "bg-primary text-primary-foreground" : "text-gray-700 hover:bg-sky-100"}`}
              >
                {item.icon}
                {(!collapsed || !isDesktop || mobileOpen) && (
                  <span className="truncate text-sm">{item.name}</span>
                )}
              </button>
            );

            return collapsed && isDesktop && !mobileOpen ? (
              <Tooltip key={item.key}>
                <TooltipTrigger asChild>{content}</TooltipTrigger>
                <TooltipContent side="right">{item.name}</TooltipContent>
              </Tooltip>
            ) : (
              <div key={item.key}>{content}</div>
            );
          })}
        </nav>
      </motion.aside>
    </TooltipProvider>
  );
};

export default Navbar;
