import React, { useState, useEffect } from "react";  
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";  
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect, useRoute } from '@react-navigation/native';
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { getApp } from 'firebase/app';
import Header from "../../components/Header";
import Background from '../../components/Background';

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
      <View style={styles.backgroundContainer}>
        <Background />
      </View>
      <View style={styles.mainContent}>
        <Header />
        <View style={styles.body}>  
          <View style={styles.formContainer}>  
            <View style={styles.titleContainer}>
              <Ionicons name="clipboard" size={35} color="#00B8BA" />
              <Text style={styles.title}>Orden de Limpieza</Text>  
            </View>
            <Text style={styles.subtitle}>¡Registra una nueva orden!</Text>  

            <View style={styles.inputContainer}>  
              <Text style={styles.textinput}>👤 Nombre Trabajador</Text>  
              <TextInput  
                style={styles.input}  
                placeholder="¿Quién realizará la limpieza?"  
                value={nombre}  
                onChangeText={setNombre}
                placeholderTextColor="#999"
              />  
            </View>  

            <View style={styles.inputContainer}>  
              <Text style={styles.textinput}>🚪 Número del aula</Text>  
              <TextInput  
                style={styles.input}  
                placeholder="¿Qué aula se limpiará?"  
                value={aula}  
                onChangeText={setAula}
                placeholderTextColor="#999"
              />  
            </View>  

            <TouchableOpacity 
              style={styles.button} 
              onPress={handleSubmit}
              activeOpacity={0.8}
            >  
              <Ionicons name="save" size={22} color="white" style={styles.buttonIcon} />
              <Text style={styles.buttontext}>¡Guardar orden!</Text>  
            </TouchableOpacity>  

            <Text style={styles.recentTitle}>Órdenes recientes ⭐</Text>
            {ordenes.slice(0, 3).map((orden) => (
              <View key={orden.id} style={styles.ordenItem}>
                <View style={styles.ordenInfo}>
                  <View style={styles.ordenIconContainer}>
                    <Ionicons name="person" size={20} color="white" />
                  </View>
                  <Text style={styles.ordenText}>{orden.nombre} - Aula: {orden.aula}</Text>
                </View>
                <View style={styles.ordenActions}>
                  <TouchableOpacity 
                    style={[styles.actionButton, styles.editButton]} 
                    onPress={() => handleUpdate(orden.id)}
                  >
                    <Ionicons name="create" size={20} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.actionButton, styles.deleteButton]} 
                    onPress={() => handleDelete(orden.id)}
                  >
                    <Ionicons name="trash" size={20} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>  
        </View>  
      </View>
    </KeyboardAvoidingView>
  );  
};  

const styles = StyleSheet.create({  
  container: {  
    flex: 1,
    backgroundColor: '#F0F8FF',  
  },  
  header: {  
    backgroundColor: "#00B8BA",  
    height: 90,  
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 30,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },  
  headertext: {  
    fontSize: 28,  
    color: '#fff',  
    marginRight: 20,  
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },  
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
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
    maxWidth: 800,
    padding: 20,
    borderRadius: 15,
    backgroundColor: '#fff',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },  
  title: {  
    fontSize: 28,
    color: '#333',
    fontWeight: 'bold',
  },  
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 25,
    fontStyle: 'italic',
  },
  input: {  
    borderWidth: 2,  
    borderColor: '#E0E0E0',  
    padding: 10,  
    fontSize: 14,  
    color: '#333',
    borderRadius: 10,  
    backgroundColor: '#F8F9FA',
    marginTop: 8,
  },  
  button: {  
    height: 50,  
    width: '99.8%',  
    backgroundColor: '#00B8BA',  
    borderRadius: 10,  
    alignSelf: 'center',
    justifyContent: 'center',  
    marginTop: 20,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },  
  buttontext: {  
    color: '#fff',  
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  recentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
    marginBottom: 15,
  },
  ordenItem: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#F8F9FA',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  ordenInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  ordenIconContainer: {
    backgroundColor: '#00B8BA',
    padding: 8,
    borderRadius: 12,
    marginRight: 12,
  },
  ordenText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  ordenActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 8,
    borderRadius: 10,
    elevation: 2,
  },
  editButton: {
    backgroundColor: '#00B8BA',
  },
  deleteButton: {
    backgroundColor: '#FF6B6B',
  },
  textinput: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
    marginBottom: 5,
  },
  inputContainer: {
    marginBottom: 20,
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
});  

export default SupervisorForm;
