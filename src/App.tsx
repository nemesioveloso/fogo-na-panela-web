import { Box } from '@mui/material'
import './App.css'
import { Router } from './routes/routes'
import { ResponsiveAppBar } from './components/ResponsiveAppBar'
import { containerResponsivePadding } from './models/ResponsivePadding'

export function App() {
  return (
    <Box>
      <ResponsiveAppBar />
      <Box sx={containerResponsivePadding}>
        <Router />
      </Box>
    </Box>
  )
}
