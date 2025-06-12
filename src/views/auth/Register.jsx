import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signupSchema } from '../../schema/auth.schema';
import useAuthentication from '../../hooks/useAuthentication';
import { useNavigate, Link } from 'react-router-dom';
import Alert from '../../components/common/alert';

import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Avatar,
  Container,
  Grid,
} from '@mui/material';

const Register = () => {
  const { loading, apiName, alertType, message, closeAlert, Register } = useAuthentication();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      role: 'buyer',
    },
  });

  const onSubmit = async (data) => {
    const res = await Register(data);
    if (res?.success) {
      navigate('/login');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, mt: 8 }}>
        <Box display="flex" flexDirection="column" alignItems="center">

                    <img style={{ width: '50px', height: '30x', margin: '2x' }}
                        src="https://www.creativefabrica.com/wp-content/uploads/2022/06/17/Ecommerce-Logo-Design-Graphics-32523051-1-1-580x386.jpg"
                        alt="logo"
                    />
          <Typography component="h1" variant="h5" fontWeight="bold">
            Create an account
          </Typography>

          {(apiName === 'signup') && alertType && message && (
            <Box width="100%" mt={2}>
              <Alert
                type={alertType}
                message={message}
                showButton={true}
                closeAlert={closeAlert}
              />
            </Box>
          )}

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 3, width: '100%' }}>
            <TextField fullWidth label="First Name" margin="normal" {...register('first_name')} error={!!errors.first_name} helperText={errors.first_name?.message} />

            <TextField fullWidth label="Last Name" margin="normal" {...register('last_name')} error={!!errors.last_name} helperText={errors.last_name?.message} />

            <TextField fullWidth label="Email" margin="normal" {...register('email')} error={!!errors.email} helperText={errors.email?.message} />

            <TextField fullWidth label="Password" type="password" margin="normal" {...register('password')} error={!!errors.password} helperText={errors.password?.message} />

            <input type="hidden" {...register('role')} value="buyer" />

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loading === 'signup'} >
              {loading === 'signup' ? 'Creating...' : 'Create Account'}
            </Button>

            <Grid container justifyContent="center">
              <Grid item>
                <Typography variant="body2">
                  Already have an account?{' '}
                  <Link to="/login" style={{ color: '#1976d2', textDecoration: 'none' }}>
                    Login here
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
