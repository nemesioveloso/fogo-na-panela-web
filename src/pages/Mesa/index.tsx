import {
    Container,
    Grid2,
    Card,
    CardContent,
    Typography,
    Button,
    Box,
} from '@mui/material';
import { DetalhesMesaDialog } from '../../components/DetalhesMesaDialogProps';
import { useState } from 'react';
import { Mesa } from '../../models/DashboarMesas';
import { ItemAddMesa } from '../../models/ItemAddMesa';
import { AlertaFechamentoCaixa } from '../../components/AlertaFechamentoCaixa';
import { DialogNovaMesa } from '../../components/DialogNovaMesa';

const mesas: Mesa[] = [
    {
        id: 1,
        status: 'Aberta',
        total: 120.50,
        detalhes: [
            {
                categoria: 'Comida',
                nome: 'Hambúrguer',
                quantidade: 2,
                precoUnitario: 15.00,
            },
            {
                categoria: 'Bebida',
                nome: 'Cerveja',
                quantidade: 3,
                precoUnitario: 6.00,
            },
            {
                categoria: 'Comida',
                nome: 'Batata Frita',
                quantidade: 1,
                precoUnitario: 10.50,
            },
        ],
    },
    {
        id: 2,
        status: 'Aberta',
        total: 75.00,
        detalhes: [
            {
                categoria: 'Bebida',
                nome: 'Refrigerante',
                quantidade: 2,
                precoUnitario: 5.00,
            },
            {
                categoria: 'Bebida',
                nome: 'Skol',
                quantidade: 5,
                precoUnitario: 7.00,
            },
            {
                categoria: 'Comida',
                nome: 'Salada',
                quantidade: 1,
                precoUnitario: 15.00,
            },
            {
                categoria: 'Comida',
                nome: 'Panelada',
                quantidade: 2,
                precoUnitario: 20.00,
            },
        ],
    },
    {
        id: 3,
        status: 'Fechada',
        total: 200.00,
        detalhes: [
            {
                categoria: 'Comida',
                nome: 'Pizza Margherita',
                quantidade: 2,
                precoUnitario: 30.00,
            },
            {
                categoria: 'Bebida',
                nome: 'Cerveja',
                quantidade: 4,
                precoUnitario: 5.00,
            },
            {
                categoria: 'Comida',
                nome: 'Sobremesa',
                quantidade: 2,
                precoUnitario: 20.00,
            },
        ],
    },
    {
        id: 4,
        status: 'Fechada',
        total: 200.00,
        detalhes: [
            {
                categoria: 'Bebida',
                nome: 'Suco de Laranja',
                quantidade: 3,
                precoUnitario: 7.00,
            },
            {
                categoria: 'Comida',
                nome: 'X-Salada',
                quantidade: 2,
                precoUnitario: 12.00,
            },
        ],
    },
    {
        id: 5,
        status: 'Fechada',
        total: 200.00,
        detalhes: [
            {
                categoria: 'Comida',
                nome: 'Espetinho',
                quantidade: 4,
                precoUnitario: 8.00,
            },
            {
                categoria: 'Bebida',
                nome: 'Cerveja',
                quantidade: 3,
                precoUnitario: 6.00,
            },
        ],
    },
    {
        id: 6,
        status: 'Aberta',
        total: 200.00,
        detalhes: [
            {
                categoria: 'Comida',
                nome: 'Pastel',
                quantidade: 4,
                precoUnitario: 5.00,
            },
            {
                categoria: 'Bebida',
                nome: 'Água Mineral',
                quantidade: 2,
                precoUnitario: 2.00,
            },
            {
                categoria: 'Comida',
                nome: 'Porção de Calabresa',
                quantidade: 1,
                precoUnitario: 15.00,
            },
        ],
    },
];

