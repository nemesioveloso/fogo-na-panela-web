import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";

export interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "manager" | "user";
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const devMode = true;

    if (devMode) {
      const fakeUser: User = {
        id: 1,
        name: "Admin Teste",
        email: "admin@teste.com",
        role: "admin",
      };

      setUser(fakeUser);
      setToken("fake-token");

      localStorage.setItem("token", "fake-token");
      localStorage.setItem("user", JSON.stringify(fakeUser));
    } else {
      const savedToken = localStorage.getItem("token");
      const savedUser = localStorage.getItem("user");

      if (savedToken && savedUser) {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    const { data, error } = await authService.login({ email, password });

    if (error) throw new Error(error.message);

    setToken(data!.token);
    setUser(data!.user);

    localStorage.setItem("token", data!.token);
    localStorage.setItem("user", JSON.stringify(data!.user));

    navigate("/dashboard");
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
