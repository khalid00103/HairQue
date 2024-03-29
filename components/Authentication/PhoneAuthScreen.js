import React, { useState } from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from './AuthContext';
import {auth} from '../firebase';
import PhoneInput from './PhoneInput';
import OtpInput from './OtpInput';
import { useFonts } from "expo-font";
import colors from '../../assets/colors/colors';
const PhoneAuthScreen = ({ navigation }) => {
  const [verificationId, setVerificationId] = useState(null);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  const [fontsLoaded]= useFonts({
    'Oswald-Medium' : require('../../assets/fonts/Oswald-Medium.ttf'),
    'Roboto-Regular': require('../../assets/fonts/Roboto-Regular.ttf'),
    'NotoSerif-Regular' : require('../../assets/fonts/NotoSerif-Regular.ttf'),
    'Inconsolata-Regular':require('../../assets/fonts/Inconsolata-Regular.ttf'),
    'Inconsolata-Bold':require('../../assets/fonts/Inconsolata-Bold.ttf'),
    'Inconsolata-ExtraBold':require('../../assets/fonts/Inconsolata-ExtraBold.ttf'),
    'Inconsolata-Medium':require('../../assets/fonts/Inconsolata-Medium.ttf'),
  });

  if(!fontsLoaded){
    return null
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor="#000000"
        barStyle={'default'}
      /> 
      <View style={styles.HairQueVIew}>
        <Text style={styles.HairQuetxt}>HairQue</Text>
      </View>
      {!showOtpInput ? (
        <PhoneInput
          setVerificationId={setVerificationId}
          setShowOtpInput={setShowOtpInput} 
          phoneNumber={phoneNumber} // Pass phoneNumber to PhoneInput
          setPhoneNumber={setPhoneNumber}
        />
      ) : (
        <OtpInput
          verificationId={verificationId}
          setShowOtpInput={setShowOtpInput}
          navigation={navigation}
          phoneNumber={phoneNumber}

        />
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
  HairQueVIew:{
    width: "100%",
    //backgroundColor: colors.TextBlood,
    marginBottom:250,
  },
  HairQuetxt:{
  //  fontSize:responsiveFontSize(2.7),
    fontSize:34,
    //marginBottom:50,
    fontFamily: 'Oswald-Medium',
    color: colors.textwhite,
    textAlign: 'center',
  },
});

export default PhoneAuthScreen;
