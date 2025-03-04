import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Box,
  useMediaQuery,
  useTheme,
  Grid2,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { containerResponsivePadding } from "../../models/ResponsivePadding";
import image from "../../assets/banner.png";
import { DetalheCaixa } from "../DetalheCaixa";

const totalCaixaFicticio = 1200.5;
const detalhesVendasFicticias = {
  bebidas: 400.25,
  refeicoes: 500.75,
  sobremesas: 150.0,
  data: "2025-01-01",
  anotacoes: [
    {
      id: "1",
      tipo: "Retirada",
      obs: "Foi retirado 300 para reposição da água mineral",
    },
    {
      id: "2",
      tipo: "Retirada",
      obs: "Foi retirado 100 para reposição da carne",
    },
  ],
};

export function CardCaixa() {
  // Estado local para controlar se o caixa está aberto ou fechado
  const [caixaAberto, setCaixaAberto] = useState(false);
  // Estado local para exibir/esconder o Dialog de detalhes
  const [abrirDetalhes, setAbrirDetalhes] = useState(false);
  // Estados para controlar o tipo de movimentação e observações
  const [tipoMovimentacao, setTipoMovimentacao] = useState<
    "retirada" | "adicao"
  >("retirada");
  const [observacoes, setObservacoes] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  /** Alterna a abertura/fechamento do caixa */
  const handleToggleCaixa = () => {
    setCaixaAberto(!caixaAberto);
  };

  /** Abre o Dialog de detalhes */
  const handleOpenDetalhes = () => {
    setAbrirDetalhes(true);
  };

  /** Fecha o Dialog de detalhes */
  const handleCloseDetalhes = () => {
    setAbrirDetalhes(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  // Função para fechar o Dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  /** Confirma a movimentação e/ou salva as observações */
  const handleConfirmMovimentacao = () => {
    console.log("Tipo de movimentação:", tipoMovimentacao);
    console.log("Observações:", observacoes);

    // Exemplo:
    // if (tipoMovimentacao === "retirada") {
    //   // Lógica de subtrair do caixa, etc.
    // } else {
    //   // Lógica de adicionar ao caixa, etc.
    // }
    // Enviar para API ou armazenar local

    // Após salvar, limpa campos se desejar
    setTipoMovimentacao("retirada");
    setObservacoes("");

    // Fecha o dialog
    setAbrirDetalhes(false);
  };

  return (
    <Box sx={containerResponsivePadding}>
      <Grid2 container spacing={2} p={1}>
        <Grid2 size={12}>
          <Card
            sx={{
              borderRadius: 2,
              background: "#c4c4cc",
              p: {
                xs: 1,
                sm: 2,
                md: 3,
              },
            }}
          >
            <CardContent>
              <Grid2
                container
                justifyContent="space-evenly"
                alignItems="center"
              >
                <Grid2
                  size={{ xs: 12, sm: 5, md: 5, lg: 5 }}
                  textAlign="center"
                >
                  <img
                    style={{
                      display: "block",
                      width: "100%",
                      height: "auto",
                      borderRadius: "6px",
                      objectFit: "cover",
                    }}
                    src={image}
                    alt="Logo"
                  />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 6, md: 5, lg: 5 }}>
                  <Typography variant={isSmall ? "h6" : "h5"} gutterBottom>
                    Caixa do Dia
                  </Typography>

                  <Typography variant="body1" gutterBottom>
                    Status:{" "}
                    <strong>{caixaAberto ? "Aberto" : "Fechado"}</strong>
                  </Typography>
                  <Typography variant="body1">
                    Total do Caixa:{" "}
                    <strong>R$ {totalCaixaFicticio.toFixed(2)}</strong>
                  </Typography>

                  <Box mt={2}>
                    <Grid2 container spacing={2}>
                      <Grid2 size="auto">
                        <Button
                          variant="contained"
                          color={caixaAberto ? "error" : "success"}
                          onClick={handleToggleCaixa}
                        >
                          {caixaAberto ? "Fechar Caixa" : "Abrir Caixa"}
                        </Button>
                      </Grid2>
                      <Grid2 size="auto">
                        <Button
                          variant="contained"
                          onClick={handleOpenDetalhes}
                        >
                          Detalhar Caixa
                        </Button>
                      </Grid2>
                      <Grid2 size="auto">
                        <Button variant="contained" onClick={handleOpenDialog}>
                          Detalhe Completo do Caixa
                        </Button>
                      </Grid2>
                    </Grid2>
                  </Box>
                </Grid2>
              </Grid2>
            </CardContent>
          </Card>
        </Grid2>
        {/* Dialog para Detalhar Vendas do Dia e Movimentações */}
        <Dialog
          open={abrirDetalhes}
          onClose={handleCloseDetalhes}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            Detalhamento do Caixa - {detalhesVendasFicticias.data}
          </DialogTitle>

          <DialogContent dividers>
            <Typography variant="body1" gutterBottom>
              Bebidas: R$ {detalhesVendasFicticias.bebidas.toFixed(2)}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Refeições: R$ {detalhesVendasFicticias.refeicoes.toFixed(2)}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Sobremesas: R$ {detalhesVendasFicticias.sobremesas.toFixed(2)}
            </Typography>
            {detalhesVendasFicticias.anotacoes &&
              detalhesVendasFicticias.anotacoes.length > 0 && (
                <>
                  <Typography variant="h6" gutterBottom>
                    Anotações
                  </Typography>
                  {detalhesVendasFicticias.anotacoes.map((anotacao) => (
                    <Box key={anotacao.id} mb={1}>
                      <Typography variant="body1">{anotacao.tipo}</Typography>
                      <Typography variant="body2">{anotacao.obs}</Typography>
                    </Box>
                  ))}
                </>
              )}

            <Typography variant="h6" mt={2} gutterBottom>
              Total do Dia: R${" "}
              {(
                detalhesVendasFicticias.bebidas +
                detalhesVendasFicticias.refeicoes +
                detalhesVendasFicticias.sobremesas
              ).toFixed(2)}
            </Typography>

            {/* Movimentação Extra (Retirada/Adição) */}
            <Box mt={6}>
              <Typography
                mb={4}
                variant={isSmall ? "h6" : "h5"}
                textAlign="center"
              >
                Adicionar Anotação
              </Typography>
              <FormControl fullWidth>
                <InputLabel id="tipo-mov-label">
                  Tipo de Movimentação
                </InputLabel>
                <Select
                  labelId="tipo-mov-label"
                  label="Tipo de Movimentação"
                  value={tipoMovimentacao}
                  onChange={(e) =>
                    setTipoMovimentacao(e.target.value as "retirada" | "adicao")
                  }
                >
                  <MenuItem value="retirada">Retirada</MenuItem>
                  <MenuItem value="adicao">Adição</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Observações"
                multiline
                rows={4}
                fullWidth
                margin="dense"
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
              />
            </Box>
          </DialogContent>

          <DialogActions>
            <Button
              onClick={handleCloseDetalhes}
              color="error"
              variant="contained"
            >
              Cancelar
            </Button>
            <Button variant="contained" onClick={handleConfirmMovimentacao}>
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>
      </Grid2>
      <DetalheCaixa open={openDialog} onClose={handleCloseDialog} />
    </Box>
  );
}
