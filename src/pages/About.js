import React from 'react'
import Layout from '../components/Layout'
import { Box, Typography } from '@mui/material'

const About = () => {
  return (
    <Layout>
      <Box 
        sx={{
          my:13,
          textAlign:"center",
          p:2,
          "& h4":{
            fontWeight: "bold",
            my:2,
            fontSize:"2rem",
          },
          "& p": {
            textAlign: "justify",
          },
          "@media (max-width:600px)": {
            mt:0,
            "@ h4": {
              fontSize: "1.5rem"
            },
          },
        }}
      >
        <Typography variant='h4'>Welcome! Wanna know about me?</Typography>
        <p>
        Welcome to CMS, the ultimate solution for managing your legal cases online. 
        Whether you are a lawyer, a paralegal, a law firm, or a legal department, LegalCase can help you streamline your workflow, 
        save time and money, and improve your client satisfaction.
        </p>
        <br />
        <p>
        Why CMS?:
        </p>
        <br />
        <p>
        Efficiency: CMH is a crucial step in the legal process, streamlining it through an e-Portal can significantly improve efficiency and reduce administrative burdens.

Access to Justice: Such a portal can enhance access to justice by making the case management process more transparent and user-friendly.

Resource Optimization: By automating scheduling, document submission, and communication, the portal can optimize the allocation of judicial resources.

Time and Cost Savings: Streamlining CMH can reduce delays, leading to faster case resolutions, which can be more cost-effective for both litigants and the legal system.

Transparency: Improved transparency in the case management process can build trust in the legal system and ensure fair treatment for all parties involved.

Remote Access: In a world increasingly reliant on remote work and technology, an e-Portal can facilitate CMH even when physical presence is challenging.

Data Analytics: The portal can also serve as a valuable source of data for analytics, helping policymakers make informed decisions about the legal system.

Scalability: Once developed, the e-Portal can be scaled and adapted for various types of cases, ensuring its long-term relevance and impact.

Interoperability: Promoting compatibility with existing legal systems and other digital platforms can enhance its usefulness and adoption.

Innovation: Tackling this problem statement provides an opportunity for innovative solutions that can transform the legal industry and improve the overall justice system.
        </p>
      </Box>
    </Layout>
  )
}

export default About
