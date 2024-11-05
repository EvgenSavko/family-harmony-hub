import React, { useEffect } from 'react';
import { db } from '../../../../firebase';
import { getDoc, getDocs, doc, collection } from 'firebase/firestore';

export const MyFamily = () => {
  useEffect(() => {
    const getFamily = async () => {
      const userRef = doc(db, 'families', 'test2@gmail.com');
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        console.log('Family data:', userSnap.data());
      }
    };

    const getFamilies = async () => {
      const usersRef = collection(db, 'families');
      const querySnapshot = await getDocs(usersRef);

      const users = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log('All families :', users);
    };

    getFamily();
    getFamilies();
  }, []);
  return <div>MyFamily</div>;
};
