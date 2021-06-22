import React, { useState,useRef } from 'react';
import { Button, TextInput , TouchableOpacity,View,Text, StyleSheet, Keyboard } from 'react-native';
// import auth from '@react-native-firebase/auth';
// import {useNavigation} from '@react-navigation/native';
// import Icon from 'react-native-ico-flags';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';
import LottieView from 'lottie-react-native';
import { useNavigation , useRoute } from '@react-navigation/native';
import firebase from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyCelzKVnbYY07aLtswA4EE9pF9mNeXJtRs',
  authDomain: 'mishreview-346c2.firebaseapp.com',
  projectId: 'mishreview-346c2',
  storageBucket: 'mishreview-346c2.appspot.com',
  appId: '1:934890083228:android:d132693b4e14b139dbae59'
};

firebase.initializeApp(firebaseConfig);


const Login = () => {

  const navigation = useNavigation()
  const route = useRoute()
  
  

    const [phoneNumber, setPhoneNumber] = useState('');
    const [valid,setValid] = React.useState(false)
    const [length,setLength] = React.useState(0)
   
  // Handle the button press
  
    const signInWithPhoneNumber = async (phoneNumber) => {
      console.log(phoneNumber)
        // const confirmation = await auth().signInWithPhoneNumber("+91"+ phoneNumber)
        navigation.navigate("Validation", {phoneNumber , confirmation})
    }
   
    
    const [number, setNumber] = React.useState("");

    const onChangeNumber = ({text}) => {
      setNumber(text)
      setLength(text.length)
      console.log(text.length)
      if(text.length === 10) {
        setValid(true)
        Keyboard.dismiss(false)
      } else {
        setValid(false)
      }
    }

  return (
    <View style = {{flex : 1, backgroundColor : 'white'}} >
        <View style = {{flex : 1, backgroundColor : 'pink'}} />
        <View>
          <Text> Login using Phone</Text>
        </View>
        <View style = {styles.container}>
          <View style = {styles.country}>
            {/* <Icon name="india" style={styles.flag}/> */}
            <Text style = {styles.countryCode}>+91</Text>
          </View>
          <TextInput
            style={length ? styles.phoneNumberBox : [styles.phoneNumberBox, {fontSize : 12, letterSpacing : 1 }]  }
            placeholder="Enter your Phone Number"
            keyboardType = 'numeric'
            onChangeText={text => onChangeNumber({ text })}
            value={number}
            maxlength = {10}
          />
          <AwesomeButtonRick 
            progressLoadingTime = {1}
            width = {80}
            height = {40}
            progress 
            onPress={(next) => signInWithPhoneNumber(number)}
            springRelease
            raiseLevel = {2}
            disabled = {!valid}
            >
            Next
          </AwesomeButtonRick>
        </View>
        <View style = {{backgroundColor : 'orange' , height : 10, width : '100%'}} />
      </View>

  );
}

export default Login;

const styles = StyleSheet.create({
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
})