import { TextField, Button, Box, Alert, Typography, CssBaseline } from '@mui/material';
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container } from '@mui/system';

const UserLogin = () => {
  const [error, setError] = useState({
    status: false,
    msg: '',
    type: '',
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData(e.currentTarget);
      const actualData = {
        email: data.get('email'),
        password: data.get('password'),
      };

      if (actualData.email && actualData.password) {
        const res = await axios.post('/api/login', actualData);

        if (res.data.status === 'success') {
          console.log('API Response:Success', res);
          navigate('/dashboard');
        }

        if (res.data.status === 'failed') {
          console.log('API Response:Failed');
          setError({ status: true, msg: res.data.message, type: 'error' });
        }
      } else {
        setError({ status: true, msg: 'All Fields are Required', type: 'error' });
      }
    } catch (error) {
      // Handle any exceptions that may occur during the execution of this code.
      console.error(error);
    }
  };

  return (
    <Layout>
      <Box
        sx={{
          my: 4, // Decrease the margin from 13 to 4
          textAlign: 'center',
          p: 2,
          '& h4': {
            fontWeight: 'bold',
            my: 2,
            fontSize: '2rem',
          },
          '& p': {
            textAlign: 'justify',
          },
          '@media (max-width:600px)': {
            mt: 0,
            '& h4': {
              fontSize: '1.5rem',
            },
          },
        }}
      ></Box>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div>
        <Typography variant="h3" sx={{ my: 1, marginTop: 0, marginBottom: 2 }}>
          Login Form
        </Typography>
        <form noValidate sx={{ my: 2, padding: 2 }} id="login-form" onSubmit={handleSubmit}>
          {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ''}
          {/* Reduced the margin of TextField components */}
          <TextField margin="dense" required fullWidth id="email" name="email" label="Email Address" />
          <TextField margin="dense" required fullWidth id="password" name="password" label="Password" type="password" />
          <Box sx={{ my: 2 }}>
            <Button type="submit" variant="contained">
              Login
            </Button>
          </Box>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <NavLink to="/sendpasswordresetemail">
              <Button variant="outlined" color="primary">
                Forgot Password
              </Button>
            </NavLink>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>New User?</Typography>
            <NavLink to="/register">
              <Button variant="outlined" color="primary">
                Register Now
              </Button>
            </NavLink>
          </div>
        </form>
        </div>
      </Container>
    </Layout>
  );
};

export default UserLogin;
