export type AuthRole = "admin" | "trainee";

export function getAuthRole(): AuthRole | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem("odk-auth-role") as AuthRole | null;
}

export function isAuthenticated(): boolean {
  return getAuthRole() !== null;
}

export function loginAsAdmin(username: string, pass: string): boolean {
  if (username.trim() === "admin" && pass === "rahul-ranger") {
    sessionStorage.setItem("odk-auth-role", "admin");
    return true;
  }
  return false;
}

export function loginAsTrainee(): void {
  sessionStorage.setItem("odk-auth-role", "trainee");
}

export function logout() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem("odk-auth-role");
}
