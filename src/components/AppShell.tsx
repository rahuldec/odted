import type { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Toaster } from "@/components/ui/sonner";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b bg-card/80 px-3 backdrop-blur sm:px-4">
            <SidebarTrigger />
            <div className="hidden sm:block">
              <h1 className="text-sm font-semibold leading-tight">Okie Dokie Solutions</h1>
              <p className="text-[11px] text-muted-foreground">Training Program Tracker</p>
            </div>
          </header>
          <main className="flex-1 px-3 py-4 sm:px-6 sm:py-6">{children}</main>
          <Toaster />
        </div>
      </div>
    </SidebarProvider>
  );
}
