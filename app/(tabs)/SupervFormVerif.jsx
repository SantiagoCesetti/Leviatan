import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Dimensions, KeyboardAvoidingView, Platform, Alert } from "react-native";
import { CheckBox } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getApp } from 'firebase/app';

import Header from "../../components/Header";
import Background from '../../components/Background';
import Background2 from '../../components/Background2';
import Header2 from '../../components/Header2';
import { ThemeProvider, ThemeContext } from '../../components/ThemeContext';
import ColorMode from '../../components/ColorMode';

const app = getApp();
const db = getFirestore(app);

const SupervFormVerifContent = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  
  const [isCheckedOrdenado, setIsCheckedOrdenado] = useState(false);
  const [isCheckedBarrido, setIsCheckedBarrido] = useState(false);
  const [isCheckedTrapeado, setIsCheckedTrapeado] = useState(false);
  const [isCheckedDesinfectado, setIsCheckedDesinfectado] = useState(false);
  const [observacion, setObservacion] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    const fetchFormulario = async () => {
      try {
        const formularioId = "ID_POR_DEFECTO";
        const docRef = doc(db, "formularios", formularioId);
        const docSnap = await getDoc(docRef);
        
        if (!docSnap.exists()) {
          Alert.alert("Error", "El formulario no existe");
          return;
        }
        
        const data = docSnap.data();
        setNombre(data.nombre || '');
        setApellido(data.apellido || '');
        setEmail(data.email || '');
        setTelefono(data.telefono || '');
        setIsCheckedOrdenado(data.isOrdenado || false);
        setIsCheckedBarrido(data.isBarrido || false);
        setIsCheckedTrapeado(data.isTrapeado || false);
        setIsCheckedDesinfectado(data.isDesinfectado || false);
        setObservacion(data.observacion || '');
        
      } catch (error) {
        console.error("Error al obtener el formulario:", error);
        Alert.alert(
          "Error de Acceso",
          "No tienes permisos para acceder a este formulario. Por favor, verifica tus credenciales."
        );
      }
    };
    fetchFormulario();
  }, []);

  const resetForm = () => {
    setNombre("");
    setApellido("");
    setEmail("");
    setTelefono("");
    setIsCheckedOrdenado(false);
    setIsCheckedBarrido(false);
    setIsCheckedTrapeado(false);
    setIsCheckedDesinfectado(false);
    setObservacion("");
  };

  useFocusEffect(
    React.useCallback(() => {
      resetForm();
    }, [])
  );

  const handleSubmit = async () => {
    try {
      const formularioId = "ID_POR_DEFECTO";
      const docRef = doc(db, "formularios", formularioId);
      await updateDoc(docRef, {
        isCheckedOrdenado,
        isCheckedBarrido,
        isCheckedTrapeado,
        isCheckedDesinfectado,
        observacion,
        verificado: true
      });
      console.log("Documento actualizado con éxito");
      resetForm();
      setTimeout(() => {
        navigation.navigate('redirect');
      }, 500);
    } catch (e) {
      console.error("Error al actualizar documento: ", e);
    }
  };

  const handleDenegar = async () => {
    try {
      const formularioId = "ID_POR_DEFECTO"; 
      const docRef = doc(db, "formularios", formularioId);
      await updateDoc(docRef, {
        verificado: false,
        observacion
      });
      console.log("Documento denegado con éxito");
      setTimeout(() => {
        navigation.navigate('redirect');
      }, 500);
    } catch (e) {
      console.error("Error al denegar documento: ", e);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.backgroundContainer}>
        {isDarkMode ? <Background2 /> : <Background />}
      </View>
      <View style={styles.mainContent}>
        {isDarkMode ? <Header2 /> : <Header />}
        <ColorMode />
        <View style={styles.body}>
          <View style={[styles.formContainer, isDarkMode && styles.formContainerDark]}>
            <View style={styles.titleContainer}>
              <Ionicons name="shield-checkmark" size={35} color={isDarkMode ? '#A73DFF' : '#00B8BA'} />
              <Text style={[styles.title, isDarkMode && styles.titleDark]}>Verificación del Aula</Text>
            </View>
            <Text style={[styles.subtitle, isDarkMode && styles.subtitleDark]}>✨ Aula número:</Text>
            <Text style={[styles.personInfo, isDarkMode && styles.personInfoDark]}>
              👤 Limpieza realizada por: {nombre} {apellido}
            </Text>

            <View style={styles.sectionTitle}>
              <Ionicons name="checkmark-circle" size={24} color={isDarkMode ? '#A73DFF' : '#00B8BA'} />
              <Text style={[styles.sectionText, isDarkMode && styles.sectionTextDark]}>Verificar tareas</Text>
            </View>

            <View style={[styles.checksContainer, isDarkMode && styles.checksContainerDark]}>
              <View style={styles.checkRow}>
                <CheckBox
                  title="🏠 Ordenado"
                  checked={isCheckedOrdenado}
                  onPress={() => setIsCheckedOrdenado(!isCheckedOrdenado)}
                  containerStyle={[styles.checkbox, isDarkMode && styles.checkboxDark]}
                  textStyle={[styles.checkboxText, isDarkMode && styles.checkboxTextDark]}
                  checkedColor={isDarkMode ? '#A73DFF' : '#00B8BA'}
                />
                <CheckBox
                  title="🧹 Barrido"
                  checked={isCheckedBarrido}
                  onPress={() => setIsCheckedBarrido(!isCheckedBarrido)}
                  containerStyle={[styles.checkbox, isDarkMode && styles.checkboxDark]}
                  textStyle={[styles.checkboxText, isDarkMode && styles.checkboxTextDark]}
                  checkedColor={isDarkMode ? '#A73DFF' : '#00B8BA'}
                />
              </View>
              <View style={styles.checkRow}>
                <CheckBox
                  title="🧼 Trapeado"
                  checked={isCheckedTrapeado}
                  onPress={() => setIsCheckedTrapeado(!isCheckedTrapeado)}
                  containerStyle={[styles.checkbox, isDarkMode && styles.checkboxDark]}
                  textStyle={[styles.checkboxText, isDarkMode && styles.checkboxTextDark]}
                  checkedColor={isDarkMode ? '#A73DFF' : '#00B8BA'}
                />
                <CheckBox
                  title="🧴 Desinfectado"
                  checked={isCheckedDesinfectado}
                  onPress={() => setIsCheckedDesinfectado(!isCheckedDesinfectado)}
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
                placeholder="✍️ Escribe tus observaciones aquí..."
                value={observacion}
                onChangeText={(text) => setObservacion(text.slice(0, 512))}
                maxLength={512}
                multiline={true}
                placeholderTextColor={isDarkMode ? '#A0A0A0' : '#999'}
              />
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={[styles.acceptButton, isDarkMode && styles.acceptButtonDark]} 
                onPress={handleSubmit}
              >
                <Ionicons name="checkmark-circle" size={22} color="white" />
                <Text style={styles.buttonText}>Aprobar</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.rejectButton, isDarkMode && styles.rejectButtonDark]} 
                onPress={handleDenegar}
              >
                <Ionicons name="close-circle" size={22} color="white" />
                <Text style={styles.buttonText}>Denegar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const SupervFormVerif = () => {
  return (
    <ThemeProvider>
      <SupervFormVerifContent />
    </ThemeProvider>
  );
};

const windowHeight = Dimensions.get('window').height;

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
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
    fontWeight: '500',
  },
  personInfo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  acceptButton: {
    flex: 1,
    height: 45,
    backgroundColor: '#00B8BA',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
  rejectButton: {
    flex: 1,
    height: 45,
    backgroundColor: '#3290B5',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    shadowColor: "#3290B5",
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

  personInfoDark: {
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

  acceptButtonDark: {
    backgroundColor: '#9370DB',
    borderColor: '#7B68EE',
    shadowColor: '#A73DFF',
  },

  rejectButtonDark: {
    backgroundColor: '#8A2BE2',
    borderColor: '#9400D3',
    shadowColor: '#A73DFF',
  },
});

export default SupervFormVerif;