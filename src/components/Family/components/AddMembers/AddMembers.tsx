import React, { useEffect, useState } from 'react';

import { db } from '../../../../firebase';
import { doc, updateDoc } from 'firebase/firestore';

interface AddMembersProps {
  familyId: string;
  setIsAddMembersLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddMembers = ({
  familyId,
  setIsAddMembersLoading,
}: AddMembersProps) => {
  const [member, setMember] = useState('');
  const [members, setMembers] = useState<Array<string>>([]);
  const [isReadyToAddToFamily, setIsReadyToAddToFamily] = useState(false);
  const ownerEmail = familyId;

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
        family_members: [...members, ownerEmail],
      });

      setIsAddMembersLoading(false);
    };

    // Add family_id of the family that they were assigned to
    const updateUsers = async () => {
      setIsAddMembersLoading(true);
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
  }, [members, isReadyToAddToFamily]);

  return (
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
  );
};
