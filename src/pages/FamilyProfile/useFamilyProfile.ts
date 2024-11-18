import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserFromFirebase, getFamilyFromFirebase } from '../../shared';
import { auth } from '../../firebase';
import { UserState } from '../Profile/Profile.hooks';

interface UserStateApi extends UserState {
  family_id: string;
  user_email: string;
}

export const useFamilyProfile = () => {
  const [familyId, setFamilyId] = useState('');
  const [expandedIndex, setExpandedIndex] = useState(-1);
  const [isFamilyOwner, setIsFamilyOwner] = useState(false);
  const [familyMembersEmails, setFamilyMembersEmails] = useState([]);
  const [familyMembers, setFamilyMembers] = useState<UserStateApi[]>([]);
  const navigate = useNavigate();

  const handleExpandClick = (index: number, isExpanded: boolean) => {
    setExpandedIndex(isExpanded ? -1 : index);
  };

  const handleAddMember = () => {
    navigate('/home');
  };

  useEffect(() => {
    getUserFromFirebase().then((data) => {
      setFamilyId(data?.family_id);
    });
  }, [auth.currentUser?.email]);

  useEffect(() => {
    if (familyId) {
      getFamilyFromFirebase(familyId).then((data) => {
        setFamilyMembersEmails(data?.family_members);
      });

      if (familyId === auth.currentUser?.email) {
        setIsFamilyOwner(true);
      }
    }
  }, [familyId]);

  useEffect(() => {
    if (familyMembers.length === 0) {
      familyMembersEmails.forEach(async (userEmail) => {
        const data = await getUserFromFirebase(userEmail);
        if (data) {
          setFamilyMembers((prev: any) => [...prev, data]);
        }
      });
    }
  }, [familyMembersEmails.length]);

  return {
    familyMembers,
    isFamilyOwner,
    expandedIndex,
    handleAddMember,
    handleExpandClick,
  };
};
