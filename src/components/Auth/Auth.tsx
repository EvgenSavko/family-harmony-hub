import React, { useEffect } from 'react';
import { auth, googleProvider, db } from '../../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useRerenderOnAuthStateChanged } from '../../shared';
import {
  Button,
  Container,
  Paper,
  Grid2,
  ButtonGroup,
  TextField,
} from '@mui/material';

export const Auth = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();
  const { isSignIn } = useRerenderOnAuthStateChanged();

  useEffect(() => {
    if (isSignIn) {
      navigate('/home');
    }
  }, [isSignIn]);

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

  return (
    <>
      {!isSignIn && (
        <Container disableGutters maxWidth="xl">
          <Paper elevation={1} sx={{ borderRadius: '0' }}>
            <Grid2
              container
              justifyContent="center"
              alignItems="center"
              // flexDirection={{ xs: 'column' }}
              sx={{
                fontSize: '12px',
                padding: '9rem 0',
              }}
              size={12}
            >
              <Grid2>
                <TextField
                  id="login-email"
                  label="Email"
                  type="email"
                  variant="standard"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </Grid2>
              <Grid2>
                <TextField
                  id="login-password"
                  label="Password"
                  type="password"
                  variant="standard"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </Grid2>
              <Grid2
                container
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                sx={{ marginLeft: '2rem' }}
              >
                <ButtonGroup variant="text" aria-label="Basic button group">
                  <Button onClick={handleCreateAndLogin}>Sign up</Button>
                  <Button onClick={handledLogin}>Sign in</Button>
                  <Button onClick={handleLoginWithGoogle}>
                    Sign ip with Google
                  </Button>
                </ButtonGroup>
              </Grid2>
              {/* <Grid2>
                <Button variant="outlined" onClick={handleCreateAndLogin}>
                  Sign up
                </Button>
              </Grid2>
              <Grid2>
                <Button variant="outlined" onClick={handledLogin}>
                  Sign ip
                </Button>
              </Grid2>
              <Grid2>
                <Button variant="outlined" onClick={handleLoginWithGoogle}>
                  Sign ip with Google
                </Button>
              </Grid2> */}
            </Grid2>
          </Paper>
        </Container>
      )}
    </>
  );
};
