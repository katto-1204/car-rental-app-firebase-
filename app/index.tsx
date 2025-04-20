import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const WelcomeScreen: React.FC = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.logoText}>CAR RENTAL</Text>

      <Text style={styles.title}>Welcome to Car Rental App</Text>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/login')}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/register')}>
        <Text style={styles.registerText}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4A90E2',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logoText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 40,
  },
  title: {
    fontSize: 22,
    color: '#fff',
    fontWeight: '500',
    marginBottom: 60,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    marginBottom: 20,
  },
  buttonText: {
    color: '#4A90E2',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerText: {
    color: '#fff',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
