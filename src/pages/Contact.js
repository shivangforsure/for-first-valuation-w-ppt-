import React from 'react'
import Layout from '../components/Layout'
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import MailIcon from '@mui/icons-material/Mail';
import BusinessIcon from '@mui/icons-material/Business';

const Contact = () => {
  return (
    <Layout>
      <Box sx={{ my: 5, ml: 10, "& h4": { fontWeight: "bold", mb: 2}}}>
        <Typography variant="h4">Contact For Help and Support</Typography>
        <p>Ministry of Law And justice</p>
      </Box>
      <Box sx={{m:3, width:"600px", ml:10, "@media (max-width:600px)": {
        width: "300px",
      },
      }}>
        <TableContainer component={Paper}>
          <Table aria-label="contact table">
            <TableHead>
              <TableRow>
                <TableCell 
                  sx={{bgcolor:"white",color:"black",}} 
                  align='center'
                >
                  Contact Details
                 </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <SupportAgentIcon sx={{color: "red",pt: 1}}/> 1234567890 
                  (tollfree)
                </TableCell>
              </TableRow>
              <TableRow>
               <TableCell>
                  <MailIcon sx={{color: "red",pt: 1}}/> xyz@gov.in
                </TableCell>
              </TableRow>
              <TableRow>
               <TableCell>
                  <BusinessIcon sx={{color: "red",pt: 1}}/> 4th Floor, A-Wing, Shastri Bhawan New Delhi-110 001
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Layout>
  )
}

export default Contact
