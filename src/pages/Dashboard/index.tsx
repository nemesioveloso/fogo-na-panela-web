import { Box, Typography, Grid } from "@mui/material";
import { CardGererics } from "../../components/CardGenerics";
import { AcoesRapidas } from "../../components/AcoesRapidas";
import { useAuth } from "../../auth/useAuth";

export default function Dashboard() {
  const { user } = useAuth();
  const statCardsData = [
    {
      id: 1,
      titulo: "Novos clientes",
      valor: "42",
      icon: "person_add",
      iconColor: "#1565c0",
      iconBackground: "rgba(21,101,192,0.15)",
      subtitle: "+3,1%",
      subtitleColor: "#1565c0",
      progress: 72,
    },
    {
      id: 2,
      titulo: "Vendas do dia",
      valor: "12.540",
      icon: "show_chart",
      iconColor: "#0a720a",
      iconBackground: "rgba(10,114,10,0.13)",
      subtitle: "+12,5%",
      subtitleColor: "#0a720a",
      progress: 50,
    },
    {
      id: 3,
      titulo: "Pedidos pendentes",
      valor: "18",
      icon: "pending_actions",
      iconColor: "#f57c00",
      iconBackground: "rgba(245,124,0,0.15)",
      subtitle: "-4,2%",
      subtitleColor: "#f57c00",
      progress: 30,
    },
    {
      id: 4,
      titulo: "Produtos em estoque",
      valor: "350",
      icon: "inventory_2",
      iconColor: "#8e24aa",
      iconBackground: "rgba(142,36,170,0.15)",
      subtitle: "+1,8%",
      subtitleColor: "#8e24aa",
      progress: 80,
    },
    {
      id: 5,
      titulo: "Usuários ativos",
      valor: "1.200",
      icon: "groups",
      iconColor: "#0288d1",
      iconBackground: "rgba(2,136,209,0.15)",
      subtitle: "+6,7%",
      subtitleColor: "#0288d1",
      progress: 90,
    },
    {
      id: 6,
      titulo: "Faturamento mensal",
      valor: "48.500",
      icon: "attach_money",
      iconColor: "#2e7d32",
      iconBackground: "rgba(46,125,50,0.15)",
      subtitle: "+15,4%",
      subtitleColor: "#2e7d32",
      progress: 65,
    },
    {
      id: 7,
      titulo: "Tickets resolvidos",
      valor: "95",
      icon: "support_agent",
      iconColor: "#d81b60",
      iconBackground: "rgba(216,27,96,0.15)",
      subtitle: "+9,3%",
      subtitleColor: "#d81b60",
      progress: 88,
    },
    {
      id: 8,
      titulo: "Visitas no site",
      valor: "7.600",
      icon: "public",
      iconColor: "#6d4c41",
      iconBackground: "rgba(109,76,65,0.15)",
      caption: "8 entregues hoje",
      subtitle: "+2,5%",
      subtitleColor: "#6d4c41",
      progress: 40,
    },
  ];

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
        <Grid size={12}>
          <CardGererics data={statCardsData} />
        </Grid>
        <Grid size={12}>
          <AcoesRapidas />
        </Grid>
      </Grid>
    </Box>
  );
}
