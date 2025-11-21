import { Box, Container, Typography, Button, Link } from "@mui/material";
import { Outlet } from "react-router-dom";
import { appConfig } from "../config/appConfig";

export default function PublicLayout() {
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
        <Typography variant="h6">
          <Link href={"/"} sx={{ color: "#f7f7f7", textDecoration: "none" }}>
            BaseProject
          </Link>
        </Typography>
        <Button variant="contained" color="primary" href="/dashboard">
          Dashboard
        </Button>
      </Box>

      {/* Conteúdo */}
      <Container sx={{ flex: 1, padding: { xs: 1, sm: 1, md: 2, lg: 4 } }}>
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
