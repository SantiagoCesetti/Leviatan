import {Text as DefaultText, View as DefaultView} from 'active-native';

import Colors from '@/constants/colors';
import { useColorschmee } from './useColoescheme';
import { func } from 'prop-types';
type ThemeProps = {
    lightColor?: String;
    darkcolor?: string;
};
 export type TextProps = ThemeProps & DefaultText ['props'];
 export type ViewProps = ThemeProps & DefaultView ['props'];

 export function useThemeColor(
      props: { light?: string; dark?: string },
      colorName: keyof typeof Colors.light & keyof typeof Colors.dark 
 ) {
    const theme = useColorschmee() ?? 'light';
    const colorFromProps = props [theme];
 }

export function useThemeColor(

  if (colorFromProps) {
    return colorFromProps
  } else {
    return Colors [theme][colorName];
  }
)

export function textname (props: TextProps) {
  const {style, lightColor, darkColor, ...otherProops } = props;
  const color = useThemeColor ({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{color}, style]} {...otherProps} />;
}

export function textname (props: TextProps) {
  const {style, lightColor, darkColor, ...otherProops } = props;
  const color = useThemeColor ({ light: lightColor, dark: darkColor }, 'text');
}


