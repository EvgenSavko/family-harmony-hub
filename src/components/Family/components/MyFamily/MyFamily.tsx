import React, { useEffect, useState } from 'react';
import { auth, db } from '../../../../firebase';
import { getDoc, getDocs, doc, collection } from 'firebase/firestore';
import { FirebaseError } from 'firebase/app';
import { AddMembers } from '../AddMembers';

const familyDataDefault = {
  number: 0,
  description: '',
  ownerEmail: '',
  familyMembers: [],
};

interface FamilyDataProps {
  number: number;
  description: string;
  ownerEmail: string;
  familyMembers: Array<string>;
}

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
  const [isAddMembersLoading, setIsAddMembersLoading] = useState(false);
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
              number: familySnap.data().number,
              ownerEmail: familyId,
              familyMembers: familySnap.data().family_members,
            });
            setIsMyFamilyExist(true);
          }
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
  }, [familyId, isMyFamilyExist, isSignIn, isAddMembersLoading]);

  useEffect(() => {
    return () => {
      setIsMyFamilyExist(false);
    };
  }, []);

  //   console.log('familyData', familyData);

  const currentUserIsOwner = userEmail === familyData.ownerEmail;

  if (!isMyFamilyExist)
    return (
      <div style={{ border: '1px solid blue' }}>
        <h3>You don`t have family.</h3>
      </div>
    );

  return (
    <div style={{ border: '1px solid blue' }}>
      <h2>MyFamily</h2>
      {isAddMembersLoading && <h2>Loading ....</h2>}
      {!isAddMembersLoading && (
        <>
          <>
            <h3>Owner is: {familyId}</h3>
            <h3>Family #: {familyData.number > 0 && familyData.number}</h3>
            <h3>Description: {familyData.description}</h3>
            <h3>Family members: {familyData.familyMembers?.join(', ')}</h3>
          </>
        </>
      )}
      <br />
      {currentUserIsOwner && (
        <AddMembers
          familyId={familyId}
          setIsAddMembersLoading={setIsAddMembersLoading}
        />
      )}
    </div>
  );
};
