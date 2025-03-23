import { Box } from "@mui/material";
import "./App.css";
import { Router } from "./routes/routes";
import { ResponsiveAppBar } from "./components/ResponsiveAppBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function App() {
  return (
    <Box>
      <ToastContainer theme="colored"/>
      <ResponsiveAppBar />
      <Box>
        <Router />
      </Box>
    </Box>
  );
}
