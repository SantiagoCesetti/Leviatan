import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';
import { auth } from '../credenciales';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const registerUser = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Usuario registrado con ID: ", userCredential.user.uid);
      return userCredential.user.uid;
    } catch (error) {
      console.error("Error registrando: ", error); // Debugging
      if (error.code === 'auth/email-already-in-use') {
        throw new Error('El correo ya está registrado. Por favor, usa otro o intenta iniciar sesión.');
      } else if (error.code === 'auth/weak-password') {
        throw new Error('La contraseña debe tener al menos 6 caracteres.');
      }
      throw new Error('Ocurrió un error al registrar el usuario. Intenta de nuevo.');
    }
  };

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor llena todos los campos.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    try {
      await registerUser(email, password);
      Alert.alert(
        'Registro exitoso', 
        'Tu cuenta se creó correctamente. Ahora puedes iniciar sesión.',
        [
          { 
            text: 'Aceptar', 
            onPress: () => navigation.navigate('LoginForm')
          }
        ]
      );
    } catch (error) {
      console.error("Error en handleRegister: ", error); // Debugging
      Alert.alert('Error', error.message || 'Ocurrió un error. Intenta de nuevo.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Crea tu cuenta</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          onChangeText={setPassword}
          secureTextEntry
          value={password}
        />
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => navigation.navigate('LoginForm')}
        >
          <Text style={styles.linkButtonText}>¿Ya tienes cuenta? Inicia sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 30,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    alignItems: 'center',
  },
  formTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
    color: '#333333',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    color: '#333333',
    width: '100%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#00B8BA',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  linkButton: {
    marginTop: 10,
  },
  linkButtonText: {
    fontSize: 14,
    color: '#00B8BA',
  },
});

export default RegisterForm;