export function DashboardMesas() {
    const mesasAbertas = mesas.filter(mesa => mesa.status === 'Aberta');
    const [openDialog, setOpenDialog] = useState(false);
    const [itensMesa, setItensMesa] = useState<ItemAddMesa[]>([]);
    const [mesaSelecionada, setMesaSelecionada] = useState<Mesa | null>(null);
    const [openAlerta, setOpenAlerta] = useState(false);
    const [mesaFecharId, setMesaFecharId] = useState<number | null>(null);
    const [openNovaMesa, setOpenNovaMesa] = useState(false);
    const [novaMesas, setMesas] = useState<number[]>([]);

    const handleOpenNovaMesa = () => {
        setOpenNovaMesa(true);
    };

    const handleCloseNovaMesa = () => {
        setOpenNovaMesa(false);
    };

    const handleConfirmNovaMesa = (numeroMesa: number) => {
        console.log("Criando nova mesa:", numeroMesa);
        setMesas((prev) => [...prev, numeroMesa]);
        setOpenNovaMesa(false);
    };

    const handleOpenDialog = (mesa: Mesa) => {
        setMesaSelecionada(mesa);
        setOpenDialog(true);
    };
    const handleCloseDialog = () => setOpenDialog(false);

    const handleCloseComanda = (id: number) => {
        setOpenAlerta(true);
        setMesaFecharId(id);
    }

    const handleFechar = () => {
        setOpenAlerta(false);
        setMesaFecharId(null);
    };

    const handleConfirm = async (tipoPagamento: string) => {
        console.log('Tipo de pagamento: ', tipoPagamento);
        console.log('Mesa fechada: ', mesaFecharId);

        try {
            console.log("Requisição para fechar a comanda enviada!");
        } catch (error) {
            console.error("Erro ao fechar a comanda:", error);
        }
        setOpenAlerta(false);
    };

    const handleAddItem = (item: ItemAddMesa) => {
        setItensMesa((prevItens) => [...prevItens, item]);
        console.log('Item adicionado:', item);
    };

    return (
        <Container sx={{ padding: '1rem' }}>
            <Typography variant="h4" align="center" gutterBottom>
                Dashboard de Mesas
            </Typography>
            <Box display="flex" justifyContent="center" mb={2}>
                <Button variant="contained" color="primary" onClick={handleOpenNovaMesa}>
                    Nova Mesa
                </Button>
            </Box>
            <Grid2 container spacing={2}>
                {mesasAbertas.map((mesa) => (
                    <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={mesa.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">Mesa {mesa.id}</Typography>
                                <Typography color="textSecondary" gutterBottom>
                                    Status: {mesa.status}
                                </Typography>
                                <Typography variant="body1">
                                    Total: R$ {mesa.total.toFixed(2)}
                                </Typography>
                                <Box mt={2}>
                                    <Grid2 container justifyContent='end' spacing={1}>
                                        <Grid2 size={6}>
                                            <Button fullWidth variant="outlined" size="small" onClick={() => handleOpenDialog(mesa)}>
                                                Abrir Detalhes
                                            </Button>
                                        </Grid2>
                                        <Grid2 size={6}>
                                            <Button fullWidth variant="outlined" size="small" color='error' onClick={() => handleCloseComanda(mesa.id)}>
                                                Fechar Comanda
                                            </Button>
                                        </Grid2>
                                    </Grid2>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid2>
                ))}
            </Grid2>
            <Box>
                <DetalhesMesaDialog
                    open={openDialog}
                    onClose={handleCloseDialog}
                    onAddItem={handleAddItem}
                    mesa={mesaSelecionada}
                />
                <AlertaFechamentoCaixa
                    open={openAlerta}
                    onClose={handleFechar}
                    onConfirm={handleConfirm}
                    titulo="Atenção!"
                    mensagem={`Tem certeza que deseja fechar a comanda da mesa ${mesaFecharId}?`}
                />
                <DialogNovaMesa
                    open={openNovaMesa}
                    onClose={handleCloseNovaMesa}
                    onConfirm={handleConfirmNovaMesa}
                />
            </Box>
        </Container>
    );
}
