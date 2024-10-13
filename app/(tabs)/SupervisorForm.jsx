import React, { useState, useEffect } from "react";  
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from "react-native";  
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
    <ScrollView style={styles.container}>
  
      <View style={styles.header}>  
        <TouchableOpacity onPress={handleHomeNavigation} style={styles.homeIcon}>
          <Ionicons name="home-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headertext}>Clean Class</Text>  
      </View>  
      <View style={styles.container1}>  
        <View style={styles.body}>  
          <View style={styles.container2}>  
            <Text style={styles.tittle}>Orden de Limpieza</Text>  
            <Text>Ingresa los Datos del trabajador y el número del aula</Text>  

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

            {ordenes.map((orden) => (
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
      </View>  
   
    </ScrollView>
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
  container1: {  
    backgroundColor: '#E6F3FF',  
    flex: 1,  
    
  },  
  container2: {  
    flex: 1,  
    borderWidth: 0.5,  
    padding: 20,  
    borderRadius: 25,  
    backgroundColor: '#fff',  
    marginBottom:500
  },  
  body: {  
    paddingTop: 100,  
    padding: 30, 
    height:1000, 
  },  
  tittle: {  
    fontSize: 30,  
    marginTop: 30,  
    color: '#000',  
    fontWeight: 'bold',  
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
