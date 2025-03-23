export interface DecodedToken {
  sub: string;
  empresaId: number;
  usuarioId: number;
  permissao: string;
  iat: number;
  exp: number;
}
