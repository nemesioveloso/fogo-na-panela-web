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
    observacao: string;
}

interface DetalhesMesaDialogProps {
    open: boolean;
    onClose: () => void;
    onAddItem: (item: Item) => void;
    mesa: Mesa | null;
}

export function DetalhesMesaDialog({ open, onClose, onAddItem, mesa }: DetalhesMesaDialogProps) {
    const [itemData, setItemData] = useState<Item>({ categoria: '', nome: '', quantidade: 1, observacao: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setItemData({
            ...itemData,
            [name]: name === 'quantidade' || name === 'preco' ? Number(value) : value,
        });
    };

    const [errors, setErrors] = useState({
        categoria: false,
        nome: false,
        quantidade: false,
    });

    const handleSubmit = () => {
        const newErrors = {
            categoria: !itemData.categoria.trim(),
            nome: !itemData.nome.trim(),
            quantidade: !itemData.quantidade || itemData.quantidade <= 0,
        };
        setErrors(newErrors);

        // Se algum campo estiver inválido, não prossegue
        const hasError = Object.values(newErrors).some((val) => val === true);
        if (hasError) {
            return; // Interrompe o fluxo, exibindo os erros no form
        }

        // Caso tudo esteja ok, adiciona o item
        onAddItem(itemData);

        // Limpa os campos
        setItemData({ categoria: '', nome: '', quantidade: 1, observacao: '' });

        // Fecha o dialog
        onClose();
    };

    return (
        <Dialog fullWidth aria-hidden='true' open={open} onClose={(_event, reason) => {
            if (reason === 'backdropClick' || reason === 'escapeKeyDown') return;
            onClose();
        }} disableEscapeKeyDown>
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
                    error={errors.categoria} // se for true, fica vermelho
                    helperText={errors.categoria ? "Campo obrigatório" : ""}
                />
                <TextField
                    margin="dense"
                    label="Nome do Item"
                    name="nome"
                    fullWidth
                    value={itemData.nome}
                    onChange={handleChange}
                    error={errors.nome}
                    helperText={errors.nome ? "Campo obrigatório" : ""}
                />
                <TextField
                    margin="dense"
                    label="Quantidade"
                    name="quantidade"
                    type="number"
                    fullWidth
                    value={itemData.quantidade}
                    onChange={handleChange}
                    inputProps={{ min: 1 }}
                    error={errors.quantidade}
                    helperText={errors.quantidade ? "Quantidade deve ser maior que 0" : ""}
                />
                <TextField
                    label="Observações"
                    multiline
                    rows={4}
                    fullWidth
                    margin="dense"
                    value={itemData.observacao}
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
