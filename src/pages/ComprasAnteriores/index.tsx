import { Box, Typography } from "@mui/material";
import { CardsUltimasCompras } from "../../components/CardsUltimasCompras";

export const ComprasAnteriores = () => {
  return (
    <Box>
      <Typography variant="h6" textAlign="center" color="initial">
        Compras Anteriores
      </Typography>
      <CardsUltimasCompras />
    </Box>
  );
};
