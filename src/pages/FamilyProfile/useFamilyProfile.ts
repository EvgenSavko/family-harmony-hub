import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getUserFromFirebase,
  getFamilyFromFirebase,
  UserStateApi,
} from '../../shared';
import { auth } from '../../firebase';

export const useFamilyProfile = () => {
  const [familyId, setFamilyId] = useState('');
  const [inProgress, setInProgress] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(-1);
  const [isFamilyOwner, setIsFamilyOwner] = useState(false);
  const [familyMembersEmails, setFamilyMembersEmails] = useState([]);
  const [familyMembers, setFamilyMembers] = useState<UserStateApi[]>([]);
  const navigate = useNavigate();

  const handleExpandClick = (index: number, isExpanded: boolean) => {
    setExpandedIndex(isExpanded ? -1 : index);
  };

  const handleAddMember = () => {
    navigate('/family-creating');
  };

  useEffect(() => {
    setInProgress(true);
    getUserFromFirebase().then((data) => {
      setFamilyId(data?.family_id);

      if (!data?.family_id) {
        setInProgress(false);
      }
    });
  }, [auth.currentUser?.email]);

  useEffect(() => {
    if (familyId) {
      getFamilyFromFirebase(familyId).then((data) => {
        setFamilyMembersEmails(data?.family_members);

        if (data?.family_members?.length === 0) {
          setInProgress(false);
        }
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
          setInProgress(false);
        }
      });
    }
  }, [familyMembersEmails.length]);

  return {
    familyMembers,
    isFamilyOwner,
    expandedIndex,
    inProgress,
    handleAddMember,
    handleExpandClick,
  };
};
