import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';
import {
  Alert,
  AppBar,
  Toolbar,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
  Divider,
  TextField,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios';
import UpdateProfileForm from './sidebar/UpdateProfileForm';
import ApplyPreTrialForm from './sidebar/ApplyPreTrialForm';
import FeedbackForm from './sidebar/FeedbackForm'; // Import FeedbackForm

function UserProfile() {
  const [selectedPage, setSelectedPage] = useState('');
  const [userData, setUserData] = useState(true);
  const [welcomeMessage,setwelcomeMessage] = useState(true);
  const [logoutMessage,setlogoutMessage] = useState(false);
  const [showUpdateProfile, setShowUpdateProfile] = useState(false);
  const [showApplyPreTrialForm, setShowApplyPreTrialForm] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false); // State for FeedbackForm

  useEffect(() => {
    // Fetch user data from the backend here and update the userData state
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/user/profile'); // Replace with the actual API endpoint
        if (response.data) {
          setUserData(response.data.user);
          setwelcomeMessage(response.data.message);
          setTimeout(() => {
            setwelcomeMessage(''); // Clear the welcome message after 5 seconds
          }, 3000);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);


  const handlePageChange = async(pageName) => {
    setSelectedPage(pageName);
    setShowUpdateProfile(false); // Reset showUpdateProfile for other pages
    setShowApplyPreTrialForm(false); // Reset showApplyPreTrialForm for other pages
    setShowFeedbackForm(false); // Reset showFeedbackForm for other pages

    if (pageName === 'update-profile') {
      setShowUpdateProfile(true);
    } else if (pageName === 'apply-pretrial') {
      setShowApplyPreTrialForm(true); // Show ApplyPreTrialForm for "Apply Pre-trial"
    } else if (pageName === 'feedback') {
      setShowFeedbackForm(true); // Show FeedbackForm for "Feedback"
    }
  };
  const Navigate = useNavigate();
  const handleLogout = async()=>{
    try {
      const res = await axios.get('/api/user/logout');
      if (res.data.status === 'success') {
        setlogoutMessage(res.data.message);
          setTimeout(() => {
            setlogoutMessage(''); // Clear the welcome message after 5 seconds
            Navigate('/login');
          }, 3000);
        
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  const pageContent = {
    'update-profile': <UpdateProfileForm />,
    'apply-pretrial': <ApplyPreTrialForm />,
    notifications: 'Notifications Content',
    'history-log': 'History Log Content',
    feedback: <FeedbackForm />, // Render FeedbackForm component
    logout: 'Logout Content',
  };

  return (
    <Layout>
      {welcomeMessage && <Alert severity="success">{welcomeMessage}</Alert>}
      {logoutMessage && <Alert severity="success">{logoutMessage}</Alert>}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}></Typography>
          <IconButton color="inherit">
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box display="flex">
        <Box width={180} p={2} bgcolor="lightgray">
          <List>
            <ListItem button onClick={() => handlePageChange('update-profile')}>
              <ListItemText primary="Update Profile" />
            </ListItem>
            <ListItem button onClick={() => handlePageChange('apply-pretrial')}>
              <ListItemText primary="Apply Pre-trial" />
            </ListItem>
            <ListItem button onClick={() => handlePageChange('notifications')}>
              <ListItemText primary="Notifications" />
            </ListItem>
            <ListItem button onClick={() => handlePageChange('history-log')}>
              <ListItemText primary="History Log" />
            </ListItem>
            <ListItem button onClick={() => handlePageChange('feedback')}>
              <ListItemText primary="Feedback" />
            </ListItem>
            <button onClick={handleLogout}>
              <ListItemText primary="Logout" />
            </button>
          </List>
        </Box>
        <Box p={2} flexGrow={1}>
          {/* Content area */}
          {pageContent[selectedPage] || <h2>Anyone can be falsely accused of a crime. Everyone accused of a crime deserves a fair trail.</h2>}
        </Box>
        <Box p={2} bgcolor="lightgray" width={180}>
          {/* User Details */}
          {userData && (
            <div>
              <Typography variant="h6">User Details</Typography>
              <Typography>Name: {userData.full_name}</Typography>
              <Typography>Email: {userData.email}</Typography>
              {/* Add more user details as needed */}
            </div>
          )}
        </Box>
      </Box>
      <Divider />
      {/* Increase the gap between header and footer */}
      <Box p={4} />
    </Layout>
  );
}

export default UserProfile;
