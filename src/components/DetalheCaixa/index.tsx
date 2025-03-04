import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, Grid } from "@mui/material";

// Exemplo de interface da Mesa
interface Detalhe {
  categoria: string;
  nome: string;
  quantidade: number;
  precoUnitario: number;
}
interface Mesa {
  id: number;
  status: "Aberta" | "Fechada";
  total: number;
  pagamento: "dinheiro" | "cartao" | "pix";
  detalhes: Detalhe[];
}

interface DetalheCaixaProps {
  open: boolean;
  onClose: () => void;
}

export function DetalheCaixa({ open, onClose }: DetalheCaixaProps) {
  const [mesas, setMesas] = useState<Mesa[]>([]);

  // Simulando a consulta das mesas do dia
  useEffect(() => {
    if (open) {
      // Quando o diálogo abrir, "simulamos" uma fetch/consulta e carregamos as mesas
      const mesasDoDia: Mesa[] = [
        {
          id: 1,
          status: "Aberta",
          total: 120.5,
          pagamento: "dinheiro",
          detalhes: [
            {
              categoria: "Comida",
              nome: "Hambúrguer",
              quantidade: 2,
              precoUnitario: 15.0,
            },
            {
              categoria: "Bebida",
              nome: "Cerveja",
              quantidade: 3,
              precoUnitario: 6.0,
            },
            {
              categoria: "Comida",
              nome: "Batata Frita",
              quantidade: 1,
              precoUnitario: 10.5,
            },
          ],
        },
        {
          id: 2,
          status: "Aberta",
          total: 75.0,
          pagamento: "cartao",
          detalhes: [
            {
              categoria: "Bebida",
              nome: "Refrigerante",
              quantidade: 2,
              precoUnitario: 5.0,
            },
            {
              categoria: "Bebida",
              nome: "Skol",
              quantidade: 5,
              precoUnitario: 7.0,
            },
            {
              categoria: "Comida",
              nome: "Salada",
              quantidade: 1,
              precoUnitario: 15.0,
            },
            {
              categoria: "Comida",
              nome: "Panelada",
              quantidade: 2,
              precoUnitario: 20.0,
            },
          ],
        },
        {
          id: 3,
          status: "Fechada",
          total: 200.0,
          pagamento: "pix",
          detalhes: [
            {
              categoria: "Comida",
              nome: "Pizza Margherita",
              quantidade: 2,
              precoUnitario: 30.0,
            },
            {
              categoria: "Bebida",
              nome: "Cerveja",
              quantidade: 4,
              precoUnitario: 5.0,
            },
            {
              categoria: "Comida",
              nome: "Sobremesa",
              quantidade: 2,
              precoUnitario: 20.0,
            },
          ],
        },
        // ... e assim por diante
      ];
      setMesas(mesasDoDia);
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Detalhe do Caixa - Mesas do Dia</DialogTitle>
      <DialogContent dividers>
        {mesas.map((mesa) => (
          <Box key={mesa.id} mb={2} p={2} border="1px solid #ccc" borderRadius={1}>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Mesa {mesa.id}</strong> - Status: {mesa.status} - Pagamento: <em>{mesa.pagamento}</em>
            </Typography>
            <Grid container spacing={1}>
              {mesa.detalhes.map((detalhe, idx) => {
                const totalItem = detalhe.precoUnitario * detalhe.quantidade;
                return (
                  <Grid item xs={12} sm={6} md={4} key={idx}>
                    <Box>
                      <Typography variant="body2">
                        <strong>Categoria:</strong> {detalhe.categoria}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Nome:</strong> {detalhe.nome}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Quantidade:</strong> {detalhe.quantidade}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Preço Unitário:</strong> R${" "}
                        {detalhe.precoUnitario.toFixed(2)}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Total Item:</strong> R${" "}
                        {totalItem.toFixed(2)}
                      </Typography>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
            <Typography variant="body1" sx={{ mt: 1 }}>
              <strong>Total da Mesa:</strong> R$ {mesa.total.toFixed(2)}
            </Typography>
          </Box>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error">
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
