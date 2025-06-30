import React from 'react';
import {
  Container,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Avatar
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { forgetPasswordSchema } from '../../schema/auth.schema';
import useAuthentication from '../../hooks/useAuthentication';
import Alert from '../../components/common/alert';

const ForgetPassword = () => {
  const { loading, apiName, forgetPassword, alertType, message, closeAlert } = useAuthentication();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(forgetPasswordSchema),
  });

  const onSubmit = async (data:any) => {
    const res = await forgetPassword(data.email);
    if (res?.type === 'auth/forgetPassword/fulfilled') {
      reset();
    }
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" justifyContent="center" alignItems="center" marginTop={'250px'}>
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Box display="flex" alignItems="center" mb={2}>
            <Avatar
              src="https://www.creativefabrica.com/wp-content/uploads/2022/06/17/Ecommerce-Logo-Design-Graphics-32523051-1-1-580x386.jpg"
              alt="Ecommerce Logo"
              sx={{ width: 40, height: 40, mr: 1 }}
            />
            <Typography variant="h6" fontWeight="bold">
              Ecommerce
            </Typography>
          </Box>

          {(apiName === '/auth/forgetPassword') && alertType && message && (
            <Alert type={alertType} message={message} showButton={true} closeAlert={closeAlert} />
          )}

          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Forgot Password
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              fullWidth
              label="Your email"
              variant="outlined"
              margin="normal"
              type="email"
              placeholder="name@company.com"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading === 'forgetPassword'}
              sx={{ mt: 2 }}
            >
              {loading === 'forgetPassword' ? 'Sending...' : 'Send Reset Link'}
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default ForgetPassword;
