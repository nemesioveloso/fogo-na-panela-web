import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';

const pages = [
    { id: 1, nome: 'Products', rota: '/cadastrarProduto' },
    { id: 2, nome: 'Pricing', rota: '/pricing' },
    { id: 3, nome: 'Blog', rota: '/blog' },
    { id: 4, nome: 'Cardaplio', rota: '/cardaplio' },
    { id: 5, nome: 'Social', rota: '/social' }
];
const redes = [
    { id: 1, icone: FaFacebook, rota: 'http://facebook.com', color: '#1877F2' },
    { id: 2, icone: FaInstagram, rota: 'http://instagram.com', color: '#E1306C' },
    { id: 3, icone: FaWhatsapp, rota: 'http://whatsapp.com', color: '#25D366' }
];

export function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="static" sx={{ background: '#212121' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            width: '100%'
                        }}
                    >
                        LOGO
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.id} onClick={handleCloseNavMenu}>
                                    <Typography sx={{ textAlign: 'center' }}>{page.nome}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'space-evenly', width: '100%' }}>
                        {pages.map((page) => (
                            <Button
                                key={page.id}
                                href={page.rota}
                                sx={{
                                    my: 2,
                                    color: 'white',
                                    display: 'block',
                                    borderBottom: '2px solid transparent',
                                    '&:hover': {
                                        borderBottom: '2px solid #e4ec04',
                                    },
                                }}

                            >
                                {page.nome}
                            </Button>
                        ))}
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'flex', md: 'flex' }, justifyContent: 'end' }}>
                        {redes.map((rede) => {
                            const IconComponent = rede.icone;
                            return (
                                <IconButton
                                    key={rede.id}
                                    href={rede.rota}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    <IconComponent size={24} style={{ color: rede.color }} />
                                </IconButton>
                            );
                        })}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}