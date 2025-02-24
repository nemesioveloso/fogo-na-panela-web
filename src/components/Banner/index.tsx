import { Box } from "@mui/material";
import banner from '../../assets/banner.png'

export function Banner() {
    return (
        <Box
            component="a"
            href="https://www.example.com"
            target="_blank"
            sx={{
                width: "100%",
                height: { xs: "250px", sm: "350px", md: "450px", lg: "800px" },
                display: "block",
                backgroundImage: `url(${banner})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                textDecoration: "none",
            }}
        ></Box>
    );
}
