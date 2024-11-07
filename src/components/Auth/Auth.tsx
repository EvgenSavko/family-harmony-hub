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

type AouthProps = {
  setIsMyFamilyExist: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Auth = ({ setIsMyFamilyExist }: AouthProps) => {
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
    setIsMyFamilyExist(false);
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
            <button onClick={handleCreateAndLogin}>Create and login</button>
            <button onClick={handledLogin}>Login</button>
            <button onClick={handleLoginWithGoogle}>Login with Google</button>
          </div>
        </>
      )}

      {isSignIn && (
        <>
          <h2>Email: {auth.currentUser?.email}</h2>
          <button onClick={handleSignOut}>signOut</button>
        </>
      )}
    </>
  );
};
