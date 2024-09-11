import { Text as DefaultText, View as DefaultView } from 'react-native'; 
import Colors from '@/constants/colors'; 
import { useColorScheme } from './useColorScheme'; 

// eta funcion te da el color segun el esquema de color 
export function useThemeColor(props, colorName) {
  const theme = useColorScheme() ?? 'light'; 
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

// text con tema
export function ThemedText(props) {
  const { style, lightColor, darkColor, ...otherProps } = props; // Desestructuración de props
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

// view con tema
export function ThemedView(props) {
  const { style, lightColor, darkColor, ...otherProps } = props; // Desestructuración de props
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}
