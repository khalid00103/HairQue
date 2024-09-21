import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, TouchableOpacity, StyleSheet, Text, StatusBar} from 'react-native';
import { RadioButton} from 'react-native-paper';
import { SafeAreaView } from "react-native-safe-area-context";
import { getDatabase, ref, get, set } from 'firebase/database';
import { doc, setDoc } from 'firebase/firestore';
import { FIRESTORE_DB } from '../firebase';
import { useAuth } from './AuthContext';
import app from '../firebase';
import { getAuth, updateProfile } from "firebase/auth";
import { useFonts } from "expo-font";
import colors from '../../assets/colors/colors';
import { encodeEmail } from '../../utils/encodeEmail';
//import { useGlobalState } from '../GlobalState';

const UserProfileInput = ({ navigation, route }) => {
  //const { phoneNumber } = route.params;
  const { user } = useAuth();
  const [phone, setPhone] = useState('');
  //const { setPhoneNumber } = useGlobalState();
  const [displayName, setdisplayName] = useState('');
  const [gender, setGender] = useState('');

  const isNameEntered = displayName.trim() !== '';
  const isGenderSelected = gender.trim() !== '';
  const isProfileComplete = isNameEntered && isGenderSelected;
  const [profileUpdated, setProfileUpdated] = useState(false);
  const [fontsLoaded]= useFonts({
    'Oswald-Medium' : require('../../assets/fonts/Oswald-Medium.ttf'),
    'Roboto-Regular': require('../../assets/fonts/Roboto-Regular.ttf'),
    'NotoSerif-Regular' : require('../../assets/fonts/NotoSerif-Regular.ttf'),
    'Inconsolata-Regular':require('../../assets/fonts/Inconsolata-Regular.ttf'),
    'Inconsolata-Bold':require('../../assets/fonts/Inconsolata-Bold.ttf'),
    'Inconsolata-ExtraBold':require('../../assets/fonts/Inconsolata-ExtraBold.ttf'),
    'Inconsolata-Medium':require('../../assets/fonts/Inconsolata-Medium.ttf'),
  });

  const handleGenderChange = (selectedGender) => {
    setGender(selectedGender);
  };


  const saveUserProfile = async () => {
    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (!isProfileComplete) {
        console.error('Please enter both name and gender.');
        return;
      }

      const formattedPhoneNumber = `+91${phone}`;
      const db = getDatabase();
      const encodedEmail = encodeEmail(user.email); // Encode the user's email
      const userRef = ref(db, 'users/' + encodedEmail);
  
      await set(userRef, {
        phoneNumber: formattedPhoneNumber,
        displayName: displayName,
        gender: gender,
      });

      await updateProfile(currentUser, {
        displayName: displayName,
      });

      setProfileUpdated(true);
      
      //const formattedPhoneNumber = `+91${phone}`;
      //setPhoneNumber(formattedPhoneNumber);
      //console.log(formattedPhoneNumber);
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error saving user profile:', error);
    }
  };

  useEffect(() => {
    if (profileUpdated) {
      //console.log(user);
    }
  }, [profileUpdated]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor="#000000"
        barStyle={'default'}
      /> 
      <View style={styles.HairQueVIew}>
        <Text style={styles.HairQuetxt}>HairQue</Text>
      </View>
      <View style={styles.childContainer}>
      <View style={styles.wholeName}>
        <View style={styles.nameTag}>
          <Text style={styles.name}>Name :</Text>
        </View>
        <TextInput
          placeholder="Username"
          placeholderTextColor={"gray"}
          value={displayName}
          onChangeText={setdisplayName}
          style={styles.input}
        />
      </View>

      <View style={styles.wholeName}>
        <View style={styles.nameTag}>
          <Text style={styles.name}>Phone :</Text>
        </View>
        <TextInput
          placeholder="Phone Number"
          value={phone}
          onChangeText={setPhone}
          maxLength={10}
          keyboardType="phone-pad"
          style={styles.input}
        />
      </View>

      <View style={styles.GenderSelection}>
        <Text style={styles.Gendertxt}>Gender:</Text>
        <RadioButton.Group onValueChange={handleGenderChange} value={gender}>
        <View style={styles.radioGroup}>
          <View style={styles.radioButtonContainer}>
            <RadioButton value="male" color="blue" />
            <Text style={{ color: colors.textwhite}}>Male</Text>
          </View>
          <View style={styles.radioButtonContainer}>
            <RadioButton value="female" color="pink" />
            <Text style={{ color: colors.textwhite}}>Female</Text>
          </View>
        </View>
        </RadioButton.Group>
      </View>
      <TouchableOpacity onPress={saveUserProfile} disabled={!isProfileComplete} style={[styles.saveProfileBtn, { backgroundColor: !isProfileComplete ? 'gray' : colors.textwhite}]}>
        <Text style={styles.text}>Save Profile</Text>
      </TouchableOpacity>
      </View> 
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:colors.textblack,
    justifyContent: 'center',
    alignItems: 'center',
  },
  HairQueVIew:{
    width: "100%",
    //backgroundColor: colors.TextBlood,
    marginBottom:20,
  },
  HairQuetxt:{
  //  fontSize:responsiveFontSize(2.7),
    fontSize:34,
    //marginBottom:50,
    fontFamily: 'Oswald-Medium',
    color: colors.textwhite,
    textAlign: 'center',
  },
  childContainer: {
    width: '100%', // You can adjust this width as needed
  },
  wholeName:{
    flexDirection:'row',
    //backgroundColor:colors.TextBlood,
    justifyContent:'space-between',
    marginHorizontal:20,
    borderColor: '#7f8c8d33',
    borderWidth: 2,
    borderRadius:12,
  },
  nameTag:{
    padding: 10,
    //paddingBottom:10,
    //paddingHorizontal: 10,
    backgroundColor:colors.cardbackground,
    borderColor: '#7f8c8d33',
    borderRightWidth: 2,
    borderTopStartRadius:12,
    borderBottomStartRadius: 12,
    //marginBottom: 10,
    textAlign: 'center',
  },
  name:{
    fontSize: 18,
    color:colors.textwhite,
    textAlign: 'center',
  },
  input: {
    padding: 10,
    //paddingBottom:10,
    //paddingHorizontal: 10,
    width:"80%",
    fontSize: 18,
    color:colors.textwhite,
    
    //borderRadius: 12,
    //marginBottom: 10,
    //textAlign: 'center',
  },
  GenderSelection:{
    marginHorizontal:20,
    paddingVertical:20,
    //backgroundColor:colors.TextBlood,
  },
  Gendertxt:{
    //padding:10,
    padding:10,
    fontSize: 18,
    color:colors.textwhite,
    //marginHorizontal: 20,
  },
  radioGroup: {
    flexDirection: 'row',
    //backgroundColor:colors.TextBlood,
    alignItems: 'center',
    //justifyContent: 'center',
    //marginHorizontal: 20,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  saveProfileBtn: {
    padding: 10,
    marginHorizontal:20,
    backgroundColor:colors.textwhite,
    borderRadius: 10,
    textAlign: 'center',
  },
  text:{
    fontSize: 18,
    color:colors.textblack,
    textAlign: 'center',
  },
});

export default UserProfileInput;
