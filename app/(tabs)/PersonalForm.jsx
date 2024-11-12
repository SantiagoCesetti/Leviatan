import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { CheckBox } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { getFirestore, collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { getApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import Header from "../../components/Header";
import Background from '../../components/Background';
import Background2 from '../../components/Background2';
import Header2 from '../../components/Header2';
import { ThemeProvider, ThemeContext } from '../../components/ThemeContext';
import ColorMode from '../../components/ColorMode';

const app = getApp();
const db = getFirestore(app);
const storage = getStorage(app);

const PersonalFormContent = ({ onAdd }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [isOrdenado, setIsOrdenado] = useState(false);
  const [isBarrido, setIsBarrido] = useState(false);
  const [isTrapeado, setIsTrapeado] = useState(false);
  const [isDesinfectado, setIsDesinfectado] = useState(false);
  const [observacion, setObservacion] = useState("");
  const [imagen, setImagen] = useState(null);
  const navigation = useNavigation();

  const resetForm = () => {
    setNombre("");
    setApellido("");
    setEmail("");
    setTelefono("");
    setIsOrdenado(false);
    setIsBarrido(false);
    setIsTrapeado(false);
    setIsDesinfectado(false);
    setObservacion("");
    setImagen(null);
  };

  useFocusEffect(
    React.useCallback(() => {
      resetForm();
    }, [])
  );

  const handleImageUpload = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const storageRef = ref(storage, `imagenes/${Date.now()}`);
    
    try {
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error("Error al subir la imagen: ", error);
      return null;
    }
  };

  const handleSubmit = async () => {
    let imageUrl = null;
    if (imagen) {
      imageUrl = await handleImageUpload(imagen);
    }

    const nuevoFormulario = { 
      nombre, 
      apellido, 
      email, 
      telefono,
      isOrdenado,
      isBarrido,
      isTrapeado,
      isDesinfectado,
      observacion,
      imagen: imageUrl,
      fechaCreacion: new Date()
    };
    
    try {
      const formularioId = "fYA738nPz7Ubrz7whabd";
      const docRef = doc(db, "formularios", formularioId);
      await setDoc(docRef, nuevoFormulario);
      console.log("Formulario añadido con ID: ", formularioId);
      onAdd(nuevoFormulario);
      resetForm();
      navigation.navigate('redirect');
    } catch (e) {
      console.error("Error al añadir formulario: ", e);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}>
      <View style={styles.backgroundContainer}>
        {isDarkMode ? <Background2 /> : <Background />}
      </View>
      <View style={styles.mainContent}>
        {isDarkMode ? <Header2 handleHomeNavigation={null} /> : <Header handleHomeNavigation={null} />}
        <ColorMode />
        <View style={styles.body}>
          <View style={[styles.formContainer, isDarkMode && styles.formContainerDark]}>
            <View style={styles.titleContainer}>
              <Ionicons name="school" size={35} color={isDarkMode ? '#A73DFF' : '#00B8BA'} />
              <Text style={[styles.title, isDarkMode && styles.titleDark]}>Aula</Text>
            </View>
            <Text style={[styles.subtitle, isDarkMode && styles.subtitleDark]}>✨ Registro de limpieza</Text>

            <View style={styles.sectionTitle}>
              <Ionicons name="checkmark-circle" size={24} color={isDarkMode ? '#A73DFF' : '#00B8BA'} />
              <Text style={[styles.sectionText, isDarkMode && styles.sectionTextDark]}>Tareas realizadas</Text>
            </View>

            <View style={[styles.checksContainer, isDarkMode && styles.checksContainerDark]}>
              <View style={styles.checkRow}>
                <CheckBox
                  title="🏠 Ordenado"
                  checked={isOrdenado}
                  onPress={() => setIsOrdenado(!isOrdenado)}
                  containerStyle={[styles.checkbox, isDarkMode && styles.checkboxDark]}
                  textStyle={[styles.checkboxText, isDarkMode && styles.checkboxTextDark]}
                  checkedColor={isDarkMode ? '#A73DFF' : '#00B8BA'}
                />
                <CheckBox
                  title="🧹 Barrido"
                  checked={isBarrido}
                  onPress={() => setIsBarrido(!isBarrido)}
                  containerStyle={[styles.checkbox, isDarkMode && styles.checkboxDark]}
                  textStyle={[styles.checkboxText, isDarkMode && styles.checkboxTextDark]}
                  checkedColor={isDarkMode ? '#A73DFF' : '#00B8BA'}
                />
              </View>
              <View style={styles.checkRow}>
                <CheckBox
                  title="🧼 Trapeado"
                  checked={isTrapeado}
                  onPress={() => setIsTrapeado(!isTrapeado)}
                  containerStyle={[styles.checkbox, isDarkMode && styles.checkboxDark]}
                  textStyle={[styles.checkboxText, isDarkMode && styles.checkboxTextDark]}
                  checkedColor={isDarkMode ? '#A73DFF' : '#00B8BA'}
                />
                <CheckBox
                  title="🧴 Desinfectado"
                  checked={isDesinfectado}
                  onPress={() => setIsDesinfectado(!isDesinfectado)}
                  containerStyle={[styles.checkbox, isDarkMode && styles.checkboxDark]}
                  textStyle={[styles.checkboxText, isDarkMode && styles.checkboxTextDark]}
                  checkedColor={isDarkMode ? '#A73DFF' : '#00B8BA'}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.sectionTitle}>
                <Ionicons name="chatbubble-ellipses" size={24} color={isDarkMode ? '#A73DFF' : '#00B8BA'} />
                <Text style={[styles.sectionText, isDarkMode && styles.sectionTextDark]}>Observaciones</Text>
              </View>
              <TextInput
                style={[styles.input, isDarkMode && styles.inputDark]}
                placeholder="✍️ Describe el estado del aula..."
                value={observacion}
                onChangeText={(text) => setObservacion(text.slice(0, 512))}
                maxLength={512}
                multiline={true}
                placeholderTextColor={isDarkMode ? '#A0A0A0' : '#999'}
              />
            </View>

            <TouchableOpacity 
              style={[styles.button, isDarkMode && styles.buttonDark]} 
              onPress={handleSubmit}
            >
              <Ionicons name="save" size={22} color="white" style={styles.buttonIcon} />
              <Text style={styles.buttonText}>¡Guardar registro!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const PersonalForm = ({ onAdd }) => {
  return (
    <ThemeProvider>
      <PersonalFormContent onAdd={onAdd} />
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F8FF',
  },
  body: {
    flex: 1,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: 100,
  },
  formContainer: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: "#00B8BA",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  title: {
    fontSize: 24,
    color: '#333',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  sectionTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 6,
  },
  sectionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
  },
  checksContainer: {
    marginBottom: 20,
    backgroundColor: '#F8F9FA',
    padding: 12,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  checkRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  checkbox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 6,
    margin: 0,
    width: '48%',
  },
  checkboxText: {
    fontWeight: '500',
    fontSize: 14,
    color: '#444',
  },
  inputContainer: {
    marginBottom: 20,
  },
  observacionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  input: {
    borderWidth: 2,
    borderColor: '#E0E0E0',
    padding: 12,
    fontSize: 14,
    color: '#333',
    borderRadius: 12,
    height: 100,
    textAlignVertical: 'top',
    backgroundColor: '#F8F9FA',
  },
  button: {
    height: 45,
    backgroundColor: '#00B8BA',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
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
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 8,
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

  sectionTextDark: {
    color: '#E6E6FA',
  },

  checksContainerDark: {
    backgroundColor: '#2D2640',
    borderColor: '#4A4460',
  },

  checkboxDark: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },

  checkboxTextDark: {
    color: '#E6E6FA',
  },

  inputDark: {
    backgroundColor: '#2D2640',
    borderColor: '#4A4460',
    color: '#E6E6FA',
  },

  buttonDark: {
    backgroundColor: '#9370DB',
    borderColor: '#7B68EE',
    shadowColor: '#A73DFF',
  },
});

export default PersonalForm;
