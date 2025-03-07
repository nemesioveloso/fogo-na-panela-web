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

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="login" element={<Login />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="dashboardMesas" element={<DashboardMesas />} />
            <Route path="cozinha" element={<PaginaCozinha />} />
            <Route path="criarConta" element={<CriarConta />} />
            <Route path="recuperacaoDeSenha" element={<RecuperarSenha />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
};