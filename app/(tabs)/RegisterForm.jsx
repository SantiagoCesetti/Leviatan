import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

const AdministradorAdd = ({ onAdd }) => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");

  const handleSubmit = () => {
    const nuevoAdministrador = { nombre, apellido, email, telefono };
    onAdd(nuevoAdministrador);
    setNombre("");
    setApellido("");
    setEmail("");
    setTelefono("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text>Nombre:</Text>
        <TextInput
          style={styles.input}
          value={nombre}
          onChangeText={setNombre}
          placeholder="Ingrese nombre"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Apellido:</Text>
        <TextInput
          style={styles.input}
          value={apellido}
          onChangeText={setApellido}
          placeholder="Ingrese apellido"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Email:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Ingrese email"
          keyboardType="email-address"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Teléfono:</Text>
        <TextInput
          style={styles.input}
          value={telefono}
          onChangeText={setTelefono}
          placeholder="Ingrese teléfono"
          keyboardType="phone-pad"
        />
      </View>
      <Button title="Agregar Administrador" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
  },
});

export default AdministradorAdd;