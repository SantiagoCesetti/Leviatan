import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import appFirebase from '@/app/credenciales';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

import Header from "../../components/Header";
import Background from '../../components/Background';
import Background2 from '../../components/Background2';
import Header2 from '../../components/Header2';
import { ThemeProvider, ThemeContext } from '../../components/ThemeContext';
import ColorMode from '../../components/ColorMode';
import { useUsuario } from '../../hooks/useUsuario';

const auth = getAuth(appFirebase);

const RegisterFormContent = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [direccion, setDireccion] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigation = useNavigation();
  const [nombreFocused, setNombreFocused] = useState(false);
  const [apellidoFocused, setApellidoFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [telefonoFocused, setTelefonoFocused] = useState(false);
  const [direccionFocused, setDireccionFocused] = useState(false);
  const [dni, setDni] = useState("");
  const [rol, setRol] = useState("");
  const [dniFocused, setDniFocused] = useState(false);
  const [rolFocused, setRolFocused] = useState(false);
  const { crearUsuario } = useUsuario();

  const resetForm = () => {
    setNombre("");
    setApellido("");
    setEmail("");
    setTelefono("");
    setContraseña("");
    setDireccion("");
    setShowPassword(false);
    setError('');
    setDni("");
    setRol("");
  };

  useFocusEffect(
    React.useCallback(() => {
      resetForm();
    }, [])
  );

  const handleRegister = async () => {
    if (!email || !contraseña || !nombre || !apellido || !dni || !rol) {
      setError('Por favor, completa todos los campos obligatorios.');
      return;
    }

    try {
      console.log('Iniciando proceso de registro');

      // 1. Crear usuario en Authentication
      console.log('Creando usuario en Authentication');
      const userCredential = await createUserWithEmailAndPassword(auth, email, contraseña);
      console.log('Usuario creado en Authentication:', userCredential.user.uid);

      // 2. Preparar datos para Firestore
      const userData = {
        nombre,
        apellido,
        email,
        telefono,
        direccion,
        dni,
        rol
      };

      console.log('Datos preparados para Firestore:', userData);

      // 3. Guardar en Firestore
      console.log('Intentando guardar en Firestore');
      await crearUsuario(userData);
      
      console.log('Proceso completado exitosamente');
      
      // 4. Limpiar formulario y mostrar éxito
      setError('');
      resetForm();
      alert('Usuario registrado exitosamente');
      
    } catch (error) {
      console.error('Error en el proceso de registro:', error);
      
      // Mensaje de error más específico
      if (error.code === 'auth/email-already-in-use') {
        setError('Este correo electrónico ya está registrado');
      } else if (error.code === 'auth/invalid-email') {
        setError('El correo electrónico no es válido');
      } else if (error.code === 'auth/weak-password') {
        setError('La contraseña debe tener al menos 6 caracteres');
      } else {
        setError('Error al registrar: ' + error.message);
      }
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handlePhoneChange = (text) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    
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
        <View style={styles.backgroundContainer}>
          {isDarkMode ? <Background2 /> : <Background />}
        </View>
        <View style={styles.mainContent}>
          {isDarkMode ? <Header2 handleHomeNavigation={null} /> : <Header handleHomeNavigation={null} />}
          <ColorMode />
          <View style={styles.body}>
            <View style={[styles.formContainer, isDarkMode && styles.formContainerDark]}>
              <View style={styles.titleContainer}>
                <Ionicons name="person-add" size={35} color={isDarkMode ? '#A73DFF' : '#00B8BA'} />
                <Text style={[styles.title, isDarkMode && styles.titleDark]}>Registro de usuario</Text>
              </View>
              <Text style={[styles.subtitle, isDarkMode && styles.subtitleDark]}>✨ ¡Únete a nuestra comunidad!</Text>

              <View style={styles.gridContainer}>
                <View style={styles.inputContainer}>
                  <View style={styles.labelContainer}>
                    <Ionicons name="person" size={20} color={isDarkMode ? '#A73DFF' : '#00B8BA'} />
                    <Text style={[styles.inputLabel, isDarkMode && styles.inputLabelDark]}>Nombre</Text>
                  </View>
                  <TextInput
                    style={[
                      styles.input,
                      nombre ? styles.inputTextBlack : null,
                      nombreFocused && (isDarkMode ? styles.inputFocusedDark : styles.inputFocused),
                      isDarkMode && styles.inputDark
                    ]}
                    value={nombre}
                    onChangeText={(text) => setNombre(text.slice(0, 50))}
                    placeholder="Tu nombre"
                    maxLength={50}
                    placeholderTextColor={isDarkMode ? '#A0A0A0' : '#999'}
                    onFocus={() => setNombreFocused(true)}
                    onBlur={() => setNombreFocused(false)}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <View style={styles.labelContainer}>
                    <Ionicons name="people" size={20} color={isDarkMode ? '#A73DFF' : '#00B8BA'} />
                    <Text style={[styles.inputLabel, isDarkMode && styles.inputLabelDark]}>Apellido</Text>
                  </View>
                  <TextInput
                    style={[
                      styles.input,
                      apellido ? styles.inputTextBlack : null,
                      apellidoFocused && (isDarkMode ? styles.inputFocusedDark : styles.inputFocused),
                      isDarkMode && styles.inputDark
                    ]}
                    value={apellido}
                    onChangeText={(text) => setApellido(text.slice(0, 50))}
                    placeholder="Tu apellido"
                    maxLength={50}
                    placeholderTextColor={isDarkMode ? '#A0A0A0' : '#999'}
                    onFocus={() => setApellidoFocused(true)}
                    onBlur={() => setApellidoFocused(false)}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <View style={styles.labelContainer}>
                    <Ionicons name="mail" size={20} color={isDarkMode ? '#A73DFF' : '#00B8BA'} />
                    <Text style={[styles.inputLabel, isDarkMode && styles.inputLabelDark]}>Correo electrónico</Text>
                  </View>
                  <TextInput
                    style={[
                      styles.input,
                      email ? styles.inputTextBlack : null,
                      emailFocused && (isDarkMode ? styles.inputFocusedDark : styles.inputFocused),
                      isDarkMode && styles.inputDark
                    ]}
                    value={email}
                    onChangeText={(text) => setEmail(text.slice(0, 50))}
                    placeholder="ejemplo@correo.com"
                    keyboardType="email-address"
                    maxLength={50}
                    placeholderTextColor={isDarkMode ? '#A0A0A0' : '#999'}
                    onFocus={() => setEmailFocused(true)}
                    onBlur={() => setEmailFocused(false)}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <View style={styles.labelContainer}>
                    <Ionicons name="lock-closed" size={20} color={isDarkMode ? '#A73DFF' : '#00B8BA'} />
                    <Text style={[styles.inputLabel, isDarkMode && styles.inputLabelDark]}>Contraseña</Text>
                  </View>
                  <View style={[
                    styles.passwordContainer,
                    passwordFocused && (isDarkMode ? styles.inputFocusedDark : styles.inputFocused),
                    isDarkMode && styles.inputDark
                  ]}>
                    <TextInput
                      style={[
                        styles.passwordInput,
                        contraseña ? styles.inputTextBlack : null,
                        isDarkMode && styles.inputDark
                      ]}
                      value={contraseña}
                      onChangeText={(text) => setContraseña(text.slice(0, 20))}
                      placeholder="Tu contraseña"
                      secureTextEntry={!showPassword}
                      maxLength={20}
                      placeholderTextColor={isDarkMode ? '#A0A0A0' : '#999'}
                      onFocus={() => setPasswordFocused(true)}
                      onBlur={() => setPasswordFocused(false)}
                    />
                    <TouchableOpacity onPress={toggleShowPassword} style={styles.eyeIcon}>
                      <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color={isDarkMode ? '#A73DFF' : '#666'} />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.inputContainer}>
                  <View style={styles.labelContainer}>
                    <Ionicons name="call" size={20} color={isDarkMode ? '#A73DFF' : '#00B8BA'} />
                    <Text style={[styles.inputLabel, isDarkMode && styles.inputLabelDark]}>Teléfono</Text>
                  </View>
                  <View style={[
                    styles.phoneInputContainer,
                    telefonoFocused && (isDarkMode ? styles.inputFocusedDark : styles.inputFocused),
                    isDarkMode && styles.phoneInputContainerDark
                  ]}>
                    <Text style={[
                      styles.phonePrefix, 
                      isDarkMode && { color: '#A0A0A0' }
                    ]}>+54</Text>
                    <TextInput
                      style={[
                        styles.phoneInput,
                        telefono ? styles.inputTextBlack : null,
                        isDarkMode && styles.inputDark
                      ]}
                      value={telefono}
                      onChangeText={handlePhoneChange}
                      placeholder="299 777 5555"
                      keyboardType="numeric"
                      maxLength={12}
                      placeholderTextColor={isDarkMode ? '#A0A0A0' : '#999'}
                      onFocus={() => setTelefonoFocused(true)}
                      onBlur={() => setTelefonoFocused(false)}
                    />
                  </View>
                </View>

                <View style={styles.inputContainer}>
                  <View style={styles.labelContainer}>
                    <Ionicons name="location" size={20} color={isDarkMode ? '#A73DFF' : '#00B8BA'} />
                    <Text style={[styles.inputLabel, isDarkMode && styles.inputLabelDark]}>Dirección</Text>
                  </View>
                  <TextInput
                    style={[
                      styles.input,
                      direccion ? styles.inputTextBlack : null,
                      direccionFocused && (isDarkMode ? styles.inputFocusedDark : styles.inputFocused),
                      isDarkMode && styles.inputDark
                    ]}
                    value={direccion}
                    onChangeText={(text) => setDireccion(text.slice(0, 100))}
                    placeholder="Tu dirección"
                    maxLength={100}
                    placeholderTextColor={isDarkMode ? '#A0A0A0' : '#999'}
                    onFocus={() => setDireccionFocused(true)}
                    onBlur={() => setDireccionFocused(false)}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <View style={styles.labelContainer}>
                    <Ionicons name="card" size={20} color={isDarkMode ? '#A73DFF' : '#00B8BA'} />
                    <Text style={[styles.inputLabel, isDarkMode && styles.inputLabelDark]}>DNI</Text>
                  </View>
                  <TextInput
                    style={[
                      styles.input,
                      dni ? styles.inputTextBlack : null,
                      dniFocused && (isDarkMode ? styles.inputFocusedDark : styles.inputFocused),
                      isDarkMode && styles.inputDark
                    ]}
                    value={dni}
                    onChangeText={(text) => setDni(text.replace(/[^0-9]/g, '').slice(0, 8))}
                    placeholder="Tu DNI"
                    keyboardType="numeric"
                    maxLength={8}
                    placeholderTextColor={isDarkMode ? '#A0A0A0' : '#999'}
                    onFocus={() => setDniFocused(true)}
                    onBlur={() => setDniFocused(false)}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <View style={styles.labelContainer}>
                    <Ionicons name="people-circle" size={20} color={isDarkMode ? '#A73DFF' : '#00B8BA'} />
                    <Text style={[styles.inputLabel, isDarkMode && styles.inputLabelDark]}>Rol</Text>
                  </View>
                  <View style={[
                    styles.input,
                    rolFocused && (isDarkMode ? styles.inputFocusedDark : styles.inputFocused),
                    isDarkMode && styles.inputDark,
                    styles.pickerContainer,
                    { width: '115%', marginLeft: -20 }
                  ]}>
                    <Picker
                      selectedValue={rol}
                      onValueChange={(itemValue) => setRol(itemValue)}
                      style={[
                        styles.picker,
                        isDarkMode && styles.pickerDark,
                        { 
                          outlineStyle: 'none',
                          textAlign: 'left',
                          paddingHorizontal: 15
                        }
                      ]}
                      itemStyle={{ textAlign: 'left' }}
                    >
                      <Picker.Item 
                        label="Seleccione su rol" 
                        value="" 
                        style={{ 
                          textAlign: 'left',
                          color: isDarkMode ? '#A0A0A0' : '#999'
                        }}
                      />
                      <Picker.Item 
                        label="Usuario" 
                        value="usuario" 
                        style={{ textAlign: 'left' }}
                      />
                      <Picker.Item 
                        label="Supervisor" 
                        value="supervisor" 
                        style={{ textAlign: 'left' }}
                      />
                      <Picker.Item 
                        label="Personal" 
                        value="personal" 
                        style={{ textAlign: 'left' }}
                      />
                    </Picker>
                  </View>
                </View>
              </View>

              <TouchableOpacity 
                style={[styles.button, isDarkMode && styles.buttonDark]} 
                onPress={handleRegister}
              >
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
      </View>
    </ScrollView>
  );
};

