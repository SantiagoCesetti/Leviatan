import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Dimensions, KeyboardAvoidingView, Platform } from "react-native";
import { CheckBox } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getApp } from 'firebase/app';
import Header from "../../components/Header";

const app = getApp();
const db = getFirestore(app);

const SupervFormVerif = () => {
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
      const formularioId = "ID_POR_DEFECTO";
      const docRef = doc(db, "formularios", formularioId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setNombre(data.nombre);
        setApellido(data.apellido);
        setEmail(data.email);
        setTelefono(data.telefono);
        setIsCheckedOrdenado(data.isOrdenado);
        setIsCheckedBarrido(data.isBarrido);
        setIsCheckedTrapeado(data.isTrapeado);
        setIsCheckedDesinfectado(data.isDesinfectado);
        setObservacion(data.observacion);
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

  const handleHomeNavigation = () => {
    navigation.navigate('index');
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
            <Header handleHomeNavigation={handleHomeNavigation} />
      <View style={styles.body}>
        <View style={styles.contenedor}>
          <View style={styles.conText}>
            <Text style={styles.conTitle}>Verificación del aula</Text>
            <Text style={styles.conTitle}>Limpieza del aula número: 1</Text>
            <Text>Limpieza hecha por: {nombre} {apellido}</Text>
          </View>
          <View>
            <CheckBox
              title="Ordenado"
              checked={isCheckedOrdenado}
              onPress={() => setIsCheckedOrdenado(!isCheckedOrdenado)}
            />
            <CheckBox
              title="Barrido"
              checked={isCheckedBarrido}
              onPress={() => setIsCheckedBarrido(!isCheckedBarrido)}
            />
            <CheckBox
              title="Trapeado"
              checked={isCheckedTrapeado}
              onPress={() => setIsCheckedTrapeado(!isCheckedTrapeado)}
            />
            <CheckBox
              title="Desinfectado"
              checked={isCheckedDesinfectado}
              onPress={() => setIsCheckedDesinfectado(!isCheckedDesinfectado)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.observacionText}>Observación</Text>
            <TextInput
              style={styles.input}
              placeholder="Escribir Observación"
              value={observacion}
              onChangeText={(text) => setObservacion(text.slice(0, 512))}
              maxLength={512}
              multiline={true}
            />
          </View>
          <View style={styles.contButton}>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttontext}>Aceptar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonC} onPress={handleDenegar}>
              <Text>Denegar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F3FF',
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  contenedor: {
    backgroundColor: '#FFFFFF',
    borderColor: '#505050',
    borderWidth: 1,
    width: '100%',
    borderRadius: 15,
    padding: 20,
  },
  conText: {
    marginBottom: 10,
  },
  conTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  inputContainer: {
    marginTop: 10,
  },
  observacionText: {
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    height: 60,
    textAlignVertical: 'top',
  },
  contButton: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    borderRadius: 5,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    width: '45%',
    padding: 10,
  },
  buttonC: {
    borderRadius: 5,
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C7C7C7',
    borderWidth: 1,
    padding: 10,
  },
  buttontext: {
    color: '#FFFFFF',
  },
});

export default SupervFormVerif;