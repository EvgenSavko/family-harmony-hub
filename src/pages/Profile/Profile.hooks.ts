import { useState, ChangeEvent, useCallback, useEffect } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { SelectChangeEvent } from '@mui/material';
import { auth, db } from '../../firebase';
import { UserState, getUserFromFirebase } from '../../shared';

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
    getUserFromFirebase().then((data) => {
      if (data) {
        setUserState({
          first_name: data.first_name || '',
          blood_type: data.blood_type || '',
          last_name: data.last_name || '',
          birthday: data.birthday || '',
          phone: data.phone || '',
          emergency_phone: data.emergency_phone || '',
          address: data.address || '',
          health_conditions: data.health_conditions || '',
          medications: data.medications || '',
          allergies: data.allergies || '',
          doctors_phone: data.doctors_phone || '',
          goals_dreams: data.goals_dreams || '',
          lifestyle_hobbies: data.lifestyle_hobbies || '',
        });
      }
    });
  }, [auth.currentUser?.email]);

  const submitUser = async (user: UserState) => {
    const ownerEmail = auth.currentUser?.email;

    if (ownerEmail) {
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
    setInProgress(true);
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
