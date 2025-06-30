import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Button,
  Container,
} from '@mui/material';


const VerifyEmail = ({ message }:any) => {
  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginTop={'250px'}
      >
        <Paper elevation={3} sx={{ padding: 4, width: '100%' }}>
          <Box textAlign="center">
            <Typography variant="h5" color="success.main" fontWeight="bold" gutterBottom>
              {message}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              Your email has been successfully verified.
              You can now go to the login page to access the platform.
            </Typography>

            <Button
              component={Link}
              to="/login"
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
            >
              Go to Login
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default VerifyEmail;
