import {  Users, ClipboardList, BarChart3, Settings, LogOut } from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
//   SidebarTrigger,
  useSidebar,
} from "../ui/sidebar"

interface AppSidebarProps {
  user: {
    name: string;
    id: string;
    department: string;
  };
  onLogout: () => void;
}

const navigationItems = [
  { title: "Overview", url: "/facultydashboard", icon: BarChart3 },
  { title: "Student Management", url: "/facultydashboard/students", icon: Users },
  { title: "Mark Attendance", url: "/facultydashboard/attendance", icon: ClipboardList },
  { title: "Reports", url: "/facultydashboard/reports", icon: BarChart3 },
]

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function AppSidebar({ user, onLogout }: AppSidebarProps) {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname

  const isActive = (path: string) => {
    if (path === "/" && currentPath === "/") return true;
    if (path !== "/" && currentPath.startsWith(path)) return true;
    return false;
  }

  const getNavCls = (path: string) =>
    isActive(path) ? "bg-primary text-primary-foreground font-medium" : ""

  return (
    <Sidebar
      className={state === "collapsed" ? "w-14" : "w-60"}
      collapsible="icon"
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-primary font-semibold text-lg px-4 py-2">
            {state !== "collapsed" && "Faculty Portal"}
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls(item.url)}>
                      <item.icon className="h-4 w-4" />
                      {state !== "collapsed" && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Settings className="h-4 w-4" />
                  {state !== "collapsed" && <span>Settings</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={onLogout}>
                  <LogOut className="h-4 w-4" />
                  {state !== "collapsed" && <span>Logout</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}