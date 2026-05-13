import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../context/AuthContext';
import { Outlet, useNavigate } from 'react-router-dom';

const Layout = () => {

    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <AppBar position="static" elevation={2}>
                <Toolbar>
                    <Typography 
                        variant="h6" 
                        component="div" 
                        sx={{ flexGrow: 1, cursor: 'pointer', fontWeight: 600 }}
                        onClick={() => navigate('/')}
                    >
                        gPanel Cloud Integration
                    </Typography>
                    <Button 
                        color="inherit" 
                        startIcon={<LogoutIcon />} 
                        onClick={handleLogout}
                        sx={{ textTransform: 'none' }}
                    >
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
            {/* Main Page Area Container */}
            <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
                <Outlet />
            </Container>
        </Box>
    );
};

export default Layout;