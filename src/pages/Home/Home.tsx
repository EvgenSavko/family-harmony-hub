import React, { useState } from 'react';
import { Page, CreateFamily, MyFamily } from '../../components';
import { useRerenderOnAuthStateChanged } from '../../shared';
import { auth } from '../../firebase';

export const Home = () => {
  const [isMyFamilyExist, setIsMyFamilyExist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isSignIn } = useRerenderOnAuthStateChanged();

  return (
    <Page isHomePage>
      <h3>Home</h3>

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
