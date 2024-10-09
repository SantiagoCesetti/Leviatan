import { Text as DefaultText, View as DefaultView } from 'react-native'; 
import Colors from '@/constants/Colors';

// Función para obtener el color basado en el esquema de color
export function useThemeColor(props, colorName) {
  const theme = useColorScheme() ?? 'light'; 
  const colorFromProps = props[theme]; 

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

// Componente Text con tema
export function ThemedText(props) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

// Componente View con tema
export function ThemedView(props) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}
