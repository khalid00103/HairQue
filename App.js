// App.js
import React, { useState, useEffect } from "react";
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'; 
import { AuthProvider, useAuth } from "./components/Authentication/AuthContext";
import { getAuth } from 'firebase/auth';
import { GlobalStateProvider } from './components/Important_files/GlobalState';

import EmailAuthScreen from "./components/Authentication/EmailAuthScreen"; // Updated
import MainStackScreen from './components/Important_files/MainStack'; // Ensure MainStack is correctly set up

import colors from './assets/colors/colors';

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}; 

const AppContent = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.textwhite} />
      </View>
    );
  }

  return (
    <GlobalStateProvider>
      <NavigationContainer>
        {user ? (
          <MainStackScreen />
        ) : (
          <EmailAuthScreen />
        )}
      </NavigationContainer>
    </GlobalStateProvider>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.textblack,
  },
});

export default App;
