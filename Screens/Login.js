import React, {useState,useEffect} from "react";
import { Animated,Easing, Text, View, TextInput, Button, TouchableOpacity, Platform, ToastAndroid , Keyboard , ImageBackground, Dimensions , ScrollView, Image} from "react-native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import * as firebase from "firebase";
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';
import { useNavigation } from "@react-navigation/core";
import { background, firebaseConfig, theme } from "./exports";
import { login } from "./styles";
import axios from 'axios'
import { createNativeWrapper } from "react-native-gesture-handler";
import { SliderBox } from "react-native-image-slider-box";



try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  // ignore app already initialized error in snack
}

export default function Login() {

  const navigation = useNavigation()


  const [sliderImages,setSliderImages] = React.useState([
    "https://mish-fit-user-post-images.s3.ap-south-1.amazonaws.com/LoginPage/1.jpg",
    "https://mish-fit-user-post-images.s3.ap-south-1.amazonaws.com/LoginPage/2.jpg",
    "https://mish-fit-user-post-images.s3.ap-south-1.amazonaws.com/LoginPage/3.jpg",  
  ])

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
  

  const [expoToken,setExpoToken] = React.useState()
  const [deviceToken,setDeviceToken] = React.useState()

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

//   const registerForExpoPushNotificationsAsync= async() => {
//     let experienceId = '@kandurisv/yelo';
       
//     let token;
//     if (Constants.isDevice) {
//     const { status: existingStatus } = await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;
//     if (existingStatus !== 'granted') {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//     if (finalStatus !== 'granted') {
//       alert('Failed to get push token for push notification!');
//       return;
//     }
//     token = (await Notifications.getExpoPushTokenAsync({experienceId})).data;
    
//   } else {
//     alert('Must use physical device for Push Notifications');
//   }

//   if (Platform.OS === 'android') {
//     Notifications.setNotificationChannelAsync('default', {
//       name: 'default',
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: '#FF231F',
//     });
//   }

//   return token;
// }

// const registerForDevicePushNotificationsAsync = async() => {
//   let token;
//   if (Constants.isDevice) {
//     const { status: existingStatus } = await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;
//     if (existingStatus !== 'granted') {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//     if (finalStatus !== 'granted') {
//       alert('Failed to get push token for push notification!');
//       return;
//     }
//     token = (await Notifications.getDevicePushTokenAsync()).data;
    
//   } else {
//     alert('Must use physical device for Push Notifications');
//   }

//   return token;
// }

// const registerNotification = async () => {
//   registerForExpoPushNotificationsAsync().then(token => {
//     console.log("expo token", token)
//     setExpoToken(token)
//   });
//   registerForDevicePushNotificationsAsync().then(token => {
//     console.log("device token", token)
//     setDeviceToken(token)
//   });
// }




  const onChangeNumber = (text) => {
      setNumber(text)
      setPhoneNumber("+91" + text)
      setLength(text.length)
    //  console.log(text.length)
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
    //  console.log(text.length)
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
      registerNotification()
    } catch (err) {
      ToastAndroid.show("Please wait or try again later !!",ToastAndroid.SHORT )
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
    
  //  console.log(stringData)
  //   const body = {
  //     var : 'new user',
  //     phone_number : phoneNumber,
  //     cover_photo : "https://mish-fit-user-post-images.s3.ap-south-1.amazonaws.com/defaultCover.jpg",
  //     device_token : deviceToken,
  //     expo_token : expoToken
  //   }

  //   axios({
  //     method: 'post',
  //     url: URL + '/user/info',
  //     data: body
  //   })
  //   .then(res => {
  //  //    console.log("New user")
  //   }).catch((e) => {
  // //    console.log(e)
  //   }
     
  //   )

    try {
      const credential = firebase.auth.PhoneAuthProvider.credential(verificationId,stringData);
      await firebase.auth().signInWithCredential(credential);
      navigation.navigate("Home" , {userId : phoneNumber, expoToken : expoToken , deviceToken : deviceToken})
    } catch (err) {

     // ToastAndroid.show("Error signing in",ToastAndroid.SHORT )
    }
  }

  return (
    
    <ScrollView 
      contentContainerStyle={login.contentContainer}
      style={login.container}>
      {!screen ?  (
      <View style = {login.loginViewContainer}> 
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />
      <View style = {login.loginViewCoverContainer}>
        <Image
          source = {require("../assets/A500T.png")}
          style = {{width : 300 , height : 300}}
          />
        {/* <SliderBox 
          images={sliderImages} 
          sliderBoxHeight= {Dimensions.get('screen').height*0.75}
          dotColor="#DDDDDD"
          inactiveDotColor="#EEEEEE"
          circleLoop
         /> */}
      {/* <LottieView
          ref={animation => animation}
          progress = {progress}
          style={{
            width: Dimensions.get('screen').width,
            height: Dimensions.get('screen').width,
            backgroundColor: background,
          }}
          source={require('../assets/animation/otp-validation.json')}
                 /> */}
      </View>
      <View style={login.loginViewPhoneNumberHeaderContainer}>
        <Text style={login.loginViewPhoneNumberHeaderText}>Enter phone number</Text>
      </View>
      <View style = {login.loginViewPhoneNumberInputContainer}>
      <View style = {login.loginViewPhoneNumberInputCountryContainer}>
            <Text style = {login.loginViewPhoneNumberInputCountryText}>+91</Text>
      </View>
      <TextInput
        style={length ? login.loginViewPhoneNumberInputNumberInput : [login.loginViewPhoneNumberInputNumberInput, {fontSize : 12, letterSpacing : 1 }]  }
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
      <View style = {login.loginViewFooterContainer} />
      </View>
      ) : (
      <View style = {login.validationViewContainer}>
      <View style = {login.validationViewCoverContainer}>
        <Image
          source = {require("../assets/A500T.png")}
          style = {{width : 200 , height : 200}}
          />
      {/* <LottieView
          ref={animation => animation}
          progress = {progress}
          style={{
            width: 400,
            height: 400,
            backgroundColor: '#eee',
          }}
          source={require('../assets/animation/otp-validation.json')}
                 /> */}
      </View>
      <View style = {login.validationViewOTPContainer}>
        <Text style = {login.validationViewOTPHeader}> Enter OTP </Text>
     
      <View style = {login.validationViewOTPBoxesContainer}>
      {
        [firstRef,secondRef,thirdRef,fourthRef,fifthRef,sixthRef].map((ref,index)=> (
          <TextInput 
            key = {index}
            keyboardType = 'numeric'
            maxLength = {1}
            value = {otpArray[index]}
            autoFocus = {index === 0 ? true : undefined}
            style = {login.validationViewOTPBoxesInput}
            onChangeText = {onOtpChange(index)}
            ref = {ref}
            onKeyPress={onOtpKeyPress(index)}
            />
         
        ))
      }
      </View>
      
      {
        secs > 0 ?
        <Text style = {login.validationViewResendOTPInactiveText}>Resend OTP in 0{mins}:{secs < 10 ? "0"+secs : secs}</Text> :
        <TouchableOpacity 
          style = {login.validationViewResendOTPButton}
          onPress={()=>{
            setScreen(false)
            setAttemptsRemaining(attemptsRemaining-1)
            setSecs(60)

          }}>
            <Text style = {login.validationViewResendOTPActiveText}> Resend OTP </Text>
        </TouchableOpacity>
      }
      <Text style = {login.validationViewResentOTPAttemptsText}> {attemptsRemaining} Attempts Remaining</Text>
      </View>
       <TouchableOpacity style = {login.validationViewSubmitButton} onPress = {onSubmit} disabled = {!otpArray[5]}>
        <Text style = {login.validationViewSubmitText}>
          Submit
        </Text>
      </TouchableOpacity>
    </View>
      )}
    </ScrollView>
  );
}
