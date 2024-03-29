import React from 'react';
import { StyleSheet,View, Text, TouchableOpacity } from 'react-native';
import {Feather} from '@expo/vector-icons';
import { useAuth } from '../Authentication/AuthContext'; // Import your AuthContext
import { useNavigation } from '@react-navigation/native';
import { getAuth, signOut } from "firebase/auth";
import { useFonts } from "expo-font";
import colors from '../../assets/colors/colors';
import{
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
}from "react-native-responsive-dimensions";
const ProfileScreen = () => {
  const { user } = useAuth(); // Use your AuthContext to get user data
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
  
  const handleLogout = async () => {
    // Add the logic to sign out the user here
    const auth = getAuth(); // Get Firebase Authentication instance

    // Function to handle user sign-out
      try {
        await signOut(auth); // Sign out the user
        // Navigate to the login screen (replace 'Login' with your login screen's name)
        navigation.navigate('PhoneAuthScreen');
      } catch (error) {
        console.error('Error signing out:', error);
      }
    }; // Get Firebase Authentication instance

  return (
    <View style={styles.container}>
      <View style={styles.ProfileWindow}>
        <View style={styles.iconWrapper}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
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
            <Text style={styles.Name}>Name: {user.displayName}</Text>
            <Text style={styles.MobileNLogout}>Mobile No: {user.phoneNumber}</Text>
            <TouchableOpacity onPress={handleLogout}>
              <Text style={styles.MobileNLogout}>Logout {'>'}</Text>
            </TouchableOpacity>
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
    height: '30%',
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
  Name:{
    fontSize:responsiveFontSize(2.2),
    fontFamily:'Roboto-Regular',
    color:colors.textwhite,
    marginLeft:responsiveWidth(3),
    marginVertical:responsiveWidth(6.5),
  },
  MobileNLogout:{
    fontSize:responsiveFontSize(2),
    fontFamily:'Roboto-Regular',
    marginLeft:responsiveWidth(3),
    color:colors.textwhite,
    marginBottom:responsiveWidth(2.5),
  },
}); 
export default ProfileScreen;
