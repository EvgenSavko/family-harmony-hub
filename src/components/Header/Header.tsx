import React from 'react';
import {
  Button,
  Container,
  Box,
  IconButton,
  Typography,
  Paper,
  useMediaQuery,
} from '@mui/material';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useRerenderOnAuthStateChanged } from '../../shared';
import { useNavigate } from 'react-router-dom';
import { InstallGuide } from '../InstallGuide';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const Header = () => {
  const { isSignIn } = useRerenderOnAuthStateChanged();
  const isMobile = useMediaQuery('(max-width:600px)');
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut(auth);
    navigate('/');
  };

  if (!isSignIn) return null;

  return (
    <Paper elevation={1} sx={{ borderRadius: '0' }}>
      <Container
        maxWidth="xl"
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <InstallGuide />
        <Box>
          <Typography variant="h6">Full size header</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <IconButton
            onClick={() => {
              navigate('/profile');
            }}
          >
            <AccountCircleIcon fontSize={isMobile ? 'large' : 'medium'} />
          </IconButton>

          {!isMobile && (
            <Box pl={1}>
              <Typography variant="h6">{auth.currentUser?.email}</Typography>
            </Box>
          )}
          <Box pl={{ xs: 1, md: 3 }}>
            <Button variant="contained" onClick={handleSignOut}>
              Sign Out
            </Button>
          </Box>
        </Box>
      </Container>
    </Paper>
  );
};
