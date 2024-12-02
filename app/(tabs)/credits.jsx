import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ThemeContext, ThemeProvider } from '../../components/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CreditsContent = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const navigation = useNavigation();

  const handleHomeNavigation = () => {
    navigation.navigate('index');
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundBase} />
      <View style={styles.decorativeShapes}>
        <View style={styles.circle1} />
        <View style={styles.circle2} />
        <View style={styles.rectangle1} />
        <View style={styles.rectangle2} />
        <View style={styles.diagonal1} />
        <View style={styles.diagonal2} />
      </View>
      <View style={styles.backgroundOverlay} />
      <View style={styles.content}>
        <Text style={[styles.title, isDarkMode && styles.textDark]}>
           Resumen de como se trabajo
        </Text>
        <View style={styles.imageContainer}>
          <Image 
            source={require('../../assets/images/laburaa.gif')}
            style={styles.gif}
          />
          <Image 
            source={require('../../assets/images/cursoricon.webp')}
            style={styles.cursorIcon}
          />
        </View>
        <View style={styles.creditSection}>
        </View>
      </View>
      <TouchableOpacity 
        style={[styles.homeButton, isDarkMode && styles.homeButtonDark]} 
        onPress={handleHomeNavigation}
      >
        <Icon 
          name="home" 
          size={30} 
          color={isDarkMode ? '#FFFFFF' : '#2C3E50'} 
        />
      </TouchableOpacity>
    </View>
  );
};

const Credits = () => {
  return (
    <ThemeProvider>
      <CreditsContent />
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundBase: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#0A0A1E',
  },
  decorativeShapes: {
    ...StyleSheet.absoluteFillObject,
  },
  circle1: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(147, 112, 219, 0.1)',
    top: -50,
    right: -50,
    transform: [{ scale: 1.2 }],
  },
  circle2: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(72, 61, 139, 0.15)',
    bottom: 50,
    left: -30,
  },
  rectangle1: {
    position: 'absolute',
    width: 120,
    height: 120,
    backgroundColor: 'rgba(138, 43, 226, 0.08)',
    transform: [{ rotate: '45deg' }],
    top: '30%',
    right: 40,
  },
  rectangle2: {
    position: 'absolute',
    width: 80,
    height: 80,
    backgroundColor: 'rgba(75, 0, 130, 0.1)',
    transform: [{ rotate: '-30deg' }],
    bottom: '25%',
    left: 60,
  },
  diagonal1: {
    position: 'absolute',
    width: '100%',
    height: 2,
    backgroundColor: 'rgba(147, 112, 219, 0.1)',
    transform: [{ rotate: '45deg' }, { scale: 2 }],
    top: '40%',
  },
  diagonal2: {
    position: 'absolute',
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(138, 43, 226, 0.08)',
    transform: [{ rotate: '-45deg' }, { scale: 2 }],
    bottom: '30%',
  },
  backgroundOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10, 10, 30, 0.7)',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    textAlign: 'center',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 40,
    opacity: 0.8,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  creditSection: {
    alignItems: 'center',
    marginVertical: 30,
  },
  text: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 28,
    opacity: 0.7,
  },
  footer: {
    fontSize: 16,
    color: '#FFFFFF',
    marginTop: 40,
    opacity: 0.6,
  },
  textDark: {
    color: '#FFFFFF',
  },
  homeButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  homeButtonDark: {
    backgroundColor: 'rgba(147, 112, 219, 0.8)',
  },
  gif: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    position: 'relative',
    width: 500,
    height: 500,
    marginVertical: 20,
    borderRadius: 15,
    borderWidth: 3.5,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(1700px)',
    borderColor: 'rgba(147, 112, 219, 0.1)',
    overflow: 'hidden',
  },
  cursorIcon: {
    position: 'absolute',
    top: 90,
    left: '50%',
    transform: [{ translateX: -25 }],
    width: 260,
    height: 260,
    zIndex: 1,
  },
});

export default Credits;
