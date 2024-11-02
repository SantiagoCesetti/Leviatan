import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';

const Redirect = () => {
  const [contador, setContador] = useState(5);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setContador((prevContador) => {
        if (prevContador <= 1) {
          clearInterval(timer);
          router.replace('/');
          return 0;
        }
        return prevContador - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.container}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 20,
    textAlign: 'center',
  },
  counterContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  counterText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#3498db',
    marginBottom: 5,
  },
  redirectText: {
    fontSize: 14,
    color: '#95a5a6',
  },
});

export default Redirect;
