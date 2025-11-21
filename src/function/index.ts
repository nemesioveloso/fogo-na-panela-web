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

export const maskCPF = (value: string) => {
  let v = value.replace(/\D/g, "").slice(0, 11);

  // aplica máscara
  v = v
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");

  return v;
};

// Validação real do CPF (dígitos verificadores)
export const validateCPF = (cpf: string) => {
  const clean = cpf.replace(/\D/g, "");

  if (clean.length !== 11) return false;

  // CPFs inválidos conhecidos
  if (/^(\d)\1+$/.test(clean)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(clean[i]) * (10 - i);
  let rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(clean[9])) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(clean[i]) * (11 - i);
  rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(clean[10])) return false;

  return true;
};

export const maskPhone = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/g, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .slice(0, 15);
};

export const maskCEP = (value: string) => {
  return value
    .replace(/\D/g, "")
    .slice(0, 8)
    .replace(/(\d{5})(\d)/, "$1-$2");
};

export const validateCEP = (cep: string) => {
  return cep.replace(/\D/g, "").length === 8;
};

export const unmask = (value: string) => value.replace(/\D/g, "");
