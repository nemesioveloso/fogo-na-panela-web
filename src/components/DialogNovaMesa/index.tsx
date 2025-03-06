import { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
} from "@mui/material";

interface DialogNovaMesaProps {
    open: boolean;
    onClose: () => void;
    onConfirm: (numeroMesa: number) => void;
}

export function DialogNovaMesa({
    open,
    onClose,
    onConfirm,
}: DialogNovaMesaProps) {
    const [mesa, setMesa] = useState("");

    const handleConfirm = () => {
        const numeroMesa = Number(mesa);
        if (!numeroMesa) {
            alert("Informe um número de mesa válido.");
            return;
        }
        onConfirm(numeroMesa);
        setMesa("");
    };

    const handleClose = () => {
        onClose();
        setMesa("");
    };

    return (
        <Dialog open={open} fullWidth onClose={(_event, reason) => {
            if (reason === 'backdropClick' || reason === 'escapeKeyDown') return;
            handleClose();
        }}>
            <DialogTitle>Informe o número da mesa a ser aberta.</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Número da Mesa"
                    type="number"
                    fullWidth
                    value={mesa}
                    onChange={(e) => setMesa(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="error">
                    Cancelar
                </Button>
                <Button onClick={handleConfirm} color="success" disabled={!mesa}>
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    );
}
