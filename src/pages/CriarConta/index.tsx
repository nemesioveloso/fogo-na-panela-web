import { Box, Grid, TextField, Button, MenuItem } from "@mui/material";
import { useState } from "react";
import {
  maskCEP,
  maskCPF,
  maskPhone,
  unmask,
  validateCEP,
  validateCPF,
} from "../../function";
import { userService } from "../../services/UserRegister";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function CriarConta() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    fullName: "",
    cpf: "",
    birthDate: "",
    gender: "",
    phone: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "Teresina",
    state: "PI",
    zipCode: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string) => {
    let maskedValue = value;

    if (field === "cpf") maskedValue = maskCPF(value);
    if (field === "zipCode") maskedValue = maskCEP(value);
    if (field === "phone") maskedValue = maskPhone(value);

    setForm((prev) => ({ ...prev, [field]: maskedValue }));

    if (field === "cpf") {
      setErrors((prev) => ({
        ...prev,
        cpf: validateCPF(maskedValue) ? "" : "CPF inválido",
      }));
    }

    if (field === "zipCode") {
      setErrors((prev) => ({
        ...prev,
        zipCode: validateCEP(maskedValue) ? "" : "CEP inválido",
      }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    const requiredFields = [
      "username",
      "email",
      "password",
      "fullName",
      "cpf",
      "birthDate",
      "gender",
      "phone",
      "street",
      "number",
      "neighborhood",
      "city",
      "state",
      "zipCode",
    ];

    requiredFields.forEach((field) => {
      if (!form[field]) newErrors[field] = "Campo obrigatório";
    });

    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "E-mail inválido";
    }

    if (form.cpf && form.cpf.length !== 14) {
      newErrors.cpf = "CPF deve ter 11 dígitos";
    }

    if (form.phone && form.phone.length != 15) {
      newErrors.phone = "Telefone inválido";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    const payload = {
      ...form,
      cpf: unmask(form.cpf),
      phone: unmask(form.phone),
      zipCode: unmask(form.zipCode),
    };

    const res = await userService.register(payload);

    if (res.error) return;

    toast.success(res.data?.message);
    navigate("/login");

    console.log(payload, "payload");
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={1}>
          <Grid size={12}>
            <TextField
              fullWidth
              label="Nome Completo"
              value={form.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              error={!!errors.fullName}
              helperText={errors.fullName}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
            <TextField
              fullWidth
              label="Username"
              value={form.username}
              onChange={(e) => handleChange("username", e.target.value)}
              error={!!errors.username}
              helperText={errors.username}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
            <TextField
              fullWidth
              label="Email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
            <TextField
              fullWidth
              label="CPF"
              value={form.cpf}
              onChange={(e) => handleChange("cpf", e.target.value)}
              error={!!errors.cpf}
              helperText={errors.cpf}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
            <TextField
              fullWidth
              type="password"
              label="Senha"
              value={form.password}
              onChange={(e) => handleChange("password", e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4 }}>
            <TextField
              fullWidth
              type="date"
              label="Nascimento"
              slotProps={{ inputLabel: { shrink: true } }}
              value={form.birthDate}
              onChange={(e) => handleChange("birthDate", e.target.value)}
              error={!!errors.birthDate}
              helperText={errors.birthDate}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4 }}>
            <TextField
              fullWidth
              select
              label="Gênero de Nascimento"
              value={form.gender}
              onChange={(e) => handleChange("gender", e.target.value)}
              error={!!errors.gender}
              helperText={errors.gender}
            >
              <MenuItem value="H">Homem</MenuItem>
              <MenuItem value="M">Mulher</MenuItem>
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4 }}>
            <TextField
              fullWidth
              label="Telefone"
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              error={!!errors.phone}
              helperText={errors.phone}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
            <TextField
              fullWidth
              label="Rua"
              value={form.street}
              onChange={(e) => handleChange("street", e.target.value)}
              error={!!errors.street}
              helperText={errors.street}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
            <TextField
              fullWidth
              label="Número"
              value={form.number}
              onChange={(e) => handleChange("number", e.target.value)}
              error={!!errors.number}
              helperText={errors.number}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              fullWidth
              label="Complemento"
              value={form.complement}
              onChange={(e) => handleChange("complement", e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
            <TextField
              fullWidth
              label="Bairro"
              value={form.neighborhood}
              onChange={(e) => handleChange("neighborhood", e.target.value)}
              error={!!errors.neighborhood}
              helperText={errors.neighborhood}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
            <TextField
              fullWidth
              label="CEP"
              value={form.zipCode}
              onChange={(e) => handleChange("zipCode", e.target.value)}
              error={!!errors.zipCode}
              helperText={errors.zipCode}
            />
          </Grid>
          <Grid size={12}>
            <Button variant="contained" fullWidth type="submit">
              Criar Conta
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
