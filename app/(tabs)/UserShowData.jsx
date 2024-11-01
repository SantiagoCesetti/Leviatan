import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Header from '../../components/Header';

const UserShowData = ({ route }) => {
  const formData = route?.params?.formData || {};

  return (
    <ScrollView style={styles.container}>
        <Header />
      <View style={styles.formContainer}>
        <Text style={styles.title}>Detalles del Formulario Verificado</Text>
        
        {Object.keys(formData).length > 0 ? (
          Object.entries(formData).map(([key, value]) => (
            <View key={key} style={styles.fieldContainer}>
              <Text style={styles.label}>{key}:</Text>
              <Text style={styles.value}>{value?.toString() || 'No disponible'}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noDataText}>No hay datos disponibles</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  formContainer: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  fieldContainer: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  noDataText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default UserShowData;
