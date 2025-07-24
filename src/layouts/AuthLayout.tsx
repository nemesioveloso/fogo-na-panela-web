import { Box, Container, Typography, Button } from "@mui/material";
import { Outlet } from "react-router-dom";
import { appConfig } from "../config/appConfig";

export default function AuthLayout() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <Box
        component="header"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0px 1rem",
          bgcolor: "primary.main",
          color: "#fff",
          py: 2,
        }}
      >
        <Typography variant="h6">BaseProject</Typography>
        <Button variant="contained" color="primary" href="/dashboard">
          Dashboard
        </Button>
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
        <Typography variant="body2">{appConfig.copyright}</Typography>
      </Box>
    </Box>
  );
}
