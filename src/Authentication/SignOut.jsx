import React from 'react';
import { signOut } from "firebase/auth";
import { auth } from '../firebaseConfig';
import { Button } from '@mui/material';

const SignOut = () => {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('User signed out');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return <Button onClick={handleSignOut} variant="contained" color="secondary">Sign Out</Button>;
};

export default SignOut;
