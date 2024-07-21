import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

export default function JoinClient() {
  const navigate = useNavigate();

  const goToPersonalDetails = () => {
    navigate('/PersonalDetails');
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={goToPersonalDetails}>
        Go to Personal Details
      </Button>
    </div>
  );
}
