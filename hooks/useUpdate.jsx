import { useState } from "react";
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import { getApp } from 'firebase/app';

const useUpdate = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);

  const app = getApp();
  const db = getFirestore(app);

  const updateDocument = async (collectionName, documentId, data) => {
    setIsUpdating(true);
    setError(null);

    try {
      const docRef = doc(db, collectionName, documentId);
      await updateDoc(docRef, data);
      setIsUpdating(false);
    } catch (err) {
      setError("Error al actualizar el documento: " + err.message);
      setIsUpdating(false);
    }
  };

  return { updateDocument, isUpdating, error };
};

export default useUpdate;
