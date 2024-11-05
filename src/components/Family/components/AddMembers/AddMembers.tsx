import React, { useEffect, useState } from 'react';

import { db } from '../../../../firebase';
import { doc, updateDoc } from 'firebase/firestore';

interface AddMembersProps {
  familyId: string;
}

export const AddMembers = ({ familyId }: AddMembersProps) => {
  const [member, setMember] = useState('');
  const [members, setMembers] = useState<Array<string>>([]);

  console.log('familyId', familyId);
  console.log('members', members);

  const handleAddMember = () => {
    setMembers((prev) => [...prev, member]);
    setMember('');
  };

  useEffect(() => {
    const updateUsers = async () => {
      members.forEach(async (userEmail) => {
        const docUsersRef = doc(db, 'users', userEmail);

        await updateDoc(docUsersRef, {
          family_id: familyId,
        });
      });

      console.log('Finished with Assign new Members!');
    };
    updateUsers();
  }, [members]);

  return (
    <div style={{ border: '1px solid green' }}>
      <h3>AddMembers</h3>
      <input
        placeholder="Member`s email..."
        onChange={(e) => setMember(e.target.value)}
        value={member}
      />
      <button onClick={handleAddMember}>Add new member</button>
    </div>
  );
};
