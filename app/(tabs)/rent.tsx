import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function RentScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Rent Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 24,
  },
});
