import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/app/credenciales';

export const useUsuario = () => {
  const [loading, setLoading] = useState(false);

  const crearUsuario = async (userData) => {
    setLoading(true);
    try {
      // Crear la colección si no existe
      const usuariosRef = collection(db, 'usuarios');
      
      const userDataToSave = {
        uid: userData.id,
        nombre: userData.nombre,
        apellido: userData.apellido,
        email: userData.email,
        telefono: userData.telefono || '',
        direccion: userData.direccion || '',
        dni: userData.dni,
        rol: userData.rol || 'usuario',
        fechaRegistro: new Date().toISOString()
      };

      console.log('Intentando guardar usuario:', userDataToSave);
      
      const docRef = await addDoc(usuariosRef, userDataToSave);
      console.log('Usuario guardado con ID:', docRef.id);
      
      setLoading(false);
      return docRef.id;
    } catch (error) {
      console.error('Error al crear usuario:', error);
      setLoading(false);
      throw error;
    }
  };

  return {
    crearUsuario,
    loading
  };
};
