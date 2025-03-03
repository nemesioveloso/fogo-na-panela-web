import { Box } from "@mui/material";
import { TabelaProdutos } from "../../components/TabelaProdutos";
import { TabelaUser } from "../../components/TabelaUser";
import { containerResponsivePadding } from "../../models/ResponsivePadding";
import { CardCaixa } from "../../components/Caixa";

export function Dashboard() {
    return (
        <Box sx={{ containerResponsivePadding }}>
            <CardCaixa />
            <TabelaProdutos />
            <TabelaUser />
        </Box>
    )
}