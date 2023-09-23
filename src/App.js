//import Layout from "./components/Layout/Layout";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Register from './pages/Register'
import Login from './pages/Login'
import Pagenotfound from './pages/Pagenotfound'
import UserProfile from './pages/UserProfile'
//import UserProfile from './pages/UserProfile'
//import { Switch } from '@mui/material'

function App() {
  return (
    <div>
      <BrowserRouter> 
       <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route exact path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Pagenotfound />} />
        <Route path="/dashboard" element={<UserProfile />} />
       </Routes>
      </BrowserRouter>
    </div>
  );
  
}

export default App;
