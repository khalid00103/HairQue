import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import LoginPage from './LoginPage'; // Replacing EmailConfirm with Login
import RegisterPage from './RegisterPage'; // Replacing EmailInput with Register
import { useFonts } from 'expo-font';
import colors from '../../assets/colors/colors';

const EmailAuthScreen = ({ navigation }) => {
  const [isRegistered, setIsRegistered] = useState(true); // Start with login first

  const [fontsLoaded] = useFonts({
    'Oswald-Medium': require('../../assets/fonts/Oswald-Medium.ttf'),
    'Roboto-Regular': require('../../assets/fonts/Roboto-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>HairQue</Text>
      </View>
      {isRegistered ? (
        <LoginPage setIsRegistered={setIsRegistered} navigation={navigation} />
      ) : (
        <RegisterPage setIsRegistered={setIsRegistered} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.textblack,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    width: '100%',
    marginBottom: 250,
  },
  titleText: {
    fontSize: 34,
    fontFamily: 'Oswald-Medium',
    color: colors.textwhite,
    textAlign: 'center',
  },
});

export default EmailAuthScreen;
