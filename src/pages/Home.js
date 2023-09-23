import React from 'react'
import { useEffect, useState } from 'react';
import Layout from '../components/Layout'
import { Link } from "react-router-dom"
import '../styles/HomeStyles.css'

const Home = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/message')
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
      })
      ;
  }, []);
  return (
    <Layout>
      <div className="home" style={{
        backgroundImage: `url(${require("../images/banner.jpg")})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
       backgroundPosition: "center", 
      }}
      >
        <div className='headerContainer'>
          <h1>{message}</h1>
          <h1>Welcome To Case Management Hearing</h1>
          <p>The new way to make courts work efficently</p>
          <Link to="/login">
          <button>Register for Pre-Trail Conference</button>
          </Link>
        </div>
      </div>
    </Layout>
  )
}

export default Home
