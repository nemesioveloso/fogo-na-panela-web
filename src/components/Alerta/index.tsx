import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from '@mui/material';

interface AlertaDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    titulo: string;
    mensagem: string;
}

export function AlertaDialog({ open, onClose, titulo, mensagem, onConfirm }: AlertaDialogProps) {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{titulo}</DialogTitle>
            <DialogContent>
                <DialogContentText>{mensagem}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color='error' onClick={onClose}>
                    Cancelar
                </Button>
                <Button color='success' onClick={onConfirm}>
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    );
}
