import React, { useEffect, useState } from 'react';
import { auth, db } from '../../../../firebase';
import { getDoc, getDocs, doc, collection } from 'firebase/firestore';
import { FirebaseError } from 'firebase/app';
import {
  Typography,
  AlertTitle,
  Alert,
  LinearProgress,
  Box,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { FamilyDataProps } from '../../../../shared';
import { getUserFromFirebase } from '../../../../shared';

const familyDataDefault = {
  name: '',
  description: '',
  ownerEmail: '',
  familyMembers: [],
};

type MyFamilyProps = {
  setIsMyFamilyExist: React.Dispatch<React.SetStateAction<boolean>>;
  isMyFamilyExist: boolean;
  isSignIn: boolean;
};

export const MyFamily = ({
  isMyFamilyExist,
  setIsMyFamilyExist,
  isSignIn,
}: MyFamilyProps) => {
  const userEmail = auth.currentUser?.email;
  const [familyId, setFamilyId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [familyData, setFamilyData] =
    useState<FamilyDataProps>(familyDataDefault);

  useEffect(() => {
    getUserFromFirebase().then((data) => {
      if (data) {
        setFamilyId(data?.family_id);
      }
      if (!data?.family_id) {
        setIsLoading(false);
      }
    });
  }, [userEmail, isMyFamilyExist, isSignIn]);

  useEffect(() => {
    const getFamily = async () => {
      try {
        if (familyId) {
          const familiesRef = doc(db, 'families', familyId);
          const familySnap = await getDoc(familiesRef);

          if (familySnap.exists()) {
            setFamilyData({
              description: familySnap.data().description,
              name: familySnap.data().name,
              ownerEmail: familyId,
              familyMembers: familySnap.data().family_members,
            });
            setIsMyFamilyExist(true);
            setIsLoading(false);
          }
        }
      } catch (error) {
        const firebaseError = error as FirebaseError;
        console.error('error', firebaseError?.message);
      }
    };

    const getFamilies = async () => {
      try {
        const familiesRef = collection(db, 'families');
        const querySnapshot = await getDocs(familiesRef);

        const families = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        console.log('All families :', families);
      } catch (error) {
        const firebaseError = error as FirebaseError;
        console.error('error', firebaseError?.message);
      }
    };

    getFamily();
    getFamilies();
  }, [familyId, isMyFamilyExist, isSignIn]);

  useEffect(() => {
    return () => {
      setIsMyFamilyExist(false);
    };
  }, []);

  if (isLoading)
    return (
      <Grid size={12} minHeight={'5.8rem'}>
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      </Grid>
    );

  if (!isMyFamilyExist)
    return (
      <Grid
        size={12}
        pt={{ xs: 3, md: 2 }}
        pb={{ xs: 3, md: 2 }}
        pl={{ xs: 2, md: 3 }}
        pr={{ xs: 2, md: 3 }}
      >
        <Alert severity="info">
          <AlertTitle>You don`t have family yet.</AlertTitle>
          Create your own family or ask to be assigned.
        </Alert>
      </Grid>
    );

  return (
    <>
      <Grid
        size={12}
        pt={{ xs: 3, md: 2 }}
        pb={{ xs: 1, md: 1 }}
        pl={{ xs: 2, md: 3 }}
        mb={2}
      >
        <Typography variant="h5">Little about us</Typography>
      </Grid>
      <Grid
        size={12}
        pb={{ xs: 3, md: 2 }}
        pl={{ xs: 2, md: 3 }}
        pr={{ xs: 2, md: 3 }}
      >
        <Typography variant="body1">
          <strong>Owner is:</strong> {familyId}
        </Typography>
        <Typography variant="body1">
          <strong>Name:</strong> {familyData.name}
        </Typography>{' '}
        <Typography variant="body1">
          <strong>Description:</strong> {familyData.description}
        </Typography>{' '}
        <Box display="flex">
          <Typography variant="body1">
            <strong>Members:</strong>
          </Typography>
          <Typography
            variant="body1"
            ml={1}
            sx={(theme) => ({
              color: theme.palette.primary.main,
            })}
          >
            {familyData.familyMembers?.join(', ')}
          </Typography>
        </Box>
      </Grid>
    </>
  );
};
