import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from 'axios';

const EnterOtp = () => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleOtpChange = (event) => {
    setOtp(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/api/verify-otp', { otp });

      if (response.status === 200) {
        // Redirect to the Welcome page on successful OTP verification
        navigate('/welcome');
      } else {
        alert('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('Error verifying OTP. Please try again.');
    }
  };

  return (
    <Box
      sx={{
        padding: 2,
        maxWidth: 400,
        margin: 'auto',
        background: 'lightgrey',
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ color: 'black' }}>
        Enter OTP
      </Typography>
      <Grid container spacing={2} sx={{ paddingTop: 2 }}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="otp-input"
            label="OTP"
            value={otp}
            onChange={handleOtpChange}
            variant="outlined"
            type="text"
          />
        </Grid>
        <Grid item xs={12} sx={{ marginTop: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EnterOtp;
