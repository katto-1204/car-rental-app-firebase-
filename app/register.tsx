import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';

const RegisterScreen: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      email: '',
      password: '',
      confirmPassword: '',
      username: '',
    };

    // Username validation
    if (!formData.username) {
      newErrors.username = 'Username is required';
      isValid = false;
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
      isValid = false;
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      isValid = false;
    } else if (!/(?=.*[0-9])/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one number';
      isValid = false;
    } else if (!/(?=.*[A-Z])/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter';
      isValid = false;
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRegister = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      if (validateForm()) {
        // Add loading state
        setTimeout(() => {
          // Simulating API call
          console.log('Registering with:', formData);
          router.replace('/login');
        }, 1500);
      }
    } catch (error) {
      Alert.alert('Error', 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        style={[styles.input, errors.username && styles.inputError]}
        placeholder="Username"
        placeholderTextColor="#aaa"
        value={formData.username}
        onChangeText={(text) => {
          setFormData(prev => ({ ...prev, username: text }));
          setErrors(prev => ({ ...prev, username: '' }));
        }}
      />
      {errors.username ? <Text style={styles.errorText}>{errors.username}</Text> : null}

      <TextInput
        style={[styles.input, errors.email && styles.inputError]}
        placeholder="Email"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        autoCapitalize="none"
        value={formData.email}
        onChangeText={(text) => {
          setFormData(prev => ({ ...prev, email: text }));
          setErrors(prev => ({ ...prev, email: '' }));
        }}
      />
      {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

      <TextInput
        style={[styles.input, errors.password && styles.inputError]}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={formData.password}
        onChangeText={(text) => {
          setFormData(prev => ({ ...prev, password: text }));
          setErrors(prev => ({ ...prev, password: '' }));
        }}
      />
      {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

      <TextInput
        style={[styles.input, errors.confirmPassword && styles.inputError]}
        placeholder="Confirm Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={formData.confirmPassword}
        onChangeText={(text) => {
          setFormData(prev => ({ ...prev, confirmPassword: text }));
          setErrors(prev => ({ ...prev, confirmPassword: '' }));
        }}
      />
      {errors.confirmPassword ? <Text style={styles.errorText}>{errors.confirmPassword}</Text> : null}

      <TouchableOpacity 
        style={[styles.button, isSubmitting && styles.buttonDisabled]} 
        onPress={handleRegister}
        disabled={isSubmitting}
      >
        <Text style={styles.buttonText}>
          {isSubmitting ? 'Creating Account...' : 'Register'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace('/login')}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1054CF', // Changed from '#4A90E2'
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Translucent white
    borderWidth: 1,
    borderColor: '#ffffff',
    borderRadius: 25, // More rounded corners
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#ffffff', // Make text white
  },
  inputError: {
    borderColor: '#FF0000', // Red border for error
  },
  errorText: {
    color: '#FF0000', // Red text for error messages
    fontSize: 12,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#FFB700',
    borderRadius: 25, // Increased from 8
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonDisabled: {
    backgroundColor: '#FFD580', // Lighter shade for disabled button
  },
  buttonText: {
    color: '#FFFFFF', // Changed to white for better contrast
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
