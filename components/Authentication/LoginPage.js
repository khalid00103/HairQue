// components/Authentication/LoginPage.js
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Important_files/firebase'; // Ensure firebase config is correct
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import colors from '../../assets/colors/colors';

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          //navigation.navigate('UserProfileInput');
        });
    } catch (error) {
      switch (error.code) {
        case 'auth/user-not-found':
          Alert.alert('Login Error', 'User is not registered with this email or user not found.');
          break;
        case 'auth/wrong-password':
          Alert.alert('Login Error', 'Incorrect password entered. Please try again!');
          break;
        default:
          Alert.alert('Login Error', error.message);
          break;
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
      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Navigate to RegisterPage */}
      <Text 
        style={{ marginTop: 10, color: colors.textwhite }}
        onPress={() => navigation.navigate('RegisterPage')}
      >
        Not a member?
        <Text style={styles.registerText}> Register now</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Take up the full space
    //height: '100%',
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
  loginButton: {
    width: '80%',
    padding: 10,
    backgroundColor: colors.textwhite,
    borderRadius: 5,
  },
  buttonText: {
    textAlign: 'center',
    color: colors.textblack,
    fontWeight: 'bold',
  },
  registerText: {
    color: '#007BFF',
  },
});

export default LoginPage;
