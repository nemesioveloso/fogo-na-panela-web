import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
// import { useAuth, type User } from "../../auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import type { User } from "../../auth/AuthProvider";

export default function Login() {
  // const { login } = useAuth();
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fakeUser: User = {
      id: 1,
      name: "Admin Teste",
      email: "admin@teste.com",
      role: "admin",
    };
    localStorage.setItem("user", JSON.stringify(fakeUser));
    navigate("/dashboard");
    // try {
    //   await login(email, password);
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          label="Senha"
          type="password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
          Entrar
        </Button>
      </form>
    </Box>
  );
}
