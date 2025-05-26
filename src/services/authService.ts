import { apiService } from "../api/request";
import type { AuthRequest, AuthResponse } from "../models/Auth";

export const authService = {
  login: (data: AuthRequest) =>
    apiService.post<AuthResponse>("/auth/login", data),
};
