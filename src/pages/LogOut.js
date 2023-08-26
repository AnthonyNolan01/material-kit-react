import React, { useCallback } from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/system';

const CardCategoryWhite = styled('div')({
  color: 'rgba(255,255,255,.62)',
  margin: '0',
  fontSize: '14px',
  marginTop: '0',
  marginBottom: '0',
});

const CardTitleWhite = styled('div')({
  color: '#FFFFFF',
  marginTop: '0px',
  minHeight: 'auto',
  fontWeight: '300',
  fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
  marginBottom: '3px',
  textDecoration: 'none',
});

function LogoutComponent() {
  const handleLogout = useCallback(async () => {
    try {
      const response = await fetch('/logout', {
        method: 'POST',
      });
      if (response.ok) {
        // Redirect to login page or any other page you'd like after logout
        window.location.href = '/login';
      } else {
        // Handle any errors that occur during logout
        console.error('Failed to log out');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }, []);

  return (
    <Button variant="contained" color="primary" onClick={handleLogout}>
      Log Out
    </Button>
  );
}

export default LogoutComponent;
