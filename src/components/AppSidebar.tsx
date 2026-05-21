import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard,
  BookOpen,
  ListChecks,
  BarChart3,
  FileText,
  Award,
  Layers,
  LogOut,
  LogIn,
} from "lucide-react";
import logoUrl from "@/assets/okie-dokie-logo.png";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { getAuthRole, logout } from "@/lib/auth";

const main = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Training Modules", url: "/modules", icon: BookOpen },
  { title: "Progress Tracker", url: "/progress", icon: ListChecks },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Reports", url: "/reports", icon: FileText },
  { title: "Certificates", url: "/certificates", icon: Award },
] as const;

const secondary = [{ title: "Level Reference", url: "/levels", icon: Layers }] as const;

export function AppSidebar() {
  const navigate = useNavigate();
  const path = useRouterState({ select: (r) => r.location.pathname });
  const role = getAuthRole();

  const isActive = (url: string) => {
    if (url === "/modules" && (path === "/modules" || path === "/training" || path === "/training-module")) {
      return true;
    }
    return path === url;
  };

  const visibleMain = role === "admin"
    ? main
    : [{ title: "Training Modules", url: "/modules", icon: BookOpen }];

  const visibleSecondary = role === "admin"
    ? secondary
    : [];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-md bg-background">
            <img src={logoUrl} alt="Okie Dokie Solutions logo" className="h-full w-full object-contain" />
          </div>
          <div className="min-w-0 group-data-[collapsible=icon]:hidden">
            <p className="truncate text-sm font-semibold leading-tight">Okie Dokie</p>
            <p className="truncate text-[11px] text-muted-foreground">Training Tracker</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {visibleMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)} tooltip={item.title}>
                    <Link to={item.url} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {visibleSecondary.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel>Reference</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {visibleSecondary.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive(item.url)} tooltip={item.title}>
                      <Link to={item.url} className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            {role ? (
              <SidebarMenuButton
                onClick={() => {
                  logout();
                  navigate({ to: "/login", search: { redirect: undefined } });
                }}
                tooltip="Sign Out"
              >
                <LogOut className="h-4 w-4 text-destructive" />
                <span className="text-destructive">Sign Out</span>
              </SidebarMenuButton>
            ) : (
              <SidebarMenuButton asChild tooltip="Sign In">
                <Link to="/login" search={{ redirect: path }} className="flex items-center gap-2">
                  <LogIn className="h-4 w-4" />
                  <span>Sign In</span>
                </Link>
              </SidebarMenuButton>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
