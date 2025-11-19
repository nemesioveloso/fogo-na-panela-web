import { useState } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Avatar,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Chip,
  IconButton,
  Alert,
  Snackbar,
} from "@mui/material";
import {
  Person,
  Edit,
  Save,
  Cancel,
  LocationOn,
  Phone,
  Email,
  Security,
  PhotoCamera,
} from "@mui/icons-material";

interface UserData {
  nome: string;
  email: string;
  telefone: string;
  dataNascimento: string;
  endereco: {
    rua: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    cep: string;
  };
  preferencias: {
    notificacoesPush: boolean;
    notificacoesEmail: boolean;
    ofertas: boolean;
  };
}

const dadosIniciais: UserData = {
  nome: "João Silva",
  email: "joao.silva@email.com",
  telefone: "(11) 99999-9999",
  dataNascimento: "1990-05-15",
  endereco: {
    rua: "Rua das Flores",
    numero: "123",
    complemento: "Apto 45",
    bairro: "Centro",
    cidade: "São Paulo",
    cep: "01234-567",
  },
  preferencias: {
    notificacoesPush: true,
    notificacoesEmail: false,
    ofertas: true,
  },
};

export function MeusDados() {
  const [dados, setDados] = useState<UserData>(dadosIniciais);
  const [editando, setEditando] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setDados((prev) => {
      if (!field.includes(".")) {
        return { ...prev, [field]: value } as UserData;
      }
      const [parentRaw, child] = field.split(".") as [
        keyof UserData & string,
        string,
      ];
      const parentVal = prev[parentRaw];
      const parentObj: Record<string, unknown> =
        parentVal && typeof parentVal === "object"
          ? (parentVal as Record<string, unknown>)
          : {};

      return {
        ...prev,
        [parentRaw]: {
          ...parentObj,
          [child]: value,
        } as unknown,
      } as UserData;
    });
  };

  const handleSave = () => {
    setEditando(false);
    setShowSuccess(true);
  };

  const handleCancel = () => {
    setDados(dadosIniciais);
    setEditando(false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box mb={4}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Meus Dados
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Gerencie suas informações pessoais e preferências
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Perfil Principal */}
        <Grid size={12}>
          <Card>
            <CardContent sx={{ textAlign: "center", py: 4 }}>
              <Box position="relative" display="inline-block" mb={2}>
                <Avatar
                  sx={{
                    width: 120,
                    height: 120,
                    fontSize: "3rem",
                    bgcolor: "primary.main",
                  }}
                >
                  <Person fontSize="inherit" />
                </Avatar>
                <IconButton
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    bgcolor: "background.paper",
                    boxShadow: 2,
                    "&:hover": { bgcolor: "background.paper" },
                  }}
                  size="small"
                >
                  <PhotoCamera fontSize="small" />
                </IconButton>
              </Box>

              <Typography variant="h5" gutterBottom fontWeight="medium">
                {dados.nome}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Cliente desde 2023
              </Typography>

              <Box mt={2}>
                <Chip
                  label="Conta Verificada"
                  color="success"
                  size="small"
                  icon={<Security />}
                />
              </Box>

              <Box mt={3}>
                {!editando ? (
                  <Button
                    variant="contained"
                    startIcon={<Edit />}
                    onClick={() => setEditando(true)}
                    fullWidth
                  >
                    Editar Perfil
                  </Button>
                ) : (
                  <Box display="flex" gap={1} justifyContent="center">
                    <Button
                      variant="contained"
                      startIcon={<Save />}
                      onClick={handleSave}
                      size="small"
                    >
                      Salvar
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<Cancel />}
                      onClick={handleCancel}
                      size="small"
                      color="error"
                    >
                      Cancelar
                    </Button>
                  </Box>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Informações Pessoais */}
        <Grid size={12}>
          <Card>
            <CardHeader
              title="Informações Pessoais"
              avatar={
                <Avatar sx={{ bgcolor: "primary.main" }}>
                  <Person />
                </Avatar>
              }
            />
            <CardContent>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Nome Completo"
                    value={dados.nome}
                    onChange={(e) => handleInputChange("nome", e.target.value)}
                    disabled={!editando}
                    variant="outlined"
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Data de Nascimento"
                    type="date"
                    value={dados.dataNascimento}
                    onChange={(e) =>
                      handleInputChange("dataNascimento", e.target.value)
                    }
                    disabled={!editando}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={dados.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    disabled={!editando}
                    InputProps={{
                      startAdornment: (
                        <Email sx={{ mr: 1, color: "action.active" }} />
                      ),
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Telefone"
                    value={dados.telefone}
                    onChange={(e) =>
                      handleInputChange("telefone", e.target.value)
                    }
                    disabled={!editando}
                    InputProps={{
                      startAdornment: (
                        <Phone sx={{ mr: 1, color: "action.active" }} />
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Endereço */}
          <Card sx={{ mt: 3 }}>
            <CardHeader
              title="Endereço de Entrega"
              avatar={
                <Avatar sx={{ bgcolor: "secondary.main" }}>
                  <LocationOn />
                </Avatar>
              }
            />
            <CardContent>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Rua"
                    value={dados.endereco.rua}
                    onChange={(e) =>
                      handleInputChange("endereco.rua", e.target.value)
                    }
                    disabled={!editando}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Número"
                    value={dados.endereco.numero}
                    onChange={(e) =>
                      handleInputChange("endereco.numero", e.target.value)
                    }
                    disabled={!editando}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Complemento"
                    value={dados.endereco.complemento}
                    onChange={(e) =>
                      handleInputChange("endereco.complemento", e.target.value)
                    }
                    disabled={!editando}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Bairro"
                    value={dados.endereco.bairro}
                    onChange={(e) =>
                      handleInputChange("endereco.bairro", e.target.value)
                    }
                    disabled={!editando}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Cidade"
                    value={dados.endereco.cidade}
                    onChange={(e) =>
                      handleInputChange("endereco.cidade", e.target.value)
                    }
                    disabled={!editando}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="CEP"
                    value={dados.endereco.cep}
                    onChange={(e) =>
                      handleInputChange("endereco.cep", e.target.value)
                    }
                    disabled={!editando}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" onClose={() => setShowSuccess(false)}>
          Dados salvos com sucesso!
        </Alert>
      </Snackbar>
    </Container>
  );
}
