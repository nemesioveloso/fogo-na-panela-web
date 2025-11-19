export interface DecodedToken {
  sub: string;
  id: number;
  email: string;
  roles: Role[];
  token_type: string;
  iss: string;
  iat: number;
  exp: number;
}

export type Role = "ADMIN" | "CUSTOMER" | "EMPLOYEE";
