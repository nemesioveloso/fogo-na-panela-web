import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

interface AlertaDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (tipoPagamento: string) => void;
  titulo: string;
  mensagem: string;
}

export function AlertaFechamentoCaixa({
  open,
  onClose,
  onConfirm,
  titulo,
  mensagem,
}: AlertaDialogProps) {
  const [tipoPagamento, setTipoPagamento] = useState("");

  const handleCloseDialog = (_event: object, reason: string) => {
    if (reason === "backdropClick" || reason === "escapeKeyDown") return;
    onClose();
    setTipoPagamento("");
  };

  const handleConfirm = () => {
    onConfirm(tipoPagamento);
    setTipoPagamento("");
  };

  return (
    <Dialog open={open} fullWidth onClose={handleCloseDialog}>
      <DialogTitle>{titulo}</DialogTitle>
      <DialogContent>
        <DialogContentText>{mensagem}</DialogContentText>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>Forma de Pagamento</InputLabel>
          <Select
            label="Forma de Pagamento"
            value={tipoPagamento}
            onChange={(e) => setTipoPagamento(e.target.value as string)}
          >
            <MenuItem value="dinheiro">Dinheiro</MenuItem>
            <MenuItem value="cartao">Cartão</MenuItem>
            <MenuItem value="pix">Pix</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>

      <DialogActions>
        <Button
          color="error"
          onClick={() => {
            onClose();
            setTipoPagamento("");
          }}
        >
          Cancelar
        </Button>
        <Button
          color="success"
          onClick={handleConfirm}
          disabled={!tipoPagamento} // Desabilitado se estiver vazio
        >
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
