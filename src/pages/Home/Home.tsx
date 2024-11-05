import React from 'react';
import { Auth, Page, CreateFamily, MyFamily } from '../../components';
import { auth } from '../../firebase';

export const Home = () => {
  const [isSignIn, setIsSignIn] = React.useState(!!auth.currentUser?.email);
  const [isMyFamilyExist, setIsMyFamilyExist] = React.useState(false);

  console.log('isMyFamilyExist', isMyFamilyExist);
  console.log('isSignIn', isSignIn);
  return (
    <Page isHomePage>
      <h3>Home</h3>
      <br />
      <Auth setIsSignIn={setIsSignIn} isSignIn={isSignIn} />
      <br />
      <br />

      <CreateFamily
        isSignIn={isSignIn}
        isMyFamilyExist={isMyFamilyExist}
        setIsMyFamilyExist={setIsMyFamilyExist}
      />

      <MyFamily
        isSignIn={isSignIn}
        isMyFamilyExist={isMyFamilyExist}
        setIsMyFamilyExist={setIsMyFamilyExist}
      />
    </Page>
  );
};
