import { Grid2, Typography } from '@mui/material'
import axios, { AxiosError } from 'axios'
import { toast } from 'react-toastify'

export const handleApiError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError
    console.log(axiosError, "axiosError");
    
    if (
      axiosError.response?.data
    ) {
      const title = axiosError.response.data.titulo
      const message = axiosError.response.data.message
      if (typeof message === 'string') {
        toast.error(
          <Grid2 container>
            <Grid2 size={12}>
              <Typography variant="h6">{title}</Typography>
            </Grid2>
            <Grid2 size={12}>
              <Typography variant="body1">{message}</Typography>
            </Grid2>
          </Grid2>        
      );
      } else {
        toast.error('Ocorreu um erro na resposta da API')
      }
    } else {
      // Trate outros tipos de erro do Axios aqui
      toast.error('Nenhuma resposta recebida do servidor')
    }
  } else {
    // Trate erros não-Axios aqui
    toast.error('Ocorreu um erro desconhecido')
  }
}
