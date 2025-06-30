import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../../schema/auth.schema';
import { useNavigate, Link } from 'react-router-dom';
import useAuthentication from '../../hooks/useAuthentication';
import { useAuth } from '../../context/AuthContex';
import Alert from '../../components/common/alert';
import {
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    Avatar,
    Container,
} from '@mui/material';

const Login = () => {
    const navigate = useNavigate();
    const { setAuthUser } = useAuth();
    const { loading, login, apiName, alertType, message, closeAlert } = useAuthentication();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginSchema),
    });

    const onSubmit = async (data: any) => {
        const res: any = await login(data);
        if (res?.type === 'auth/login/fulfilled') {
            setAuthUser(res.payload.data);
            navigate('/dashboard')
        }
    };

    return (
        <Container style={{ marginTop: '100px', marginLeft: '600px' }} maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 4 }}>
                <Box display="flex" flexDirection="column" alignItems="center">

                    <img style={{ width: '50px', height: '30x', margin: '2x' }}
                        src="https://www.creativefabrica.com/wp-content/uploads/2022/06/17/Ecommerce-Logo-Design-Graphics-32523051-1-1-580x386.jpg"
                        alt="logo"
                    />

                    <Typography component="h1" variant="h4" fontWeight="bold" marginBottom="10px">
                        Ecommerce
                    </Typography>

                    <Typography component="h1" variant="h5" fontWeight="bold">Login</Typography>

                    {apiName === '/auth/login' && alertType && message && (
                        <Box width="100%" mt={2}>
                            <Alert type={alertType} message={message} showButton={true} closeAlert={closeAlert} />
                        </Box>
                    )}

                    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 3, width: '100%' }}>
                        <TextField fullWidth label="Email Address" margin="normal" {...register('email')} error={!!errors.email} helperText={errors.email?.message} />

                        <TextField fullWidth label="Password" type="password" margin="normal" {...register('password')} error={!!errors.password} helperText={errors.password?.message} />

                        <Box display="flex" justifyContent="flex-end" mt={1}>
                            <Typography variant="body2" component={Link} to="/forget-password" sx={{ textDecoration: 'none', color: 'primary.main' }}>
                                Forgot password?
                            </Typography>
                        </Box>

                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loading === 'login'}>
                            {loading === 'login' ? 'Logging in...' : 'Login'}
                        </Button>

                        <Box display="flex" justifyContent="center" mt={2}>
                            <Typography variant="body2">
                             Don't have an Account?{" "}
                                <Link to="/register" style={{ color: "#1976d2", textDecoration: "none" }} >
                                    Register here
                                </Link>
                            </Typography>
                        </Box>

                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default Login;
