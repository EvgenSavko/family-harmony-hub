import { useEffect, useState, ChangeEvent } from 'react';
import { db, auth } from '../../../../firebase';
import { SelectChangeEvent } from '@mui/material';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { useMediaQuery } from '@mui/material';
import { getUserFromFirebase, validateEmail } from '../../../../shared';

const defaultUserState = {
  email: '',
  role: '',
};
interface UserState {
  email: string;
  role: string;
}

export const useAddMembers = () => {
  const userEmail = auth.currentUser?.email;
  const [membersV2, setMembersV2] = useState<Array<UserState>>([]);
  const [familyId, setFamilyId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [userState, setUserState] = useState<UserState>(defaultUserState);
  const isMobile = useMediaQuery('(max-width:600px)');
  const [emailError, setEmailError] = useState<string | null>(null);

  const rolesOptions = [
    'Grandfather',
    'Grandmother',
    'Husband',
    'Wife',
    'Son',
    'Daughter',
    'Relative',
  ];

  useEffect(() => {
    getUserFromFirebase().then((data) => {
      if (data) {
        setFamilyId(data.family_id);
      }
      setIsLoading(false);
    });
  }, [userEmail]);

  const handleAddMember = () => {
    setMembersV2((prev: any) => [...prev, userState]);
    setUserState(defaultUserState);
  };

  const handleDeleteMember = (index: number) => {
    const newMembers = [...membersV2];
    newMembers.splice(index, 1);
    setMembersV2(newMembers);
  };

  const createFamily = () => {
    // Add family_members of this
    const updateFamilyAddNewMembers = async () => {
      const docFamiliesRef = doc(db, 'families', familyId);
      const membersV2Emails = membersV2.map((user) => user.email);

      const docFamiliesSnap = await getDoc(docFamiliesRef);

      let existedFamilyMembers: string[] = [];
      if (docFamiliesSnap.exists()) {
        if (docFamiliesSnap.data().family_members.length) {
          existedFamilyMembers = [...docFamiliesSnap.data().family_members];
        }
      }

      const familyMembers = [
        ...existedFamilyMembers,
        ...membersV2Emails,
        userEmail,
      ];

      const uniqFamilyMembers = Array.from(new Set(familyMembers));

      await updateDoc(docFamiliesRef, {
        family_members: [...uniqFamilyMembers],
      });
    };

    // Add family_id of the family that they were assigned to
    const updateUsers = async () => {
      membersV2.forEach(async (user) => {
        const docUsersRef = doc(db, 'users', user.email);

        await updateDoc(docUsersRef, {
          family_id: familyId,
          relationship: user.role,
        });
      });
    };

    updateFamilyAddNewMembers();
    updateUsers();
    setMembersV2([]);
    setUserState(defaultUserState);
  };

  const handleChange = (
    name: string,
    event:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ) => {
    setUserState((prev) => ({ ...prev, [name]: event.target.value }));
  };

  return {
    handleChange,
    createFamily,
    handleDeleteMember,
    handleAddMember,
    isLoading,
    isMobile,
    rolesOptions,
    membersV2,
    userState,
    validateEmail: validateEmail(setEmailError),
    emailError,
  };
};
