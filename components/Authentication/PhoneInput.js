import React, { useRef, useState, useEffect } from 'react';
import { PhoneAuthProvider } from 'firebase/auth';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { auth, firebaseConfig } from '../firebase';
import { View, TextInput, Button, TouchableOpacity, StyleSheet, SafeAreaView, Text } from 'react-native';
import colors from '../../assets/colors/colors';
const PhoneInput = ({ setVerificationId, setShowOtpInput }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const recaptchaVerifier = useRef(null);

  const [disable, setDisable] = useState(true);
  //const auth = getAuth();

  useEffect(() => {
      if (phoneNumber.length === 10) {
          setDisable(false);
      }else {
          setDisable(true);
      }
  }, [phoneNumber]);

  const sendVerification = async () => {
    const phoneProvider = new PhoneAuthProvider(auth);

    try {
      const verificationId = await phoneProvider.verifyPhoneNumber(
        `+91${phoneNumber}`,
        recaptchaVerifier.current
      );
      setVerificationId(verificationId);
      setShowOtpInput(true);
    } catch (error) {
      console.error('Error sending verification:', error);
    }
  };

  return(
    <SafeAreaView style ={styles.container}>
        <FirebaseRecaptchaVerifierModal
            ref={recaptchaVerifier}
            firebaseConfig={firebaseConfig}
        />
        <View style={styles.childContainer}>
        <View style={styles.wholeNumber}>
            <View style={styles.numberCode}>
                <Text style={styles.text91}>+91</Text>
            </View>
            <TextInput
                placeholder="Phone Number"
                placeholderTextColor={"gray"}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="numeric"
                maxLength={10}
                style={styles.textInput}
            />
        </View>
        <TouchableOpacity onPress={sendVerification} disabled={disable} style={[styles.sendVerification, {    backgroundColor: disable ? 'gray' : colors.textwhite}]}>
            <Text style={styles.text}>Send OTP</Text>
        </TouchableOpacity>
        </View>
   </SafeAreaView>
);
};
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  childContainer: {
    width: '100%',
  },
  wholeNumber: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  numberCode: {
    padding: 10,
    backgroundColor: colors.cardbackground,
    borderColor: '#7f8c8d33',
    borderWidth: 2,
    borderRadius: 12,
    marginBottom: 10,
    textAlign: 'center',
  },
  text91: {
    fontSize: 18,
    color: colors.textwhite,
    textAlign: 'center',
  },
  text: {
    fontSize: 18,
    color: colors.textblack,
    textAlign: 'center',
  },
  textInput: {
    padding: 10,
    width: '80%',
    fontSize: 18,
    color: colors.textwhite,
    borderColor: '#7f8c8d33',
    borderWidth: 2,
    borderRadius: 12,
    marginBottom: 10,
  },
  sendVerification: {
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    textAlign: 'center',
  },
});

export default PhoneInput;
