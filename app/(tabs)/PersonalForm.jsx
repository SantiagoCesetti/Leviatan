import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { CheckBox } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

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

  const handleSubmit = () => {
    const nuevoAdministrador = { nombre, apellido, email, telefono };
    onAdd(nuevoAdministrador);
    resetForm();
  };

  const handleHomeNavigation = () => {
    navigation.navigate('index');
  };

  const handleRedirect = () => {
    navigation.navigate('redirect');
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleHomeNavigation} style={styles.homeIcon}>
          <Ionicons name="home-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headertext}>Clean Class</Text>
      </View>
      <View style={styles.container1}>
        <View style={styles.body}>
          <View style={styles.container2}>
            <View>
              <Text style={styles.tittle}>Limpieza del aula numero: 1</Text>
              </View>
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
              <View style={styles.inputContainer}>
              <Text style={styles.observacionText}>Observacion</Text>
              <TextInput
                style={styles.input}
                placeholder="Escribir Observacion"
                value={observacion}
                onChangeText={setObservacion}
              />
              </View>
              </View>
              
            <TouchableOpacity style={styles.button} onPress={handleRedirect}>
              <Text style={styles.buttontext}>Enviar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  inputContainer: {
    marginTop:15,
    marginLeft:10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 14,
    color: 'gray',
    borderRadius: 6,
  },
  header: {
    backgroundColor: "#00B8BA",
    height: 80,
    width: 'auto',
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
    color: '#0000000',
    marginRight:20,
    fontWeight: 'bold'
  },
  container1: {
    backgroundColor: '#E6F3FF',
    height: 1000,
  },
  container2: {
    height: 520,
    borderWidth: 0.5,
    padding: 20,
    borderRadius: 25,
    backgroundColor: '#fff',
   
  },
  body: {
    paddingTop: 90,
    padding: 30,
  },
  tittle: {
    fontSize: 22,
    marginBottom: 30,
    color:'#000000',
    fontWeight: 'bold'
    
  },
  button: {  
    height: 40,  
    width: '80%',  
    backgroundColor: '#000',  
    borderRadius: 10,  
    alignSelf: 'center',
    justifyContent: 'center',  
    
  },  
  buttontext: {  
    color: '#fff',  
    textAlign: 'center',  
    
  },  
  checks:{
    marginTop:30,
   marginBottom:20, 
  },
  observacionText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default PersonalForm;