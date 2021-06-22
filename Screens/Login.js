import React, {useState,useEffect} from "react";
import { Animated,Easing, Text, View, TextInput, Button, StyleSheet, TouchableOpacity, Platform, ToastAndroid , Keyboard , ImageBackground, Dimensions , ScrollView, Image} from "react-native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import * as firebase from "firebase";
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';
import { useNavigation } from "@react-navigation/core";
import { background, firebaseConfig, theme } from "./exports";
import LottieView from 'lottie-react-native';
import { concat } from "react-native-reanimated";


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
  
  const progress = React.useRef(new Animated.Value(0)).current
  const progress1 = React.useRef(new Animated.Value(0)).current

  const firstRef = React.useRef()
  const secondRef = React.useRef()
  const thirdRef = React.useRef()
  const fourthRef = React.useRef()
  const fifthRef = React.useRef()
  const sixthRef = React.useRef()

  const [otpArray,setOtpArray] = React.useState([])
  const [resendButtonDisabledTime, setResendButtonDisabledTime] =  React.useState(60);
  const [isAndroid, setAndroid] = React.useState(true)
  const [attemptsRemaining,setAttemptsRemaining] = React.useState(3)

  const [screen,setScreen] = React.useState(false)
  const [mins, setMins] = useState(0)
  const [secs, setSecs] = useState(60)
  React.useEffect(()=>{
    Animated.timing(progress, {
      toValue: 1,
      duration: 10000,
      easing: Easing.linear,
      useNativeDriver : true
    },).start()
    const timerId = setInterval(() => {
      if (secs <= 0) {
        setSecs(-1)
      }
      else setSecs(s => s - 1)
    }, 1000)
    return () => {
 
      clearInterval(timerId);}
  },[secs])

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
      Animated.timing(progress1, {
        toValue: 1,
        duration: 10000,
        easing: Easing.linear,
        useNativeDriver : true
      },).start();
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

  const onOtpChange = index => {
    return value => {
      if (isNaN(Number(value))) {
        // do nothing when a non digit is pressed
        return;
      }
      const otpArrayCopy = otpArray.concat();
      otpArrayCopy[index] = value;
      setOtpArray(otpArrayCopy);

      // auto focus to next InputText if value is not blank
      if (value !== '') {
        if (index === 0) {
          secondRef.current.focus();
        } else if (index === 1) {
          thirdRef.current.focus();
        } else if (index === 2) {
          fourthRef.current.focus();
        } else if (index === 3) {
          fifthRef.current.focus();
        } else if (index === 4) {
          sixthRef.current.focus();
        }
      }

      if (index === 5) {
        Keyboard.dismiss(false)
      }

    };
  }

  const onOtpKeyPress = index => {
    return ({nativeEvent : {key: value}})=> {
      if (value  === 'Backspace' && otpArray[index] === "") {
        if (index === 1) {
          firstRef.current.focus();
        } else if (index === 2) {
          secondRef.current.focus();
        } else if (index === 3) {
          thirdRef.current.focus();
        } else if (index === 4) {
          fourthRef.current.focus();
        } else if (index === 5) {
          fifthRef.current.focus();
        }

        

        if (isAndroid && index > 0) {
           const otpArrayCopy = otpArray.concat();
           otpArrayCopy[index-1] = ""
           setOtpArray(otpArrayCopy)
        }
      }

    }
  }

  const onSubmit = async () => {
    const stringData = otpArray.reduce((result, item) => {
      return `${result}${item}`
    }, "")
    
    console.log(stringData)
    const body = {
      var : 'new user',
      phone_number : phoneNumber
    }

    axios({
      method: 'post',
      url: URL + '/user/info',
      data: body
    })
    .then(res => {
       console.log("New user")
    }).catch((e) => console.log(e))

    try {
      const credential = firebase.auth.PhoneAuthProvider.credential(verificationId,stringData);
      await firebase.auth().signInWithCredential(credential);
      



      navigation.navigate("Home")
    } catch (err) {
      ToastAndroid.show("Error sigining in",ToastAndroid.SHORT )
    }
  }




  return (
    
    <ScrollView 
      contentContainerStyle={{backgroundColor : background}}
      style={{}}>
      {!screen ?  (
      <View style = {{flex : 1}}> 
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />
      <View style = {styles.lottie}>
      <LottieView
          ref={animation => animation}
          progress = {progress}
          style={{
            width: Dimensions.get('screen').width,
            height: Dimensions.get('screen').width,
            backgroundColor: background,
          }}
          source={require('../assets/animation/otp-validation.json')}
                 />
      </View>
      <View style={{ marginTop: Dimensions.get('screen').height* 0.025 , marginLeft : 10  }}>
        <Text style={{fontSize : 16 , color : theme, fontWeight : 'bold'}}>Enter phone number</Text>
      </View>
      <View style = {{flexDirection : 'row', marginBottom : 10 , justifyContent:'center', alignItems:'center' , height : Dimensions.get('screen').height* 0.115}}>
      <View style = {styles.country}>
            <Text style = {styles.countryCode}>+91</Text>
      </View>
      <TextInput
        style={length ? styles.phoneNumberBox : [styles.phoneNumberBox, {fontSize : 12, letterSpacing : 1 }]  }
        placeholder="10 Digit mobile number"
        autoFocus
        autoCompleteType="tel"
        keyboardType="phone-pad"
        textContentType="telephoneNumber"
        onChangeText={(phoneNumber) => onChangeNumber(phoneNumber)}
        value = {number}
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
            GET OTP
      </AwesomeButtonRick>
      
      </View>
      <View style = {{backgroundColor : theme , height : 5, width : '100%', position : 'absolute' , bottom : 0}} />
      </View>
      ) : (
      <View style = {styles.container1}>
      <View style = {styles.lottie1}>
      <LottieView
          ref={animation => animation}
          progress = {progress}
          style={{
            width: 400,
            height: 400,
            backgroundColor: '#eee',
          }}
          source={require('../assets/animation/otp-validation.json')}
                 />
      </View>
      <View style = {styles.container2}>
      <Text> Enter OTP </Text>
     
      <View style = {{flexDirection : 'row'}}>
      {
        [firstRef,secondRef,thirdRef,fourthRef,fifthRef,sixthRef].map((ref,index)=> (
          <TextInput 
            key = {index}
            keyboardType = 'numeric'
            maxLength = {1}
            value = {otpArray[index]}
            autoFocus = {index === 0 ? true : undefined}
            style = {styles.textBox}
            onChangeText = {onOtpChange(index)}
            ref = {ref}
            onKeyPress={onOtpKeyPress(index)}
            />
         
        ))
      }
      </View>
      
      {
        secs > 0 ?
        <Text>Resend OTP in 0{mins}:{secs < 10 ? "0"+secs : secs}</Text> :
        <TouchableOpacity 
          style = {{margin : 10}}
          onPress={()=>{
            console.log("Press")
            setAttemptsRemaining(attemptsRemaining-1)
            setSecs(60)

          }}>
            <Text style = {{fontWeight : '500', color : 'blue'}}> Resend OTP </Text>
        </TouchableOpacity>
      }
      <Text style = {{ margin : 10 }}> {attemptsRemaining} Attempts Remaining</Text>
     
      </View>
       <TouchableOpacity style = {styles.submit} onPress = {onSubmit} disabled = {!otpArray[5]}>
        <Text style = {{color : '#FFF', textAlign : 'center', fontSize : 20}}>
          Submit
        </Text>
      </TouchableOpacity>
            
         
      
    </View>
      )}
      

    </ScrollView>
  );
}


