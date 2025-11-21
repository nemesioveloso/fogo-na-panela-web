import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../../auth/useAuth";

export default function Login() {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const [errors, setErrors] = useState({
    usernameOrEmail: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    const newErrors = { usernameOrEmail: "", password: "" };

    if (!usernameOrEmail.trim()) {
      newErrors.usernameOrEmail = "Campo obrigatório.";
      valid = false;
    }

    if (!password.trim()) {
      newErrors.password = "Senha é obrigatória.";
      valid = false;
    }

    setErrors(newErrors);

    if (!valid) return;
    await login(usernameOrEmail, password);
  };

  return (
    <Box
      sx={{
        minHeight: "80dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          maxWidth: "600px",
          padding: "1rem",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={1}>
            <Grid size={12}>
              <Typography variant="h4" gutterBottom>
                Login
              </Typography>
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                label="Username/Email"
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
                error={Boolean(errors.usernameOrEmail)}
                helperText={errors.usernameOrEmail}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                label="Senha"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={Boolean(errors.password)}
                helperText={errors.password}
              />
            </Grid>
            <Grid size={12}>
              <Typography variant="body1" textAlign="center">
                <Link href={"/criarConta"} sx={{ textAlign: "center" }}>
                  Criar Conta
                </Link>
              </Typography>
            </Grid>
            <Grid size={12}>
              <Button variant="contained" type="submit" fullWidth>
                Entrar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
}
