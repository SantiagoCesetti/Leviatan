import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import Background from '../../components/Background';
import Header from '../../components/Header';

const Redirect = () => {
  const [contador, setContador] = React.useState(5);

  useFocusEffect(
    React.useCallback(() => {
      setContador(5);
      
      const timer = setInterval(() => {
        setContador((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            router.replace('/');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        if (timer) clearInterval(timer);
      };
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.backgroundContainer}>
        <Background />
      </View>
      <Header />
      <View style={styles.mainContent}>
        <View style={styles.card}>
          <Text style={styles.title}>¡Gracias por tu tiempo!</Text>
          <Text style={styles.subtitle}>Tu formulario ha sido enviado con éxito</Text>
          <View style={styles.counterContainer}>
            <Text style={styles.counterText}>{contador}</Text>
            <Text style={styles.redirectText}>
              Volviendo a la página principal...
            </Text>
          </View>
        </View>
      </View>
    </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    zIndex: 2,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 40,
    width: '90%',
    maxWidth: 450,
    alignItems: 'center',
    shadowColor: '#00bcd4',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 2,
    borderColor: '#3498db',
    position: 'relative',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#2c3e50',
    marginBottom: 15,
    textAlign: 'center',
    textShadowColor: '#3498db',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 2,
  },
  subtitle: {
    fontSize: 18,
    color: '#34495e',
    marginBottom: 25,
    textAlign: 'center',
    lineHeight: 24,
  },
  counterContainer: {
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#f0f9ff',
    padding: 20,
    borderRadius: 15,
    width: '100%',
    borderWidth: 2,
    borderColor: '#3498db',
    borderStyle: 'dashed',
  },
  counterText: {
    fontSize: 56,
    fontWeight: '800',
    color: '#00bcd4',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 188, 212, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
  redirectText: {
    fontSize: 16,
    color: '#2980b9',
    fontWeight: '600',
  },
});

export default Redirect;
