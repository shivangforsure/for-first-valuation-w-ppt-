import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Paper,
  InputAdornment,
} from '@mui/material';
import axios from 'axios'; // Import Axios

const ApplyPreTrialForm = () => {
  const [formData, setFormData] = useState({
    caseReferenceID: '',
    oppositionPartyName: '',
    caseStatementFile: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      caseStatementFile: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('caseReferenceID', formData.caseReferenceID);
      formDataToSend.append('oppositionPartyName', formData.oppositionPartyName);
      formDataToSend.append('caseStatementFile', formData.caseStatementFile);

      // Make a POST request to the server's /submitForm route
      const response = await axios.post('/api/submitCaseForm', formDataToSend);

      if (response.status === 201) {
        // Form submitted successfully
        console.log('Form Data submitted successfully');

        // You can add any additional confirmation messages here
        console.log('Server Response:', response.data);
      } else {
        // Handle any other status codes or errors
        console.error('Error submitting form:', response.data);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h6">Apply Pre-trial</Typography>
      <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Case Reference ID"
                name="caseReferenceID"
                value={formData.caseReferenceID}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Opposition Party Name"
                name="oppositionPartyName"
                value={formData.oppositionPartyName}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
                id="caseStatementFileInput"
                required
              />
              <label htmlFor="caseStatementFileInput">
                <Button
                  variant="outlined"
                  component="span"
                  endIcon={<InputAdornment position="end">Upload Image</InputAdornment>}
                >
                  Upload Case Statement
                </Button>
              </label>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default ApplyPreTrialForm;
