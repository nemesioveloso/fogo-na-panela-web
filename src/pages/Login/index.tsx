import React, { useState } from "react";
import {
    Container,
    Typography,
    TextField,
    Button,
    Box,
    Grid2,
} from "@mui/material";
import { toast } from "react-toastify";

export function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    // Exemplo simples de validação
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!email || !senha) {
            toast.warn("Preencha todos os campos!");
            return;
        }

        // Aqui você pode chamar sua API de autenticação
        // Exemplo:
        // try {
        //   const response = await api.post("/login", { email, senha });
        //   if (response.data.token) {
        //     toast.success("Login bem-sucedido!");
        //     // Armazene o token, redirecione, etc.
        //   }
        // } catch (error) {
        //   toast.error("Credenciais inválidas!");
        // }

        toast.success("Login bem-sucedido (fictício)!");
    };

    return (
        <Container
            sx={{
                width: '100%',
                height: '90dvh',
                borderRadius: 2,
                display: 'grid',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Box component="form" onSubmit={handleSubmit} noValidate p={4} sx={{ background: '#f7f7f7', borderRadius: 2 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Fogo na Panela
                </Typography>
                <Grid2 container spacing={2}>
                    <Grid2 size={12}>
                        <TextField
                            fullWidth
                            label="E-mail"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Grid2>
                    <Grid2 size={12}>
                        <TextField
                            fullWidth
                            label="Senha"
                            type="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                    </Grid2>
                    <Grid2 size={12} mt={2}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Entrar
                        </Button>
                    </Grid2>
                </Grid2>
            </Box>
        </Container>
    );
}
