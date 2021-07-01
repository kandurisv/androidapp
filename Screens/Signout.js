import React from 'react'
import { StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'

import { useNavigation , useRoute } from '@react-navigation/native';
import { background, firebaseConfig, theme } from './exports';
import * as firebase from "firebase";
import { ModernHeader } from "@freakycoder/react-native-header-view";
import { header, pins, signout } from './styles';

try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  // ignore app already initialized error in snack
}


const Signout = () => {

  const navigation = useNavigation()
  const route = useRoute()

  const signoutToHome = () => {
        firebase.auth().signOut().then(() => {
          navigation.navigate("Auth")
     //     ToastAndroid.show("Signed Out succesfully !!", ToastAndroid.SHORT)
        }).catch((error) => {
     //     console.log(error)
        })
        

     
      //goToAuth()
  }
      


  const goToAuth = () => {
   // console.log("reached to go to auth")
    navigation.navigate("Auth")
    
  }
  const noToHome = () => {
    navigation.navigate("Home")
  }
  return (
    <View style = {signout.container}>
      <View style = {header.headerView}>
            <ModernHeader 
                title="Signout?"
                titleStyle = {header.headerText}
                backgroundColor= {background}
                leftDisable
                rightDisable
                />
      </View>
      <View style = {signout.signOutContainer} >
      <Text style = {signout.signOutQuestion}>Do you want to signout ? </Text>
      <TouchableOpacity style = {signout.yesButton} onPress = {signoutToHome}>
        <Text style = {signout.yesText}>Sign Out</Text>
      </TouchableOpacity>
      <TouchableOpacity style = {signout.noButton} onPress = {noToHome}>
        <Text style = {signout.noText}>No</Text>
      </TouchableOpacity>
      </View>
    </View>
  )
}

export default Signout

const styles = StyleSheet.create({
  container : {
    justifyContent : 'center',
    alignItems : 'center',
    flex : 1,
    backgroundColor : background
  },
  button : {
    backgroundColor : background,
    padding : 10,
    borderRadius : 3, 
    margin : 10,
    width : 100,
    alignItems : 'center'
  },
  question : { 
    fontSize : 20 ,

  },
  text : {
    fontSize : 15,
    color : theme
  },
  button1 : {
    backgroundColor : theme,
    padding : 10,
    borderRadius : 3, 
    margin : 10,
    width : 100,
    alignItems : 'center'
  },
  text1 : {
    color : background
  }
})
