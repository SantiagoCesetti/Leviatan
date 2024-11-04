import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './screens/HomeScreen'; // Ajusta la ruta según tu estructura
import ProfileScreen from './screens/ProfileScreen'; // Ajusta la ruta según tu estructura
import { ThemeProvider } from './components/ThemeContext';

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen 
            name="Home" 
            component={HomeScreen}
            options={{
              headerShown: false // Oculta el header por defecto
            }}
          />
          <Drawer.Screen 
            name="Profile" 
            component={ProfileScreen}
            options={{
              headerShown: false
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App; 