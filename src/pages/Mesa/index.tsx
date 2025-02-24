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

interface Mesa {
    id: number;
    status: 'Aberta' | 'Fechada';
    total: number;
}

const mesas: Mesa[] = [
    { id: 1, status: 'Aberta', total: 120.50 },
    { id: 2, status: 'Aberta', total: 75.00 },
    { id: 3, status: 'Fechada', total: 200.00 },
    { id: 4, status: 'Fechada', total: 200.00 },
    { id: 5, status: 'Fechada', total: 200.00 },
    { id: 6, status: 'Aberta', total: 200.00 },
];

export function DashboardMesas() {
    const mesasAbertas = mesas.filter(mesa => mesa.status === 'Aberta');
    const [openDialog, setOpenDialog] = useState(false);
    const [itensMesa, setItensMesa] = useState<any[]>([]);

    console.log(itensMesa, 'itensMesa');
    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => setOpenDialog(false);

    const handleAddItem = (item: any) => {
        // Adicione o item à lista da mesa ou realize outra ação desejada
        setItensMesa((prevItens) => [...prevItens, item]);
        console.log('Item adicionado:', item);

    };

    return (
        <Container>
            <Typography variant="h4" align="center" gutterBottom>
                Dashboard de Mesas
            </Typography>
            <Box display="flex" justifyContent="center" mb={2}>
                <Button variant="contained" color="primary">
                    Nova Mesa
                </Button>
            </Box>
            <Grid2 container spacing={2}>
                {mesasAbertas.map((mesa) => (
                    <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={mesa.id}>
                        <Card sx={{ minWidth: 275 }}>
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
                                            <Button fullWidth variant="outlined" size="small" onClick={handleOpenDialog}>
                                                Abrir Detalhes
                                            </Button>
                                        </Grid2>
                                        <Grid2 size={6}>
                                            <Button fullWidth variant="outlined" size="small" color='error'>
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
                />
            </Box>
        </Container>
    );
}
