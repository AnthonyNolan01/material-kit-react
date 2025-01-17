import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';
import Iconify from '../components/iconify';
// sections
import { LoginForm } from '../sections/auth/login';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:8080/login', {
        email,
        password,
      });

      if (response.data) {
        // Handle login success, save tokens, navigate to dashboard etc.
        console.log('Login Successful:', response.data);
      }
    } catch (error) {
      console.error('Error during login:', error);
      // Handle login error
    }
  };

  const mdUp = useResponsive('up', 'md');

  return (
    <>
      <Helmet>
        <title> Login | PhD Insiders </title>
      </Helmet>

      <StyledRoot>
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Sign in to PhD Insiders
            </Typography>

            <Typography variant="body2" sx={{ mb: 5 }}>
              Don’t have an account?
              <RouterLink to="/sign-up" style={{ textDecoration: 'none' }}>
                <Link variant="subtitle2">Get started</Link>
              </RouterLink>
            </Typography>

            <Stack direction="row" spacing={2}>
              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify icon="eva:google-fill" color="#DF3E30" width={22} height={22} />
              </Button>
            </Stack>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                OR
              </Typography>
            </Divider>

            <LoginForm onLogin={handleLogin} />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
