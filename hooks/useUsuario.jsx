import { useState } from 'react';
import { collection, getDocs, getFirestore, doc, setDoc } from 'firebase/firestore';
import appFirebase from '@/app/credenciales';

const db = getFirestore(appFirebase);

export const useUsuario = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const crearUsuario = async (userData) => {
    try {
      setLoading(true);
      console.log('Iniciando creación de usuario en Firestore:', userData);

      // Crear referencia al documento
      const userRef = doc(collection(db, 'usuario'));
      
      // Datos a guardar
      const userDataToSave = {
        apellido: userData.apellido,
        direccion: userData.direccion,
        dni: userData.dni,
        email: userData.email,
        nombre: userData.nombre,
        telefono: userData.telefono,
        rol: userData.rol
      };

      // Guardar en Firestore
      await setDoc(userRef, userDataToSave);
      
      console.log('Usuario guardado en Firestore exitosamente');
      return userRef.id;
    } catch (err) {
      console.error('Error en crearUsuario:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    crearUsuario
  };
};
