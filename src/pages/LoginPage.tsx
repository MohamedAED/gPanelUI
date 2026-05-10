import { useForm } from 'react-hook-form';
import { Container, Box, Typography, TextField, Button, Paper } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { login } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (data: any) => {
        await login(data.username, data.password);
        navigate('/dashboard'); // Redirect to dashboard after setting credentials
    };

    return (

        <Container maxWidth="sm">
            <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
                    <Typography variant="h5" align="center" gutterBottom>Login</Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            {...register('username', { required: 'Username is required' })}
                            fullWidth
                            label="Username"
                            margin="normal"
                            error={!!errors.username}
                            helperText={errors.username?.message as string}
                        />
                        <TextField
                            {...register('password', { required: 'Password is required' })}
                            fullWidth
                            type="password"
                            label="Password"
                            margin="normal"
                            error={!!errors.password}
                            helperText={errors.password?.message as string}
                        />
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Sign In
                        </Button>
                    </form>
                </Paper>
            </Box>
        </Container>

    );
};

export default LoginPage;