import React, { useContext } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput } from 'react-native';
import { ThemeProvider, ThemeContext } from '../../components/ThemeContext';
import ColorMode from '../../components/ColorMode';
import Header from '../../components/Header';
import Header2 from '../../components/Header2';
import Background from '../../components/Background';
import Background2 from '../../components/Background2';

const UserShowDataContent = ({ route }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const formData = route?.params?.formData || {};
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <View style={styles.container}>
      <View style={styles.backgroundContainer}>
        {isDarkMode ? <Background2 /> : <Background />}
      </View>
      {isDarkMode ? <Header2 /> : <Header />}
      <ColorMode />
      <ScrollView style={styles.scrollView}>
        <View style={styles.formContainer}>
          <Text style={[styles.title, isDarkMode && styles.titleDark]}>
            ✦ Detalles del Formulario ✦
          </Text>
          {Object.keys(formData).length > 0 ? (
            Object.entries(formData).map(([key, value]) => (
              <View key={key} style={[styles.fieldContainer, isDarkMode && styles.fieldContainerDark]}>
                <View style={styles.labelContainer}>
                  <Text style={[styles.labelIcon, isDarkMode && styles.labelIconDark]}>✧</Text>
                  <Text style={[styles.label, isDarkMode && styles.labelDark]}>{key}</Text>
                </View>
                <Text style={[styles.value, isDarkMode && styles.valueDark]}>
                  {value?.toString() || 'No disponible'}
                </Text>
              </View>
            ))
          ) : (
            <>
              <View style={styles.noDataWrapper}>
                <Text style={[styles.noDataText, isDarkMode && styles.noDataTextDark]}>
                  ¡Disculpa! No hay datos disponibles
                </Text>
              </View>
              <View style={[styles.noDataCard, isDarkMode && styles.noDataCardDark]}>
                <Text style={[styles.searchTitle, isDarkMode && styles.searchTitleDark]}>
                  ¿Deseas buscar un aula en específico?
                </Text>
                <View style={styles.searchContainer}>
                  <Text style={styles.searchIcon}>🔍</Text>
                  <TextInput
                    style={[styles.searchInput, isDarkMode && styles.searchInputDark]}
                    placeholder="Buscar aula..."
                    value={searchQuery}
                    onChangeText={(text) => setSearchQuery(text)}
                    placeholderTextColor={isDarkMode ? '#A0A0A0' : '#9CA3AF'}
                  />
                </View>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const UserShowData = ({ route }) => {
  return (
    <ThemeProvider>
      <UserShowDataContent route={route} />
    </ThemeProvider>
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
  scrollView: {
    flex: 1,
    zIndex: 2,
  },
  formContainer: {
    padding: 20,
    paddingTop: 144,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 30,
    textAlign: 'center',
    color: '#2D3748',
    textShadowColor: 'rgba(45, 55, 72, 0.15)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    letterSpacing: 0.8,
  },
  fieldContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    padding: 22,
    marginBottom: 16,
    borderRadius: 24,
    shadowColor: '#2D3748',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1.5,
    borderColor: 'rgba(45, 55, 72, 0.08)',
    transform: [{ scale: 1.02 }],
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelIcon: {
    fontSize: 17,
    fontWeight: '700',
    color: '#4A5568',
    marginRight: 6,
    letterSpacing: 0.5,
  },
  label: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2D3748',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  value: {
    fontSize: 16,
    color: '#4A5568',
    marginTop: 4,
    letterSpacing: 0.3,
  },
  noDataWrapper: {
    alignItems: 'center',
    marginBottom: 50,
  },
  noDataText: {
    fontSize: 20,
    color: '#2D3748',
    textAlign: 'center',
    marginTop: 4,
    fontWeight: '600',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(45, 55, 72, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  noDataCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    padding: 28,
    borderRadius: 28,
    shadowColor: '#2D3748',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 10,
    borderWidth: 1.5,
    borderColor: 'rgba(45, 55, 72, 0.08)',
    width: '27%',
    alignSelf: 'center',
    transform: [{ scale: 1.02 }],
  },
  searchTitle: {
    fontSize: 18,
    color: '#4A5568',
    marginTop: 12,
    marginBottom: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  searchContainer: {
    width: '100%',
    marginTop: 10,
    position: 'relative',
  },
  searchIcon: {
    position: 'absolute',
    left: 16,
    top: '50%',
    transform: [{ translateY: -10 }],
    zIndex: 1,
    fontSize: 16,
  },
  searchInput: {
    backgroundColor: 'white',
    borderRadius: 18,
    padding: 16,
    paddingLeft: 45,
    fontSize: 16,
    borderWidth: 1.5,
    borderColor: 'rgba(45, 55, 72, 0.12)',
    shadowColor: '#2D3748',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 6,
    color: '#2D3748',
  },
  titleDark: {
    color: '#E6E6FA',
    textShadowColor: 'rgba(167, 61, 255, 0.15)',
  },
  fieldContainerDark: {
    backgroundColor: '#2D2640',
    borderColor: '#4A4460',
    shadowColor: '#A73DFF',
  },
  labelIconDark: {
    color: '#A73DFF',
  },
  labelDark: {
    color: '#E6E6FA',
  },
  valueDark: {
    color: '#B8B8D1',
  },
  noDataTextDark: {
    color: '#E6E6FA',
    textShadowColor: 'rgba(167, 61, 255, 0.1)',
  },
  noDataCardDark: {
    backgroundColor: '#2D2640',
    borderColor: '#4A4460',
    shadowColor: '#A73DFF',
  },
  searchTitleDark: {
    color: '#E6E6FA',
  },
  searchInputDark: {
    backgroundColor: '#1A1625',
    borderColor: '#4A4460',
    color: '#E6E6FA',
    shadowColor: '#A73DFF',
  },
});

export default UserShowData;
