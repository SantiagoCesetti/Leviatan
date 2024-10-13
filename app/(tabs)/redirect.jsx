import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Redirect = () => {
  const navigation = useNavigation();
  const [contador, setContador] = useState(5);

  useFocusEffect(
    React.useCallback(() => {
      setContador(5);
      const timer = setInterval(() => {
        setContador((prevContador) => {
          if (prevContador <= 1) {
            clearInterval(timer);
            navigation.navigate('index');
            return 0;
          }
          return prevContador - 1;
        });
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }, [navigation])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.text}>¡Gracias por llenar el formulario!</Text>
      <Text style={styles.text}>Volviendo a la página principal en {contador} segundos...</Text>
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

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Redirect" 
        component={Redirect} 
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default Redirect;
