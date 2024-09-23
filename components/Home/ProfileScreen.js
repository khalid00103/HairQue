import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useAuth } from '../Authentication/AuthContext'; // Import your AuthContext
import { useNavigation } from '@react-navigation/native';
import { getAuth, signOut } from "firebase/auth";
import { getDatabase, ref, get } from 'firebase/database';
import { encodeEmail } from '../../utils/encodeEmail';
import { useFonts } from "expo-font";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import colors from '../../assets/colors/colors';
import styles from './styles/profileScreenStyles'; // Import the external styles

const ProfileScreen = () => {
  const { user } = useAuth(); // Use your AuthContext to get user data
  const [phone, setPhoneNumber] = useState('');
  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    'Oswald-Medium': require('../../assets/fonts/Oswald-Medium.ttf'),
    'Roboto-Regular': require('../../assets/fonts/Roboto-Regular.ttf'),
    'NotoSerif-Regular': require('../../assets/fonts/NotoSerif-Regular.ttf'),
    'Inconsolata-Regular': require('../../assets/fonts/Inconsolata-Regular.ttf'),
    'Inconsolata-Bold': require('../../assets/fonts/Inconsolata-Bold.ttf'),
    'Inconsolata-ExtraBold': require('../../assets/fonts/Inconsolata-ExtraBold.ttf'),
    'Inconsolata-Medium': require('../../assets/fonts/Inconsolata-Medium.ttf'),
  });

  useEffect(() => {
    const fetchPhoneNumber = async () => {
      try {
        const db = getDatabase();
        const encodedEmail = encodeEmail(user.email);
        const userRef = ref(db, `users/${encodedEmail}`);
        const snapshot = await get(userRef);

        if (snapshot.exists()) {
          const userData = snapshot.val();
          setPhoneNumber(userData.phoneNumber); // Sets the phone number
        } else {
          console.error("No user data found!");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchPhoneNumber();
  }, [user]);

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      navigation.navigate('EmailAuthScreen');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.ProfileWindow}>
        <View style={styles.iconWrapper}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Feather name="arrow-left" size={responsiveWidth(6.5)} color={colors.textwhite} />
          </TouchableOpacity>
        </View>

        <View style={styles.ProfileDetails}>
          <View style={styles.userFeather}>
            <Feather name="user" size={responsiveWidth(10)} color={colors.textblack} />
          </View>
          <View>
            {user ? (
              <>
                <View style={styles.UserData_sections}>
                  <Text style={styles.MobileNLogout}>Name:</Text>
                  <Text style={styles.MobileNLogout}>{user.displayName}</Text>
                </View>
                <View style={styles.UserData_sections}>
                  <Text style={styles.MobileNLogout}>Phone No:</Text>
                  <Text style={styles.MobileNLogout}>{phone}</Text>
                </View>
                <View style={styles.UserData_sections}>
                  <Text style={styles.MobileNLogout}>Email Id:</Text>
                  <Text style={styles.MobileNLogout}>{user.email}</Text>
                </View>
                <View style={styles.UserData_sections}>
                  <TouchableOpacity onPress={handleLogout}>
                    <Text style={styles.MobileNLogout}>Logout {'>'}</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <Text>User not authenticated.</Text>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;
