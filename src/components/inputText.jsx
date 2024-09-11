import { Text as ThemedText } from './themed';

export function MonoText(props) {
  return (
    <ThemedText
      {...props}
      style={[props.style, { fontFamily: 'Spacemono' }]}
    />
  );
}
