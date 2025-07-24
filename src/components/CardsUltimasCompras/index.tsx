import { AccessTime, Fastfood } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  Chip,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { formatarHorario } from "../../function";

interface Pedido {
  id: number;
  cliente: string;
  itens: string[];
  valor: number;
  status: "preparando" | "rota de entrega" | "entregue";
  horario: string;
  avatar?: string;
}

const pedidosExemplo: Pedido[] = [
  {
    id: 1,
    cliente: "Nemésio Veloso",
    itens: ["Big Burger", "Batata Frita", "Coca-Cola"],
    valor: 35.9,
    status: "entregue",
    horario: "2025-07-23T14:30:00",
  },
  {
    id: 2,
    cliente: "Nemésio Veloso",
    itens: ["Cheese Burger", "Onion Rings"],
    valor: 28.5,
    status: "entregue",
    horario: "2025-07-22T14:25:00",
  },
  {
    id: 3,
    cliente: "Nemésio Veloso",
    itens: ["Bacon Burger", "Batata Frita", "Suco Natural"],
    valor: 42.0,
    status: "entregue",
    horario: "2025-07-21T14:15:00",
  },
  {
    id: 4,
    cliente: "Nemésio Veloso",
    itens: ["Veggie Burger", "Salada"],
    valor: 25.9,
    status: "entregue",
    horario: "2025-07-20T14:35:00",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "preparando":
      return "primary";
    case "rota de entrega":
      return "warning";
    case "entregue":
      return "success";
    default:
      return "default";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "preparando":
      return "Preparando";
    case "rota de entrega":
      return "Rota de Entrega";
    case "entregue":
      return "Entregue";
    default:
      return status;
  }
};

export const CardsUltimasCompras = () => {
  const theme = useTheme();

  return (
    <Box>
      <Grid container spacing={1} alignItems="center">
        {pedidosExemplo.map((pedido) => (
          <Grid size={12}>
            <Card
              sx={{
                p: "0.5rem",
                transition: "box-shadow 0.3s ease-in-out",
                boxShadow: theme.shadows[2],
                "&:hover": {
                  boxShadow: theme.shadows[8],
                },
              }}
              elevation={2}
            >
              <Grid container alignItems="center">
                <Grid
                  display="flex"
                  justifyContent="center"
                  size={{ xs: 12, sm: 2, md: 2, lg: 2 }}
                >
                  <Avatar sx={{ height: "6rem", width: "6rem" }} />
                </Grid>
                <Grid size={{ xs: 12, sm: 8, md: 8, lg: 8 }}>
                  <Typography variant="h6">{pedido.cliente}</Typography>
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <AccessTime fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {formatarHorario(pedido.horario)}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <Fastfood fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {pedido.itens.join(", ")}
                    </Typography>
                  </Box>
                  <Chip
                    label={getStatusText(pedido.status)}
                    color={getStatusColor(pedido.status)}
                    size="small"
                    variant="filled"
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 2, md: 2, lg: 2 }}>
                  <Typography color="primary.main" variant="h6">
                    Total:{" "}
                    {pedido.valor.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </Typography>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
