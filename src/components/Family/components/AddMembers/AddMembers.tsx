import { useEffect, useState } from 'react';
import { db, auth } from '../../../../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { LinearProgress, Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { getUserFromFirebase } from '../../../../shared';

// interface AddMembersProps {
//   familyId: string;
//   setIsAddMembersLoading: React.Dispatch<React.SetStateAction<boolean>>;
// }

export const AddMembers = () => {
  const userEmail = auth.currentUser?.email;
  const [member, setMember] = useState('');
  const [members, setMembers] = useState<Array<string>>([]);
  const [isReadyToAddToFamily, setIsReadyToAddToFamily] = useState(false);
  const [familyId, setFamilyId] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUserFromFirebase().then((data) => {
      if (data) {
        setFamilyId(data.family_id);
      }
      setIsLoading(false);
    });
  }, [userEmail]);

  const handleAddMemberToFamily = () => {
    setIsReadyToAddToFamily(true);
  };

  const handleAddMemberToList = () => {
    setMembers((prev) => [...prev, member]);
    setMember('');
  };

  useEffect(() => {
    // Add family_members of this
    const updateFamilyAddNewMembers = async () => {
      const docFamiliesRef = doc(db, 'families', familyId);

      await updateDoc(docFamiliesRef, {
        family_members: [...members, userEmail],
      });

      // setIsAddMembersLoading(false);
    };

    // Add family_id of the family that they were assigned to
    const updateUsers = async () => {
      // setIsAddMembersLoading(true);
      members.forEach(async (userEmail) => {
        const docUsersRef = doc(db, 'users', userEmail);

        await updateDoc(docUsersRef, {
          family_id: familyId,
        });
      });

      setIsReadyToAddToFamily(false);
    };

    if (isReadyToAddToFamily) {
      updateUsers();
      updateFamilyAddNewMembers();
      setMembers([]);
    }
  }, [members, isReadyToAddToFamily, userEmail]);

  if (isLoading)
    return (
      <Grid size={12} minHeight={'5.8rem'}>
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
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
        <Typography variant="h5">Add new members to you family</Typography>
      </Grid>

      <div style={{ border: '1px solid green' }}>
        <h3>Add new members to you family</h3>
        <input
          placeholder="Member`s email..."
          onChange={(e) => setMember(e.target.value)}
          value={member}
        />
        <button onClick={handleAddMemberToList}>Add to list</button>

        <h3>List of applicants for family membership</h3>
        <ul>
          {members.map((userEmail) => (
            <li key={userEmail}>{userEmail}</li>
          ))}
        </ul>
        <button onClick={handleAddMemberToFamily}>Add to list</button>
      </div>
    </>
  );
};
