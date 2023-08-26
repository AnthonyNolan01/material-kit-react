import React, { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  Button,
  TextField,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextareaAutosize,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';

import mockProfileImage from '../images/blank_pfp.png';

const styles = {
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
  },
};

export default function Maps() {
  const classes = styles;

  //profile pic
  const [profilePic, setProfilePic] = useState(mockProfileImage); // Initially set to a default profile image or empty string

  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    graduationDate: null,
    startDate: null,
    positionDuration: '',
    experienceTime: '',
    internationalStudent: null, // true or false
    underrepresented: null, // true or false
    aboutYourself: '',
    phdFocus: '',
    researchInterest: '',
    labSkills: '',
    successfulPostDoc: '',
    bestFit: '',
    cv: null, // File
    publication: null, // File
    recommendation: null, // File
    statement: null, // File
    video: null, // File
    socialMedia: '',
    timeZone: '',
    source: '',
  });

  const [editMode, setEditMode] = useState(false);

  const mockUserData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    graduationDate: null,
    startDate: null,
    positionDuration: '2 years', // I added a dummy value, adjust as needed
    experienceTime: '3 years', // I added a dummy value, adjust as needed
    internationalStudent: false,
    underrepresented: true,
    aboutYourself: 'I am John Doe, a passionate researcher.',
    phdFocus: 'Machine Learning',
    researchInterest: 'Deep Learning, Neural Networks',
    labSkills: 'PCR, Electrophoresis',
    successfulPostDoc: 'Published 5 papers in renowned journals.',
    bestFit: 'Machine Learning Labs, especially focused on Neural Networks.',
    cv: null,
    publication: null,
    recommendation: null,
    statement: null,
    video: null,
    socialMedia: 'https://linkedin.com/in/johndoe',
    timeZone: 'PST',
    source: 'LinkedIn',
  };

  useEffect(() => {
    fetch('/api/user/saved')
      .then((response) => response.json())
      .then((data) => setUserData(data));

    setUserData(mockUserData);
  }, []);

  const handleUpdateProfile = () => {
    // Make an API call to update user data
    // Assume POST request to /api/user/update with userData as body
    fetch('/api/user/update/saved', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Toggle to view mode
          setEditMode(false);
        }
        // Handle other scenarios as needed, like error messages
      });
  };

  return (
    <div>
      <Grid container>
        <Grid item xs={12} sm={12} md={8}>
          <Card>
            <CardHeader title={editMode ? 'Edit Profile' : 'View Profile'} sx={styles.cardTitleWhite} />
            <CardContent>
              {/* Map through userData to generate Inputs */}
              {Object.keys(userData).map((key) =>
                key !== 'internationalStudent' &&
                key !== 'underrepresented' &&
                key !== 'cv' &&
                key !== 'video' &&
                key !== 'publication' &&
                key !== 'recommendation' &&
                key !== 'statement' &&
                key !== 'graduationDate' &&
                key !== 'startDate' &&
                key !== 'experienceTime' &&
                key !== 'timeZone' &&
                key !== 'source' &&
                key !== 'positionDuration' ? (
                  <Grid container key={key}>
                    <Grid item xs={12} sm={12} md={12} style={{ marginTop: '20px' }}>
                      <TextField
                        label={key.charAt(0).toUpperCase() + key.slice(1)}
                        id={key}
                        fullWidth
                        value={userData[key]}
                        onChange={(e) =>
                          setUserData((prev) => ({
                            ...prev,
                            [key]: e.target.value,
                          }))
                        }
                        disabled={!editMode}
                      />
                    </Grid>
                  </Grid>
                ) : null
              )}
            </CardContent>
            <CardActions>
              {editMode ? (
                <Button variant="contained" color="primary" onClick={handleUpdateProfile}>
                  Update Profile
                </Button>
              ) : (
                <Button variant="contained" color="primary" onClick={() => setEditMode(true)}>
                  Edit Profile
                </Button>
              )}
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
