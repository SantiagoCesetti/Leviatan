import React, { useState, useEffect } from "react";  
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";  
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect, useRoute } from '@react-navigation/native';
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { getApp } from 'firebase/app';

const app = getApp();
const db = getFirestore(app);

const SupervisorForm = () => {  
  const [nombre, setNombre] = useState("");  
  const [aula, setAula] = useState("");  
  const [ordenes, setOrdenes] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();

  const resetForm = () => {
    setNombre("");
    setAula("");
  };

  useFocusEffect(
    React.useCallback(() => {
      resetForm();
      fetchOrdenes();
    }, [])
  );

  const fetchOrdenes = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "ordenes"));
      const ordenesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrdenes(ordenesData);
    } catch (error) {
      console.error("Error al obtener las órdenes:", error);
    }
  };

  const handleSubmit = async () => {  
    try {
      const docRef = await addDoc(collection(db, "ordenes"), { nombre, aula });
      console.log("Orden añadida con ID: ", docRef.id);
      resetForm();
      fetchOrdenes();
    } catch (error) {
      console.error("Error al añadir la orden:", error);
    }
  };  

  const handleUpdate = async (id) => {
    try {
      await updateDoc(doc(db, "ordenes", id), { nombre, aula });
      console.log("Orden actualizada con ID: ", id);
      resetForm();
      fetchOrdenes();
    } catch (error) {
      console.error("Error al actualizar la orden:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "ordenes", id));
      console.log("Orden eliminada con ID: ", id);
      fetchOrdenes();
    } catch (error) {
      console.error("Error al eliminar la orden:", error);
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
          <Text style={styles.title}>Orden de Limpieza</Text>  
          <Text style={styles.subtitle}>Ingresa los Datos del trabajador y el número del aula</Text>  

          <View style={styles.inputContainer}>  
            <Text style={styles.textinput}>Nombre Trabajador</Text>  
            <TextInput  
              style={styles.input}  
              placeholder="Ingresa el nombre del trabajador"  
              value={nombre}  
              onChangeText={setNombre}  
            />  
          </View>  

          <View style={styles.inputContainer}>  
            <Text style={styles.textinput}>Número del aula</Text>  
            <TextInput  
              style={styles.input}  
              placeholder="Ingresa el número del aula"  
              value={aula}  
              onChangeText={setAula}  
            />  
          </View>  

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>  
            <Text style={styles.buttontext}>Guardar</Text>  
          </TouchableOpacity>  

          {ordenes.slice(0, 3).map((orden) => (
            <View key={orden.id} style={styles.ordenItem}>
              <Text>{orden.nombre} - Aula: {orden.aula}</Text>
              <TouchableOpacity onPress={() => handleUpdate(orden.id)}>
                <Text>Actualizar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(orden.id)}>
                <Text>Eliminar</Text>
              </TouchableOpacity>
            </View>
          ))}
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
  inputContainer: {  
    marginTop: 20,  
  },  
  input: {  
    borderWidth: 1,  
    borderColor: '#ddd',  
    padding: 10,  
    fontSize: 15,  
    color: 'gray',
    borderRadius: 6,  
  },  
 
  header: {  
    backgroundColor: "#00B8BA",  
    height: 80,  
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
    color: '#000',  
    marginRight: 20,  
    fontWeight: 'bold',  
  },  
  body: {  
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },  
  formContainer: {  
    width: '100%',
    padding: 20,  
    borderRadius: 25,  
    backgroundColor: '#fff',  
  },  
  title: {  
    fontSize: 30,  
    marginBottom: 10,
    color: '#000',  
    fontWeight: 'bold',  
  },  
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  button: {  
    height: 40,  
    width: '80%',  
    backgroundColor: '#000',  
    borderRadius: 10,  
    alignSelf: 'center',
    justifyContent: 'center',  
    marginTop: 20,
  },  
  buttontext: {  
    color: '#fff',  
    textAlign: 'center',  
  },  
  textinput:{
    fontSize:16,
  },
  ordenItem: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
});  

export default SupervisorForm;
