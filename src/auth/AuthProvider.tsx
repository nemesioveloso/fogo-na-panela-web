import { createContext, useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import { toast } from "react-toastify";
import { createSession } from "../function";
import type { SessionUser } from "../models/SessionUser";

interface AuthContextType {
  user: SessionUser | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const saved = sessionStorage.getItem("user");
    if (saved) {
      const parsed: SessionUser = JSON.parse(saved);
      setUser(parsed);
      setToken(parsed.accessToken);
    }
  }, []);

  const login = async (usernameOrEmail: string, password: string) => {
    const res = await authService.login({ usernameOrEmail, password });

    if (res.error || !res.data) {
      return;
    }

    const sessionUser = createSession(res.data);

    setUser(sessionUser);
    setToken(sessionUser.accessToken);

    toast.success(res.data.message);
    navigate("/dashboard");
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    sessionStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
