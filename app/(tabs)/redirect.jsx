import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const Redirect = () => {
  const navigation = useNavigation();
  const [contador, setContador] = useState(3);

  useFocusEffect(
    React.useCallback(() => {
      setContador(5);
      const timer = setInterval(() => {
        setContador((prevContador) => prevContador - 1);
      }, 1000);

      const redirectTimer = setTimeout(() => {
        clearInterval(timer);
        navigation.navigate('index');
      }, 5000);

      return () => {
        clearInterval(timer);
        clearTimeout(redirectTimer);
      };
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.text}>¡Gracias por llenar el formulario!</Text>
      <Text style={styles.text}>Volviendo a la página principal en {contador}...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F3FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default Redirect;
