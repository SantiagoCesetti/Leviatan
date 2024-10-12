import React, { useState } from "react";  
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from "react-native";  

const SupervisorForm = ({ onAdd }) => {  
  const [nombre, setNombre] = useState("");  
  const [aula, setAula] = useState("");  

  const handleSubmit = () => {  
    const nuevoAdministrador = { nombre, aula };  
    onAdd(nuevoAdministrador);  
    setNombre("");  
    setAula("");  
  };  

  return (  
    <ScrollView style={styles.container}>
  
      <View style={styles.header}>  
        <Text style={styles.headertext}>Clean Class</Text>  
      </View>  
      <View style={styles.container1}>  
        <View style={styles.body}>  
          <View style={styles.container2}>  
            <Text style={styles.tittle}>Orden de Limpieza</Text>  
            <Text>Ingresa los Datos del trabajador y el número del aula</Text>  

            <View style={styles.inputRow}>  
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
            </View>  

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>  
              <Text style={styles.buttontext}>Guardar</Text>  
            </TouchableOpacity>  
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
  inputRow: {  
    flexDirection: 'row',  
    justifyContent: 'space-between',  
    marginTop:30,
  },  
  inputContainer: {  
    flex: 1,  
    marginHorizontal: 5,  
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
  },  
  headertext: {  
    paddingTop: 20,  
    textAlign: 'right',  
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
});  

export default SupervisorForm;