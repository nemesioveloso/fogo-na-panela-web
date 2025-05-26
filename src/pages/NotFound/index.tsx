import { Box, Typography, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function NotFound() {
  return (
    <Box
      sx={{
        textAlign: "center",
        mt: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Typography variant="h1" color="primary">
        404
      </Typography>
      <Typography variant="h5">Página não encontrada</Typography>
      <Typography variant="body1">
        A página que você está procurando não existe ou foi movida.
      </Typography>
      <Button variant="contained" color="primary" component={RouterLink} to="/">
        Voltar para Home
      </Button>
    </Box>
  );
}
