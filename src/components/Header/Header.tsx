import React from 'react';
import { Button, Container, Box, Typography, Paper } from '@mui/material';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useRerenderOnAuthStateChanged } from '../../shared';
import { useNavigate } from 'react-router-dom';
import { InstallGuide } from '../InstallGuide';

export const Header = () => {
  const { isSignIn } = useRerenderOnAuthStateChanged();
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

        <Button variant="contained" onClick={handleSignOut}>
          Sign Out
        </Button>
      </Container>
    </Paper>
  );
};
