import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{uri: 'https://i.imgur.com/XMUFXRX.jpeg'}}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.welcomeText}>Bienvenido a Leviatan</Text>
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.registerButton}>
        <Text style={styles.buttonText}>Crear cuenta nueva</Text>
      </TouchableOpacity>
    </View>
  );
};


export default HomeScreen;
