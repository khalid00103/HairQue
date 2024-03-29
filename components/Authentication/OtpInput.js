import React, { useState, useEffect } from 'react';
import { signInWithCredential, PhoneAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';
import { View, TextInput, Button, TouchableOpacity, StyleSheet, SafeAreaView, Text } from 'react-native';
import colors from '../../assets/colors/colors';
const OtpInput = ({ verificationId, setShowOtpInput, navigation }) => {
  const [otp, setOtp] = useState('');

  const [disable, setDisable] = useState(true);
  useEffect(() => {
      if (otp.length === 6) {
          setDisable(false);
      }else {
          setDisable(true);
      }
  }, [otp]);

  const confirmOtp = async () => {
    try {
      const credential = PhoneAuthProvider.credential(verificationId, otp);
      await signInWithCredential(auth, credential);

      // Assuming you have defined the navigation prop correctly
      setShowOtpInput(false);
      navigation.navigate('UserProfileInput', { phoneNumber: auth.currentUser.phoneNumber });
    } catch (error) {
      console.error('Error confirming OTP:', error);
    }
  };

  return(
    <SafeAreaView style={styles.container}>
        <View style={styles.txtinputView}>
        <TextInput
            placeholder="Confirmation Code"
            placeholderTextColor={"gray"}
            value={otp}
            onChangeText={setOtp}
            keyboardType="numeric"
            maxLength={6}
            style={styles.textInput}
        />
        </View>
        <TouchableOpacity onPress={confirmOtp} disabled={disable} style={[styles.sendCode, { backgroundColor: disable ? 'gray' : colors.textwhite}]}>
            <Text style={styles.txtCNFOtp}>Confirm Code</Text>
        </TouchableOpacity>
    </SafeAreaView>
);
};
const styles = StyleSheet.create({
container:{
    position:'absolute',
    //backgroundColor: colors.textdarkgold,
    height:"100%",
    width:"100%",
    justifyContent:'center',
    alignContent:"center",
    marginHorizontal:10,
},
txtinputView:{
    //width:"100%",
    marginHorizontal:20,
    //backgroundColor:colors.textwhite,
    justifyContent:'center',
    alignItems:'center',
    marginBottom: 10,
},
textInput: {
    padding: 10,
    //paddingBottom:10,
    //paddingHorizontal: 10,
    width:"100%",
    fontSize: 18,
    color:colors.textwhite,
    borderColor: '#7f8c8d33',
    borderWidth: 2,
    borderRadius: 12,
    marginBottom: 10,
    //textAlign: 'center',
},
txtCNFOtp:{
    fontSize: 18,
    textAlign: 'center',
},
sendCode: {
    padding: 10,
    marginHorizontal:20,
    backgroundColor:colors.textwhite,
    borderRadius: 10,
    textAlign: 'center',
},
});
export default OtpInput;