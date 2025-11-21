import { Box, Typography, Grid } from "@mui/material";
import { useAuth } from "../../auth/useAuth";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <Box>
      <Grid container spacing={1}>
        <Grid size={12}>
          <Typography variant="h4">Dashboard</Typography>
        </Grid>
        <Grid size={12}>
          <Typography>
            Bem-vindo, {user?.username} ({user?.roles})
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
