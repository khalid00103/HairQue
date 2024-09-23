// components/Authentication/EmailAuthScreen.js
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar} from 'react-native';
import { useFonts } from 'expo-font';
import colors from '../../assets/colors/colors';
import AuthStackScreen from './AuthStack'; // Import AuthStack

const EmailAuthScreen = () => {
  const [fontsLoaded] = useFonts({
    'Oswald-Medium': require('../../assets/fonts/Oswald-Medium.ttf'),
    'Roboto-Regular': require('../../assets/fonts/Roboto-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.emailAuthContainer}>
      <StatusBar barStyle="light-content" backgroundColor={colors.statusBarColor} />
      {/* Title Section */}
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>HairQue</Text>
      </View>

      {/* Auth Stack Section */}
      <View style={styles.authContainer}>
        <AuthStackScreen />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  emailAuthContainer: {
    flex: 1, // Ensure it takes up the full screen height
    justifyContent: 'flex-end',
    //alignItems: 'center',
    backgroundColor: colors.textblack,
  },
  titleContainer: {
    width: '100%',
    alignItems: 'center', // Center the title horizontally
    //paddingVertical: 20, // Add some spacing around the title
  },
  titleText: {
    fontSize: 34,
    fontFamily: 'Oswald-Medium',
    color: colors.textwhite,
    textAlign: 'center',
  },
  authContainer: {
    //flex: 0.5, // Ensure the AuthStackScreen takes up the rest of the screen
    height: '70%',
    //justifyContent: 'center',
    //alignItems: 'center', // Center the form horizontally
    //backgroundColor: colors.TextBlood,
  },
});

export default EmailAuthScreen;
