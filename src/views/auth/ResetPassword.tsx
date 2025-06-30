import {
  Container,
  Paper,
  Box,
  Typography,
  Avatar,
  TextField,
  Button
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuthentication from '../../hooks/useAuthentication';
import Alert from '../../components/common/alert';
import { resetPasswordSchema } from '../../schema/auth.schema';

const ResetPassword = () => {
  const { loading, apiName, resetPassword, alertType, message, closeAlert } = useAuthentication();
  const navigate = useNavigate();
  const location = useLocation();
  const token:any= new URLSearchParams(location.search).get('token');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
  });

  const onSubmit = async ({ newPassword }: any) => {
      if (!token) return;

  const res = await resetPassword({ newPassword, token });
    if (res?.type === 'auth/resetPassword/fulfilled') {
      reset();
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" justifyContent="center" alignItems="center" marginTop={'250px'}>
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Box display="flex" alignItems="center" mb={3}>
            <Avatar
              src="https://www.creativefabrica.com/wp-content/uploads/2022/06/17/Ecommerce-Logo-Design-Graphics-32523051-1-1-580x386.jpg"
              alt="Ecommerce Logo"
              sx={{ width: 40, height: 40, mr: 2 }}
            />
            <Typography variant="h6" fontWeight="bold">
              Ecommerce
            </Typography>
          </Box>

          {apiName === '/auth/resetPassword' && alertType && message && (
            <Alert type={alertType} message={message} showButton={true} closeAlert={closeAlert} />
          )}

          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Reset Password
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              fullWidth
              label="New Password"
              type="password"
              margin="normal"
              {...register('newPassword')}
              error={!!errors.newPassword}
              helperText={errors.newPassword?.message}
            />

            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              margin="normal"
              {...register('confirmPassword')}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={loading === 'resetPassword'}
              sx={{ mt: 3 }}
            >
              {loading === 'resetPassword' ? 'Resetting...' : 'Reset Password'}
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default ResetPassword;
