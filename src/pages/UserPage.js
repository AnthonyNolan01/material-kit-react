import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import { Card, CardHeader, CardContent, CardActions, Button, Grid, TextField, Typography } from '@mui/material';
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

export default function UserProfile() {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    skills: '',
    interests: '',
    bio: '',
  });

  const [pfpUrl, setPfpUrl] = useState('');

  //profile pic
  const [profilePic, setProfilePic] = useState(mockProfileImage); // Initially set to a default profile image or empty string

  const [editMode, setEditMode] = useState(false);

  const getSignedUrl = async (fileName, fileType) => {
    const response = await fetch('/api/sign-s3', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fileName, fileType }),
    });
    const data = await response.json();
    return data.signedUrl;
  };

  const uploadToS3 = async (signedUrl, file) => {
    await fetch(signedUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type,
      },
    });
  };

  const bucketName = 'phd-applications';

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = async (e) => {
        setProfilePic(e.target.result);

        // Generate the S3 signed URL for upload
        const signedUrl = await getSignedUrl(file.name, file.type);
        if (signedUrl) {
          try {
            await uploadToS3(signedUrl, file);

            // Generate S3 image URL
            const s3ImageUrl = `https://${bucketName}.s3.amazonaws.com/${file.name}`;

            setPfpUrl(s3ImageUrl);

            // TODO: Update your backend/user database with s3ImageUrl
            // For example:
            // await updateUserProfilePicture(s3ImageUrl);
          } catch (error) {
            console.error('Failed to upload to S3', error);
          }
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const mockUserData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    skills: 'React, JavaScript, CSS',
    interest: 'Web Development',
    bio: 'I am a passionate web developer.',
  };

  useEffect(() => {
    // Fetching the user's profile data which includes the image URL
    setUserData(mockUserData);
    fetch('/api/user')
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);

        setPfpUrl(data.pfpUrl);
        if (data.pfpUrl != null) {
          setProfilePic(data.pfpUrl);
        }
      });
  }, []);

  const handleUpdateProfile = () => {
    // Make an API call to update user data
    // Assume POST request to /api/user/update with userData as body
    fetch('/api/user/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Toggle to view mode
        setEditMode(false);
        // Next, update the profile picture URL
        return fetch('/api/user/update/pfp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ pfpUrl }),
        });
      })
      .then((response) => response.json())
      .then((pfpUrl) => {
        // Toggle to view mode
        setEditMode(false);
        // Handle other scenarios as needed, like error messages
      });
  };

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={8}>
          <Card>
            <CardHeader
              title={editMode ? 'Edit Profile' : 'View Profile'}
              sx={{ backgroundColor: '#3f51b5', color: 'white' }}
            />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={12}>
                  <img src={profilePic || mockProfileImage} alt="Profile" width="100" />
                  {editMode && <input type="file" accept="image/*" onChange={(e) => handleImageChange(e)} />}
                </Grid>
                {Object.keys(userData).map((key) => {
                  if (key !== 'id' && key !== 'password' && key !== 'provider' && key !== 'pfpUrl' && key !== 'email') {
                    return (
                      <Grid item xs={12} sm={12} md={12} key={key}>
                        <TextField
                          fullWidth
                          label={key.charAt(0).toUpperCase() + key.slice(1)}
                          variant="outlined"
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
                    );
                  }
                  return null;
                })}
              </Grid>
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
