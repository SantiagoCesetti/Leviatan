import React from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput } from 'react-native';
import Header from '../../components/Header';
import Background from '../../components/Background';

const UserShowData = ({ route }) => {
  const formData = route?.params?.formData || {};
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <View style={styles.container}>
      <View style={styles.backgroundContainer}>
        <Background />
      </View>
      <Header />
      <ScrollView style={styles.scrollView}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>✦ Detalles del Formulario ✦</Text>
          {Object.keys(formData).length > 0 ? (
            Object.entries(formData).map(([key, value]) => (
              <View key={key} style={styles.fieldContainer}>
                <View style={styles.labelContainer}>
                  <Text style={styles.labelIcon}>✧</Text>
                  <Text style={styles.label}>{key}</Text>
                </View>
                <Text style={styles.value}>{value?.toString() || 'No disponible'}</Text>
              </View>
            ))
          ) : (
            <>
              <View style={styles.noDataWrapper}>
                <Text style={styles.noDataText}>¡Disculpa! No hay datos disponibles</Text>
              </View>
              <View style={styles.noDataCard}>
                <Text style={styles.searchTitle}>¿Deseas buscar un aula en específico?</Text>
                <View style={styles.searchContainer}>
                  <Text style={styles.searchIcon}>🔍</Text>
                  <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar aula..."
                    value={searchQuery}
                    onChangeText={(text) => setSearchQuery(text)}
                    placeholderTextColor="#9CA3AF"
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
});

export default UserShowData;
