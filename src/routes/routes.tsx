import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { About } from "../pages/About";
import { NotFound } from "../pages/NotFound";
import { Dashboard } from "../pages/Dashboard";
import { DashboardMesas } from "../pages/Mesa";

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="dashboardMesas" element={<DashboardMesas />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
};