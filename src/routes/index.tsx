import { createFileRoute, redirect } from "@tanstack/react-router";
import { getAuthRole } from "@/lib/auth";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    const role = getAuthRole();
    if (!role) {
      throw redirect({
        to: "/login",
        search: {
          redirect: undefined,
        },
        replace: true,
      });
    }
    if (role === "admin") {
      throw redirect({
        to: "/dashboard",
        replace: true,
      });
    }
    if (role === "trainee") {
      throw redirect({
        to: "/modules",
        replace: true,
      });
    }
  },
});
