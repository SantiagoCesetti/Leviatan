import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { router, usePathname } from 'expo-router';
import ColorMode from './ColorMode';

const Header = ({ navigation }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const slideAnim = useState(new Animated.Value(-Dimensions.get('window').width * 0.35))[0];
  const currentPath = usePathname();

  useEffect(() => {
    setHoveredItem(null);
  }, [currentPath]);

  const isCurrentRoute = (route) => {
    return currentPath === route;
  };

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
    setHoveredItem(null);
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
          <Ionicons name="menu" size={34} color="white" />
        </TouchableOpacity>
        <Text style={styles.headertext}>🫧  Clean Class  🫧</Text>
        <ColorMode />
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
                hoveredItem === 'inicio' && styles.menuItemHover,
                isCurrentRoute('/') && styles.activeMenuItem
              ]} 
              onPress={() => handleNavigation('')}
              onMouseEnter={() => handleMouseEnter('inicio')}
              onMouseLeave={handleMouseLeave}
            >
              <Text style={[
                styles.menuText,
                hoveredItem === 'inicio' && styles.menuTextHover,
                isCurrentRoute('/') && styles.activeMenuText
              ]}>Inicio</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[
                styles.menuItem,
                hoveredItem === 'login' && styles.menuItemHover,
                isCurrentRoute('/LoginForm') && styles.activeMenuItem
              ]} 
              onPress={() => handleNavigation('/LoginForm')}
              onMouseEnter={() => handleMouseEnter('login')}
              onMouseLeave={handleMouseLeave}
            >
              <Text style={[
                styles.menuText,
                hoveredItem === 'login' && styles.menuTextHover,
                isCurrentRoute('/LoginForm') && styles.activeMenuText
              ]}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[
                styles.menuItem,
                hoveredItem === 'registro' && styles.menuItemHover,
                isCurrentRoute('/RegisterForm') && styles.activeMenuItem
              ]} 
              onPress={() => handleNavigation('/RegisterForm')}
              onMouseEnter={() => handleMouseEnter('registro')}
              onMouseLeave={handleMouseLeave}
            >
              <Text style={[
                styles.menuText,
                hoveredItem === 'registro' && styles.menuTextHover,
                isCurrentRoute('/RegisterForm') && styles.activeMenuText
              ]}>Registro</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[
                styles.menuItem,
                hoveredItem === 'personal' && styles.menuItemHover,
                isCurrentRoute('/PersonalForm') && styles.activeMenuItem
              ]} 
              onPress={() => handleNavigation('/PersonalForm')}
              onMouseEnter={() => handleMouseEnter('personal')}
              onMouseLeave={handleMouseLeave}
            >
              <Text style={[
                styles.menuText,
                hoveredItem === 'personal' && styles.menuTextHover,
                isCurrentRoute('/PersonalForm') && styles.activeMenuText
              ]}>Personal</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[
                styles.menuItem,
                hoveredItem === 'verificacion' && styles.menuItemHover,
                isCurrentRoute('/SupervFormVerif') && styles.activeMenuItem
              ]} 
              onPress={() => handleNavigation('/SupervFormVerif')}
              onMouseEnter={() => handleMouseEnter('verificacion')}
              onMouseLeave={handleMouseLeave}
            >
              <Text style={[
                styles.menuText,
                hoveredItem === 'verificacion' && styles.menuTextHover,
                isCurrentRoute('/SupervFormVerif') && styles.activeMenuText
              ]}>Verificación Aula</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[
                styles.menuItem,
                hoveredItem === 'supervisor' && styles.menuItemHover,
                isCurrentRoute('/SupervisorForm') && styles.activeMenuItem
              ]} 
              onPress={() => handleNavigation('/SupervisorForm')}
              onMouseEnter={() => handleMouseEnter('supervisor')}
              onMouseLeave={handleMouseLeave}
            >
              <Text style={[
                styles.menuText,
                hoveredItem === 'supervisor' && styles.menuTextHover,
                isCurrentRoute('/SupervisorForm') && styles.activeMenuText
              ]}>Supervisor</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[
                styles.menuItem,
                hoveredItem === 'datos' && styles.menuItemHover,
                isCurrentRoute('/UserShowData') && styles.activeMenuItem
              ]} 
              onPress={() => handleNavigation('/UserShowData')}
              onMouseEnter={() => handleMouseEnter('datos')}
              onMouseLeave={handleMouseLeave}
            >
              <Text style={[
                styles.menuText,
                hoveredItem === 'datos' && styles.menuTextHover,
                isCurrentRoute('/UserShowData') && styles.activeMenuText
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
        backgroundColor: "#674EA7",
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
        position: 'relative',
    },
    menuIcon: {
        padding: 10,
        marginTop: -8,
    },
    headertext: {
        fontSize: 28,
        color: '#fff',
        marginRight: 20,
        marginBottom: 12,
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
        backgroundColor: 'rgba(26, 22, 37, 0.98)',
        width: Dimensions.get('window').width * 0.29,
        maxHeight: Dimensions.get('window').height - 90,
        paddingTop: 20,
        paddingBottom: 20,
        elevation: 15,
        shadowColor: '#9B6B9E',
        shadowOffset: { width: 12, height: 12 },
        shadowOpacity: 0.4,
        shadowRadius: 20,
        borderTopRightRadius: 60,
        borderBottomRightRadius: 60,
        borderRightWidth: 2,
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderColor: 'rgba(155, 107, 158, 0.3)',
    },
    menuItem: {
        padding: 15,
        marginHorizontal: 25,
        marginVertical: 5,
        borderRadius: 25,
        backgroundColor: 'rgba(26, 22, 37, 0.9)',
        elevation: 8,
        shadowColor: '#9B6B9E',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        borderWidth: 1,
        borderColor: 'rgba(155, 107, 158, 0.15)',
        transform: [{ scale: 1 }],
        transition: 'all 0.3s ease-in-out',
    },
    menuText: {
        fontSize: 17,
        letterSpacing: 0.75,
        color: '#B784A7',
        fontWeight: '500',
        textAlign: 'center',
        transition: 'all 0.3s ease-in-out',
    },
    closeButton: {
        position: 'absolute',
        right: 20,
        top: 25.5,
        padding: 12,
        backgroundColor: 'rgba(155, 107, 158, 0.9)',
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
        backgroundColor: 'rgba(155, 107, 158, 0.1)',
        borderColor: '#9B6B9E',
        shadowColor: '#9B6B9E',
        shadowOffset: { width: 6, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
        borderWidth: 2,
    },
    menuTextHover: {
        color: '#B784A7',
        fontWeight: '600',
        letterSpacing: 1.2,
        transform: [{ translateX: 4 }],
    },
    activeMenuItem: {
        borderWidth: 2.5,
        borderColor: '#9B6B9E',
        backgroundColor: 'rgba(155, 107, 158, 0.08)',
        transform: [{ scale: 1.02 }],
        shadowColor: '#9B6B9E',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    activeMenuText: {
        color: '#B784A7',
        fontWeight: '600',
        letterSpacing: 0.8,
    },
});

export default Header;