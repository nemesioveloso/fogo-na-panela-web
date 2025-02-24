import { Box } from '@mui/material'
import './App.css'
import { Router } from './routes/routes'
import { ResponsiveAppBar } from './components/ResponsiveAppBar'

export function App() {
  return (
    <Box>
      <ResponsiveAppBar />
      <Router />
    </Box>
  )
}
