import { useEffect, useState } from 'react';
import { auth, db } from '../../../../firebase';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import {
  Typography,
  TextField,
  Button,
  Box,
  LinearProgress,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import CreateIcon from '@mui/icons-material/Create';
import { getUserFromFirebase } from '../../../../shared';

export const CreateFamily = () => {
  const [description, setDescription] = useState('');
  const [isMyFamilyExist, setIsMyFamilyExist] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState('');

  useEffect(() => {
    setIsLoading(true);
    getUserFromFirebase().then((data) => {
      setIsMyFamilyExist(!!data?.family_id);
      setIsLoading(false);
    });
  }, [auth.currentUser?.email]);

  const handleCreateFamily = async () => {
    setIsLoading(true);
    const familyID = auth.currentUser?.email;
    const ownerEmail = auth.currentUser?.email;

    if (familyID && ownerEmail) {
      const docRef = doc(db, 'families', familyID);
      await setDoc(docRef, {
        name: name,
        owner_email: ownerEmail,
        description: description,
        family_members: [ownerEmail],
      });

      const docUsersRef = doc(db, 'users', ownerEmail);

      await updateDoc(docUsersRef, {
        family_id: ownerEmail,
      });

      setDescription('');
      setName('');
      setIsMyFamilyExist(true);
      setIsLoading(false);
    }
  };

  if (isLoading)
    return (
      <Grid size={12} minHeight={'5.8rem'}>
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      </Grid>
    );

  if (isMyFamilyExist)
    return (
      <Grid
        size={12}
        pt={{ xs: 3, md: 2 }}
        pb={{ xs: 3, md: 2 }}
        pl={{ xs: 2, md: 3 }}
        pr={{ xs: 2, md: 3 }}
      >
        <Typography variant="h5">You already have a family.</Typography>
        <Typography variant="subtitle1">You cannot create one more.</Typography>
      </Grid>
    );

  return (
    <>
      <Grid
        size={12}
        pt={{ xs: 3, md: 2 }}
        pb={{ xs: 1, md: 1 }}
        pl={{ xs: 2, md: 3 }}
      >
        <Typography variant="h5">Create your own family</Typography>
      </Grid>

      <Grid
        container
        spacing={2}
        p={{ xs: 2, md: 3 }}
        alignItems="center"
        justifyContent={'space-between'}
      >
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 2 }}>
          <Button
            variant="contained"
            size="medium"
            fullWidth
            onClick={handleCreateFamily}
          >
            <CreateIcon fontSize="small" sx={{ m: 1 }} />
            Create
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