const styles = StyleSheet.create({
  lottie : {
    flex : 1,
    justifyContent : 'center',
    alignItems :'center',
    backgroundColor : background,
    height : Dimensions.get('screen').height* 0.75,
  },
  lottie1 : {
    flex : 1,
    justifyContent : 'center',
    alignItems :'center',
    backgroundColor : background,
    height : Dimensions.get('screen').height* 0.6,
  },
  nextButton: {

  },
  nextText : {

  },
  container : {
    flexDirection : 'row', 
    alignItems : 'center',
    justifyContent : 'space-evenly' , 
    margin : 10,
    

  },
  container1 : {
    width : '100%',
    alignItems : 'center',
    justifyContent : 'center' , 
    flex : 1,
    
    backgroundColor : background
  },
  container2 : {
    width : '100%',
    alignItems : 'center',
    justifyContent : 'center' , 
    flex : 1,
    margin : 10,
    backgroundColor : background
  },
  flag : { 
    alignSelf : 'center',
    margin : 2,
  },
  countryCode : {
    margin : 4, 
    marginTop : 11,
    textAlign : 'center',
    fontSize : 16,
  },
  country : {
      
      borderRadius : 5,
      
      height : 40,
      
      flexDirection : 'row'
  },
  phoneNumberBox : { 
    height: 45 ,
    borderRadius : 10,
    borderColor : "#bbb",
    borderWidth : 1,
    flex : 1,
    margin : 5 ,
    fontSize : 16, 
    padding : 10 , 
    textAlign : 'center',
    letterSpacing : 5, 
  },
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 20},
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 20,
    height: 40,
    lineHeight: 38,
    fontSize: 16,
    borderWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: 'red',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
  textBox : {
    borderWidth : 1,
    borderColor : 'black',
    textAlign : 'center',
    fontSize : 20,
    margin : 10,
    borderRadius : 5,
    padding : 5,
    color : theme
  

  },
  submit : {
    backgroundColor : theme,
    width : '98%',
    marginLeft : 20,
    marginRight : 20,
    marginBottom : 5,
    borderRadius : 10,
    padding : 5,
    borderRadius : 10,
    borderWidth : 1,
    borderColor : 'white',
    elevation : 1, 
    height : 40,

  },
})