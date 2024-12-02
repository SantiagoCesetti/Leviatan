import React, { useState, useContext } from 'react';  
import { View, Text, StyleSheet, TouchableOpacity, Button, Alert, ScrollView } from 'react-native';  
import { useLocalSearchParams } from 'expo-router';  
import { ThemeProvider, ThemeContext } from '../../components/ThemeContext';  
import { CheckBox } from 'react-native-elements';  
import { getFirestore, collection, addDoc } from 'firebase/firestore';   
import { getApp } from 'firebase/app';  
import Header from "../../components/Header"; // Importar Header  
import Header2 from '../../components/Header2'; // Importar Header2  

const Rating = ({ rating, setRating }) => {  
  return (  
    <View style={styles.ratingContainer}>  
      {[1, 2, 3, 4, 5].map((star) => (  
        <TouchableOpacity key={star} onPress={() => setRating(star)}>  
          <Text style={star <= rating ? styles.starSelected : styles.star}>  
            ★  
          </Text>  
        </TouchableOpacity>  
      ))}  
      <Text style={styles.ratingText}>Valoración: {rating} / 5</Text>  
    </View>  
  );  
};  

const SupervFormVerif = () => {  
  const { isDarkMode } = useContext(ThemeContext);  
  const { ordenId, nombre, aula } = useLocalSearchParams();  
  const [rating, setRating] = useState(0);  
  const [isOrdenado, setIsOrdenado] = useState(false);  
  const [isBarrido, setIsBarrido] = useState(false);  
  const [isTrapeado, setIsTrapeado] = useState(false);  
  const [isDesinfectado, setIsDesinfectado] = useState(false);  

  // Inicialización de Firestore  
  const app = getApp();  
  const db = getFirestore(app);  

  // Función para enviar los datos a Firestore  
  const handleSubmit = async () => {  
    const verificacionData = {  
      ordenId,  
      nombre,  
      aula,  
      rating,  
      tareas: {  
        ordenado: isOrdenado,  
        barrido: isBarrido,  
        trapeado: isTrapeado,  
        desinfectado: isDesinfectado,  
      },  
      createdAt: new Date(), // Añadir timestamp  
    };  

    try {  
      await addDoc(collection(db, 'Verificacion'), verificacionData);  
      Alert.alert("Éxito", "Los datos se han guardado correctamente.");  
    } catch (error) {  
      console.error("Error al guardar los datos: ", error);  
      Alert.alert("Error", "No se pudieron guardar los datos.");  
    }  
  };  

  return (  
    <View style={[styles.container, isDarkMode && styles.containerDark]}>  
      <View style={styles.headerContainer}>  
        {isDarkMode ? <Header2 /> : <Header />} {/* Encabezado según el modo oscuro */}  
      </View>  
      <ScrollView style={styles.scrollContainer}>  
        <Text style={[styles.title, isDarkMode && styles.titleDark]}>Detalles de la Orden</Text>  
        <View style={[styles.detailsContainer, isDarkMode && styles.detailsContainerDark]}>  
          <Text style={[styles.label, isDarkMode && styles.labelDark]}>ID de Orden:</Text>  
          <Text style={[styles.value, isDarkMode && styles.valueDark]}>{ordenId}</Text>  
          
          <Text style={[styles.label, isDarkMode && styles.labelDark]}>Nombre:</Text>  
          <Text style={[styles.value, isDarkMode && styles.valueDark]}>{nombre}</Text>  
          
          <Text style={[styles.label, isDarkMode && styles.labelDark]}>Aula:</Text>  
          <Text style={[styles.value, isDarkMode && styles.valueDark]}>{aula}</Text>  
        </View>  
        <Text style={[styles.subTitle, isDarkMode && styles.subTitleDark]}>Valoración</Text>  
        <Rating rating={rating} setRating={setRating} />  

        <Text style={[styles.subTitle, isDarkMode && styles.subTitleDark]}>Tareas Realizadas</Text>  
        <View style={styles.checksContainer}>  
          <CheckBox  
            title="🏠 Ordenado"  
            checked={isOrdenado}  
            onPress={() => setIsOrdenado(!isOrdenado)}  
            containerStyle={styles.checkbox}  
            textStyle={styles.checkboxText}  
            checkedColor={isDarkMode ? '#A73DFF' : '#00B8BA'}  
          />  
          <CheckBox  
            title="🧹 Barrido"  
            checked={isBarrido}  
            onPress={() => setIsBarrido(!isBarrido)}  
            containerStyle={styles.checkbox}  
            textStyle={styles.checkboxText}  
            checkedColor={isDarkMode ? '#A73DFF' : '#00B8BA'}  
          />  
          <CheckBox  
            title="🧼 Trapeado"  
            checked={isTrapeado}  
            onPress={() => setIsTrapeado(!isTrapeado)}  
            containerStyle={styles.checkbox}  
            textStyle={styles.checkboxText}  
            checkedColor={isDarkMode ? '#A73DFF' : '#00B8BA'}  
          />  
          <CheckBox  
            title="🧴 Desinfectado"  
            checked={isDesinfectado}  
            onPress={() => setIsDesinfectado(!isDesinfectado)}  
            containerStyle={styles.checkbox}  
            textStyle={styles.checkboxText}  
            checkedColor={isDarkMode ? '#A73DFF' : '#00B8BA'}  
          />  
        </View>  

        {/* Botón para enviar los datos */}  
        <Button   
          title="Enviar Verificación"   
          onPress={handleSubmit}   
          color={isDarkMode ? '#A73DFF' : '#00B8BA'} // Cambia el color basado en el tema  
        />  
      </ScrollView>  
    </View>  
  );  
};  

