import type { AuthResponse } from "../models/Auth";
import type { DecodedToken } from "../models/DecodedToken";
import type { SessionUser } from "../models/SessionUser";

export function formatarHorario(datetime: string): string {
  return new Date(datetime).toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

export function decodeJwt<T>(token: string): T {
  const base64 = token.split(".")[1];
  const normalized = base64.replace(/-/g, "+").replace(/_/g, "/");
  const json = atob(normalized);
  return JSON.parse(json);
}

export function createSession(auth: AuthResponse) {
  const decoded = decodeJwt<DecodedToken>(auth.accessToken);

  const sessionUser: SessionUser = {
    id: decoded.id,
    username: decoded.sub,
    email: decoded.email,
    roles: decoded.roles,
    accessToken: auth.accessToken,
    refreshToken: auth.refreshToken,
  };

  sessionStorage.setItem("user", JSON.stringify(sessionUser));

  return sessionUser;
}
