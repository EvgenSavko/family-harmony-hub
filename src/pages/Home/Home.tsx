import React from 'react';
import { Auth, Page, CreateFamily, MyFamily } from '../../components';
import { useRerenderOnAuthStateChanged } from '../../shared';

export const Home = () => {
  const [isMyFamilyExist, setIsMyFamilyExist] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const { isSignIn } = useRerenderOnAuthStateChanged();

  return (
    <Page isHomePage>
      <h3>Home</h3>
      <br />
      <Auth />
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
