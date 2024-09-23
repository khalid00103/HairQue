import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Important_files/firebase'; // Ensure firebase config is correct
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import colors from '../../assets/colors/colors';

const RegisterPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
    // Validate passwords
    if (!passwordRegex.test(password)) {
      Alert.alert(
        'Invalid Password',
        'Password must be at least 8 characters long, with one uppercase letter, one lowercase letter, one number, and one special character.'
      );
      return;
    }
    
    // Check if password and confirm password match
    if (password !== confirmPassword) {
      Alert.alert('Password Mismatch', 'Password and Confirm Password do not match.');
      return;
    }

    // Try registering the user with Firebase
    try {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Registered
          const user = userCredential.user;
          //navigation.navigate('UserProfileInput');
        });
    } catch (error) {
      console.error('Register Error:', error);

      // Handle specific Firebase error: email already in use
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert(
          'Email Already Registered',
          'This email is already registered. Please login or use a different email.'
        );
      } else {
        // Handle other errors
        Alert.alert('Register Error', error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        placeholderTextColor={colors.textgray}
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor={colors.textgray}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        placeholder="Confirm Password"
        placeholderTextColor={colors.textgray}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity onPress={handleRegister} style={styles.registerButton}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      {/* Navigate back to LoginPage using navigation */}
      <Text 
        style={{ marginTop: 10, color: colors.textwhite }}
        onPress={() => navigation.navigate('LoginPage')}
      >
        Already have an account?
        <Text style={styles.loginText}> Login here</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Take up the full space
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.textblack,
  },
  input: {
    width: '80%',
    padding: 10,
    margin: 10,
    borderWidth: 1,
    color: colors.textwhite,
    borderColor: 'gray',
    borderRadius: 5,
  },
  registerButton: {
    width: '80%',
    padding: 10,
    backgroundColor: colors.textwhite,
    borderRadius: 5,
  },
  buttonText: {
    textAlign:'center',
    color: colors.textblack,
    fontWeight: 'bold',
  },
  loginText: {
    color: '#007BFF',
  },
});

export default RegisterPage;
