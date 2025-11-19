export interface SessionUser {
  id: number;
  username: string;
  email: string;
  roles: string[];
  accessToken: string;
  refreshToken: string;
}
