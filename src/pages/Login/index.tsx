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
import { apiService } from "../../api/request";
import { useNavigate } from "react-router-dom";
import { getPermissaoFromToken, isValidEmail } from "../../function/function";
import { LoginProps } from "../../models/Login";

export function Login({ onLoginSuccess }: LoginProps) {
  const navigate = useNavigate();
  const basePath = import.meta.env.VITE_BASE_PATH;
  const [values, setValues] = useState({
    email: "",
    senha: "",
  });

  const [errors, setErrors] = useState({
    email: false,
    senha: false,
  });

  const validateFields = () => {
    const newErrors = {
      email: !values.email || !isValidEmail(values.email),
      senha: !values.senha,
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  

  // Exemplo simples de validação
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateFields()) {
      login();
    } else {
      toast.error("Formulário inválido");
    }
  };

  async function login() {
    try {
      const result = await apiService.post({
        url: "auth/login",
        body: values,
      });
      if (result) {
        sessionStorage.setItem("authToken", result.data.token);
        const token = result.data.token
        const roles = getPermissaoFromToken(token)
        onLoginSuccess?.(token);
        
        toast.success(
          <Grid2 container>
            <Grid2 size={12}>
              <Typography variant="h5">{result.data.titulo}</Typography>
            </Grid2>
            <Grid2 size={12}>
              <Typography variant="body1">{result.data.message}</Typography>
            </Grid2>
          </Grid2>
        );
        if(roles === "ADMIN" || roles === "GERENTE") {

          navigate(`${basePath}dashboard`);
        } else{
          navigate(`${basePath}dashboardMesas`);
        }
      }
    } catch (error) {
      console.log("Erro na requisição GET:", error);
    }
  }

  return (
    <Container
      sx={{
        width: "100%",
        height: "90dvh",
        borderRadius: 2,
        display: "grid",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        p={4}
        sx={{ background: "#f7f7f7", borderRadius: 2 }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Fogo na Panela
        </Typography>
        <Grid2
          container
          spacing={2}
          justifyContent="space-evenly"
          textAlign="center"
        >
          <Grid2 size={12}>
            <TextField
              fullWidth
              error={errors.email}
              name="email"
              label="Email"
              value={values.email}
              onChange={handleChange}
              helperText={errors.email ? "Email é obrigatório." : ""}
            />
          </Grid2>
          <Grid2 size={12}>
            <TextField
              fullWidth
              error={errors.senha}
              name="senha"
              label="Senha"
              type="password"
              value={values.senha}
              onChange={handleChange}
              helperText={errors.senha ? "Senha é obrigatória." : ""}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 5, lg: 5 }}>
            <Typography variant="caption">
              <a href="/recuperacaoDeSenha">Esqueci a senha</a>
            </Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 8, md: 8, lg: 8 }} mt={1}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Entrar
            </Button>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 5, lg: 5 }}>
            <Typography variant="caption">
              <a href="/criarConta">Criar conta</a>
            </Typography>
          </Grid2>
        </Grid2>
      </Box>
    </Container>
  );
}
