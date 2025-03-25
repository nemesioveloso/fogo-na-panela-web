import {
  Button,
  Container,
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import * as React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { User } from "../../models/Users";
import { containerResponsivePadding } from "../../models/ResponsivePadding";
import { apiService } from "../../api/request";

interface CadastroDeUsuarioProps {
  user?: User;
  onSuccess?: () => void;
  onClose?: () => void;
}

export function EditarUsuario({
  user,
  onSuccess,
  onClose,
}: CadastroDeUsuarioProps) {
  const [values, setValues] = useState<User>(user ||{
    id: 0,
    nome: "",
    email: "",
    cpf: "",
    senha: "",
    telefone: "",
    admissao: "",
    permissao: "USER",
  });
  

  const [errorMessages, setErrorMessages] = useState({
    nome: "",
    email: "",
    // senha: "",
    cpf: "",
    telefone: "",
    // permissao: "",
  });

  const [errors, setErrors] = useState({
    nome: false,
    email: false,
    // senha: false,
    cpf: false,
    telefone: false,
    // permissao: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  function handleSelectChange(e: SelectChangeEvent) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  const validateFields = () => {
    const newErrors = {
      nome: !values.nome,
      email: !values.email,
      cpf: !values.cpf,
      telefone: !values.telefone,
      // senha: !values.senha,
    };

    const newErrorMessages = {
      nome: !values.nome ? "Nome é obrigatório" : "",
      email: !values.email ? "Email é obrigatório" : "",
      cpf: !values.cpf ? "CPF é obrigatório" : "",
      telefone: !values.telefone ? "Username é obrigatório" : "",
      // senha: !values.senha ? "Senha é obrigatório" : "",
    };

    setErrors(newErrors);
    setErrorMessages(newErrorMessages);

    return Object.values(newErrors).every((error) => !error);
  };

  async function adicionarUsuarios(user: User) {
    try {
      const result = await apiService.put({
        url: `usuarios/${user.id}`,
        body: user
      });
      if (result.status === 200) {
          toast.success(result.data.message);
          onSuccess?.();
      }
      
    } catch (error) {
      console.log("Erro na requisição GET:", error);
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateFields()) {
      adicionarUsuarios(values)
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
      sx={[
        containerResponsivePadding,
        { marginTop: "2rem", borderRadius: "8px", padding: "2rem" },
      ]}
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
            id="senha"
            name="senha"
            label="Senha"
            type="password"
            value={values.senha}
            onChange={handleChange}
          />
        </Grid2>
        <Grid2 size={12}>
          <TextField
            fullWidth
            id="admissao"
            name="admissao"
            label="Admissão"
            type="datetime-local"
            disabled
            value={values.admissao}
            onChange={handleChange}
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
            error={errors.telefone}
            id="telefone"
            name="telefone"
            label="Telefone"
            value={values.telefone}
            onChange={handleChange}
            helperText={errorMessages.telefone}
          />
        </Grid2>
        <Grid2 size={12}>
          <FormControl fullWidth>
            <InputLabel id="permissao-label">Permissão</InputLabel>
            <Select
              labelId="permissao-label"
              id="permissao"
              name="permissao"
              label="Permissão"
              value={values.permissao}
              onChange={handleSelectChange}
            >
              <MenuItem value="USER">FUNCIONÁRIO</MenuItem>
              <MenuItem value="ADMIN">ADMINISTRADOR</MenuItem>
              <MenuItem value="GERENTE">GERENTE</MenuItem>
            </Select>
          </FormControl>
        </Grid2>
      </Grid2>
      <Grid2 container justifyContent="end" mt={1} spacing={1}>
        <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <Button fullWidth onClick={onClose} variant="contained" color="error">
            Cancelar
          </Button>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <Button fullWidth type="submit" variant="contained" color="success">
            Salvar
          </Button>
        </Grid2>
      </Grid2>
    </Container>
  );
}
