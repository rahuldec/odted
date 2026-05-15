import { Link } from "@tanstack/react-router";
import { Building2 } from "lucide-react";
import type { Role } from "@/lib/trainees";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function AppHeader({ role, onRoleChange }: { role: Role; onRoleChange: (r: Role) => void }) {
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-4 px-4 py-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Building2 className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-semibold leading-tight text-foreground">
              Okie Dokie Solutions
            </h1>
            <p className="text-xs text-muted-foreground">Training Program Tracker</p>
          </div>
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            to="/levels"
            className="text-sm text-muted-foreground hover:text-foreground"
            activeProps={{ className: "text-foreground font-medium" }}
          >
            Level Reference
          </Link>
          <div className="inline-flex rounded-md border bg-background p-1">
            {(["hr", "management"] as Role[]).map((r) => (
              <Button
                key={r}
                size="sm"
                variant="ghost"
                onClick={() => onRoleChange(r)}
                className={cn(
                  "h-8 px-3 text-xs font-medium capitalize",
                  role === r && "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground",
                )}
              >
                {r === "hr" ? "HR View" : "Management View"}
              </Button>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
