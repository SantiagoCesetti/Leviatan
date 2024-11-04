import React from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';

const Background = () => {
  // Usar useRef para mantener las referencias de las animaciones
  const bubbleAnim1 = React.useRef(new Animated.Value(0)).current;
  const bubbleAnim2 = React.useRef(new Animated.Value(0)).current;
  const dropAnim1 = React.useRef(new Animated.Value(0)).current;
  const dropAnim2 = React.useRef(new Animated.Value(0)).current;
  const waveAnim1 = React.useRef(new Animated.Value(0)).current;
  const waveAnim2 = React.useRef(new Animated.Value(0)).current;
  const waveAnim3 = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const animate = () => {
      Animated.parallel([
        // Animación de burbujas subiendo
        Animated.loop(
          Animated.sequence([
            Animated.timing(bubbleAnim1, {
              toValue: 1,
              duration: 4000,
              easing: Easing.linear,
              useNativeDriver: true
            }),
            Animated.timing(bubbleAnim1, {
              toValue: 0,
              duration: 0,
              useNativeDriver: true
            })
          ])
        ),
        Animated.loop(
          Animated.sequence([
            Animated.timing(bubbleAnim2, {
              toValue: 1, 
              duration: 5000,
              easing: Easing.linear,
              useNativeDriver: true
            }),
            Animated.timing(bubbleAnim2, {
              toValue: 0,
              duration: 0,
              useNativeDriver: true
            })
          ])
        ),
        // Animación de gotas cayendo
        Animated.loop(
          Animated.sequence([
            Animated.timing(dropAnim1, {
              toValue: 1,
              duration: 2000, 
              easing: Easing.linear,
              useNativeDriver: true
            }),
            Animated.timing(dropAnim1, {
              toValue: 0,
              duration: 0,
              useNativeDriver: true
            })
          ])
        ),
        Animated.loop(
          Animated.sequence([
            Animated.timing(dropAnim2, {
              toValue: 1,
              duration: 3000,
              easing: Easing.linear, 
              useNativeDriver: true
            }),
            Animated.timing(dropAnim2, {
              toValue: 0,
              duration: 0,
              useNativeDriver: true
            })
          ])
        ),
        // Nuevas animaciones para las olas con duraciones más largas
        Animated.loop(
          Animated.sequence([
            Animated.timing(waveAnim1, {
              toValue: 1,
              duration: 6000,
              easing: Easing.linear,
              useNativeDriver: true
            }),
            Animated.timing(waveAnim1, {
              toValue: 0,
              duration: 6000,
              easing: Easing.linear,
              useNativeDriver: true
            })
          ])
        ),
        Animated.loop(
          Animated.sequence([
            Animated.timing(waveAnim2, {
              toValue: 1,
              duration: 8000,
              easing: Easing.linear,
              useNativeDriver: true
            }),
            Animated.timing(waveAnim2, {
              toValue: 0,
              duration: 8000,
              easing: Easing.linear,
              useNativeDriver: true
            })
          ])
        ),
        Animated.loop(
          Animated.sequence([
            Animated.timing(waveAnim3, {
              toValue: 1,
              duration: 10000,
              easing: Easing.linear,
              useNativeDriver: true
            }),
            Animated.timing(waveAnim3, {
              toValue: 0,
              duration: 10000,
              easing: Easing.linear,
              useNativeDriver: true
            })
          ])
        )
      ]).start();
    };

    animate();
  }, []);

  return (
    <View style={styles.container}>
      {/* Reemplazar las olas estáticas por animadas */}
      <Animated.View
        style={[
          styles.wave,
          {
            transform: [
              { scaleX: 1.5 },
              {
                translateX: waveAnim1.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [-40, 0, 40]
                })
              },
              {
                translateY: waveAnim1.interpolate({
                  inputRange: [0, 0.25, 0.5, 0.75, 1],
                  outputRange: [0, -10, 0, -8, 0]
                })
              }
            ]
          }
        ]}
      />
      <Animated.View
        style={[
          styles.wave,
          styles.wave2,
          {
            transform: [
              { scaleX: 1.5 },
              {
                translateX: waveAnim2.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [35, 0, -35]
                })
              },
              {
                translateY: waveAnim2.interpolate({
                  inputRange: [0, 0.25, 0.5, 0.75, 1],
                  outputRange: [0, -12, 0, -10, 0]
                })
              }
            ]
          }
        ]}
      />
      <Animated.View
        style={[
          styles.wave,
          styles.wave3,
          {
            transform: [
              { scaleX: 1.5 },
              {
                translateX: waveAnim3.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [-30, 0, 30]
                })
              },
              {
                translateY: waveAnim3.interpolate({
                  inputRange: [0, 0.25, 0.5, 0.75, 1],
                  outputRange: [0, -8, 0, -6, 0]
                })
              }
            ]
          }
        ]}
      />

      {/* Burbujas de jabón */}
      <Animated.View
        style={[
          styles.bubble,
          {
            transform: [
              {
                translateY: bubbleAnim1.interpolate({
                  inputRange: [0, 1],
                  outputRange: [600, -100]
                })
              }
            ],
            opacity: bubbleAnim1.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [0.8, 0.4, 0]
            })
          }
        ]}
      />
      <Animated.View
        style={[
          styles.bubble,
          styles.bubble2,
          {
            transform: [
              {
                translateY: bubbleAnim2.interpolate({
                  inputRange: [0, 1],
                  outputRange: [600, -100]
                })
              }
            ],
            opacity: bubbleAnim2.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [0.8, 0.4, 0]
            })
          }
        ]}
      />

      {/* Gotas de agua */}
      <Animated.View
        style={[
          styles.drop,
          {
            transform: [
              {
                translateY: dropAnim1.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-50, 800]
                })
              }
            ]
          }
        ]}
      />
      <Animated.View
        style={[
          styles.drop,
          styles.drop2,
          {
            transform: [
              {
                translateY: dropAnim2.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-50, 800]
                })
              }
            ]
          }
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1625',
    overflow: 'hidden',
  },
  wave: {
    position: 'absolute',
    bottom: -20,
    left: -120,
    right: -120,
    height: 130,
    backgroundColor: '#9B6B9E',
    borderTopLeftRadius: 1200,
    borderTopRightRadius: 1200,
    opacity: 0.6,
  },
  wave2: {
    bottom: -35,
    backgroundColor: '#B784A7',
    height: 120,
    opacity: 0.4,
  },
  wave3: {
    bottom: -50,
    backgroundColor: '#674EA7',
    height: 110,
    opacity: 0.2,
  },
  bubble: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(183, 132, 167, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(183, 132, 167, 0.5)',
    left: '20%',
  },
  bubble2: {
    width: 20,
    height: 20,
    left: '70%',
  },
  drop: {
    position: 'absolute',
    width: 8,
    height: 15,
    backgroundColor: '#9B6B9E',
    borderRadius: 10,
    left: '30%',
  },
  drop2: {
    left: '60%',
    height: 12,
  }
});

export default Background;
