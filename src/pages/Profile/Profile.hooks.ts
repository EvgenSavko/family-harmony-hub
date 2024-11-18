import { useState, ChangeEvent, useCallback, useEffect } from 'react';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { SelectChangeEvent } from '@mui/material';
import { auth, db } from '../../firebase';

const DEBOUNCE_TIME = 800;

const phoneInputStyle = {
  '& input[type=number]': {
    MozAppearance: 'textfield',
  },
  '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button':
    {
      WebkitAppearance: 'none',
      margin: 0,
    },
};

const bloodTypesOptions = [
  'A positive (A+)',
  'A negative (A-)',
  'B positive (B+)',
  'B negative (B-)',
  'AB positive (AB+)',
  'AB negative (AB-)',
  'O positive (O+)',
  'O negative (O-)',
];

export interface UserState {
  first_name: string;
  blood_type: string;
  last_name: string;
  birthday: string;
  phone: string;
  emergency_phone: string;
  address: string;
  health_conditions: string;
  medications: string;
  allergies: string;
  doctors_phone: string;
  goals_dreams: string;
  lifestyle_hobbies: string;
}

const defaultUserState = {
  first_name: '',
  blood_type: '',
  last_name: '',
  birthday: '',
  phone: '',
  emergency_phone: '',
  address: '',
  health_conditions: '',
  medications: '',
  allergies: '',
  doctors_phone: '',
  goals_dreams: '',
  lifestyle_hobbies: '',
};

const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

export const useProfile = () => {
  const [userState, setUserState] = useState<UserState>(defaultUserState);
  const [inProgress, setInProgress] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const ownerEmail = auth.currentUser?.email;

      if (ownerEmail) {
        const docUsersRef = doc(db, 'users', ownerEmail);

        const userSnap = await getDoc(docUsersRef);

        if (userSnap.exists()) {
          console.log('userData', userSnap.data());

          setUserState({
            first_name: userSnap.data().first_name || '',
            blood_type: userSnap.data().blood_type || '',
            last_name: userSnap.data().last_name || '',
            birthday: userSnap.data().birthday || '',
            phone: userSnap.data().phone || '',
            emergency_phone: userSnap.data().emergency_phone || '',
            address: userSnap.data().address || '',
            health_conditions: userSnap.data().health_conditions || '',
            medications: userSnap.data().medications || '',
            allergies: userSnap.data().allergies || '',
            doctors_phone: userSnap.data().doctors_phone || '',
            goals_dreams: userSnap.data().goals_dreams || '',
            lifestyle_hobbies: userSnap.data().lifestyle_hobbies || '',
          });
        }
      }
    };
    getUser();
  }, [auth.currentUser?.email]);

  const submitUser = async (user: UserState) => {
    const ownerEmail = auth.currentUser?.email;

    if (ownerEmail) {
      setInProgress(true);
      const docUsersRef = doc(db, 'users', ownerEmail);
      await updateDoc(docUsersRef, {
        ...user,
      });
      setInProgress(false);
    }
  };

  const debouncedSubmitUser = useCallback(
    debounce(submitUser, DEBOUNCE_TIME),
    []
  );

  const handleChange = (
    name: string,
    event:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ) => {
    setUserState((prev) => ({ ...prev, [name]: event.target.value }));
    debouncedSubmitUser({ ...userState, [name]: event.target.value });
  };

  return {
    userState,
    handleChange,
    phoneInputStyle,
    bloodTypesOptions,
    userEmail: auth.currentUser?.email,
    inProgress,
  } as const;
};