const RegisterForm = () => {
  return (
    <ThemeProvider>
      <RegisterFormContent />
    </ThemeProvider>
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
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  formContainer: {
    width: '90%',
    maxWidth: 480,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    alignSelf: 'center',
    shadowColor: "#00B8BA",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
    paddingBottom: 30,
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
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 14,
    color: '#333',
    outlineStyle: 'none',
  },
  inputTextBlack: {
    color: isDarkMode => isDarkMode ? '#E6E6FA' : '#333',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    overflow: 'hidden',
  },
  passwordInput: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 15,
    paddingRight: 45,
    fontSize: 14,
    outlineStyle: 'none',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    overflow: 'hidden',
  },
  phonePrefix: {
    paddingLeft: 15,
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
    height: '100%',
    lineHeight: 45,
  },
  phoneInput: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 10,
    fontSize: 14,
    color: '#333',
    outlineStyle: 'none',
  },
  button: {
    width: '99%',
    height: 45,
    backgroundColor: '#00B8BA',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
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
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  mainContent: {
    flex: 1,
    zIndex: 2,
  },
  formContainerDark: {
    backgroundColor: '#1A1625',
    borderColor: '#A73DFF',
    shadowColor: '#A73DFF',
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  titleDark: {
    color: '#E6E6FA',
  },
  subtitleDark: {
    color: '#B8B8D1',
  },
  inputLabelDark: {
    color: '#E6E6FA',
  },
  inputDark: {
    backgroundColor: '#2D2640',
    borderColor: '#4A4460',
    color: '#E6E6FA',
    borderRadius: 12,
  },
  inputFocusedDark: {
    borderColor: '#A73DFF',
    borderWidth: 2,
  },
  passwordContainerDark: {
    backgroundColor: '#2D2640',
    borderColor: '#4A4460',
  },
  phoneInputContainerDark: {
    backgroundColor: '#2D2640',
    borderColor: '#4A4460',
    borderWidth: 1,
  },
  buttonDark: {
    backgroundColor: '#9370DB',
    borderColor: '#7B68EE',
    shadowColor: "#A73DFF",
  },
  phonePrefix: {
    color: isDarkMode => isDarkMode ? '#E6E6FA' : '#333',
  },
  inputTextDark: {
    color: '#E6E6FA',
  },
  pickerContainer: {
    padding: 0,
    justifyContent: 'center',
    borderColor: 'transparent',
    backgroundColor: 'transparent',
    borderRadius: 12,
    overflow: 'hidden',
    width: '100%',
  },
  picker: {
    height: '105%',
    maxHeight: 500,
    color: '#333333',
    width: '100%',
    borderRadius: 11,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    backgroundColor: '#F8F9FA',
    textAlign: 'center',
  },
  pickerDark: {
    color: '#E6E6FA',
    borderColor: '#4A4460',
    backgroundColor: '#2D2640',
  },
});

export default RegisterForm;
