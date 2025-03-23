import { Box, Button, Typography } from '@mui/material'

export function NotPermission() {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        background: '#f7f7f7',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100dvh',
      }}
    >
      <Typography variant="h1" component="h2" gutterBottom>
        403
      </Typography>
      <Typography variant="h5" component="h3" gutterBottom>
        Usuario Sem Permissão
      </Typography>
      <Typography variant="body1" gutterBottom>
        Entre em contato com a equipe de desenvolvimento e solicite sua
        autorização
      </Typography>
      <Button
        variant="outlined"
        sx={{ mt: 3 }}
      >
        Voltar para o Login
      </Button>
    </Box>
  )
}
