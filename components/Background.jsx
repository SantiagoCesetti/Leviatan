import React, { useCallback, useRef, useEffect } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';

const Background = () => {
  // Agrupar las animaciones por tipo usando useRef para mantener los valores entre renders
  const animations = useRef({
    bubbles: {
      bubble1: new Animated.Value(0),
      bubble2: new Animated.Value(0),
    },
    drops: {
      drop1: new Animated.Value(0),
      drop2: new Animated.Value(0),
    },
    waves: {
      wave1: new Animated.Value(0),
      wave2: new Animated.Value(0),
      wave3: new Animated.Value(0),
    }
  }).current;

  // Crear animación infinita para burbujas y gotas
  const createInfiniteAnimation = useCallback((animation, duration) => {
    return Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration,
          easing: Easing.ease,
          useNativeDriver: true,
          isInteraction: false
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
          isInteraction: false
        })
      ])
    );
  }, []);

  // Crear animación suave para olas
  const createWaveAnimation = useCallback((animation, duration) => {
    return Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: duration / 2,
          easing: Easing.ease,
          useNativeDriver: true,
          isInteraction: false
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: duration / 2,
          easing: Easing.ease,
          useNativeDriver: true,
          isInteraction: false
        })
      ])
    );
  }, []);

  useEffect(() => {
    // Configurar y comenzar todas las animaciones
    const animationGroup = [
      // Burbujas con diferentes velocidades y delays
      createInfiniteAnimation(animations.bubbles.bubble1, 4000),
      Animated.sequence([
        Animated.delay(2000),
        createInfiniteAnimation(animations.bubbles.bubble2, 5000)
      ]),
      
      // Gotas con diferentes velocidades y delays
      createInfiniteAnimation(animations.drops.drop1, 2000),
      Animated.sequence([
        Animated.delay(1000),
        createInfiniteAnimation(animations.drops.drop2, 3000)
      ]),
      
      // Olas con movimiento suave - Ajustadas las duraciones para coincidir con Background2
      createWaveAnimation(animations.waves.wave1, 12000),
      createWaveAnimation(animations.waves.wave2, 16000),
      createWaveAnimation(animations.waves.wave3, 20000)
    ];

    // Iniciar todas las animaciones
    Animated.parallel(animationGroup).start();

    // Limpieza de animaciones
    return () => {
      animationGroup.forEach(anim => anim.stop());
    };
  }, []);

  // Optimizar las transformaciones de las olas
  const createWaveTransform = useCallback((animation, xRange, yRange) => ({
    transform: [
      { scaleX: 1.5 },
      {
        translateX: animation.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: xRange,
          extrapolate: 'clamp'
        })
      },
      {
        translateY: animation.interpolate({
          inputRange: [0, 0.25, 0.5, 0.75, 1],
          outputRange: yRange,
          extrapolate: 'clamp'
        })
      }
    ]
  }), []);

  const waves = [
    { anim: animations.waves.wave1, style: styles.wave, xRange: [-40, 0, 40], yRange: [0, -10, 0, -8, 0] },
    { anim: animations.waves.wave2, style: [styles.wave, styles.wave2], xRange: [35, 0, -35], yRange: [0, -12, 0, -10, 0] },
    { anim: animations.waves.wave3, style: [styles.wave, styles.wave3], xRange: [-30, 0, 30], yRange: [0, -8, 0, -6, 0] }
  ];

  return (
    <View style={styles.container}>
      {/* Olas */}
      {waves.map((wave, index) => (
        <Animated.View
          key={`wave-${index}`}
          style={[
            wave.style,
            createWaveTransform(wave.anim, wave.xRange, wave.yRange)
          ]}
        />
      ))}

      {/* Burbujas con opacidad suave */}
      {[
        { anim: animations.bubbles.bubble1, style: styles.bubble },
        { anim: animations.bubbles.bubble2, style: [styles.bubble, styles.bubble2] }
      ].map((bubble, index) => (
        <Animated.View
          key={`bubble-${index}`}
          style={[
            bubble.style,
            {
              transform: [{
                translateY: bubble.anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [600, -100],
                  extrapolate: 'clamp'
                })
              }],
              opacity: bubble.anim.interpolate({
                inputRange: [0, 0.2, 0.8, 1],
                outputRange: [0, 0.8, 0.4, 0],
                extrapolate: 'clamp'
              })
            }
          ]}
        />
      ))}

      {/* Gotas */}
      {[
        { anim: animations.drops.drop1, style: styles.drop },
        { anim: animations.drops.drop2, style: [styles.drop, styles.drop2] }
      ].map((drop, index) => (
        <Animated.View
          key={`drop-${index}`}
          style={[
            drop.style,
            {
              transform: [{
                translateY: drop.anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-50, 800],
                  extrapolate: 'clamp'
                })
              }]
            }
          ]}
        />
      ))}
    </View>
  );
};

// Los estilos se mantienen igual
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F3FF',
    overflow: 'hidden',
  },
  wave: {
    position: 'absolute',
    bottom: -20,
    left: -120,
    right: -120,
    height: 130,
    backgroundColor: '#87CEFA',
    borderTopLeftRadius: 1200,
    borderTopRightRadius: 1200,
    opacity: 0.6,
  },
  wave2: {
    bottom: -35,
    backgroundColor: '#8CD2D8',
    height: 120,
    opacity: 0.4,
  },
  wave3: {
    bottom: -50,
    backgroundColor: '#4682B4',
    height: 110,
    opacity: 0.2,
  },
  bubble: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
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
    backgroundColor: '#87CEFA',
    borderRadius: 10,
    left: '30%',
  },
  drop2: {
    left: '60%',
    height: 12,
  }
});

export default React.memo(Background);