const SupervFormVerifScreen = () => {  
  return (  
    <ThemeProvider>  
      <SupervFormVerif />  
    </ThemeProvider>  
  );  
};  

const styles = StyleSheet.create({  
  container: {  
    flex: 1,  
    backgroundColor: '#F0F8FF',  
  },  
  headerContainer: {  
    position: 'absolute',   // Fija el encabezado en la parte superior  
    top: 0,   
    left: 0,   
    right: 0,  
    zIndex: 100, // Para asegurarse que esté por encima de otros elementos  
  },  
  scrollContainer: {  
    marginTop: 80, // Ajusta este margen para que no cubra el encabezado  
    padding: 20,  
  },  
  containerDark: {  
    backgroundColor: '#1A1625',  
  },  
  title: {  
    fontSize: 24,  
    fontWeight: 'bold',  
    marginBottom: 20,  
    color: '#333',  
  },  
  titleDark: {  
    color: '#E6E6FA',  
  },  
  detailsContainer: {  
    width: '100%',  
    backgroundColor: '#fff',  
    borderRadius: 10,  
    padding: 20,  
    shadowColor: '#00B8BA',  
    shadowOffset: { width: 0, height: 2 },  
    shadowOpacity: 0.1,  
    shadowRadius: 8,  
    elevation: 5,  
  },  
  detailsContainerDark: {  
    backgroundColor: '#2D2640',  
  },  
  label: {  
    fontSize: 16,  
    fontWeight: 'bold',  
    color: '#666',  
    marginTop: 10,  
  },  
  labelDark: {  
    color: '#B8B8D1',  
  },  
  value: {  
    fontSize: 18,  
    color: '#333',  
    marginBottom: 10,  
  },  
  valueDark: {  
    color: '#E6E6FA',  
  },  
  ratingContainer: {  
    flexDirection: 'row',  
    alignItems: 'center',  
    marginTop: 15,  
  },  
  star: {  
    fontSize: 30,  
    color: '#ddd',  
    marginHorizontal: 5,  
  },  
  starSelected: {  
    fontSize: 30,  
    color: '#FFD700',  
    marginHorizontal: 5,  
  },  
  ratingText: {  
    fontSize: 16,  
    marginLeft: 10,  
    color: '#333',  
  },  
  subTitle: {  
    fontSize: 20,  
    fontWeight: 'bold',  
    color: '#333',  
    marginVertical: 10,  
  },  
  subTitleDark: {  
    color: '#E6E6FA',  
  },  
  checksContainer: {  
    width: '100%',  
    marginVertical: 15,  
  },  
  checkbox: {  
    backgroundColor: 'transparent',  
    borderWidth: 0,  
    padding: 6,  
    margin: 0,  
  },  
  checkboxText: {  
    fontSize: 16,  
    fontWeight: 'normal',  
    color: '#444',  
  },  
});  

export default SupervFormVerifScreen;