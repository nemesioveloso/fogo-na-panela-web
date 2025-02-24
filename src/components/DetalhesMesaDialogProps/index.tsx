import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
} from '@mui/material';

interface Item {
    nome: string;
    quantidade: number;
}

interface DetalhesMesaDialogProps {
    open: boolean;
    onClose: () => void;
    onAddItem: (item: Item) => void;
}

export function DetalhesMesaDialog({ open, onClose, onAddItem }: DetalhesMesaDialogProps) {
    const [itemData, setItemData] = useState<Item>({ nome: '', quantidade: 1 });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setItemData({
            ...itemData,
            [name]: name === 'quantidade' || name === 'preco' ? Number(value) : value,
        });
    };

    const handleSubmit = () => {
        onAddItem(itemData);
        setItemData({ nome: '', quantidade: 1 });
        onClose();
    };

    return (
        <Dialog open={open} onClose={(_event, reason) => {
            if (reason === 'backdropClick' || reason === 'escapeKeyDown') return;
            onClose();
        }}
            disableEscapeKeyDown>
            <DialogTitle>Adicionar Item à Comanda</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Nome do Item"
                    name="nome"
                    fullWidth
                    value={itemData.nome}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    label="Quantidade"
                    name="quantidade"
                    type="number"
                    fullWidth
                    value={itemData.quantidade}
                    onChange={handleChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="error">
                    Cancelar
                </Button>
                <Button onClick={handleSubmit} color="success">
                    Adicionar
                </Button>
            </DialogActions>
        </Dialog>
    );
}
