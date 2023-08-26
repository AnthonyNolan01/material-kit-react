import React, { useEffect, useState } from 'react';
import axios from 'axios';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '50px',
  },
  header: {
    color: '#6200EE',
    fontSize: '2em',
  },
  application: {
    border: '1px solid #ddd',
    borderRadius: '5px',
    padding: '20px',
    margin: '10px',
    width: '60%',
    backgroundColor: '#F5F5F5',
  },
  state: {
    fontSize: '1.2em',
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
};

export default function Apply() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    axios
      .get('/api/user')
      .then((response) => setUserId(response.data.id))
      .catch((error) => console.error('Error fetching user:', error));
  }, []);

  return (
    <a
      href={`http://3.83.1.95:8084/form?user=${userId}`}
      target="_blank"
      rel="noopener noreferrer"
      style={styles.button}
    >
      Submit a new application
    </a>
  );
}
