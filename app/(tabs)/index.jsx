import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header';
import Header2 from '../../components/Header2';
import { ThemeProvider, ThemeContext } from '../../components/ThemeContext';
import ColorMode from '../../components/ColorMode';
import Background from '../../components/Background';
import Background2 from '../../components/Background2';

const HomeScreenContent = () => {
  const navigation = useNavigation();
  const { isDarkMode } = useContext(ThemeContext);

  const handleLogin = () => {
    navigation.navigate('LoginForm');
  };

  const handleRegister = () => {
    navigation.navigate('RegisterForm');
  };

  const handleHomeNavigation = () => {
    navigation.navigate('Home');
  };

  const handleCredits = () => {
    console.log('Navegando a Credits...');
    navigation.navigate('credits');
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundContainer}>
        {isDarkMode ? <Background2 /> : <Background />}
      </View>
      <View style={styles.mainContent}>
        {isDarkMode ? <Header2 handleHomeNavigation={handleHomeNavigation} /> : <Header handleHomeNavigation={handleHomeNavigation} />}
        <ColorMode />
        <View style={styles.contentContainer}>
          <View style={[
            styles.imageContainer, 
            isDarkMode && styles.imageContainerDark
          ]}>
            <Image
              source={require('../../assets/images/leviatan.webp')}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          <Text style={[styles.welcomeText, isDarkMode && styles.welcomeTextDark]}>
            ¡Bienvenido a CleanClass!
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.loginButton, isDarkMode && styles.loginButtonDark]} 
              onPress={handleLogin}
            >
              <Text style={[styles.buttonText, isDarkMode && styles.buttonTextDark]}>
                Iniciar sesión
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.registerButton, isDarkMode && styles.registerButtonDark]} 
              onPress={handleRegister}
            >
              <Text style={[styles.buttonText, isDarkMode && styles.buttonTextDark]}>
                Crear cuenta
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.creditsButton}
          onPress={handleCredits}
        >
          <View style={styles.invisibleArea} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const HomeScreen = () => {
  return (
    <ThemeProvider>
      <HomeScreenContent />
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    marginBottom: 40,
  },
  imageContainer: {
    width: 250,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: 'white',
    borderRadius: 125,
    elevation: 5,
    shadowColor: '#87CEFA', // Celeste (Light Sky Blue)
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 7,
    shadowRadius: 16,
  },
  imageContainerDark: {
    shadowColor: '#FF00FF', // Color magenta
    shadowOpacity: 0.3,
    shadowRadius: 14,
    elevation: 8,
  },
  image: {
    width: '83%',
    height: '83%',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
    color: '#2C3E50',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  welcomeTextDark: {
    color: '#E6E6FA', // Lavender
    textShadowColor: 'rgba(255, 255, 255, 0.1)',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
    gap: 15,
  },
  loginButton: {
    backgroundColor: '#87CEFA',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#4682B4',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  loginButtonDark: {
    backgroundColor: '#9370DB', // Medium Purple
    borderColor: '#7B68EE', // Medium Slate Blue
  },
  registerButton: {
    backgroundColor: '#8CD2D8',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#008B8B',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  registerButtonDark: {
    backgroundColor: '#8A2BE2', // Blue Violet
    borderColor: '#9400D3', // Dark Violet
  },
  buttonText: {
    color: '#2C3E50',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonTextDark: {
    color: '#FFFFFF',
  },
  creditsButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    zIndex: 3,
  },
  invisibleArea: {
    width: 80,
    height: 80,
  },
});

export default HomeScreen;
