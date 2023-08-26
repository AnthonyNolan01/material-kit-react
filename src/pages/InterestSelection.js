import React, { useState } from 'react';
import { Button, Chip, Container, CssBaseline, Typography, Paper } from '@mui/material';

const InterestSelection = () => {
  // Predefined list of interests
  const interestsList = ['Music', 'Technology', 'Sports', 'Art', 'Travel', 'Movies', 'Fashion', 'Food'];

  // State to keep track of selected interests
  const [selectedInterests, setSelectedInterests] = useState([]);

  // Toggle selection of an interest
  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((item) => item !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    // Log or send the selected interests to the server
    console.log('Selected Interests:', selectedInterests);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper elevation={3} style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5">Select Your Interests</Typography>
        <div style={{ margin: '20px 0' }}>
          {interestsList.map((interest, index) => (
            <Chip
              key={index}
              label={interest}
              clickable
              color={selectedInterests.includes(interest) ? 'primary' : 'default'}
              onClick={() => toggleInterest(interest)}
              style={{ margin: '5px' }}
            />
          ))}
        </div>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Paper>
    </Container>
  );
};

export default InterestSelection;
