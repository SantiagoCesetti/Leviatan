
import React, { useState } from 'react';  
import { View, TextInput, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';  
import { auth } from '../credenciales';  
import { createUserWithEmailAndPassword } from 'firebase/auth';  

const RegisterForm = () => {  
  const [nombre, setNombre] = useState('');  
  const [apellido, setApellido] = useState('');  
  const [email, setEmail] = useState('');  
  const [telefono, setTelefono] = useState('');  
  const [dni, setDni] = useState('');  
  const [password, setPassword] = useState('');  

  const registerUser = async (email, password) => {  
    try {  
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);  
      console.log("Usuario registrado con ID: ", userCredential.user.uid);  
      return userCredential.user.uid;  
    } catch (error) {  
      console.error("Error al registrar el usuario: ", error);  
      throw error;  
    }  
  };  

  const handleRegister = async () => {  
    if (!nombre || !apellido || !email || !telefono || !dni || !password) {  
      Alert.alert("Error", "Por favor llena todos los campos.");  
      return;  
    }  

    try {  
      const userId = await registerUser(email, password);  
      Alert.alert("Éxito", `Usuario registrado exitosamente. ID: ${userId}`);  
    } catch (error) {  
      Alert.alert("Error", "Error al registrar el usuario. Intenta de nuevo.");  
    }  
  };  

  return (  
    <View style={styles.container}>  
      <TextInput style={styles.input} placeholder="Nombre" onChangeText={setNombre} value={nombre} />  
      <TextInput style={styles.input} placeholder="Apellido" onChangeText={setApellido} value={apellido} />  
      <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail} value={email} />  
      <TextInput style={styles.input} placeholder="Teléfono" onChangeText={setTelefono} value={telefono} />  
      <TextInput style={styles.input} placeholder="DNI" onChangeText={setDni} value={dni} />  
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
    </View>  
  );  
};  

const styles = StyleSheet.create({  
  container: {  
    flex: 1,  
    justifyContent: 'center',  
    alignItems: 'center',  
    backgroundColor: '#F0F8FF',  
  },  
  input: {  
    width: '80%',  
    height: 40,  
    borderColor: 'gray',  
    borderWidth: 1,  
    borderRadius: 10,  
    paddingHorizontal: 10,  
    marginBottom: 12,  
  },  
  button: {  
    backgroundColor: '#00B8BA',  
    padding: 10,  
    borderRadius: 10,  
    width: '80%',  
    alignItems: 'center',  
  },  
  buttonText: {  
    color: '#fff',  
    fontSize: 16,  
  },  
});  

export default RegisterForm;