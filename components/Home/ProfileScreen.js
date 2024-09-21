import React, { useState, useEffect } from 'react';
import { StyleSheet,View, Text, TouchableOpacity } from 'react-native';
import {Feather} from '@expo/vector-icons';
import { useAuth } from '../Authentication/AuthContext'; // Import your AuthContext
import { useNavigation } from '@react-navigation/native';
import { getAuth, signOut } from "firebase/auth";
import { getDatabase, ref, get } from 'firebase/database';
import { encodeEmail } from '../../utils/encodeEmail';
import { useFonts } from "expo-font";
import colors from '../../assets/colors/colors';
import{
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
}from "react-native-responsive-dimensions";


const ProfileScreen = () => {
  const { user } = useAuth(); // Use your AuthContext to get user data
  //console.log(user);
  const [phone, setPhoneNumber] = useState('');
  const navigation = useNavigation(); // Use the navigation hook

  const [fontsLoaded]= useFonts({
    'Oswald-Medium' : require('../../assets/fonts/Oswald-Medium.ttf'),
    'Roboto-Regular': require('../../assets/fonts/Roboto-Regular.ttf'),
    'NotoSerif-Regular' : require('../../assets/fonts/NotoSerif-Regular.ttf'),
    'Inconsolata-Regular':require('../../assets/fonts/Inconsolata-Regular.ttf'),
    'Inconsolata-Bold':require('../../assets/fonts/Inconsolata-Bold.ttf'),
    'Inconsolata-ExtraBold':require('../../assets/fonts/Inconsolata-ExtraBold.ttf'),
    'Inconsolata-Medium':require('../../assets/fonts/Inconsolata-Medium.ttf'),
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
    // Add the logic to sign out the user here
    const auth = getAuth(); // Get Firebase Authentication instance

    // Function to handle user sign-out
      try {
        await signOut(auth); // Sign out the user
        // Navigate to the login screen (replace 'Login' with your login screen's name)
        navigation.navigate('EmailAuthScreen');
      } catch (error) {
        console.error('Error signing out:', error);
      }
    }; // Get Firebase Authentication instance

  return (
    <View style={styles.container}>
      <View style={styles.ProfileWindow}>
        <View style={styles.iconWrapper}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Feather name="arrow-left" size = {responsiveWidth(6.5)} color={colors.textwhite}/>
        </TouchableOpacity>
        </View>
        <View style={styles.ProfileDetails}>
          <View style={styles.userFeather}>
            <Feather name="user" size = {responsiveWidth(10)} color={colors.textblack} />
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

const styles = StyleSheet.create({
  container:{
    width: '100%',
    height: '100%',
    //justifyContent:'center',
    alignItems: 'center',
    backgroundColor:colors.textblack,
  },
  ProfileWindow:{
    //flexDirection: 'column',
    marginTop:responsiveHeight(2),
    //height: '30%',
    display: 'flex',
    width: '95%',
    //justifyContent: 'space-around',
    backgroundColor:colors.cardbackground,
    borderRadius: responsiveWidth(5),
  },
  iconWrapper:{
    //flexDirection: 'row',
    //position: 'absolute',
    //margin:25,
    margin:responsiveWidth(3.5),
    width:responsiveWidth(8),
    height:responsiveHeight(4),
    backgroundColor:'rgba(9,9,9,0.5)',
    borderRadius:responsiveWidth(50),
    justifyContent:'center',
    alignItems: 'center',
  },
  ProfileDetails:{
    flexDirection: 'row',
    //alignItems: 'center',
    //backgroundColor:colors.TextBlood,
    marginLeft:responsiveWidth(3.5),
  },
  userFeather:{
    backgroundColor:colors.textwhite,
    justifyContent: 'center',
    alignItems: 'center',
    height:responsiveHeight(10),
    width:responsiveWidth(18),
    borderRadius:responsiveWidth(5),
  },
  UserData_sections:{
    //fontSize:responsiveFontSize(2.2),
    //fontFamily:'Roboto-Regular',
    //color:colors.textwhite,
    //marginLeft:responsiveWidth(3),
    marginBottom:responsiveWidth(3),
  },
  MobileNLogout:{
    fontSize:responsiveFontSize(2),
    fontFamily:'Roboto-Regular',
    marginLeft:responsiveWidth(3),
    color:colors.textwhite,
    marginBottom:responsiveWidth(2),
  },
}); 
export default ProfileScreen;
