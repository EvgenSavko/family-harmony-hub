import React from 'react';
import { auth, googleProvider } from '../../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

export const Auth = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isSignIn, setIsSignIn] = React.useState(!!auth.currentUser?.email);

  const handleCreateAndLogin = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setEmail('');
      setPassword('');
      setIsSignIn(true);
    } catch (error) {
      const firebaseError = error as FirebaseError;
      console.log('error', firebaseError?.message);
    }
  };

  const handledLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail('');
      setPassword('');
      setIsSignIn(true);
    } catch (error) {
      const firebaseError = error as FirebaseError;
      console.log('error', firebaseError?.message);
    }
  };

  const handleLoginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setIsSignIn(true);
    } catch (error) {
      const firebaseError = error as FirebaseError;
      console.log('error', firebaseError?.message);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    setIsSignIn(false);
  };
  console.log('isSignIn', isSignIn);
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
          <h2>{auth.currentUser?.email}</h2>
          <button onClick={handleSignOut}>signOut</button>
        </>
      )}
    </>
  );
};
