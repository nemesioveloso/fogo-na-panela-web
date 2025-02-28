import { Button, Container, Grid2, TextField, Typography } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { CreateUser } from "../../models/Users";
import { containerResponsivePadding } from "../../models/ResponsivePadding";

interface CadastroDeUsuarioProps {
    onSuccess?: () => void;
}

export function CadastroDeUsuario({ onSuccess }: CadastroDeUsuarioProps) {
    const [values, setValues] = useState<CreateUser>({
        nome: "",
        email: "",
        cpf: "",
        username: "",
        role: "colaborador",
    });

    const [errorMessages, setErrorMessages] = useState({
        nome: "",
        email: "",
        cpf: "",
        username: "",
        role: ""
    });

    const [errors, setErrors] = useState({
        nome: false,
        email: false,
        cpf: false,
        username: false,
        role: false,
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateFields = () => {
        const newErrors = {
            nome: !values.nome,
            email: !values.email,
            cpf: !values.cpf,
            username: !values.username,
            role: !values.role,
        };

        const newErrorMessages = {
            nome: !values.nome ? "Nome é obrigatório" : "",
            email: !values.email ? "Email é obrigatório" : "",
            cpf: !values.cpf ? "CPF é obrigatório" : "",
            username: !values.username ? "Username é obrigatório" : "",
            role: !values.username ? "Permissão é obrigatório" : "",
        };

        setErrors(newErrors);
        setErrorMessages(newErrorMessages);

        return Object.values(newErrors).every((error) => !error);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (validateFields()) {
            console.log("Formulário válido:", values);
            toast.success("Usuário cadastrado com sucesso!");
            onSuccess?.();
            // Se quiser limpar o formulário:
            // setValues({ nome: "", email: "", cpf: "", username: "", role: "colaborador" });
        } else {
            toast.warning("Dados obrigatórios ausentes.");
        }
    };

    return (
        <Container
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
            sx={[containerResponsivePadding, { marginTop: "2rem", borderRadius: "8px", padding: "2rem" }]}
        >
            <Typography mb={4} variant="h4" textAlign="center" color="textSecondary">
                Cadastro de Usuários
            </Typography>
            <Grid2 container spacing={1}>
                <Grid2 size={12}>
                    <TextField
                        fullWidth
                        error={errors.nome}
                        id="nome"
                        name="nome"
                        label="Nome"
                        value={values.nome}
                        onChange={handleChange}
                        helperText={errorMessages.nome}
                    />
                </Grid2>
                <Grid2 size={12}>
                    <TextField
                        fullWidth
                        error={errors.email}
                        id="email"
                        name="email"
                        label="E-mail"
                        value={values.email}
                        onChange={handleChange}
                        helperText={errorMessages.email}
                    />
                </Grid2>
                <Grid2 size={12}>
                    <TextField
                        fullWidth
                        error={errors.cpf}
                        id="cpf"
                        name="cpf"
                        label="CPF"
                        value={values.cpf}
                        onChange={handleChange}
                        helperText={errorMessages.cpf}
                    />
                </Grid2>
                <Grid2 size={12}>
                    <TextField
                        fullWidth
                        error={errors.username}
                        id="username"
                        name="username"
                        label="Username"
                        value={values.username}
                        onChange={handleChange}
                        helperText={errorMessages.username}
                    />
                </Grid2>
                <Grid2 size={12}>
                    <TextField
                        fullWidth
                        id="role"
                        name="role"
                        label="Permissão"
                        value={values.role}
                        onChange={handleChange}
                    />
                </Grid2>
            </Grid2>
            <Grid2 container justifyContent="end" mt={1}>
                <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <Button fullWidth type="submit" variant="contained" color="success">
                        Salvar
                    </Button>
                </Grid2>
            </Grid2>
        </Container>
    );
}