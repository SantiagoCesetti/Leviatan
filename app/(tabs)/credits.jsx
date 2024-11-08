import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemeContext, ThemeProvider } from '../../components/ThemeContext';

const CreditsContent = () => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <Text style={[styles.text, isDarkMode && styles.textDark]}>
        Créditos de la aplicación
      </Text>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    color: '#2C3E50',
  },
  textDark: {
    color: '#E6E6FA',
  },
});

export default Credits;
