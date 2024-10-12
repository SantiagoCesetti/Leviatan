import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate('LoginForm');
  };

  const handleRegister = () => {
    navigation.navigate('RegisterForm');
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{uri: 'https://i.imgur.com/rwln1yI.png'}}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.welcomeText}>Bienvenido a CleanClass</Text>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.buttonText}>Crear cuenta </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B6DEF9',
    backgroundImage: 'linear-gradient(to bottom right, #87CEFA, #B6DEF9)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    borderWidth: 7,
    borderColor: '#576068',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
  image: {
    width: '89%',
    height: '89%',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: '#87CEFA',
    paddingVertical: 11,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 10,
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
