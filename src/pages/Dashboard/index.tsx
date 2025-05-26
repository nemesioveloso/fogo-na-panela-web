import { Box, Typography, Button } from "@mui/material";
import { useAuth } from "../../auth/AuthProvider";

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <Box>
      <Typography variant="h4">Dashboard</Typography>
      <Typography>
        Bem-vindo, {user?.name} ({user?.role})
      </Typography>
      <Button onClick={logout} variant="contained" sx={{ mt: 2 }}>
        Sair
      </Button>
    </Box>
  );
}
