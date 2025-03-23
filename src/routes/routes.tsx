import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { About } from "../pages/About";
import { NotFound } from "../pages/NotFound";
import { Dashboard } from "../pages/Dashboard";
import { DashboardMesas } from "../pages/Mesa";
import { Login } from "../pages/Login";
import { PaginaCozinha } from "../pages/Cozinha";
import { CriarConta } from "../pages/CriarConta";
import { RecuperarSenha } from "../pages/RecuperacaoDeSenha";
import { useEffect, useState } from "react";
import { getPermissaoFromToken } from "../function/function";

export function Router() {
  const basePath = import.meta.env.VITE_BASE_PATH;
  const [role, setRole] = useState<string | null>(null);
  const handleLoginSuccess = (token: string) => {
    sessionStorage.setItem("authToken", token);
    const decodedRole = getPermissaoFromToken(token);
    setRole(decodedRole);
  };

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    if (token) {
      const decodedRole = getPermissaoFromToken(token);
      setRole(decodedRole);
    }
  }, []);

  return (
    <Routes>
      <Route path={basePath} element={<Home />} />
      <Route
        path={`${basePath}formulario`}
        element={
          role === "ADMIN" || role === "GERENTE" ? (
            <Dashboard />
          ) : (
            <Login onLoginSuccess={handleLoginSuccess} />
          )
        }
      />
      <Route path={`${basePath}about`} element={<About />} />
      <Route
        path={`${basePath}login`}
        element={<Login onLoginSuccess={handleLoginSuccess} />}
      />
      <Route
        path={`${basePath}dashboard`}
        element={
          role === "ADMIN" || role === "GERENTE" ? (
            <Dashboard />
          ) : (
            <Login onLoginSuccess={handleLoginSuccess} />
          )
        }
      />
      <Route
        path={`${basePath}dashboardMesas`}
        element={
          role === "ADMIN" || role === "GERENTE" || role === "USER" ? (
            <DashboardMesas />
          ) : (
            <Login onLoginSuccess={handleLoginSuccess} />
          )
        }
      />
      <Route
        path={`${basePath}cozinha`}
        element={
          role === "ADMIN" || role === "GERENTE" || role === "USER" ? (
            <PaginaCozinha />
          ) : (
            <Login onLoginSuccess={handleLoginSuccess} />
          )
        }
      />
      <Route
        path={`${basePath}criarConta`}
        element={
          role === "ADMIN" || role === "GERENTE" || role === "USER" ? (
            <CriarConta />
          ) : (
            <Login onLoginSuccess={handleLoginSuccess} />
          )
        }
      />
      <Route
        path={`${basePath}recuperacaoDeSenha`}
        element={
          role === "ADMIN" || role === "GERENTE" || role === "USER" ? (
            <RecuperarSenha />
          ) : (
            <Login onLoginSuccess={handleLoginSuccess} />
          )
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
