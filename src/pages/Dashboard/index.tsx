import { Box } from "@mui/material";
import { TabelaProdutos } from "../../components/TabelaProdutos";
import { TabelaUser } from "../../components/TabelaUser";
import { containerResponsivePadding } from "../../models/ResponsivePadding";

export function Dashboard() {
    return (
        <Box sx={{ containerResponsivePadding }}>
            <TabelaProdutos />
            <TabelaUser />
        </Box>
    )
}