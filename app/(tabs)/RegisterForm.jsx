import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import appFirebase from '../credenciales';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Header from "../../components/Header";

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
        <Header handleHomeNavigation={handleHomeNavigation} />
        <View style={styles.body}>
          <View style={styles.formContainer}>
            <View style={styles.titleContainer}>
              <Ionicons name="person-add" size={35} color="#00B8BA" />
              <Text style={styles.title}>Registro de usuario</Text>
            </View>
            <Text style={styles.subtitle}>✨ ¡Únete a nuestra comunidad!</Text>

            <View style={styles.gridContainer}>
              <View style={styles.inputContainer}>
                <View style={styles.labelContainer}>
                  <Ionicons name="person" size={20} color="#00B8BA" />
                  <Text style={styles.inputLabel}>Nombre</Text>
                </View>
                <TextInput
                  style={[styles.input, nombre ? styles.inputTextBlack : null]}
                  value={nombre}
                  onChangeText={(text) => setNombre(text.slice(0, 50))}
                  placeholder="Tu nombre"
                  maxLength={50}
                  placeholderTextColor="#999"
                />
              </View>

              <View style={styles.inputContainer}>
                <View style={styles.labelContainer}>
                  <Ionicons name="people" size={20} color="#00B8BA" />
                  <Text style={styles.inputLabel}>Apellido</Text>
                </View>
                <TextInput
                  style={[styles.input, apellido ? styles.inputTextBlack : null]}
                  value={apellido}
                  onChangeText={(text) => setApellido(text.slice(0, 50))}
                  placeholder="Tu apellido"
                  maxLength={50}
                  placeholderTextColor="#999"
                />
              </View>

              <View style={styles.inputContainer}>
                <View style={styles.labelContainer}>
                  <Ionicons name="mail" size={20} color="#00B8BA" />
                  <Text style={styles.inputLabel}>Correo electrónico</Text>
                </View>
                <TextInput
                  style={[styles.input, email ? styles.inputTextBlack : null]}
                  value={email}
                  onChangeText={(text) => setEmail(text.slice(0, 50))}
                  placeholder="ejemplo@correo.com"
                  keyboardType="email-address"
                  maxLength={50}
                  placeholderTextColor="#999"
                />
              </View>

              <View style={styles.inputContainer}>
                <View style={styles.labelContainer}>
                  <Ionicons name="lock-closed" size={20} color="#00B8BA" />
                  <Text style={styles.inputLabel}>Contraseña</Text>
                </View>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={[styles.passwordInput, contraseña ? styles.inputTextBlack : null]}
                    value={contraseña}
                    onChangeText={(text) => setContraseña(text.slice(0, 20))}
                    placeholder="Tu contraseña"
                    secureTextEntry={!showPassword}
                    maxLength={20}
                    placeholderTextColor="#999"
                  />
                  <TouchableOpacity onPress={toggleShowPassword} style={styles.eyeIcon}>
                    <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="#666" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.inputContainer}>
                <View style={styles.labelContainer}>
                  <Ionicons name="call" size={20} color="#00B8BA" />
                  <Text style={styles.inputLabel}>Teléfono</Text>
                </View>
                <View style={styles.phoneInputContainer}>
                  <Text style={styles.phonePrefix}>+54</Text>
                  <TextInput
                    style={[styles.phoneInput, telefono ? styles.inputTextBlack : null]}
                    value={telefono}
                    onChangeText={handlePhoneChange}
                    placeholder="299 777 5555"
                    keyboardType="numeric"
                    maxLength={12}
                    placeholderTextColor="#999"
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <View style={styles.labelContainer}>
                  <Ionicons name="location" size={20} color="#00B8BA" />
                  <Text style={styles.inputLabel}>Dirección</Text>
                </View>
                <TextInput
                  style={[styles.input, direccion ? styles.inputTextBlack : null]}
                  value={direccion}
                  onChangeText={(text) => setDireccion(text.slice(0, 100))}
                  placeholder="Tu dirección"
                  maxLength={100}
                  placeholderTextColor="#999"
                />
              </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Ionicons name="checkmark-circle" size={22} color="white" />
              <Text style={styles.buttonText}>¡Crear cuenta!</Text>
            </TouchableOpacity>

            {error ? (
              <View style={styles.errorContainer}>
                <Ionicons name="alert-circle" size={20} color="#FF6B6B" />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}
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
    backgroundColor: '#F0F8FF',
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  formContainer: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    alignSelf: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 10,
  },
  title: {
    fontSize: 24,
    color: '#333',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 25,
    fontStyle: 'italic',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  inputContainer: {
    width: '48%',
    marginBottom: 20,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 6,
  },
  inputLabel: {
    fontSize: 14,
    color: '#444',
    fontWeight: '600',
  },
  input: {
    width: '100%',
    height: 45,
    backgroundColor: '#F8F9FA',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 14,
    color: '#333',
  },
  inputTextBlack: {
    color: '#333',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    backgroundColor: '#F8F9FA',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 12,
  },
  passwordInput: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 15,
    paddingRight: 40,
    fontSize: 14,
    color: '#333',
  },
  eyeIcon: {
    position: 'absolute',
    right: 0,
    padding: 5,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    backgroundColor: '#F8F9FA',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 12,
  },
  phonePrefix: {
    paddingLeft: 15,
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
  },
  phoneInput: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 10,
    fontSize: 14,
    color: '#333',
  },
  button: {
    height: 50,
    backgroundColor: '#00B8BA',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    gap: 8,
    shadowColor: "#00B8BA",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    gap: 6,
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 14,
  },
});

export default RegisterForm;
