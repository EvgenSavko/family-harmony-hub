import { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';

export const useRerenderOnAuthStateChanged = () => {
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

  return { isSignIn };
};
