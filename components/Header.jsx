import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated, useWindowDimensions } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { router, usePathname } from 'expo-router';
import { Platform } from 'react-native';

const Header = () => {
  const [menuState, setMenuState] = useState({
    isOpen: false,
    hoveredItem: null
  });
  const { width: windowWidth } = useWindowDimensions();
  const menuWidth = windowWidth < 768 ? '75%' : '35%';
  const slideAnim = useState(new Animated.Value(-windowWidth))[0];
  const currentPath = usePathname();

  useEffect(() => {
    setMenuState(prev => ({ ...prev, hoveredItem: null }));
  }, [currentPath]);

  const getMenuItemStyles = (itemName) => ({
    style: [
      styles.menuItem,
      menuState.hoveredItem === itemName && styles.menuItemHover,
      currentPath === `/${itemName}` && styles.activeMenuItem
    ],
    textStyle: [
      styles.menuText,
      menuState.hoveredItem === itemName && styles.menuTextHover,
      currentPath === `/${itemName}` && styles.activeMenuText
    ]
  });
  

  const toggleMenu = (show) => {
    setMenuState(prev => ({ ...prev, isOpen: show }));
    Animated.spring(slideAnim, {
      toValue: show ? 0 : -windowWidth,
      useNativeDriver: true,
      friction: 8,
      tension: 40
    }).start();
  };

  const handleNavigation = (route) => {
    setMenuState(prev => ({ ...prev, hoveredItem: null }));
    router.push(route);
    toggleMenu(false);
  };

  const menuItems = [
    { name: 'PersonalForm', label: 'Personal' },
    { name: 'SupervFormVerif', label: 'Verificación Aula' },
    { name: 'SupervisorForm', label: 'Supervisor' },
    { name: 'UserShowData', label: 'Detalle de Aulas' },
    { name: 'redirect', label: 'Redirect' }
  ];

  // Función para calcular el tamaño de fuente dinámicamente
  const calculateFontSize = () => {
    if (Platform.OS === 'web') {
      return 28;
    }
    if (windowWidth < 320) return 10;
    if (windowWidth < 375) return 11;
    if (windowWidth < 414) return 12;
    return 14;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => toggleMenu(!menuState.isOpen)} style={styles.menuIcon}>
          <Ionicons name="menu" size={34} color="white" />
        </TouchableOpacity>
        <Text style={[styles.headertext, { fontSize: calculateFontSize() }]}>
          🫧  Clean Class  🫧
        </Text>
      </View>
      
      {menuState.isOpen && (
        <TouchableOpacity 
          style={styles.overlay}
          activeOpacity={1}
          onPress={(e) => e.target === e.currentTarget && toggleMenu(false)}
        >
          <Animated.View style={[styles.menuContainer, { transform: [{ translateX: slideAnim }] }]}>
            <TouchableOpacity 
              style={styles.closeButton} 
              onPress={() => toggleMenu(false)}
            >
              <Ionicons name="close" size={20} color="#333" />
            </TouchableOpacity>
            
            {menuItems.map((item) => (
              <TouchableOpacity 
                key={item.name}
                style={getMenuItemStyles(item.name).style}
                onPress={() => handleNavigation(item.name)}
                onMouseEnter={() => setMenuState(prev => ({ ...prev, hoveredItem: item.name }))}
                onMouseLeave={() => setMenuState(prev => ({ ...prev, hoveredItem: null }))}
              >
                <Text style={getMenuItemStyles(item.name).textStyle}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
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
    height: Platform.OS === 'web' ? 90 : 55,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'web' ? 20 : 30,
    paddingHorizontal: Platform.OS === 'web' ? 20 : 8,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    zIndex: 100,
    position: 'relative',
  },
  menuIcon: {
    padding: Platform.OS === 'web' ? 10 : 6,
    marginTop: Platform.OS === 'web' ? -8 : -4,
    marginLeft: Platform.OS === 'web' ? 0 : 2,
  },
  headertext: {
    color: '#fff',
    marginRight: Platform.OS === 'web' ? 20 : 0,
    marginLeft: Platform.OS === 'web' ? 0 : 5,
    marginBottom: Platform.OS === 'web' ? 12 : 6,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    flexShrink: 1,
    flexWrap: 'wrap',
    maxWidth: Platform.OS === 'web' ? 'auto' : '55%',
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    backdropFilter: Platform.OS === 'web' ? 'blur(1.6px)' : undefined,
    zIndex: 99,
    height: '100vh',
    width: '100vw',
  },
  menuContainer: {
    position: 'fixed',
    top: Platform.OS === 'web' ? 90 : 70,
    left: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    width: Platform.OS === 'web' ? '29%' : '75%',
    minWidth: 250,
    maxWidth: 400,
    maxHeight: 'calc(100vh - 90px)',
    overflowY: 'auto',
    paddingTop: Platform.OS === 'web' ? 20 : 15,
    paddingBottom: Platform.OS === 'web' ? 20 : 15,
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
    padding: Platform.OS === 'web' ? 15 : 12,
    marginHorizontal: Platform.OS === 'web' ? 25 : 15,
    marginVertical: Platform.OS === 'web' ? 5 : 3,
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
    fontSize: Platform.OS === 'web' ? 17 : 15,
    letterSpacing: 0.75,
    color: '#2c3e50',
    fontWeight: '500',
    textAlign: 'center',
    transition: 'all 0.3s ease-in-out',
  },
  closeButton: {
    position: 'absolute',
    right: Platform.OS === 'web' ? 20 : 10,
    top: Platform.OS === 'web' ? 25.5 : 15,
    padding: Platform.OS === 'web' ? 12 : 8,
    backgroundColor: 'rgba(0, 184, 186, 0.9)',
    backdropFilter: 'blur(5px)',
    borderRadius: 35,
    zIndex: 101,
    elevation: 12,
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
  activeMenuItem: {
    borderWidth: 2.5,
    borderColor: '#00B8BA',
    backgroundColor: 'rgba(0, 184, 186, 0.08)',
    transform: [{ scale: 1.02 }],
    shadowColor: '#00B8BA',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  activeMenuText: {
    color: '#00B8BA',
    fontWeight: '600',
    letterSpacing: 0.8,
  },
});

export default Header;