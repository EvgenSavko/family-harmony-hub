import { useEffect, useState } from 'react';
import { auth, googleProvider, db } from '../../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useRerenderOnAuthStateChanged, validateEmail } from '../../shared';
import GoogleIcon from '@mui/icons-material/Google';
import {
  Button,
  Container,
  Paper,
  Grid2,
  ButtonGroup,
  TextField,
  Typography,
  Snackbar,
  Alert,
  Fade,
  Box,
} from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';

export const Auth = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();
  const { isSignIn } = useRerenderOnAuthStateChanged();

  useEffect(() => {
    if (isSignIn) {
      navigate('/home');
    }
  }, [isSignIn]);

  const handleCreateAndLogin = async () => {
    if (!password) {
      setPasswordError(true);
    }

    if (email && password) {
      setPasswordError(false);

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
        setEmailError('Some email error');
        setPasswordError(true);
        setErrorMessage(firebaseError?.message);
      }
    }
  };

  const handledLogin = async () => {
    if (!email) {
      setEmailError('Some email error');
    }
    if (!password) {
      setPasswordError(true);
    }

    if (email && password) {
      setEmailError('');
      setPasswordError(false);
      try {
        await signInWithEmailAndPassword(auth, email, password);
        setEmail('');
        setPassword('');
      } catch (error) {
        const firebaseError = error as FirebaseError;
        setEmailError('Some email error');
        setPasswordError(true);
        setErrorMessage(firebaseError?.message);
      }
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
      setErrorMessage(firebaseError?.message);
    }
  };

  return (
    <>
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={6000}
        onClose={() => setErrorMessage('')}
      >
        <Alert
          onClose={() => setErrorMessage('')}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
      {!isSignIn && (
        <Container disableGutters maxWidth="xl">
          <Paper elevation={0} sx={{ borderRadius: '0', height: '100vh' }}>
            <Grid2
              container
              justifyContent="flex-start"
              alignItems="center"
              flexDirection={{ xs: 'column' }}
              size={12}
            >
              <Grid2
                container
                justifyContent="center"
                alignItems="center"
                flexDirection={{ xs: 'column' }}
                sx={{
                  marginTop: '6rem',
                }}
                size={{ xs: 12, sm: 10, md: 6 }}
              >
                <Fade in={!isSignIn}>
                  <Box
                    component="section"
                    sx={{
                      padding: '2rem 1.5rem',
                      border: '1px solid #959595',
                      borderRadius: '0.3rem',
                    }}
                  >
                    <Grid2
                      container
                      justifyContent="center"
                      alignItems="center"
                      flexDirection={{ xs: 'column' }}
                      size={12}
                    >
                      <LockOpenIcon
                        sx={{
                          marginBottom: '0.75rem',
                        }}
                      />
                      <Typography variant="h5" color="primary">
                        Sign in
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          paddingTop: '1rem',
                        }}
                      >
                        Welcome, please sign in to continue
                      </Typography>
                    </Grid2>

                    <Grid2
                      container
                      justifyContent="center"
                      alignItems="center"
                      flexDirection={{ xs: 'column', lg: 'row' }}
                      sx={{
                        padding: '1rem 0',
                      }}
                      spacing={1}
                      size={12}
                    >
                      <Grid2
                        container
                        justifyContent="center"
                        alignItems="center"
                        flexDirection={{ xs: 'column', md: 'row' }}
                      >
                        <TextField
                          error={!!emailError}
                          id="login-email"
                          label="Email"
                          variant="standard"
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                          onBlur={validateEmail(setEmailError)}
                          sx={{ minWidth: { xs: '260px', lg: '167px' } }}
                          value={email}
                          helperText={emailError}
                        />
                        <TextField
                          error={passwordError}
                          id="login-password"
                          label="Password"
                          type="password"
                          variant="standard"
                          onChange={(e) => {
                            setPassword(e.target.value);
                            setPasswordError(false);
                          }}
                          sx={{ minWidth: { xs: '260px', lg: '167px' } }}
                          value={password}
                        />
                      </Grid2>
                      <Grid2
                        container
                        justifyContent="center"
                        alignItems="center"
                        paddingTop={{ xs: '2rem', lg: '1rem' }}
                      >
                        <ButtonGroup
                          variant="text"
                          aria-label="Basic button group"
                        >
                          <Button onClick={handleCreateAndLogin}>
                            Sign up
                          </Button>
                          <Button onClick={handledLogin}>Sign in</Button>
                          <Button onClick={handleLoginWithGoogle}>
                            With <GoogleIcon fontSize="small" sx={{ ml: 1 }} />
                          </Button>
                        </ButtonGroup>
                      </Grid2>
                    </Grid2>
                  </Box>
                </Fade>
              </Grid2>
            </Grid2>
          </Paper>
        </Container>
      )}
    </>
  );
};
