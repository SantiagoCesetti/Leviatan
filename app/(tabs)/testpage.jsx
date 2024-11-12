import React from 'react';
import { View, StyleSheet } from 'react-native';
import Background from '../../components/Background';
import Background2 from '../../components/Background2';
import ColorMode from '../../components/ColorMode';
import Header from '../../components/Header';
import Header2 from '../../components/Header2';
import { ThemeProvider, ThemeContext } from '../../components/ThemeContext';

const TestPageContent = () => {
  const { isDarkMode } = React.useContext(ThemeContext);
  
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        {isDarkMode ? <Header2 /> : <Header />}
      </View>
      {isDarkMode ? <Background2 /> : <Background />}
      <ColorMode />
    </View>
  );
};

const TestPage = () => {
  return (
    <ThemeProvider>
      <TestPageContent />
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
});

export default TestPage;
