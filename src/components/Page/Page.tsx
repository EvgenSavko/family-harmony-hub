import React, { ReactNode, useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';

type PageProps = {
  isHomePage?: boolean;
  children: ReactNode;
};

export const Page = ({ isHomePage, children }: PageProps) => {
  const [isSignIn, setIsSignIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsSignIn(true);
      } else {
        setIsSignIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (!isSignIn && !isHomePage) return <p>Please authorize</p>;
  return <div>{children}</div>;
};
