import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { CheckBox } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getApp } from 'firebase/app';

const app = getApp();
const db = getFirestore(app);

const PersonalForm = ({ onAdd }) => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [isOrdenado, setIsOrdenado] = useState(false);
  const [isBarrido, setIsBarrido] = useState(false);
  const [isTrapeado, setIsTrapeado] = useState(false);
  const [isDesinfectado, setIsDesinfectado] = useState(false);
  const [observacion, setObservacion] = useState("");
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
  };

  useFocusEffect(
    React.useCallback(() => {
      resetForm();
    }, [])
  );

  const handleSubmit = async () => {
    const nuevoAdministrador = { 
      nombre, 
      apellido, 
      email, 
      telefono,
      isOrdenado,
      isBarrido,
      isTrapeado,
      isDesinfectado,
      observacion
    };
    
    try {
      const docRef = await addDoc(collection(db, "formularios"), nuevoAdministrador);
      console.log("Documento añadido con ID: ", docRef.id);
      onAdd(nuevoAdministrador);
      resetForm();
      navigation.navigate('Redirect');
    } catch (e) {
      console.error("Error al añadir documento: ", e);
    }
  };

  const handleHomeNavigation = () => {
    navigation.navigate('index');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={handleHomeNavigation} style={styles.homeIcon}>
          <Ionicons name="home-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headertext}>Clean Class</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Limpieza del aula numero: 1</Text>
          <View style={styles.checks}>
            <CheckBox
              title="Ordenado"
              checked={isOrdenado}
              onPress={() => setIsOrdenado(!isOrdenado)}
            />
            <CheckBox
              title="Barrido"
              checked={isBarrido}
              onPress={() => setIsBarrido(!isBarrido)}
            />
            <CheckBox
              title="Trapeado"
              checked={isTrapeado}
              onPress={() => setIsTrapeado(!isTrapeado)}
            />
            <CheckBox
              title="Desinfectado"
              checked={isDesinfectado}
              onPress={() => setIsDesinfectado(!isDesinfectado)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.observacionText}>Observacion</Text>
            <TextInput
              style={styles.input}
              placeholder="Escribir Observacion"
              value={observacion}
              onChangeText={(text) => setObservacion(text.slice(0, 512))}
              maxLength={512}
              multiline={true}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttontext}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F3FF',
  },
  header: {
    backgroundColor: "#00B8BA",
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  homeIcon: {
    padding: 10,
  },
  headertext: {
    fontSize: 25,
    color: '#000000',
    fontWeight: 'bold'
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  formContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    color: '#000000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  checks: {
    marginBottom: 15,
  },
  inputContainer: {
    marginBottom: 20,
  },
  observacionText: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 2,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 14,
    color: '#000000',
    borderRadius: 6,
    height: 100,
    textAlignVertical: 'top',
  },
  button: {  
    height: 40,  
    backgroundColor: '#000',  
    borderRadius: 10,  
    justifyContent: 'center',  
  },  
  buttontext: {  
    color: '#fff',  
    textAlign: 'center',  
  },  
});

export default PersonalForm;
