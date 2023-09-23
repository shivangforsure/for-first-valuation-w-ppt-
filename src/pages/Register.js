import { TextField, FormControlLabel, Checkbox, Button, Box, Alert } from '@mui/material';
import Layout from '../components/Layout'; 
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import {useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';

const Registration = () => {
  const handleRecaptchaChange = (value) => {
    setVerified(true);
  };
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState({
        status: false,
        msg: "",
        type: "",
    })
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      try {
        const data = new FormData(e.currentTarget);
        const actualData = {
          username: data.get('username'),
          email: data.get('email'),
          password: data.get('password'),
          confirmPassword: data.get('confirm_password'),
          fullName: data.get('full_name'),
          phoneNumber: data.get('phone_number'),
          dob: data.get('dob'),
          address: data.get('address'),
          city: data.get('city'),
          state: data.get('state'),
          pincode: data.get('pincode'),
          tc: data.get('tc'),
        };
    
        if (
          actualData.username &&
          actualData.email &&
          actualData.password &&
          actualData.confirmPassword &&
          actualData.fullName &&
          actualData.phoneNumber &&
          actualData.dob &&
          actualData.address &&
          actualData.city &&
          actualData.state &&
          actualData.pincode &&
          actualData.tc !== null
        ) {
          if (actualData.password === actualData.confirmPassword) {
            const res = await axios.post('/api/register', actualData);
            if (res.data.status === 'success') {
              navigate('/dashboard');
            } else if (res.data.status === 'failed') {
              setError({ status: true, msg: res.data.message, type: 'error' });
            }
          } else {
            setError({
              status: true,
              msg: "Password and Confirm Password Doesn't Match",
              type: 'error',
            });
          }
        } else {
          setError({ status: true, msg: 'All Fields are Required', type: 'error' });
        }
      } catch (error) {
        console.error('Registration error:', error)
      }
    };
    return (
        <Layout>
            <Box 
            justifyContent="center"
            alignItems="center"
            height="100vh" // Adjust height as needed
            padding="400px"
            paddingTop={15}
            component='form' noValidate sx={{ mt: 1 }} id='registration-form' onSubmit={handleSubmit}>
                {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ''}
                <div className="registration-container">
                <h2 className="registration-heading" style={{height: '40px',padding:1}} >Registration</h2>
                <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField margin='normal' required fullWidth id='username' name='username' label='Username' type='text' />
                </Grid>
                <Grid item xs={6}>
                  <TextField margin='normal' required fullWidth id='email' name='email' label='Email Address' type='email' />
                </Grid>
                <Grid item xs={6}>
                  <TextField margin='normal' required fullWidth id='password' name='password' label='Password' type='password' />
                </Grid>
                <Grid item xs={6}>
                  <TextField margin='normal' required fullWidth id='confirm_password' name='confirm_password' label='Confirm Password' type='password' />
                </Grid>
                <Grid item xs={6}>
                  <TextField margin='normal' required fullWidth id='full_name' name='full_name' label='Full Name' type='text' />
                </Grid>
                <Grid item xs={6}>
                  <TextField margin='normal' required fullWidth id='phone_number' name='phone_number' label='Phone Number' type='tel' />
                </Grid>
                <Grid item xs={6}>
                  <TextField margin='normal' required fullWidth id='dob' name='dob' label='' type='date' />
                </Grid>
                <Grid item xs={6}>
                  <TextField margin='normal' required fullWidth id='address' name='address' label='Address' type='text' />
                </Grid>
                <Grid item xs={6}>
                 <TextField margin='normal' required fullWidth id='city' name='city' label='City' type='text' />
                </Grid>
                <Grid item xs={6}>
                  <TextField margin='normal' required fullWidth id='state' name='state' label='State' type='text' />
                </Grid>
                <Grid item xs={6}>
                  <TextField margin='normal' required fullWidth id='pincode' name='pincode' label='Pincode' type='text' />
                </Grid>
                </Grid>
        
                <FormControlLabel control={<Checkbox value={true} color='primary' name='tc' id='tc' />} label="I agree to the Terms and Conditions"  />

                <ReCAPTCHA sitekey='6Le6yj0oAAAAAO_keF6BZHCE2yRG3PRfMnH3pPMU'  onChange={handleRecaptchaChange} />
                </div>
                <Box textAlign='center'>
                    <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5 }} disabled={!verified}>Register</Button>
                </Box>
            </Box>
        </Layout>
    )
}

export default Registration