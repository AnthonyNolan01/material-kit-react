import React, { useEffect, useState } from 'react';
import axios from 'axios';
//import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop: '1px',
    width: '100%',
  },
  header: {
    color: '#6200EE',
    fontSize: '2em',
    width: '100%',
    textAlign: 'center',
  },
  application: {
    border: '1px solid #ddd',
    borderRadius: '5px',
    padding: '10px',
    margin: '10px',
    width: '30%', // Adjust this value to control the box size
    backgroundColor: '#F5F5F5',
    boxSizing: 'border-box', // To ensure padding and border are included in the width
  },
  state: {
    fontSize: '1em',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#6200EE',
    color: 'white',
    padding: '10px',
    borderRadius: '5px',
    textDecoration: 'none',
    marginTop: '20px',
  },
  buttonContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
};

function Dashboard() {
  const [applications, setApplications] = useState([]);

  const [filter, setFilter] = useState('all'); // New state for the filter
  const filteredApps = applications.filter((app) => {
    if (filter === 'all') return true;
    return app.finalState === filter;
  });
  //const [userId, setUserId] = useState(null);

  const mockApps = [
    {
      id: 2,
      firstName: 'Charles',
      lastName: 'Nolan',
      email: 'canthonynolan@gmail.com',
      graduationDate: '2023-08-11',
      startDate: '2023-08-10',
      positionDuration: '1',
      jobApplication: 'Lung Cancer Lab',
      internationalStudent: false,
      aboutYourself: 'q',
      phdFocus: 'a',
      researchInterest: 'a',
      labSkills: 'a',
      successfulPostDoc: 'a',
      bestFit: 'a',
      cv: null,
      publication: null,
      recommendation: null,
      socialMedia: 'a',
      timeZone: 'a',
      source: 'a',
      cvUrl: "https://phd-applications.s3.amazonaws.com/men's hygiene tips cus y'all be musty af (2).mp4",
      publicationUrl: "https://phd-applications.s3.amazonaws.com/men's hygiene tips cus y'all be musty af (2).mp4",
      recommendationUrl: "https://phd-applications.s3.amazonaws.com/men's hygiene tips cus y'all be musty af.mp4",
      underrepresented: false,
      statement: null,
      statementUrl:
        'https://phd-applications.s3.amazonaws.com/chinese-dog-breeds-4797219-hero-2a1e9c5ed2c54d00aef75b05c5db399c (1) (10) (1).jpg',
      video: null,
      videoUrl: 'https://phd-applications.s3.amazonaws.com/phd-logo (3) (1) (3) (3).svg',
      experienceTime: '0',
      pdfUrl: 'https://phd-applications.s3.amazonaws.com/Nolan.pdf',
      user: {
        id: 1,
        firstName: 'Charles',
        lastName: 'Nolan',
        email: 'canthonynolan@gmail.com',
        password: '$2a$10$gTDEdgVEwT.EiCtAekuc4uoPoZkL74Qx2D5r/PPLn/8.z4YSQPmT6',
      },
      firstState: 'accepted',
      finalState: 'pending',
      deniedMessage: 'testing denial',
    },
    {
      id: 2,
      firstName: 'Charles',
      lastName: 'Nolan',
      email: 'canthonynolan@gmail.com',
      graduationDate: '2023-08-11',
      startDate: '2023-08-10',
      positionDuration: '1',
      jobApplication: 'Lung Cancer Lab',
      internationalStudent: false,
      aboutYourself: 'q',
      phdFocus: 'a',
      researchInterest: 'a',
      labSkills: 'a',
      successfulPostDoc: 'a',
      bestFit: 'a',
      cv: null,
      publication: null,
      recommendation: null,
      socialMedia: 'a',
      timeZone: 'a',
      source: 'a',
      cvUrl: "https://phd-applications.s3.amazonaws.com/men's hygiene tips cus y'all be musty af (2).mp4",
      publicationUrl: "https://phd-applications.s3.amazonaws.com/men's hygiene tips cus y'all be musty af (2).mp4",
      recommendationUrl: "https://phd-applications.s3.amazonaws.com/men's hygiene tips cus y'all be musty af.mp4",
      underrepresented: false,
      statement: null,
      statementUrl:
        'https://phd-applications.s3.amazonaws.com/chinese-dog-breeds-4797219-hero-2a1e9c5ed2c54d00aef75b05c5db399c (1) (10) (1).jpg',
      video: null,
      videoUrl: 'https://phd-applications.s3.amazonaws.com/phd-logo (3) (1) (3) (3).svg',
      experienceTime: '0',
      pdfUrl: 'https://phd-applications.s3.amazonaws.com/Nolan.pdf',
      user: {
        id: 1,
        firstName: 'Charles',
        lastName: 'Nolan',
        email: 'canthonynolan@gmail.com',
        password: '$2a$10$gTDEdgVEwT.EiCtAekuc4uoPoZkL74Qx2D5r/PPLn/8.z4YSQPmT6',
      },
      firstState: 'accepted',
      finalState: 'pending',
      deniedMessage: 'testing denial',
    },
  ];
  // const mockUser = [
  //   {
  //     id: 1,
  //     firstName: 'Charles',
  //     lastName: 'Nolan',
  //     email: 'canthonynolan@gmail.com',
  //     password: '$2a$10$gTDEdgVEwT.EiCtAekuc4uoPoZkL74Qx2D5r/PPLn/8.z4YSQPmT6',
  //   },
  // ];

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/applications', {
        headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` },
      })
      .then((response) => setApplications(response.data))
      .catch((error) => console.error('Error fetching applications:', error));

    // axios
    //   .get('http://localhost:8080/api/user', {
    //     headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` },
    //   })
    //   .then((response) => setUserId(response.data.id))
    //   .catch((error) => console.error('Error fetching user:', error));

    // setApplications(mockApps);
    //setUserId(mockUser.id);
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Your Applications</h1>

      {/* Slider UI */}
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={() => setFilter('all')}>
          All
        </button>
        <button style={styles.button} onClick={() => setFilter('pending')}>
          Pending
        </button>
        <button style={styles.button} onClick={() => setFilter('accepted')}>
          Accepted
        </button>
        <button style={styles.button} onClick={() => setFilter('denied')}>
          Denied
        </button>
      </div>

      {Array.isArray(filteredApps) && // Use the filteredApps array instead of applications
        filteredApps.map((app) => (
          <div key={app.id} style={styles.application}>
            <h2>{app.jobApplication}</h2>
            <p style={styles.state}>Status: {app.finalState}</p>
          </div>
        ))}
    </div>
  );
}

export default Dashboard;
