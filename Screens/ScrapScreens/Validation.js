import React, { useState,useRef,useEffect } from 'react';
import { Button, TextInput , TouchableOpacity,View,Text, StyleSheet, Keyboard, Dimensions , ScrollView, KeyboardAvoidingView} from 'react-native';
import auth from '@react-native-firebase/auth';
// import {useNavigation} from '@react-navigation/native';
import { Animated, Easing } from 'react-native';

import AwesomeButton from "react-native-really-awesome-button";
import LottieView from 'lottie-react-native';

import { useNavigation , useRoute } from '@react-navigation/native';

const Validation = () => {

  const [mins, setMins] = useState(0)
  const [secs, setSecs] = useState(60)

  const progress = React.useRef(new Animated.Value(0)).current

  const navigation = useNavigation()
  const route = useRoute()
  

  useEffect(() => {
    
    Animated.timing(progress, {
      toValue: 1,
      duration: 10000,
      easing: Easing.linear,
      useNativeDriver : true
    },).start();
        
    const timerId = setInterval(() => {
      if (secs <= 0) {
        setSecs(-1)
      }
      else setSecs(s => s - 1)
    }, 1000)
    return () => {
 
      clearInterval(timerId);}
  }, [secs])


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
    try {
      const credential = firebase.auth.PhoneAuthProvider.credential(verificationId,verificationCode);
      await firebase.auth().signInWithCredential(credential);
      navigation.navigate("Home")
    } catch (err) {
      ToastAndroid.show("Error sigining in",ToastAndroid.SHORT )
    }
  }

  return(
    <ScrollView>
    <View style = {styles.container}>
      <View style = {styles.lottie}>
      <LottieView
          ref={animation => animation}
          progress = {progress}
          style={{
            width: 400,
            height: 400,
            backgroundColor: '#eee',
          }}
          source={require('../../assets/animation/otp-validation.json')}
                 />
      </View>
      <View style = {styles.container2}>
      <Text> Enter OTP </Text>
     
      <View style = {{flexDirection : 'row'}}>
      {
        [firstRef,secondRef,thirdRef,fourthRef].map((ref,index)=> (
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
            <Text> Resend OTP </Text>
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
    </ScrollView>
  );
}

export default Validation;

const styles = StyleSheet.create({
    lottie : {

    },
    submit : {
      backgroundColor : 'green',
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
    textBox : {
      borderWidth : 1,
      borderColor : 'black',
      textAlign : 'center',
      fontSize : 20,
      margin : 10,
      borderRadius : 5,
      padding : 5,
      color : 'red'
    

    },
    nextButton: {

    },
    nextText : {

    },
    container : {
      width : '100%',
      alignItems : 'center',
      justifyContent : 'center' , 
      flex : 1,
     
      backgroundColor : 'white'
    },
    container2 : {
      width : '100%',
      alignItems : 'center',
      justifyContent : 'center' , 
      flex : 1,
      margin : 10,
      backgroundColor : 'white'
    },
    flag : { 
      alignSelf : 'center',
      margin : 5,
    },
    countryCode : {
      margin : 10, 
      textAlign : 'center',
      fontSize : 15,
    },
    country : {
        elevation : 5,
        borderRadius : 5,
        backgroundColor : '#EEE',
        height : 40,
        
        flexDirection : 'row'
    },
    phoneNumberBox : { 
      height: 40 ,
      borderRadius : 40,
      borderColor : "#bbb",
      borderWidth : 1,
      flex : 1,
      margin : 10 ,
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
})