export const ADMIN_COOKIE = "admin_session";
export const ADMIN_TOKEN = "sunshoot-authenticated";

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD ?? "sunshoot-admin";
}

export function isAuthenticated(cookieValue: string | undefined): boolean {
  return cookieValue === ADMIN_TOKEN;
}
