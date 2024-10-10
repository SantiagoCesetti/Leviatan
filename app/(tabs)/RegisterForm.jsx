import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';

const AdministradorAdd = ({ onAdd }) => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [direccion, setDireccion] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    const nuevoAdministrador = { nombre, apellido, email, telefono, contraseña, direccion };
    onAdd(nuevoAdministrador);
    setNombre("");
    setApellido("");
    setEmail("");
    setTelefono("");
    setContraseña("");
    setDireccion("");
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Registrar usuario</Text>
        <View style={styles.gridContainer}>
          <View style={styles.inputContainer}>
            <Text>Nombre:</Text>
            <TextInput
              style={styles.input}
              value={nombre}
              onChangeText={setNombre}
              placeholder="Nombre"
              placeholderTextColor="rgba(0, 0, 0, 0.3)"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text>Apellido:</Text>
            <TextInput
              style={styles.input}
              value={apellido}
              onChangeText={setApellido}
              placeholder="Apellido"
              placeholderTextColor="rgba(0, 0, 0, 0.3)"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text>Email:</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              placeholderTextColor="rgba(0, 0, 0, 0.3)"
              keyboardType="email-address"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text>Teléfono:</Text>
            <TextInput
              style={styles.input}
              value={telefono}
              onChangeText={setTelefono}
              placeholder="Teléfono"
              placeholderTextColor="rgba(0, 0, 0, 0.3)"
              keyboardType="phone-pad"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text>Contraseña:</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                value={contraseña}
                onChangeText={setContraseña}
                placeholder="Contraseña"
                placeholderTextColor="rgba(0, 0, 0, 0.3)"
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={toggleShowPassword} style={styles.eyeIcon}>
                <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="gray" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text>Dirección:</Text>
            <TextInput
              style={styles.input}
              value={direccion}
              onChangeText={setDireccion}
              placeholder="Dirección"
              placeholderTextColor="rgba(0, 0, 0, 0.3)"
            />
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Crear cuenta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#B6DEF9',
  },
  contentContainer: {
    width: '100%',
    maxWidth: 500,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  inputContainer: {
    width: '48%',
    marginBottom: 15,
  },
  input: {
    backgroundColor: 'white',
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 12.5,
    borderRadius: 5,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: '57%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  passwordInput: {
    flex: 1,
    padding: 10,
    fontSize: 12.5,
  },
  eyeIcon: {
    padding: 10,
  },
  button: {
    backgroundColor: '#87CEFA',
    borderWidth: 2,
    borderColor: '#4682B4',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    marginTop: 7,
  },
  buttonText: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AdministradorAdd;