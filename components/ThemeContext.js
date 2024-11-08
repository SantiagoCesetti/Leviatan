import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('isDarkMode');
      if (savedTheme !== null) {
        setIsDarkMode(JSON.parse(savedTheme));
      }
    } catch (error) {
      console.error('Error al cargar el tema:', error);
    }
  };

  const toggleColorMode = async () => {
    try {
      const newMode = !isDarkMode;
      setIsDarkMode(newMode);
      await AsyncStorage.setItem('isDarkMode', JSON.stringify(newMode));
    } catch (error) {
      console.error('Error al guardar el tema:', error);
    }
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleColorMode }}>
      {children}
    </ThemeContext.Provider>
  );
}; 