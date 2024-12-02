import React, { useContext, useEffect, useState } from 'react';  
import { View, Text, ScrollView, StyleSheet, Button, Picker } from 'react-native';  
import { useRouter } from 'expo-router';  
import { ThemeProvider, ThemeContext } from '../../components/ThemeContext';  
import ColorMode from '../../components/ColorMode';  
import Header from '../../components/Header';  
import Header2 from '../../components/Header2';  
import Background from '../../components/Background';  
import Background2 from '../../components/Background2';  
import { db } from '../credenciales';  
import { collection, getDocs } from 'firebase/firestore';  

const UserShowDataContent = ({ route }) => {  
  const { isDarkMode } = useContext(ThemeContext);  
  const [selectedOrderId, setSelectedOrderId] = useState(undefined);  
  const [selectedOrderDetails, setSelectedOrderDetails] = useState({});  
  const [orders, setOrders] = useState([]);  
  const [error, setError] = useState(null);  
  const router = useRouter();  

  useEffect(() => {  
    const fetchOrders = async () => {  
      try {  
        const ordersCollection = collection(db, 'Verificacion');  
        const querySnapshot = await getDocs(ordersCollection);  
        const ordersData = querySnapshot.docs.map(doc => ({  
          label: `${doc.data().nombre} - Aula: ${doc.data().aula}`,  
          value: doc.id,  
          details: doc.data() 
        }));  
        setOrders(ordersData);  
      } catch (err) {  
        setError('Error al obtener órdenes: ' + err.message);  
        console.error(err);  
      }  
    };  

    fetchOrders();  
  }, []);  

  const handleOrderSelection = (value) => {  
    const order = orders.find(order => order.value === value);  
    setSelectedOrderId(value);  
    setSelectedOrderDetails(order.details); 
  };  

  const goToRatingScreen = () => {  
    router.push({  
      pathname: 'PersonalForm',  
      params: {  
        ordenId: selectedOrderId,  
        nombre: selectedOrderDetails.nombre, 
        aula: selectedOrderDetails.aula, 
      }  
    });  
  };

  return (  
    <View style={styles.container}>  
      <View style={styles.backgroundContainer}>  
        {isDarkMode ? <Background2 /> : <Background />}  
      </View>  
      <View style={styles.mainContent}>  
        {isDarkMode ? <Header2 /> : <Header />}  
        <ColorMode />  
        <ScrollView style={styles.scrollView}>  
          <View style={styles.formContainer}>  
            <Text style={[styles.title, isDarkMode && styles.titleDark]}>  
              ✦ Detalles de las Órdenes ✦  
            </Text>  

            {error && <Text style={styles.errorText}>{error}</Text>}  

            <Text style={[styles.subtitle, isDarkMode && styles.subtitleDark]}>  
              Selecciona una orden de limpieza:  
            </Text>  

            <Picker  
              selectedValue={selectedOrderId}  
              onValueChange={(itemValue) => handleOrderSelection(itemValue)}  
              style={isDarkMode ? styles.pickerDark : styles.picker}  
            >  
              {orders.map(order => (  
                <Picker.Item key={order.value} label={order.label} value={order.value} />  
              ))}  
            </Picker>  

            {selectedOrderId && (  
              <>  
                <View style={[styles.selectedOrderContainer, isDarkMode && styles.selectedOrderContainerDark]}>  
                  <Text style={[styles.selectedOrderText, isDarkMode && styles.selectedOrderTextDark]}>  
                    Orden seleccionada: {selectedOrderId}  
                  </Text>  
                </View>  
                <Button title="Ir a Valoración" onPress={goToRatingScreen} />  
              </>  
            )}  
          </View>  
        </ScrollView>  
      </View>  
    </View>  
  );  
};  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F8FF',
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
  scrollView: {
    flex: 1,
    zIndex: 2,
  },
  formContainer: {
    padding: 20,
    borderRadius: 15,
    backgroundColor: '#fff',
    shadowColor: "#00B8BA",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    color: '#333',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginVertical: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
  selectedOrderContainer: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#00B8BA',
    borderRadius: 8,
  },
  selectedOrderText: {
    fontSize: 16,
    color: '#333',
  },
  selectedOrderContainerDark: {
    borderColor: '#A73DFF',
  },
  selectedOrderTextDark: {
    color: '#E6E6FA',
  },
});

const UserShowData = ({ route }) => {
  return (
    <ThemeProvider>
      <UserShowDataContent route={route} />
    </ThemeProvider>
  );
};

export default UserShowData;

