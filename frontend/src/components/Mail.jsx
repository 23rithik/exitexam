import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Mail = () => {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/api/generate-otp', { email });

      if (response.status === 201) {
        setOtpSent(true);
        alert('OTP has been sent to your email!');
        navigate('/enterotp');
      }
    } catch (error) {
      console.error('Error generating OTP:', error);
      alert('Error sending OTP. Please try again.');
    }
  };

  return (
    <Box
      sx={{
        padding: 2,
        maxWidth: 800,
        margin: 'auto',
        background: 'lightgrey',
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ color: 'black' }}>
        OTP VERIFICATION
      </Typography>
      <Grid container spacing={2} sx={{ paddingTop: 5 }}>
        {!otpSent ? (
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="outlined-email-input"
                label="Email ID"
                value={email}
                onChange={handleEmailChange}
                type="email"
                autoComplete="email"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sx={{ marginTop: 2 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Submit
              </Button>
            </Grid>
          </form>
        ) : (
          <Typography variant="h6" sx={{ color: 'black' }}>
            Please check your email for the OTP.
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default Mail;
