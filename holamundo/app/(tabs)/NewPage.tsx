import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  NewPage: undefined;
};

type NewPageNavigationProp = StackNavigationProp<RootStackParamList, 'NewPage'>;

type Props = {
  navigation: NewPageNavigationProp;
};

export default function NewPage({ navigation }: Props) {
  const [scale, setScale] = useState(new Animated.Value(1));
  const [rotation, setRotation] = useState(new Animated.Value(0));

  const enlargeButton = () => {
    Animated.spring(scale, {
      toValue: 1.5,
      friction: 3,
      useNativeDriver: true,
    }).start(() => {
      // Reset the scale back to 1
      Animated.spring(scale, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }).start();
    });
  };

  const rotateButton = () => {
    Animated.timing(rotation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      // Reset the rotation back to 0
      rotation.setValue(0);
    });
  };

  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenido!</Text>
      <Text style={styles.intro}>
        Interactua con los botones y descubre que hace.
        </Text>

      <TouchableOpacity onPress={enlargeButton} style={styles.button}>
        <Animated.View style={[styles.enlargeButton, { transform: [{ scale }] }]}>
          <Text style={styles.buttonText}>Toca Aqui</Text>
        </Animated.View>
      </TouchableOpacity>

      <TouchableOpacity onPress={rotateButton} style={styles.button}>
        <Animated.View style={[styles.rotateButton, { transform: [{ rotate: rotateInterpolate }] }]}>
          <Text style={styles.buttonText}>Toca Aqui</Text>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7781bd',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#151c4a',
    marginBottom: 20,
  },
  intro: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
    lineHeight: 24,
    marginBottom: 30,
  },
  button: {
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  enlargeButton: {
    backgroundColor: '#151c4a',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  rotateButton: {
    backgroundColor: '#151c4a',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});