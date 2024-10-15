
import { useState } from "react";
import { getFirestore, doc, deleteDoc } from 'firebase/firestore';
import { getApp } from 'firebase/app';

const useDelete = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const app = getApp();
  const db = getFirestore(app);

  const deleteDocument = async (collectionName, documentId) => {
    setIsDeleting(true);
    setError(null);

    try {
      const docRef = doc(db, collectionName, documentId);
      await deleteDoc(docRef);
      setIsDeleting(false);
    } catch (err) {
      setError("Error al eliminar el documento: " + err.message);
      setIsDeleting(false);
    }
  };

  return { deleteDocument, isDeleting, error };
};

export default useDelete;
