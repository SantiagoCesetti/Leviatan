import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import appFirebase from '../credenciales';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const auth = getAuth(appFirebase);

const RegisterForm = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [direccion, setDireccion] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const resetForm = () => {
    setNombre("");
    setApellido("");
    setEmail("");
    setTelefono("");
    setContraseña("");
    setDireccion("");
    setShowPassword(false);
    setError('');
  };

  useFocusEffect(
    React.useCallback(() => {
      resetForm();
    }, [])
  );

  const handleRegister = async () => {
    // Validación básica
    if (!email || !contraseña) {
        setError('Por favor, completa todos los campos.');
        return;
    }

    try {
        await createUserWithEmailAndPassword(auth, email, contraseña);
        // Registro exitoso
        setError(''); 
        resetForm(); 
    } catch (error) {
        setError('Error al registrar: ' + error.message);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleHomeNavigation = () => {
    navigation.navigate('index');
  };

  const handlePhoneChange = (text) => {
    // Eliminar cualquier carácter que no sea número
    const numericValue = text.replace(/[^0-9]/g, '');
    
    // Formatear el número con espacios
    let formattedValue = '';
    for (let i = 0; i < numericValue.length && i < 10; i++) {
      if (i === 3 || i === 6) {
        formattedValue += ' ';
      }
      formattedValue += numericValue[i];
    }
    
    setTelefono(formattedValue);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleHomeNavigation} style={styles.homeIcon}>
            <Ionicons name="home-outline" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headertext}>Clean Class</Text>
        </View>
        <View style={styles.body}>
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Registro de usuario</Text>
            <View style={styles.gridContainer}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Nombre</Text>
                <TextInput
                  style={[styles.input, nombre ? styles.inputTextBlack : null]}
                  value={nombre}
                  onChangeText={(text) => setNombre(text.slice(0, 50))}
                  placeholder="Nombre"
                  maxLength={50}
                  placeholderTextColor="gray"
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Apellido</Text>
                <TextInput
                  style={[styles.input, apellido ? styles.inputTextBlack : null]}
                  value={apellido}
                  onChangeText={(text) => setApellido(text.slice(0, 50))}
                  placeholder="Apellido"
                  maxLength={50}
                  placeholderTextColor="gray"
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Correo electrónico</Text>
                <TextInput
                  style={[styles.input, email ? styles.inputTextBlack : null]}
                  value={email}
                  onChangeText={(text) => setEmail(text.slice(0, 50))}
                  placeholder="Correo electrónico"
                  keyboardType="email-address"
                  maxLength={50}
                  placeholderTextColor="gray"
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Contraseña</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={[styles.passwordInput, contraseña ? styles.inputTextBlack : null]}
                    value={contraseña}
                    onChangeText={(text) => setContraseña(text.slice(0, 20))}
                    placeholder="Contraseña"
                    secureTextEntry={!showPassword}
                    maxLength={20}
                    placeholderTextColor="gray"
                  />
                  <TouchableOpacity onPress={toggleShowPassword} style={styles.eyeIcon}>
                    <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="gray" />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Número de teléfono</Text>
                <View style={styles.phoneInputContainer}>
                  <Text style={styles.phonePrefix}>+54</Text>
                  <TextInput
                    style={[styles.phoneInput, telefono ? styles.inputTextBlack : null]}
                    value={telefono}
                    onChangeText={handlePhoneChange}
                    placeholder="299 777 5555"
                    keyboardType="numeric"
                    maxLength={12}
                    placeholderTextColor="gray"
                  />
                </View>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Dirección</Text>
                <TextInput
                  style={[styles.input, direccion ? styles.inputTextBlack : null]}
                  value={direccion}
                  onChangeText={(text) => setDireccion(text.slice(0, 100))}
                  placeholder="Dirección"
                  maxLength={100}
                  placeholderTextColor="gray"
                />
              </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text style={styles.buttonText}>Crear cuenta</Text>
            </TouchableOpacity>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#E6F3FF',
  },
  header: {
    backgroundColor: "#00B8BA",
    height: 80,
    width: 'auto',
    padding: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  homeIcon: {
    marginLeft: 20,
  },
  headertext: {
    fontSize: 25,
    color: '#000000',
    marginRight: 20,
    fontWeight: 'bold'
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
  },
  formContainer: {
    width: '100%',
    maxWidth: 500,
    alignItems: 'center',
    alignSelf: 'center',
  },
  formTitle: {
    fontSize: 24,
    marginBottom: 30,
    color: '#000000',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  inputContainer: {
    width: '48%',
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 12,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderRadius: 3,
    borderWidth: 1,
    paddingHorizontal: 10,
    color: 'gray',
  },
  inputTextBlack: {
    color: 'black',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 40,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderRadius: 3,
    borderWidth: 1,
  },
  passwordInput: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 10,
    color: 'gray',
  },
  eyeIcon: {
    padding: 10,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 40,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderRadius: 3,
    borderWidth: 1,
  },
  phonePrefix: {
    paddingLeft: 10,
    color: 'black',
    fontSize: 16,
  },
  phoneInput: {
    flex: 1,
    height: '100%',
    width: '100%',
    paddingHorizontal: 10,
    color: 'gray',
  },
  button: {
    height: 40,  
    width: '100%',  
    backgroundColor: '#000',  
    borderRadius: 10,  
    alignSelf: 'center',
    justifyContent: 'center',  
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',  
    textAlign: 'center',  
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default RegisterForm;
