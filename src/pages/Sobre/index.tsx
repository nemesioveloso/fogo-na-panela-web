"use client";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
  Chip,
  Paper,
  IconButton,
} from "@mui/material";
import {
  LinkedIn,
  Twitter,
  GitHub,
  Email,
  Phone,
  LocationOn,
  Rocket,
  People,
  Lightbulb,
  TrendingUp,
} from "@mui/icons-material";

export default function Sobre() {
  const teamMembers = [
    {
      name: "Nemésio Veloso",
      role: "CEO & Fundador",
      avatar: "/placeholder.svg?height=120&width=120",
      description:
        "Visionário com 6 anos de experiência em tecnologia e inovação, especialista em arquitetura de software e desenvolvimento full-stack.",
    },
    {
      name: "Carlos Santos",
      role: "CTO",
      avatar: "/placeholder.svg?height=120&width=120",
      description:
        "Especialista em arquitetura de software e desenvolvimento full-stack.",
    },
    {
      name: "Maria Oliveira",
      role: "Head of Design",
      avatar: "/placeholder.svg?height=120&width=120",
      description:
        "Designer criativa focada em experiência do usuário e interfaces intuitivas.",
    },
    {
      name: "João Costa",
      role: "Head of Marketing",
      avatar: "/placeholder.svg?height=120&width=120",
      description:
        "Estrategista digital com expertise em crescimento e branding.",
    },
  ];

  const values = [
    {
      icon: <Rocket sx={{ fontSize: 40, color: "#1976d2" }} />,
      title: "Inovação",
      description:
        "Sempre buscamos soluções criativas e tecnologias de ponta para superar desafios.",
    },
    {
      icon: <People sx={{ fontSize: 40, color: "#1976d2" }} />,
      title: "Colaboração",
      description:
        "Acreditamos no poder do trabalho em equipe e na diversidade de ideias.",
    },
    {
      icon: <Lightbulb sx={{ fontSize: 40, color: "#1976d2" }} />,
      title: "Excelência",
      description:
        "Comprometidos com a qualidade e a entrega de resultados excepcionais.",
    },
    {
      icon: <TrendingUp sx={{ fontSize: 40, color: "#1976d2" }} />,
      title: "Crescimento",
      description:
        "Focamos no desenvolvimento contínuo, tanto pessoal quanto profissional.",
    },
  ];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          py: 12,
          textAlign: "center",
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            Sobre Nós
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
            Transformando ideias em soluções digitais inovadoras
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: "rgba(255,255,255,0.2)",
              backdropFilter: "blur(10px)",
              "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
            }}
          >
            Conheça Nossa História
          </Button>
        </Container>
      </Box>

      {/* Nossa História */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid size={{ xs: 12, sm: 12, md: 6 }}>
            <Typography
              variant="h3"
              component="h2"
              gutterBottom
              sx={{ fontWeight: "bold", color: "#333" }}
            >
              Nossa História
            </Typography>
            <Typography
              variant="body1"
              paragraph
              sx={{ fontSize: "1.1rem", lineHeight: 1.8, color: "#666" }}
            >
              Fundada em 2018, nossa empresa nasceu da paixão por tecnologia e
              do desejo de criar soluções que realmente fazem a diferença na
              vida das pessoas. Começamos como uma pequena startup com grandes
              sonhos.
            </Typography>
            <Typography
              variant="body1"
              paragraph
              sx={{ fontSize: "1.1rem", lineHeight: 1.8, color: "#666" }}
            >
              Hoje, somos uma equipe de profissionais dedicados que trabalha com
              empresas de todos os tamanhos, desde startups até grandes
              corporações, ajudando-as a alcançar seus objetivos através da
              tecnologia.
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Chip label="2018 - Fundação" sx={{ mr: 1, mb: 1 }} />
              <Chip label="50+ Projetos" sx={{ mr: 1, mb: 1 }} />
              <Chip label="20+ Clientes" sx={{ mr: 1, mb: 1 }} />
              <Chip label="4 Anos de Experiência" sx={{ mr: 1, mb: 1 }} />
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6 }}>
            <Paper
              elevation={8}
              sx={{
                p: 4,
                background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                color: "white",
                textAlign: "center",
              }}
            >
              <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
                Nossa Missão
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontSize: "1.1rem", lineHeight: 1.6 }}
              >
                Capacitar empresas através de soluções tecnológicas inovadoras,
                criando experiências digitais excepcionais que geram valor real
                para nossos clientes e seus usuários.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Nossos Valores */}
      <Box sx={{ bgcolor: "white", py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            textAlign="center"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#333", mb: 6 }}
          >
            Nossos Valores
          </Typography>
          <Grid container spacing={4}>
            {values.map((value, index) => (
              <Grid size={{ xs: 12, sm: 12, md: 6 }} key={index}>
                <Card
                  elevation={4}
                  sx={{
                    height: "100%",
                    textAlign: "center",
                    p: 3,
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
                    },
                  }}
                >
                  <CardContent>
                    <Box sx={{ mb: 2 }}>{value.icon}</Box>
                    <Typography
                      variant="h5"
                      component="h3"
                      gutterBottom
                      sx={{ fontWeight: "bold" }}
                    >
                      {value.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ lineHeight: 1.6 }}
                    >
                      {value.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Nossa Equipe */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          component="h2"
          textAlign="center"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#333", mb: 6 }}
        >
          Nossa Equipe
        </Typography>
        <Grid container spacing={4}>
          {teamMembers.map((member, index) => (
            <Grid size={{ xs: 12, sm: 12, md: 6 }} key={index}>
              <Card
                elevation={6}
                sx={{
                  textAlign: "center",
                  p: 3,
                  height: "100%",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 16px 32px rgba(0,0,0,0.2)",
                  },
                }}
              >
                <Avatar
                  src={member.avatar}
                  sx={{
                    width: 120,
                    height: 120,
                    mx: "auto",
                    mb: 2,
                    border: "4px solid #1976d2",
                  }}
                />
                <Typography
                  variant="h6"
                  component="h3"
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                >
                  {member.name}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="primary"
                  gutterBottom
                  sx={{ fontWeight: "medium" }}
                >
                  {member.role}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2, lineHeight: 1.5 }}
                >
                  {member.description}
                </Typography>
                <Box>
                  <IconButton color="primary" size="small">
                    <LinkedIn />
                  </IconButton>
                  <IconButton color="primary" size="small">
                    <Twitter />
                  </IconButton>
                  <IconButton color="primary" size="small">
                    <GitHub />
                  </IconButton>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Contato */}
      <Box
        sx={{ bgcolor: "#1976d2", color: "white", py: 0, minHeight: "60vh" }}
      >
        <Grid container sx={{ minHeight: "60vh" }}>
          {/* Lado Esquerdo - Informações de Contato */}
          <Grid
            size={{ xs: 12, sm: 12, md: 6 }}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              p: { xs: 4, md: 8 },
              background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
            }}
          >
            <Typography
              variant="h3"
              component="h2"
              gutterBottom
              sx={{ fontWeight: "bold", mb: 4 }}
            >
              Vamos Conversar?
            </Typography>
            <Typography
              variant="body1"
              paragraph
              sx={{ fontSize: "1.2rem", opacity: 0.9, mb: 4 }}
            >
              Estamos sempre prontos para novos desafios e parcerias. Entre em
              contato conosco e vamos construir algo incrível juntos!
            </Typography>

            {/* Informações de Contato */}
            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Box
                  sx={{
                    bgcolor: "rgba(255,255,255,0.2)",
                    borderRadius: "50%",
                    p: 1.5,
                    mr: 3,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Email sx={{ fontSize: 24 }} />
                </Box>
                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{ opacity: 0.8, fontSize: "0.9rem" }}
                  >
                    Email
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ fontSize: "1.1rem", fontWeight: "medium" }}
                  >
                    contato@empresa.com
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Box
                  sx={{
                    bgcolor: "rgba(255,255,255,0.2)",
                    borderRadius: "50%",
                    p: 1.5,
                    mr: 3,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Phone sx={{ fontSize: 24 }} />
                </Box>
                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{ opacity: 0.8, fontSize: "0.9rem" }}
                  >
                    Telefone
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ fontSize: "1.1rem", fontWeight: "medium" }}
                  >
                    (11) 99999-9999
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
                <Box
                  sx={{
                    bgcolor: "rgba(255,255,255,0.2)",
                    borderRadius: "50%",
                    p: 1.5,
                    mr: 3,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <LocationOn sx={{ fontSize: 24 }} />
                </Box>
                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{ opacity: 0.8, fontSize: "0.9rem" }}
                  >
                    Endereço
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ fontSize: "1.1rem", fontWeight: "medium" }}
                  >
                    Av. Paulista, 1000 - São Paulo, SP
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Redes Sociais */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ fontWeight: "bold", mb: 2 }}
              >
                Siga-nos nas Redes Sociais
              </Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                <IconButton
                  sx={{
                    bgcolor: "rgba(255,255,255,0.2)",
                    color: "white",
                    "&:hover": {
                      bgcolor: "rgba(255,255,255,0.3)",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  <LinkedIn sx={{ fontSize: 28 }} />
                </IconButton>
                <IconButton
                  sx={{
                    bgcolor: "rgba(255,255,255,0.2)",
                    color: "white",
                    "&:hover": {
                      bgcolor: "rgba(255,255,255,0.3)",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  <Twitter sx={{ fontSize: 28 }} />
                </IconButton>
                <IconButton
                  sx={{
                    bgcolor: "rgba(255,255,255,0.2)",
                    color: "white",
                    "&:hover": {
                      bgcolor: "rgba(255,255,255,0.3)",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  <GitHub sx={{ fontSize: 28 }} />
                </IconButton>
                <IconButton
                  sx={{
                    bgcolor: "rgba(255,255,255,0.2)",
                    color: "white",
                    "&:hover": {
                      bgcolor: "rgba(255,255,255,0.3)",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  <Email sx={{ fontSize: 28 }} />
                </IconButton>
              </Box>
            </Box>

            {/* Botão de Contato */}
            <Button
              variant="contained"
              size="large"
              sx={{
                bgcolor: "white",
                color: "#1976d2",
                py: 1.5,
                px: 4,
                fontSize: "1.1rem",
                fontWeight: "bold",
                borderRadius: 3,
                "&:hover": {
                  bgcolor: "#f5f5f5",
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Entrar em Contato
            </Button>
          </Grid>

          {/* Lado Direito - Mapa */}
          <Grid
            size={{ xs: 12, sm: 12, md: 6 }}
            sx={{
              position: "relative",
              minHeight: { xs: "300px", md: "60vh" },
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Mapa Incorporado */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1975750816406!2d-46.65844368502207!3d-23.561414984691267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%201000%20-%20Bela%20Vista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt!2sbr!4v1642678901234!5m2!1spt!2sbr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização da Empresa"
              />

              {/* Overlay com informações */}
              <Paper
                elevation={8}
                sx={{
                  position: "absolute",
                  top: 20,
                  right: 20,
                  p: 2,
                  bgcolor: "rgba(255,255,255,0.95)",
                  backdropFilter: "blur(10px)",
                  borderRadius: 2,
                  maxWidth: "200px",
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", color: "#1976d2", mb: 1 }}
                >
                  Nossa Localização
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: "0.9rem" }}
                >
                  Av. Paulista, 1000
                  <br />
                  Bela Vista
                  <br />
                  São Paulo - SP
                  <br />
                  CEP: 01310-100
                </Typography>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
