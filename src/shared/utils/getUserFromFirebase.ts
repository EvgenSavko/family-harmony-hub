import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { FirebaseError } from 'firebase/app';

export const getUserFromFirebase = async (userEmail?: string) => {
  const ownerEmail = auth.currentUser?.email;

  if (ownerEmail) {
    try {
      const docUsersRef = doc(db, 'users', userEmail || ownerEmail);

      const userSnap = await getDoc(docUsersRef);

      if (userSnap.exists()) {
        return userSnap.data();
      }
    } catch (error) {
      const firebaseError = error as FirebaseError;
      console.error('error', firebaseError?.message);
    }
  }
};
