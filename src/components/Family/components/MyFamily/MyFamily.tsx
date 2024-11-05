import React, { useEffect, useState } from 'react';
import { auth, db } from '../../../../firebase';
import { getDoc, getDocs, doc, collection } from 'firebase/firestore';
import { FirebaseError } from 'firebase/app';

const familyDataDefault = { number: 0, description: '', owner_email: '' };

interface FamilyDataProps {
  number: number;
  description: string;
  owner_email: string;
}

type MyFamilyProps = {
  setIsMyFamilyExist: React.Dispatch<React.SetStateAction<boolean>>;
  isMyFamilyExist: boolean;
};

export const MyFamily = ({
  isMyFamilyExist,
  setIsMyFamilyExist,
}: MyFamilyProps) => {
  const userEmail = auth.currentUser?.email;
  const [familyId, setFamilyId] = useState('');
  const [familyData, setFamilyData] =
    useState<FamilyDataProps>(familyDataDefault);

  useEffect(() => {
    const getUser = async () => {
      if (userEmail) {
        const userRef = doc(db, 'users', userEmail);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setFamilyId(userSnap.data().family_id);
        }
      }
    };

    getUser();
  }, [userEmail]);

  useEffect(() => {
    const getFamily = async () => {
      try {
        const userRef = doc(db, 'families', familyId);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setFamilyData({
            description: userSnap.data().description,
            number: userSnap.data().number,
            owner_email: familyId,
          });
          setIsMyFamilyExist(true);
        }
      } catch (error) {
        const firebaseError = error as FirebaseError;
        console.error('error', firebaseError?.message);
      }
    };

    const getFamilies = async () => {
      try {
        const usersRef = collection(db, 'families');
        const querySnapshot = await getDocs(usersRef);

        const users = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        console.log('All families :', users);
      } catch (error) {
        const firebaseError = error as FirebaseError;
        console.error('error', firebaseError?.message);
      }
    };

    getFamily();
    getFamilies();
  }, [familyId, isMyFamilyExist]);

  console.log('familyData', familyData);

  if (!isMyFamilyExist)
    return (
      <div style={{ border: '1px solid blue' }}>
        <h3>You don`t have family.</h3>
      </div>
    );

  return (
    <div style={{ border: '1px solid blue' }}>
      <h2>MyFamily</h2>
      <>
        <h3>{familyId}</h3>
        <h3>{familyData.number > 0 && familyData.number}</h3>
        <h3>{familyData.description}</h3>
      </>
    </div>
  );
};
