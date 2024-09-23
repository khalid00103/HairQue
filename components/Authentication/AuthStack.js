// components/Authentication/AuthStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
//import UserProfileInput from './UserProfileInput'; // Import the UserProfileInput here

const AuthStack = createNativeStackNavigator();

const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator initialRouteName="LoginPage">
      <AuthStack.Screen 
        name="LoginPage" 
        component={LoginPage} 
        options={{ headerShown: false }}
      />
      <AuthStack.Screen 
        name="RegisterPage" 
        component={RegisterPage} 
        options={{ headerShown: false }} 
      />
      {/* <AuthStack.Screen 
        name="UserProfileInput" // Add UserProfileInput here
        component={UserProfileInput}
        options={{ headerShown: false }} 
      /> */}
    </AuthStack.Navigator>
  );
};

export default AuthStackScreen;
