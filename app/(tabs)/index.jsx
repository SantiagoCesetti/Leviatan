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
        <Text style={styles.buttonText}>Crear cuenta </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F3FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: '90%',
    height: '90%',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: '#87CEFA',
    paddingVertical: 11,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: '#4682B4',
  },
  registerButton: {
    backgroundColor: '#8CD2D8',
    paddingVertical: 11,
    paddingHorizontal: 30,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#008B8B',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
