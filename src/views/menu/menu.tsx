import { Box, Button, IconButton, MenuItem, Toolbar, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import React from "react";
import { useNavigate } from "react-router-dom";

const pages = [
    { nome: 'Lista de pessoas', path: "/listar" },
    { nome: 'Cadastrar Pessoas', path: "/cadastro" }, 
    { nome: 'Gerar Relatório', path: "/relatorio" }, 
];

function ResponsiveAppBar() {

    const[anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);        
    }

    const handleCloseNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(null);
    }


    const navigate = useNavigate();


    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-bar"
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
                                <MenuItem key={page.nome} onClick={handleCloseNavMenu}>
                                    <Typography sx={{ textAlign: 'center'}} onClick={() => navigate(page.path)}>{page.nome}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
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
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page.nome}
                                onClick={e => {navigate(page.path); handleCloseNavMenu(e)}}
                                sx={{ my: 2, color: 'white', display: 'block '}}
                            >
                                {page.nome}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveAppBar