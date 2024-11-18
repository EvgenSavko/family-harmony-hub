import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { FirebaseError } from 'firebase/app';

export const getFamilyFromFirebase = async (familyId: string) => {
  try {
    if (familyId) {
      const familiesRef = doc(db, 'families', familyId);
      const familySnap = await getDoc(familiesRef);

      if (familySnap.exists()) {
        return familySnap.data();
      }
    }
  } catch (error) {
    const firebaseError = error as FirebaseError;
    console.error('error', firebaseError?.message);
  }
};
