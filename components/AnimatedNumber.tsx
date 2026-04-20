import React, { useEffect, useRef } from 'react';
import { Animated, Text, StyleSheet } from 'react-native';
import { Colors, FontSize } from '@/constants/theme';

interface Props {
  target: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  style?: object;
  fontSize?: number;
  color?: string;
}

export function AnimatedNumber({ 
  target, 
  duration = 1800, 
  suffix = '', 
  prefix = '', 
  style, 
  fontSize = FontSize.hero, 
  color = Colors.green 
}: Props) {
  const animValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Reset to 0 before animating if target changes, or remove the reset 
    // to animate from current value to new target.
    animValue.setValue(0); 
    
    Animated.timing(animValue, {
      toValue: target,
      duration,
      useNativeDriver: false, // Must be false for interpolation of strings/numbers in Text
    }).start();
  }, [target]);

  // Interpolation handles the transition from start to target value
  const animatedText = animValue.interpolate({
    inputRange: [0, target],
    outputRange: [`${prefix}0${suffix}`, `${prefix}${target}${suffix}`],
  });

  return (
    <Animated.Text
      style={[{ fontSize, fontWeight: '800', color, letterSpacing: -1 }, style]}
    >
      {animatedText}
    </Animated.Text>
  );
}
