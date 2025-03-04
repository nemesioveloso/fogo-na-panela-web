import { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Grid2,
} from "@mui/material";
import { containerResponsivePadding } from "../../models/ResponsivePadding";

interface ItemPedido {
  nome: string;
  quantidade: number;
}

interface Pedido {
  id: number;
  mesa: number;
  itens: ItemPedido[];
  status: "Em andamento" | "Pronto";
}

export function PaginaCozinha() {
  const [pedidos, setPedidos] = useState<Pedido[]>([
    {
      id: 1,
      mesa: 2,
      itens: [
        { nome: "Hambúrguer", quantidade: 2 },
        { nome: "Batata Frita", quantidade: 1 },
      ],
      status: "Em andamento",
    },
    {
      id: 2,
      mesa: 5,
      itens: [
        { nome: "Pizza Margherita", quantidade: 1 },
        { nome: "Refrigerante", quantidade: 2 },
      ],
      status: "Em andamento",
    },
    {
      id: 3,
      mesa: 1,
      itens: [{ nome: "Salada", quantidade: 3 }],
      status: "Pronto",
    },
  ]);

  /** Função para mudar status do pedido para "Pronto" */
  const handlePedidoPronto = (id: number) => {
    setPedidos((prev) =>
      prev.map((pedido) =>
        pedido.id === id ? { ...pedido, status: "Pronto" } : pedido
      )
    );
  };

  // Filtra para exibir apenas os pedidos cujo status NÃO é "Pronto"
  const pedidosEmAndamento = pedidos.filter(
    (pedido) => pedido.status !== "Pronto"
  );

  return (
    <Box sx={containerResponsivePadding}>
      <Typography variant="h4" gutterBottom textAlign='center'>
        Pedidos da Cozinha
      </Typography>
      <Grid2 container spacing={2} p={1}>
        {pedidosEmAndamento.map((pedido) => (
          <Grid2
            size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
            key={pedido.id}
          >
            <Card sx={{ minHeight: 200 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Mesa: {pedido.mesa}
                </Typography>

                {pedido.itens.map((item, index) => (
                  <Typography key={index} variant="body2">
                    {item.quantidade}x {item.nome}
                  </Typography>
                ))}

                <Typography variant="body2" sx={{ mt: 1 }}>
                  <strong>Status:</strong> {pedido.status}
                </Typography>
              </CardContent>

              <CardActions>
                {pedido.status === "Em andamento" && (
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handlePedidoPronto(pedido.id)}
                  >
                    Marcar como Pronto
                  </Button>
                )}
              </CardActions>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
}
