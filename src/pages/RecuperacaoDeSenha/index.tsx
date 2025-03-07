import React, { useState } from "react";
import {
    Box,
    Button,
    Container,
    Grid2,
    TextField,
    Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import { validateEmail } from "../../function/function";

export function RecuperarSenha() {
    const [email, setEmail] = useState("");
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorMessageEmail, setErrorMessageEmail] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!validateEmail(email)) {
            setErrorEmail(true);
            setErrorMessageEmail("Email inválido ou não preenchido.");
            toast.error("Existe algum erro no campo email.");
            return;
        }

        console.log("Enviando solicitação de redefinição para", email);
        toast.success("Instruções de redefinição de senha enviadas!");
        setEmail("");
        setErrorEmail(false);
        setErrorMessageEmail("");
    };

    return (
        <Container
            component="form"
            maxWidth="sm"
            onSubmit={handleSubmit}
            sx={{
                mt: 4,
                background: '#f7f7f7',
                p: 2,
                border: "1px solid #ccc",
                borderRadius: 2,
            }}
        >
            <Typography variant="h5" mb={2} textAlign='center'>
                Recuperação de Senha
            </Typography>

            <Grid2 container spacing={2}>
                <Grid2 size={12}>
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setErrorEmail(false);
                            setErrorMessageEmail("");
                        }}
                        error={errorEmail}
                        helperText={errorMessageEmail}
                    />
                </Grid2>
            </Grid2>

            <Box mt={2} display="flex" justifyContent="end">
                <Button type="submit" variant="contained" color="primary">
                    Enviar
                </Button>
            </Box>
        </Container>
    );
}
