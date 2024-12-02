import React, { useState, useEffect, useContext } from 'react';  
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';  
import { useLocalSearchParams } from 'expo-router';  
import { getFirestore, doc, getDoc } from 'firebase/firestore';  
import { ThemeProvider, ThemeContext } from '../../components/ThemeContext';  
import Header from "../../components/Header"; // Asegúrate de que la ruta sea correcta  
import Header2 from '../../components/Header2'; // El segundo componente de encabezado, si corresponde  

const PersonalForm = () => {  
  const { ordenId } = useLocalSearchParams(); // Recibe el ordenId desde la navegación.  
  const { isDarkMode } = useContext(ThemeContext);  
  const [orderDetails, setOrderDetails] = useState(null); // Estado para almacenar los detalles de la orden.  
  const [loading, setLoading] = useState(true); // Estado para manejar la carga.  
  const [error, setError] = useState(null); // Estado para manejar errores.  

  useEffect(() => {  
    const fetchOrderDetails = async () => {  
      try {  
        const db = getFirestore();  
        const docRef = doc(db, 'Verificacion', ordenId); // Consultamos el documento en Firestore usando ordenId.  
        const docSnap = await getDoc(docRef);  

        if (docSnap.exists()) {  
          setOrderDetails(docSnap.data()); // Guardamos los datos en el estado.  
        } else {  
          setError('No se encontró información para la orden seleccionada.');  
        }  
      } catch (err) {  
        setError('Error al cargar los datos: ' + err.message);  
      } finally {  
        setLoading(false);  
      }  
    };  

    if (ordenId) fetchOrderDetails();  
  }, [ordenId]);  

  // Muestra un indicador de carga mientras se obtienen los datos.  
  if (loading) {  
    return <Text style={styles.loadingText}>Cargando información...</Text>;  
  }  

  // Muestra un mensaje de error si la consulta falla.  
  if (error) {  
    return <Text style={styles.errorText}>{error}</Text>;  
  }  

  // Renderiza los datos una vez que están disponibles.  
  return (  
    <View style={styles.container}>  
      <View style={styles.headerContainer}>  
        {isDarkMode ? <Header2 /> : <Header />} {/* Encabezado según el modo oscuro */}  
      </View>  
      <ScrollView contentContainerStyle={[styles.scrollContent, isDarkMode && styles.containerDark]}>  
        <Text style={[styles.title, isDarkMode && styles.titleDark]}>  
          Información Completa de la Orden  
        </Text>  

        <View style={[styles.detailsContainer, isDarkMode && styles.detailsContainerDark]}>  
          <Text style={[styles.label, isDarkMode && styles.labelDark]}>ID de Orden:</Text>  
          <Text style={[styles.value, isDarkMode && styles.valueDark]}>{ordenId}</Text>  

          <Text style={[styles.label, isDarkMode && styles.labelDark]}>Nombre:</Text>  
          <Text style={[styles.value, isDarkMode && styles.valueDark]}>  
            {orderDetails?.nombre || 'No disponible'}  
          </Text>  

          <Text style={[styles.label, isDarkMode && styles.labelDark]}>Aula:</Text>  
          <Text style={[styles.value, isDarkMode && styles.valueDark]}>  
            {orderDetails?.aula || 'No disponible'}  
          </Text>  

          <Text style={[styles.label, isDarkMode && styles.labelDark]}>Valoración:</Text>  
          <Text style={[styles.value, isDarkMode && styles.valueDark]}>  
            {orderDetails?.rating || 'No disponible'} / 5  
          </Text>  

          <Text style={[styles.label, isDarkMode && styles.labelDark]}>Tareas realizadas:</Text>  
          {orderDetails?.tareas ? (  
            <View>  
              <Text  
                style={[  
                  styles.task,  
                  orderDetails.tareas.ordenado ? styles.taskCompleted : styles.taskPending,  
                ]}  
              >  
                🏠 Ordenado: {orderDetails.tareas.ordenado ? '✔ Realizado' : '❌ Pendiente'}  
              </Text>  
              <Text  
                style={[  
                  styles.task,  
                  orderDetails.tareas.barrido ? styles.taskCompleted : styles.taskPending,  
                ]}  
              >  
                🧹 Barrido: {orderDetails.tareas.barrido ? '✔ Realizado' : '❌ Pendiente'}  
              </Text>  
              <Text  
                style={[  
                  styles.task,  
                  orderDetails.tareas.trapeado ? styles.taskCompleted : styles.taskPending,  
                ]}  
              >  
                🧼 Trapeado: {orderDetails.tareas.trapeado ? '✔ Realizado' : '❌ Pendiente'}  
              </Text>  
              <Text  
                style={[  
                  styles.task,  
                  orderDetails.tareas.desinfectado ? styles.taskCompleted : styles.taskPending,  
                ]}  
              >  
                🧴 Desinfectado: {orderDetails.tareas.desinfectado ? '✔ Realizado' : '❌ Pendiente'}  
              </Text>  
            </View>  
          ) : (  
            <Text style={[styles.value, isDarkMode && styles.valueDark]}>No disponible</Text>  
          )}  
        </View>  
      </ScrollView>  
    </View>  
  );  
};  

const PersonalFormScreen = () => {  
  return (  
    <ThemeProvider>  
      <PersonalForm />  
    </ThemeProvider>  
  );  
};  

const styles = StyleSheet.create({  
  container: {  
    flex: 1,  
    backgroundColor: '#F0F8FF',  
  },  
  headerContainer: {  
    position: 'absolute', // Fija el encabezado en la parte superior  
    top: 0,  
    left: 0,  
    right: 0,  
    zIndex: 100, // Para asegurarse de que el encabezado esté sobre otros elementos  
  },  
  scrollContent: {  
    padding: 20,  
    marginTop: 80, // Ajusta este margen para que no cubra el encabezado  
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
  task: {  
    fontSize: 16,  
    marginVertical: 4,  
  },  
  taskCompleted: {  
    color: 'green',  
  },  
  taskPending: {  
    color: 'red',  
  },  
  loadingText: {  
    fontSize: 18,  
    color: '#666',  
    textAlign: 'center',  
    marginTop: 20,  
  },  
  errorText: {  
    fontSize: 18,  
    color: 'red',  
    textAlign: 'center',  
    marginTop: 20,  
  },  
});  

export default PersonalFormScreen;