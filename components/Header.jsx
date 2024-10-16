import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';

const Header = ({ handleHomeNavigation }) => (
<View style={styles.header}>
<TouchableOpacity onPress={handleHomeNavigation} style={styles.homeIcon}>
  <Ionicons name="home-outline" size={24} color="black" />
</TouchableOpacity>
<Text style={styles.headertext}>Clean Class</Text>
</View>
);

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#00B8BA",
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
      },
      homeIcon: {
        padding: 10,
      },
      headertext: {
        fontSize: 25,
        color: '#000000',
        fontWeight: 'bold'
      }
});

export default Header;