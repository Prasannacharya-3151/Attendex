import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "../ui/sidebar"
import {
  LayoutDashboard,
  Users,
  ClipboardCheck,
  FileText,
  LogOut,
  GraduationCap,
} from "lucide-react"

interface NavigationItem {
  title: string
  icon: React.ComponentType<{ className?: string }>
  id: string
}

interface AppSidebarProps {
  activeTab: string
  onTabChange: (tabId: string) => void
  onLogout?: () => void
}

const navigationItems: NavigationItem[] = [
  {
    title: "Overview",
    icon: LayoutDashboard,
    id: "overview",
  },
  {
    title: "Student Management",
    icon: Users,
    id: "students",
  },
  {
    title: "Mark Attendance",
    icon: ClipboardCheck,
    id: "attendance",
  },
  {
    title: "Reports",
    icon: FileText,
    id: "reports",
  },
]

export function AppSidebarRefactored({ activeTab, onTabChange, onLogout }: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-2 py-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <GraduationCap className="size-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">Faculty Portal</span>
            <span className="text-xs text-muted-foreground">Attendance Management</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {navigationItems.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                isActive={activeTab === item.id}
                onClick={() => onTabChange(item.id)}
                className="w-full"
              >
                <item.icon className="size-4" />
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              onClick={onLogout}
              className="w-full text-destructive hover:bg-destructive/10"
            >
              <LogOut className="size-4" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}