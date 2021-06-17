import * as React from "react";
import { Text, View, TextInput, Button, StyleSheet, TouchableOpacity, Platform, ToastAndroid , Keyboard} from "react-native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import * as firebase from "firebase";
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';
import { useNavigation } from "@react-navigation/core";
import { firebaseConfig } from "./exports";


try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  // ignore app already initialized error in snack
}

export default function Login() {

  const navigation = useNavigation()

  const recaptchaVerifier = React.useRef(null);
  const [phoneNumber, setPhoneNumber] = React.useState();
  const [verificationId, setVerificationId] = React.useState();
  const [verificationCode, setVerificationCode] = React.useState();
  const firebaseConfig = firebase.apps.length ? firebase.app().options : undefined;
  const [message, showMessage] = React.useState((!firebaseConfig || Platform.OS === 'web')
    ? { text: "To get started, provide a valid firebase config in App.js and open this snack on an iOS or Android device."}
    : undefined);

  const [loginClick,setLoginClick] = React.useState(false)
  const [valid,setValid] = React.useState(false)
  const [otpvalid,setOtpValid] = React.useState(false)
  const [length,setLength] = React.useState(0)
  const [number, setNumber] = React.useState("");
  const [otplength,setotpLength] = React.useState(0)
  const [otpnumber, setotpNumber] = React.useState("");
  

  const [screen,setScreen] = React.useState(false)

  const onChangeNumber = (text) => {
      setNumber(text)
      setPhoneNumber("+91" + text)
      setLength(text.length)
      console.log(text.length)
      if(text.length === 10) {
        setValid(true)
        Keyboard.dismiss(false)
      } else {
        setValid(false)
      }
    }


  const onChangeOTP = (text) => {
      setVerificationCode(text)
      setotpLength(text.length)
      console.log(text.length)
      if(text.length === 6) {
        setOtpValid(true)
        Keyboard.dismiss(false)
      } else {
        setOtpValid(false)
      }
    }

  const onPressLogin = async () => {
    try {
      const phoneProvider = new firebase.auth.PhoneAuthProvider();
      const verificationId = await phoneProvider.verifyPhoneNumber(phoneNumber,recaptchaVerifier.current);
      setVerificationId(verificationId);
      ToastAndroid.show("Verification code has been sent to your phone",ToastAndroid.SHORT)
      setLoginClick(true)
      setScreen(true)
    } catch (err) {
      ToastAndroid.show("We couldn't log you in due to network error",ToastAndroid.SHORT )
      setLoginClick(true)
    }
  }

  const onPressValidate = async () => {
    try {
      const credential = firebase.auth.PhoneAuthProvider.credential(verificationId,verificationCode);
      await firebase.auth().signInWithCredential(credential);
      navigation.navigate("Home")
    } catch (err) {
      ToastAndroid.show("Error sigining in",ToastAndroid.SHORT )
    }
  }




  return (
    
    <View style={{ padding: 20, marginTop: 50 }}>
      {!screen ?  (
      <View>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />
      <Text style={{ marginTop: 20 }}>Enter phone number</Text>
      <TextInput
        style={{ marginVertical: 10, fontSize: 17 }}
        placeholder="999 999 9999"
        autoFocus
        autoCompleteType="tel"
        keyboardType="phone-pad"
        textContentType="telephoneNumber"
        onChangeText={(phoneNumber) => onChangeNumber(phoneNumber)}
      />
      <Button
        title="Send Verification Code"
        disabled={!phoneNumber}
        onPress={onPressLogin}
      />
      <AwesomeButtonRick 
            progressLoadingTime = {1}
            width = {80}
            height = {40}
            progress 
            onPress={onPressLogin}
            springRelease
            raiseLevel = {2}
            disabled = {!valid}
            >
            Get OTP
      </AwesomeButtonRick>
      </View>
      ) : 
      (<View>
      <Text style={{ marginTop: 20 }}>Enter Verification code</Text>
      <TextInput
        style={{ marginVertical: 10, fontSize: 17 }}
        editable={!!verificationId}
        placeholder="123456"
        onChangeText={(text)=>onChangeOTP(text)}
      />
      <Button
        title="Confirm Verification Code"
        disabled={!otpvalid}
        onPress={onPressValidate}
      />
      </View>)}
      

    </View>
  );
}
