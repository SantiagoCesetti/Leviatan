import React, { useContext } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from './ThemeContext';

const ColorMode = () => {
  const { isDarkMode, toggleColorMode } = useContext(ThemeContext);

  return (
    <TouchableOpacity 
      style={styles.button}
      onPress={toggleColorMode}
    >
      <Ionicons 
        name={isDarkMode ? 'moon' : 'sunny'} 
        size={22} 
        color={isDarkMode ? '#A73DFF' : '#1A1625'}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 30.5,
    left: 90,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    padding: 10,
    borderRadius: 25,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
});

export default ColorMode;
