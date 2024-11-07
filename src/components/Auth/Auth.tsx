import React from 'react';
import { auth, googleProvider, db } from '../../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useRerenderOnAuthStateChanged } from '../../shared';
import Button from '@mui/material/Button';

export const Auth = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { isSignIn } = useRerenderOnAuthStateChanged();

  const handleCreateAndLogin = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      const userID = email;
      const docRef = doc(db, 'users', userID);

      await setDoc(docRef, {
        user_email: email,
        family_id: '',
      });
      setEmail('');
      setPassword('');
    } catch (error) {
      const firebaseError = error as FirebaseError;
      console.error('error', firebaseError?.message);
    }
  };

  const handledLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail('');
      setPassword('');
    } catch (error) {
      const firebaseError = error as FirebaseError;
      console.error('error', firebaseError?.message);
    }
  };

  const handleLoginWithGoogle = async () => {
    try {
      const google = await signInWithPopup(auth, googleProvider);
      const userID = await google.user.email;

      if (userID) {
        const docRef = doc(db, 'users', userID);

        const userSnap = await getDoc(docRef);

        if (!userSnap.exists()) {
          await setDoc(docRef, {
            family_id: '',
            user_email: userID,
          });
        }
      }
    } catch (error) {
      const firebaseError = error as FirebaseError;
      console.error('error', firebaseError?.message);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
  };

  return (
    <>
      {!isSignIn && (
        <>
          <input
            placeholder="Email..."
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            placeholder="Passwon..."
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <div>
            <Button variant="contained" onClick={handleCreateAndLogin}>
              Create and login
            </Button>
            <Button variant="contained" onClick={handledLogin}>
              Login
            </Button>
            <Button variant="contained" onClick={handleLoginWithGoogle}>
              Login with Google
            </Button>
          </div>
        </>
      )}

      {isSignIn && (
        <>
          <h2>Email: {auth.currentUser?.email}</h2>
          <Button variant="contained" onClick={handleSignOut}>
            signOut
          </Button>
        </>
      )}
    </>
  );
};
