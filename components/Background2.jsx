import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';

const Background = () => {
  // Agrupar las animaciones por tipo usando useRef
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

  // Función reutilizable para crear animaciones
  const createLoopAnimation = (animation, duration, returnDuration = 0) => {
    return Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration,
          easing: Easing.linear,
          useNativeDriver: true
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: returnDuration,
          easing: Easing.linear,
          useNativeDriver: true
        })
      ])
    );
  };

  useEffect(() => {
    // Configurar todas las animaciones
    const animationGroup = [
      // Burbujas
      createLoopAnimation(animations.bubbles.bubble1, 4000),
      createLoopAnimation(animations.bubbles.bubble2, 5000),
      
      // Gotas
      createLoopAnimation(animations.drops.drop1, 2000),
      createLoopAnimation(animations.drops.drop2, 3000),
      
      // Olas con retorno suave
      createLoopAnimation(animations.waves.wave1, 6000, 6000),
      createLoopAnimation(animations.waves.wave2, 8000, 8000),
      createLoopAnimation(animations.waves.wave3, 10000, 10000)
    ];

    // Iniciar todas las animaciones
    Animated.parallel(animationGroup).start();

    // Limpieza
    return () => {
      animationGroup.forEach(anim => anim.stop());
    };
  }, []);

  // Configuración de las olas
  const waves = [
    { 
      anim: animations.waves.wave1, 
      style: styles.wave,
      xRange: [-40, 0, 40],
      yRange: [0, -10, 0, -8, 0]
    },
    { 
      anim: animations.waves.wave2, 
      style: [styles.wave, styles.wave2],
      xRange: [35, 0, -35],
      yRange: [0, -12, 0, -10, 0]
    },
    { 
      anim: animations.waves.wave3, 
      style: [styles.wave, styles.wave3],
      xRange: [-30, 0, 30],
      yRange: [0, -8, 0, -6, 0]
    }
  ];

  return (
    <View style={styles.container}>
      {/* Olas */}
      {waves.map((wave, index) => (
        <Animated.View
          key={`wave-${index}`}
          style={[
            wave.style,
            {
              transform: [
                { scaleX: 1.5 },
                {
                  translateX: wave.anim.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: wave.xRange
                  })
                },
                {
                  translateY: wave.anim.interpolate({
                    inputRange: [0, 0.25, 0.5, 0.75, 1],
                    outputRange: wave.yRange
                  })
                }
              ]
            }
          ]}
        />
      ))}

      {/* Burbujas */}
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
                  outputRange: [600, -100]
                })
              }],
              opacity: bubble.anim.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [0.8, 0.4, 0]
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
                  outputRange: [-50, 800]
                })
              }]
            }
          ]}
        />
      ))}
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

export default React.memo(Background);
