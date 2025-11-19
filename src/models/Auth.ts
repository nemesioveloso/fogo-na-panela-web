export interface AuthRequest {
  usernameOrEmail: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
}
