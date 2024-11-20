import Grid from '@mui/material/Grid2';
import { useState, useEffect, SyntheticEvent } from 'react';
import { Page, CreateFamily, MyFamily, AddMembers } from '../../components';
import { useRerenderOnAuthStateChanged } from '../../shared';
import { auth } from '../../firebase';
import {
  Paper,
  Typography,
  Box,
  Tabs,
  Tab,
  useMediaQuery,
} from '@mui/material';
import { getUserFromFirebase } from '../../shared';

export const FamilyCreating = () => {
  const [isMyFamilyExist, setIsMyFamilyExist] = useState(false);
  const [isFamilyOwner, setIsFamilyOwner] = useState(false);
  const { isSignIn } = useRerenderOnAuthStateChanged();
  const [tabIndex, setTabIndex] = useState(0);
  const isMobile = useMediaQuery('(max-width:600px)');

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  useEffect(() => {
    getUserFromFirebase().then((data) => {
      if (auth.currentUser?.email === data?.family_id) {
        setIsFamilyOwner(true);
      }
    });
  }, [auth.currentUser?.email]);

  return (
    <Page>
      <Typography
        variant="h4"
        color="primary"
        gutterBottom
        pt={{ xs: 2, md: 0.5 }}
        pb={3}
      >
        Family overview
      </Typography>
      <Paper elevation={1}>
        <Grid
          size={12}
          pt={{ xs: 2, md: 2 }}
          pb={{ xs: 2, md: 2 }}
          pl={{ xs: 2, md: 3 }}
          pr={{ xs: 2, md: 3 }}
        >
          <Typography variant="h5">Start your own little tribe</Typography>
        </Grid>
      </Paper>
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <Tabs
          value={tabIndex}
          onChange={handleChange}
          centered
          variant={isMobile ? 'scrollable' : undefined}
          sx={{
            paddingTop: '1rem',
          }}
        >
          <Tab label="Create family" />
          <Tab label="My family" />
          {isFamilyOwner && <Tab label="Add members" />}
        </Tabs>
      </Box>

      {tabIndex === 0 && (
        <Paper elevation={1}>
          <CreateFamily />
        </Paper>
      )}

      {tabIndex === 1 && (
        <Paper elevation={1}>
          <MyFamily
            isSignIn={isSignIn}
            isMyFamilyExist={isMyFamilyExist}
            setIsMyFamilyExist={setIsMyFamilyExist}
          />
        </Paper>
      )}

      {tabIndex === 2 && (
        <Paper elevation={1}>
          <AddMembers />
        </Paper>
      )}
    </Page>
  );
};
