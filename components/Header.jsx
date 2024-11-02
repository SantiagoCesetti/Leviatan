import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { router } from 'expo-router';

const Header = ({ navigation }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleNavigation = (route) => {
    router.push(route);
    setShowMenu(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setShowMenu(!showMenu)} style={styles.menuIcon}>
          <Ionicons name="menu" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.headertext}>✨ Clean Class ✨</Text>
      </View>
      
      {showMenu && (
        <View style={styles.overlay}>
          <View style={styles.menuContainer}>
            <TouchableOpacity 
              style={styles.closeButton} 
              onPress={() => setShowMenu(false)}
            >
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation('')}>
              <Text style={styles.menuText}>Index</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation('/LoginForm')}>
              <Text style={styles.menuText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation('/RegisterForm')}>
              <Text style={styles.menuText}>Registro</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation('/PersonalForm')}>
              <Text style={styles.menuText}>Personal</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation('/SupervFormVerif')}>
              <Text style={styles.menuText}>Verificación Supervisor</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation('/SupervisorForm')}>
              <Text style={styles.menuText}>Supervisor</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation('/UserShowData')}>
              <Text style={styles.menuText}>Datos Usuario</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation('/redirect')}>
              <Text style={styles.menuText}>Redirect</Text>
            </TouchableOpacity>

          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        zIndex: 100,
    },
    header: {
        backgroundColor: "#00B8BA",
        height: 90,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 20,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        paddingHorizontal: 20,
        zIndex: 100,
    },
    menuIcon: {
        padding: 10,
    },
    headertext: {
        fontSize: 28,
        color: '#fff',
        marginRight: 20,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 99,
        height: Dimensions.get('window').height,
    },
    menuContainer: {
        position: 'absolute',
        top: 90,
        left: 0,
        backgroundColor: 'white',
        width: Dimensions.get('window').width * 0.25,
        maxHeight: Dimensions.get('window').height - 90,
        paddingTop: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    menuItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    menuText: {
        fontSize: 15,
        color: '#333',
    },
    closeButton: {
        position: 'absolute',
        right: 10,
        top: 5,
        padding: 5,
        zIndex: 101,
    },
});

export default Header;