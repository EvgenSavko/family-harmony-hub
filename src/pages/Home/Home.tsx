import { useState } from 'react';
import { Page, CreateFamily, MyFamily } from '../../components';
import { useRerenderOnAuthStateChanged } from '../../shared';
import { auth } from '../../firebase';
import Typography from '@mui/material/Typography';

export const Home = () => {
  const [isMyFamilyExist, setIsMyFamilyExist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isSignIn } = useRerenderOnAuthStateChanged();

  return (
    <Page isHomePage>
      <Typography variant="h4" gutterBottom color="primary">
        Home
      </Typography>

      <h2>Email: {auth.currentUser?.email}</h2>
      <br />
      {isLoading && <h1>Loading....</h1>}
      <br />
      {isSignIn && (
        <CreateFamily
          isMyFamilyExist={isMyFamilyExist}
          setIsMyFamilyExist={setIsMyFamilyExist}
          setIsLoading={setIsLoading}
        />
      )}
      {isSignIn && (
        <MyFamily
          isSignIn={isSignIn}
          isMyFamilyExist={isMyFamilyExist}
          setIsMyFamilyExist={setIsMyFamilyExist}
        />
      )}
    </Page>
  );
};
