import { Box, Container, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <Box
        component="header"
        sx={{
          bgcolor: "primary.main",
          color: "#fff",
          py: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="h6">BaseProject</Typography>
      </Box>

      {/* Conteúdo */}
      <Container sx={{ flex: 1, py: 4 }}>
        <Outlet />
      </Container>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          bgcolor: "primary.main",
          color: "#fff",
          py: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="body2">
          © {new Date().getFullYear()} BaseProject. Todos os direitos
          reservados.
        </Typography>
      </Box>
    </Box>
  );
}
