import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
import mockProfileImage from 'assets/img/mockPfp.jpg';

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
  const useStyles = makeStyles(styles);
  const classes = useStyles();

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

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setProfilePic(e.target.result);
        // Optionally: send this image to the backend if you're storing it there
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

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
    // Fetch data from API
    // For demonstration purposes, let's assume the API endpoint is /api/user
    // fetch('/api/user')
    //   .then((response) => response.json())
    //   .then((data) => setUserData(data));

    setUserData(mockUserData);
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
        if (data.success) {
          // Toggle to view mode
          setEditMode(false);
        }
        // Handle other scenarios as needed, like error messages
      });
  };

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>{editMode ? 'Edit Profile' : 'View Profile'}</h4>
              {/* Rest of the CardHeader content */}
            </CardHeader>
            <CardBody>
              {/* Map through userData to generate CustomInputs */}
              {Object.keys(userData).map((key) =>
                key !== 'internationalStudent' &&
                key !== 'underrepressented' &&
                key !== 'cv' &&
                key !== 'video' &&
                key !== 'publication' &&
                key !== 'recomendation' &&
                key !== 'statement' &&
                key !== 'graduationDate' &&
                key !== 'startDate' &&
                key !== 'experienceTime' &&
                key !== 'positionDuration' ? (
                  <GridContainer key={key}>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText={key.charAt(0).toUpperCase() + key.slice(1)}
                        id={key}
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          value: userData[key],
                          onChange: (e) =>
                            setUserData((prev) => ({
                              ...prev,
                              [key]: e.target.value,
                            })),
                          disabled: !editMode,
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                ) : null
              )}

              {/* Other fields like selects, radio buttons, and file inputs 
                   should be handled manually rather than mapping through userData */}
              {/* Example for the radio button field "internationalStudent" */}
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <p>Are you an international student?</p>
                  <div>
                    <label>
                      <input
                        type="radio"
                        name="internationalStudent"
                        value="true"
                        checked={userData.internationalStudent === 'true'}
                        onChange={(e) =>
                          setUserData((prev) => ({
                            ...prev,
                            internationalStudent: e.target.value,
                          }))
                        }
                        disabled={!editMode}
                      />
                      Yes
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="internationalStudent"
                        value="false"
                        checked={userData.internationalStudent === 'false'}
                        onChange={(e) =>
                          setUserData((prev) => ({
                            ...prev,
                            internationalStudent: e.target.value,
                          }))
                        }
                        disabled={!editMode}
                      />
                      No
                    </label>
                  </div>
                </GridItem>
              </GridContainer>

              {/* Select field for "Year" */}
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <label>Year</label>
                  <select
                    value={userData.year}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        year: e.target.value,
                      }))
                    }
                    disabled={!editMode}
                  >
                    <option value="">Select a year</option>
                    <option value="First">First</option>
                    <option value="Second">Second</option>
                    <option value="Third">Third</option>
                    <option value="Fourth">Fourth</option>
                    {/* Add other years as needed */}
                  </select>
                </GridItem>
              </GridContainer>

              {/* File input for "Upload documents" */}
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <label>Upload Documents</label>
                  {editMode && (
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleUpdateProfile(e)}
                      multiple // if you want to allow uploading multiple documents
                    />
                  )}
                  {/* If you want to show the name of uploaded documents when not in edit mode, 
         you can add additional logic here */}
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              {editMode ? (
                <Button color="primary" onClick={handleUpdateProfile}>
                  Update Profile
                </Button>
              ) : (
                <Button color="primary" onClick={() => setEditMode(true)}>
                  Edit Profile
                </Button>
              )}
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      {/* Textarea for "About Yourself" */}
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <label>About Yourself</label>
          <textarea
            value={userData.aboutYourself}
            onChange={(e) =>
              setUserData((prev) => ({
                ...prev,
                aboutYourself: e.target.value,
              }))
            }
            disabled={!editMode}
            rows="5"
          ></textarea>
        </GridItem>
      </GridContainer>

      {/* ... Similarly, you would add textarea components for other keys like phdFocus, researchInterest, etc ... */}

      {/* Radio button for "Underrepresented" */}
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <p>Do you belong to an underrepresented group?</p>
          <div>
            <label>
              <input
                type="radio"
                name="underrepresented"
                value="true"
                checked={userData.underrepresented === 'true'}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    underrepresented: e.target.value,
                  }))
                }
                disabled={!editMode}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="underrepresented"
                value="false"
                checked={userData.underrepresented === 'false'}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    underrepresented: e.target.value,
                  }))
                }
                disabled={!editMode}
              />
              No
            </label>
          </div>
        </GridItem>
      </GridContainer>

      {/* Date input for "Graduation Date" */}
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <label>Graduation Date</label>
          <input
            type="date"
            value={userData.graduationDate}
            onChange={(e) =>
              setUserData((prev) => ({
                ...prev,
                graduationDate: e.target.value,
              }))
            }
            disabled={!editMode}
          />
        </GridItem>
      </GridContainer>

      {/* ... Similarly, you would add date input components for other keys like startDate ... */}

      {/* Select input for "Time Zone" */}
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <label>Time Zone</label>
          <select
            value={userData.timeZone}
            onChange={(e) =>
              setUserData((prev) => ({
                ...prev,
                timeZone: e.target.value,
              }))
            }
            disabled={!editMode}
          >
            {/* Here you would list out all the time zones as <option> elements */}
          </select>
        </GridItem>
      </GridContainer>

      {/* File input for CV */}
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <label>CV</label>
          {editMode && (
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  cv: e.target.files[0], // Considering only a single file upload for CV
                }))
              }
            />
          )}
        </GridItem>
      </GridContainer>

      {/* File input for "Publication" */}
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <label>Publication</label>
          {editMode && (
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  publication: e.target.files[0], // Assuming only a single file upload for Publication
                }))
              }
            />
          )}
        </GridItem>
      </GridContainer>

      {/* File input for "Recommendation" */}
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <label>Recommendation</label>
          {editMode && (
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  recommendation: e.target.files[0], // Assuming only a single file upload for Recommendation
                }))
              }
            />
          )}
        </GridItem>
      </GridContainer>

      {/* File input for "Statement" */}
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <label>Statement</label>
          {editMode && (
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  statement: e.target.files[0], // Assuming only a single file upload for Statement
                }))
              }
            />
          )}
        </GridItem>
      </GridContainer>

      {/* File input for "Video" */}
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <label>Video</label>
          {editMode && (
            <input
              type="file"
              accept=".mp4,.avi,.mkv,.mov" // Accepting common video formats
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  video: e.target.files[0], // Assuming only a single file upload for Video
                }))
              }
            />
          )}
        </GridItem>
      </GridContainer>
    </div>
  );
}
