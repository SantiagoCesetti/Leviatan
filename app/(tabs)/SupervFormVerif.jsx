import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { CheckBox } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const SupervFormVerif = ({ onAdd }) => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  
  const [isCheckedOrdenado, setIsCheckedOrdenado] = useState(false);
  const [isCheckedBarrido, setIsCheckedBarrido] = useState(false);
  const [isCheckedTrapeado, setIsCheckedTrapeado] = useState(false);
  const [isCheckedDesinfectado, setIsCheckedDesinfectado] = useState(false);

  const navigation = useNavigation();

  const resetForm = () => {
    setNombre("");
    setApellido("");
    setEmail("");
    setTelefono("");
    setIsCheckedOrdenado(false);
    setIsCheckedBarrido(false);
    setIsCheckedTrapeado(false);
    setIsCheckedDesinfectado(false);
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

  return (
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.head}>
        <TouchableOpacity onPress={handleHomeNavigation} style={styles.homeIcon}>
          <Ionicons name="home-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Clean Class</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.contenedor}>
          <View style={styles.conText}>
            <Text style={styles.conTitle}>Verificación del aula</Text>
            <Text style={styles.conTitle}>Limpieza del aula número: 1</Text>
            <Text>Limpieza hecha por: Jaime Caseti</Text>
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
          <View style={styles.contButton}>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttontext}>Aceptar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonC}>
              <Text>Denegar</Text>
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
    backgroundColor: '#E6F3FF',
    height:700
  },
  head: {
    backgroundColor: '#00B8BA',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  homeIcon: {
    padding: 5,
  },
  title: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'right',
    flex: 1,
    marginRight: 10,
  },
  body: {
   
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
    marginBottom:500
  },
  contenedor: {
    backgroundColor: '#FFFFFF',
    borderColor: '#505050',
    borderWidth: 1,
    width: '90%',
    borderRadius: 15,
    padding: 30,
   
  },
  conText: {
    marginBottom: 40,
  },
  conTitle: {
    fontWeight: 'bold',
    fontSize: 21,
  },
  contButton: {
    height: 50,
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    borderRadius: 5,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    width: '45%',
  },
  buttonC: {
    borderRadius: 5,
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C7C7C7',
    borderWidth: 1,
  },
  buttontext: {
    color: '#FFFFFF',
  },
});

export default SupervFormVerif;