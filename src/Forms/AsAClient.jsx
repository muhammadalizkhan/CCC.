import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

export default function AsAClient() {
  const navigate = useNavigate();

  const goToPersonalDetails = () => {
    navigate('/PersonalDetails');
  };

  return (
    <div>
      <h1>As A Client</h1>
      <Button variant="contained" color="primary" onClick={goToPersonalDetails}>
        Go to Personal Details
      </Button>
    </div>
  );
}
