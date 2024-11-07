import React from 'react';
import { auth, db } from '../../../../firebase';
import { doc, setDoc, updateDoc } from 'firebase/firestore';

type CreateFamilyProps = {
  setIsMyFamilyExist: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isMyFamilyExist: boolean;
};

export const CreateFamily = ({
  setIsMyFamilyExist,
  setIsLoading,
  isMyFamilyExist,
}: CreateFamilyProps) => {
  const [description, setDescription] = React.useState('');
  const [number, setNumber] = React.useState('');

  const handleCreateFamily = async () => {
    setIsLoading(true);
    const familyID = auth.currentUser?.email;
    const ownerEmail = auth.currentUser?.email;

    if (familyID && ownerEmail) {
      const docRef = doc(db, 'families', familyID);
      await setDoc(docRef, {
        number: +number,
        owner_email: ownerEmail,
        description: description,
        family_members: [ownerEmail],
      });

      const docUsersRef = doc(db, 'users', ownerEmail);

      await updateDoc(docUsersRef, {
        family_id: ownerEmail,
      });

      setDescription('');
      setNumber('');
      setIsMyFamilyExist(true);
      setIsLoading(false);
    }
  };

  if (isMyFamilyExist)
    return (
      <div style={{ border: '1px solid orange' }}>
        <h3>You already have a family. You cannot create one more family.</h3>
      </div>
    );

  return (
    <div style={{ border: '1px solid orange' }}>
      <h3>CreateFamily</h3>

      <input
        placeholder="Description..."
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />
      <input
        type="number"
        placeholder="Number..."
        onChange={(e) => setNumber(e.target.value)}
        value={number}
      />
      <button onClick={handleCreateFamily}>Create a family</button>
    </div>
  );
};
