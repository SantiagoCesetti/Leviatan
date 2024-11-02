import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';

const Header = ({ handleHomeNavigation }) => (
<View style={styles.header}>
<TouchableOpacity onPress={handleHomeNavigation} style={styles.menuIcon}>
  <Ionicons name="menu" size={30} color="white" />
</TouchableOpacity>
<Text style={styles.headertext}>✨ Clean Class ✨</Text>
</View>
);

const styles = StyleSheet.create({
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
      }
});

export default Header;