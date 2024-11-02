import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { router } from 'expo-router';

const Header = ({ navigation }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const slideAnim = useState(new Animated.Value(-Dimensions.get('window').width * 0.35))[0];

  const toggleMenu = (show) => {
    setShowMenu(show);
    Animated.spring(slideAnim, {
      toValue: show ? 0 : -Dimensions.get('window').width * 0.35,
      useNativeDriver: true,
      friction: 8,
      tension: 40
    }).start();
  };

  const handleNavigation = (route) => {
    router.push(route);
    toggleMenu(false);
  };

  const handleMouseEnter = (itemName) => {
    setHoveredItem(itemName);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      toggleMenu(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => toggleMenu(!showMenu)} style={styles.menuIcon}>
          <Ionicons name="menu" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.headertext}>✨ Clean Class ✨</Text>
      </View>
      
      {showMenu && (
        <TouchableOpacity 
          style={styles.overlay}
          activeOpacity={1}
          onPress={handleOverlayClick}
        >
          <Animated.View style={[
            styles.menuContainer,
            {
              transform: [{ translateX: slideAnim }]
            }
          ]}>
            <TouchableOpacity 
              style={styles.closeButton} 
              onPress={() => toggleMenu(false)}
            >
              <Ionicons name="close" size={20} color="#333" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.menuItem,
                hoveredItem === 'inicio' && styles.menuItemHover
              ]} 
              onPress={() => handleNavigation('')}
              onMouseEnter={() => handleMouseEnter('inicio')}
              onMouseLeave={handleMouseLeave}
            >
              <Text style={[
                styles.menuText,
                hoveredItem === 'inicio' && styles.menuTextHover
              ]}>Inicio</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[
                styles.menuItem,
                hoveredItem === 'login' && styles.menuItemHover
              ]} 
              onPress={() => handleNavigation('/LoginForm')}
              onMouseEnter={() => handleMouseEnter('login')}
              onMouseLeave={handleMouseLeave}
            >
              <Text style={[
                styles.menuText,
                hoveredItem === 'login' && styles.menuTextHover
              ]}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[
                styles.menuItem,
                hoveredItem === 'registro' && styles.menuItemHover
              ]} 
              onPress={() => handleNavigation('/RegisterForm')}
              onMouseEnter={() => handleMouseEnter('registro')}
              onMouseLeave={handleMouseLeave}
            >
              <Text style={[
                styles.menuText,
                hoveredItem === 'registro' && styles.menuTextHover
              ]}>Registro</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[
                styles.menuItem,
                hoveredItem === 'personal' && styles.menuItemHover
              ]} 
              onPress={() => handleNavigation('/PersonalForm')}
              onMouseEnter={() => handleMouseEnter('personal')}
              onMouseLeave={handleMouseLeave}
            >
              <Text style={[
                styles.menuText,
                hoveredItem === 'personal' && styles.menuTextHover
              ]}>Personal</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[
                styles.menuItem,
                hoveredItem === 'verificacion' && styles.menuItemHover
              ]} 
              onPress={() => handleNavigation('/SupervFormVerif')}
              onMouseEnter={() => handleMouseEnter('verificacion')}
              onMouseLeave={handleMouseLeave}
            >
              <Text style={[
                styles.menuText,
                hoveredItem === 'verificacion' && styles.menuTextHover
              ]}>Verificación Aula</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[
                styles.menuItem,
                hoveredItem === 'supervisor' && styles.menuItemHover
              ]} 
              onPress={() => handleNavigation('/SupervisorForm')}
              onMouseEnter={() => handleMouseEnter('supervisor')}
              onMouseLeave={handleMouseLeave}
            >
              <Text style={[
                styles.menuText,
                hoveredItem === 'supervisor' && styles.menuTextHover
              ]}>Supervisor</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[
                styles.menuItem,
                hoveredItem === 'datos' && styles.menuItemHover
              ]} 
              onPress={() => handleNavigation('/UserShowData')}
              onMouseEnter={() => handleMouseEnter('datos')}
              onMouseLeave={handleMouseLeave}
            >
              <Text style={[
                styles.menuText,
                hoveredItem === 'datos' && styles.menuTextHover
              ]}>Datos Usuario</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[
                styles.menuItem,
                hoveredItem === 'redirect' && styles.menuItemHover
              ]} 
              onPress={() => handleNavigation('/redirect')}
              onMouseEnter={() => handleMouseEnter('redirect')}
              onMouseLeave={handleMouseLeave}
            >
              <Text style={[
                styles.menuText,
                hoveredItem === 'redirect' && styles.menuTextHover
              ]}>Redirect</Text>
            </TouchableOpacity>

          </Animated.View>
        </TouchableOpacity>
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
        backgroundColor: 'rgba(0, 0, 0, 0.08)',
        backdropFilter: 'blur(1.6px)',
        zIndex: 99,
        height: Dimensions.get('window').height,
    },
    menuContainer: {
        position: 'absolute',
        top: 90,
        left: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.98)',
        width: Dimensions.get('window').width * 0.29,
        maxHeight: Dimensions.get('window').height - 90,
        paddingTop: 20,
        paddingBottom: 20,
        elevation: 15,
        shadowColor: '#00B8BA',
        shadowOffset: { width: 12, height: 12 },
        shadowOpacity: 0.4,
        shadowRadius: 20,
        borderTopRightRadius: 60,
        borderBottomRightRadius: 60,
        borderRightWidth: 2,
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderColor: 'rgba(0, 184, 186, 0.3)',
    },
    menuItem: {
        padding: 15,
        marginHorizontal: 25,
        marginVertical: 5,
        borderRadius: 25,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        elevation: 8,
        shadowColor: '#00B8BA',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        borderWidth: 1,
        borderColor: 'rgba(0, 184, 186, 0.15)',
        transform: [{ scale: 1 }],
        transition: 'all 0.3s ease-in-out',
    },
    menuText: {
        fontSize: 17,
        letterSpacing: 0.75,
        color: '#2c3e50',
        fontWeight: '500',
        textAlign: 'center',
        transition: 'all 0.3s ease-in-out',
    },
    closeButton: {
        position: 'absolute',
        right: 20,
        top: 25.5,
        padding: 12,
        backgroundColor: 'rgba(0, 184, 186, 0.9)',
        backdropFilter: 'blur(5px)',
        borderRadius: 35,
        zIndex: 101,
        elevation: 12,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.9)',
        transform: [{ rotate: '0deg' }],
        transition: 'all 0.3s ease-in-out',
    },
    menuItemHover: {
        transform: [{ scale: 1.03 }, { translateX: 8 }],
        backgroundColor: 'rgba(0, 184, 186, 0.1)',
        borderColor: '#00B8BA',
        shadowColor: '#00B8BA',
        shadowOffset: { width: 6, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
        borderWidth: 2,
    },
    menuTextHover: {
        color: '#00B8BA',
        fontWeight: '600',
        letterSpacing: 1.2,
        transform: [{ translateX: 4 }],
    },
});

export default Header;