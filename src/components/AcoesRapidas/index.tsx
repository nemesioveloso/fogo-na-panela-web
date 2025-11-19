import * as React from "react";
import { Typography, Icon, Grid, Card } from "@mui/material";

export const AcoesRapidas: React.FC = () => {
  const actions = [
    {
      id: 1,
      title: "Nova Venda",
      desc: "Iniciar uma nova venda no PDV",
      icon: "shopping_cart",
      bg: "#F2C94C",
      fg: "#00114d",
      to: "/pdv/nova-venda",
    },
    {
      id: 2,
      title: "Abrir Caixa",
      desc: "Iniciar operações do caixa",
      icon: "credit_card",
      bg: "#07154A",
      fg: "#FFFFFF",
      to: "/caixa/abrir",
    },
    {
      id: 3,
      title: "Criar Entrega",
      desc: "Agendar nova entrega",
      icon: "local_shipping",
      bg: "#1FA94D",
      fg: "#FFFFFF",
      to: "/entregas/criar",
    },
    {
      id: 4,
      title: "Consultar Produto",
      desc: "Buscar no catálogo",
      icon: "inventory_2",
      bg: "#2E5BF6",
      fg: "#FFFFFF",
      to: "/produtos/consultar",
    },
  ];

  return (
    <Card
      elevation={4}
      sx={{
        mt: 1,
        p: { xs: 2, md: 3 },
        borderRadius: 3,
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        Ações Rápidas
      </Typography>

      <Grid container spacing={2}>
        {actions.map((a) => (
          <Grid key={a.id} size={{ xs: 12, sm: 6, md: 3 }}>
            <Card
              elevation={4}
              sx={{
                background: a.bg,
                color: a.fg,
                padding: "1rem",
                minHeight: "150px",
              }}
            >
              <Icon sx={{ fontSize: 28, mb: 0.5 }}>{a.icon}</Icon>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 700, lineHeight: 1.1 }}
              >
                {a.title}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.95 }}>
                {a.desc}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Card>
  );
};
