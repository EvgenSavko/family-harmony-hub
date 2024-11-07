import React from 'react';
import { Button, Container, Box, Typography } from '@mui/material';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useRerenderOnAuthStateChanged } from '../../shared';

export const Header = () => {
  const { isSignIn } = useRerenderOnAuthStateChanged();

  const handleSignOut = async () => {
    await signOut(auth);
  };

  if (!isSignIn) return null;

  return (
    <Container
      disableGutters
      maxWidth="xl"
      sx={{ bgcolor: 'background.default', color: 'text.primary' }}
    >
      <Container
        maxWidth="xl"
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Typography variant="h6">Full size header</Typography>
        </Box>

        <Button variant="contained" onClick={handleSignOut}>
          Sign Out
        </Button>
      </Container>
    </Container>
  );
};
