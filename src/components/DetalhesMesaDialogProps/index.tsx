import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Grid2,
    Typography,
} from '@mui/material';
import { Mesa } from '../../models/DashboarMesas';

interface Item {
    categoria: string;
    nome: string;
    quantidade: number;
}

interface DetalhesMesaDialogProps {
    open: boolean;
    onClose: () => void;
    onAddItem: (item: Item) => void;
    mesa: Mesa | null;
}

export function DetalhesMesaDialog({ open, onClose, onAddItem, mesa }: DetalhesMesaDialogProps) {
    const [itemData, setItemData] = useState<Item>({ categoria: '', nome: '', quantidade: 1 });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setItemData({
            ...itemData,
            [name]: name === 'quantidade' || name === 'preco' ? Number(value) : value,
        });
    };

    const handleSubmit = () => {
        onAddItem(itemData);
        setItemData({ categoria: '', nome: '', quantidade: 1 });
        onClose();
    };

    return (
        <Dialog aria-hidden='false' open={open} onClose={(_event, reason) => {
            if (reason === 'backdropClick' || reason === 'escapeKeyDown') return;
            onClose();
        }}
            disableEscapeKeyDown>
            <DialogTitle textAlign='center'>Detalhes da Mesa {mesa?.id}</DialogTitle>
            <DialogContent>
                <Grid2 container spacing={1}>
                    {mesa?.detalhes?.map((item, index) => {
                        const totalItem = item.precoUnitario * item.quantidade;
                        return (
                            <Grid2 size={6} key={index}>
                                <Typography variant="body1">
                                    <strong>Categoria:</strong> {item.categoria} <br />
                                    <strong>Nome:</strong> {item.nome} <br />
                                    <strong>Preço Unitário:</strong> R$ {item.precoUnitario.toFixed(2)} <br />
                                    <strong>Quantidade:</strong> {item.quantidade} <br />
                                    <strong>Total do Item:</strong> R$ {totalItem.toFixed(2)}
                                </Typography>
                            </Grid2>
                        );
                    })}
                </Grid2>
                <Typography variant="h6" textAlign='center' mt='1rem'>
                    Adicionar Item
                </Typography>
                <TextField
                    // autoFocus
                    margin="dense"
                    label="Categoria"
                    name="categoria"
                    fullWidth
                    value={itemData.categoria}
                    onChange={handleChange}
                />
                <TextField
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
                    inputProps={{ min: 0 }}
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
