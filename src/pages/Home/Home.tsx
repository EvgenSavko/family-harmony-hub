import { useState, useEffect, SyntheticEvent } from 'react';
import { Page, CreateFamily, MyFamily, AddMembers } from '../../components';
import { useRerenderOnAuthStateChanged } from '../../shared';
import { auth } from '../../firebase';
import { Paper, Typography, Box, Tabs, Tab } from '@mui/material';
import { getUserFromFirebase } from '../../shared';

export const Home = () => {
  const [isMyFamilyExist, setIsMyFamilyExist] = useState(false);
  const [isFamilyOwner, setIsFamilyOwner] = useState(false);
  const { isSignIn } = useRerenderOnAuthStateChanged();
  const [tabIndex, setTabIndex] = useState(0);

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

  if (!isSignIn) return null;

  return (
    <Page isHomePage>
      <Typography variant="h4" gutterBottom color="primary">
        Home
      </Typography>

      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <Tabs
          value={tabIndex}
          onChange={handleChange}
          centered
          sx={{ '&>div': { paddingLeft: '25px' } }}
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
