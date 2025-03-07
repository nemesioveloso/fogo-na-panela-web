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
import { validateCPFOrCNPJ, validateEmail } from "../../function/function";

interface FormCriarConta {
    nome: string;
    cpfCnpj: string;
    endereco: string;
    dataNascimento: string;
    cep: string;
    telefone: string;
    razaoSocial: string;
    email: string;
    senha: string;
    estado: string;
    cidade: string;
}

export function CriarConta() {
    const [values, setValues] = useState<FormCriarConta>({
        nome: "",
        cpfCnpj: "",
        endereco: "",
        dataNascimento: "",
        cep: "",
        telefone: "",
        razaoSocial: "",
        email: "",
        senha: "",
        estado: "",
        cidade: "",
    });

    const [errors, setErrors] = useState({
        nome: false,
        cpfCnpj: false,
        endereco: false,
        dataNascimento: false,
        cep: false,
        telefone: false,
        razaoSocial: false,
        email: false,
        senha: false,
        estado: false,
        cidade: false,
    });

    const [errorMessages, setErrorMessages] = useState({
        nome: "",
        cpfCnpj: "",
        endereco: "",
        dataNascimento: "",
        cep: "",
        telefone: "",
        razaoSocial: "",
        email: "",
        senha: "",
        estado: "",
        cidade: "",
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setValues((prev) => ({ ...prev, [name]: value }));
    };

    const validateFields = (): boolean => {
        const newErrors = {
            nome: !values.nome.trim(),
            cpfCnpj: !validateCPFOrCNPJ(values.cpfCnpj),
            endereco: !values.endereco.trim(),
            dataNascimento: !values.dataNascimento,
            cep: !values.cep.trim(),
            telefone: !values.telefone.trim(),
            razaoSocial: !values.razaoSocial.trim(),
            email: !validateEmail(values.email),
            senha: !values.senha.trim(),
            estado: !values.estado.trim(),
            cidade: !values.cidade.trim(),
        };

        const newErrorMessages = {
            nome: newErrors.nome ? "Nome é obrigatório." : "",
            cpfCnpj: newErrors.cpfCnpj ? "CPF/CNPJ inválido." : "",
            endereco: newErrors.endereco ? "Endereço é obrigatório." : "",
            dataNascimento: newErrors.dataNascimento
                ? "Data de nascimento é obrigatória."
                : "",
            cep: newErrors.cep ? "CEP é obrigatório." : "",
            telefone: newErrors.telefone ? "Telefone é obrigatório." : "",
            razaoSocial: newErrors.razaoSocial ? "Razão social é obrigatória." : "",
            email: newErrors.email ? "Email inválido ou não preenchido." : "",
            senha: newErrors.senha ? "Senha é obrigatória." : "",
            estado: newErrors.estado ? "Estado é obrigatório." : "",
            cidade: newErrors.cidade ? "Cidade é obrigatória." : "",
        };

        setErrors(newErrors);
        setErrorMessages(newErrorMessages);
        return Object.values(newErrors).every((val) => val === false);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (validateFields()) {
            console.log("Formulário válido. Dados:", values);
            toast.success("Conta criada com sucesso!");
            setValues({
                nome: "",
                cpfCnpj: "",
                endereco: "",
                dataNascimento: "",
                cep: "",
                telefone: "",
                razaoSocial: "",
                email: "",
                senha: "",
                estado: "",
                cidade: "",
            });
        } else {
            toast.error("Existem campos inválidos ou não preenchidos.");
        }
    };





    return (
        <Container
            component="form"
            maxWidth="md"
            onSubmit={handleSubmit}
            sx={{
                background: '#f7f7f7',
                mt: 4,
                p: 2,
                border: "1px solid #ccc",
                borderRadius: 2,
            }}
        >
            <Typography variant="h5" mb={2} textAlign='center'>
                Criação de Conta
            </Typography>

            <Grid2 container spacing={2}>
                <Grid2 size={{ xs: 12, sm: 6 }}>
                    <TextField
                        fullWidth
                        label="Nome"
                        name="nome"
                        value={values.nome}
                        onChange={handleChange}
                        error={errors.nome}
                        helperText={errorMessages.nome}
                    />
                </Grid2>

                <Grid2 size={{ xs: 12, sm: 6 }}>
                    <TextField
                        fullWidth
                        label="CPF/CNPJ (apenas números)"
                        name="cpfCnpj"
                        value={values.cpfCnpj}
                        onChange={handleChange}
                        error={errors.cpfCnpj}
                        helperText={errorMessages.cpfCnpj}
                    />
                </Grid2>

                <Grid2 size={{ xs: 12, sm: 6 }}>
                    <TextField
                        fullWidth
                        label="Endereço"
                        name="endereco"
                        value={values.endereco}
                        onChange={handleChange}
                        error={errors.endereco}
                        helperText={errorMessages.endereco}
                    />
                </Grid2>

                <Grid2 size={{ xs: 12, sm: 6 }}>
                    <TextField
                        fullWidth
                        label="Data de Nascimento"
                        name="dataNascimento"
                        type="date"
                        value={values.dataNascimento}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        error={errors.dataNascimento}
                        helperText={errorMessages.dataNascimento}
                    />
                </Grid2>

                <Grid2 size={{ xs: 12, sm: 6 }}>
                    <TextField
                        fullWidth
                        label="CEP"
                        name="cep"
                        value={values.cep}
                        onChange={handleChange}
                        error={errors.cep}
                        helperText={errorMessages.cep}
                    />
                </Grid2>

                <Grid2 size={{ xs: 12, sm: 6 }}>
                    <TextField
                        fullWidth
                        label="Telefone"
                        name="telefone"
                        value={values.telefone}
                        onChange={handleChange}
                        error={errors.telefone}
                        helperText={errorMessages.telefone}
                    />
                </Grid2>

                <Grid2 size={{ xs: 12, sm: 6 }}>
                    <TextField
                        fullWidth
                        label="Razão Social"
                        name="razaoSocial"
                        value={values.razaoSocial}
                        onChange={handleChange}
                        error={errors.razaoSocial}
                        helperText={errorMessages.razaoSocial}
                    />
                </Grid2>

                <Grid2 size={{ xs: 12, sm: 6 }}>
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        error={errors.email}
                        helperText={errorMessages.email}
                    />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 6 }}>
                    <TextField
                        fullWidth
                        label="Senha"
                        name="senha"
                        type="password"
                        value={values.senha}
                        onChange={handleChange}
                        error={errors.senha}
                        helperText={errorMessages.senha}
                    />
                </Grid2>

                <Grid2 size={{ xs: 12, sm: 6 }}>
                    <TextField
                        fullWidth
                        label="Estado"
                        name="estado"
                        value={values.estado}
                        onChange={handleChange}
                        error={errors.estado}
                        helperText={errorMessages.estado}
                    />
                </Grid2>

                <Grid2 size={{ xs: 12, sm: 6 }}>
                    <TextField
                        fullWidth
                        label="Cidade"
                        name="cidade"
                        value={values.cidade}
                        onChange={handleChange}
                        error={errors.cidade}
                        helperText={errorMessages.cidade}
                    />
                </Grid2>
            </Grid2>

            <Box mt={2} display="flex" justifyContent="end">
                <Button type="submit" variant="contained" color="primary">
                    Criar Conta
                </Button>
            </Box>
        </Container>
    );
}
