import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../../auth/AuthProvider";

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
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Username/Email"
          margin="normal"
          value={usernameOrEmail}
          onChange={(e) => setUsernameOrEmail(e.target.value)}
          error={Boolean(errors.usernameOrEmail)}
          helperText={errors.usernameOrEmail}
        />
        <TextField
          fullWidth
          label="Senha"
          type="password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={Boolean(errors.password)}
          helperText={errors.password}
        />
        <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
          Entrar
        </Button>
      </form>
    </Box>
  );
}
