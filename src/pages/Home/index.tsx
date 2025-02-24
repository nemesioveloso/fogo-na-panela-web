import { Box } from '@mui/material'
import Typography from '@mui/material/Typography'
import { Banner } from '../../components/Banner'
export function Home() {
    return (
        <Box>
            <Banner />
            <Typography variant="h4">
                Home
            </Typography>
        </Box>
    )
}