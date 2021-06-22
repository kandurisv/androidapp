import React from 'react'
import { StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'

import { useNavigation , useRoute } from '@react-navigation/native';
import { background, firebaseConfig, theme } from './exports';
import * as firebase from "firebase";
import { ModernHeader } from "@freakycoder/react-native-header-view";

try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  // ignore app already initialized error in snack
}


const Signout = () => {

  const navigation = useNavigation()
  const route = useRoute()

  const signoutToHome = () => {
    firebase.auth().onAuthStateChanged(user => {
      
      if (user != null) {
        
        console.log(user)
        firebase.auth().signOut().then(() => {
          ToastAndroid.show("Signed Out succesfully !!", ToastAndroid.SHORT)
          firebase.auth().onAuthStateChanged(user => { 
            if(user != null){
              console.log(user)
            } else {
              console.log("user is null")
            }
          })
        }).catch((error) => {
          console.log(error)
        })
      }
      else {
        console.log("user is even in first loop null")
      }
      goToAuth()
  })
      
}

  const goToAuth = () => {
    console.log("reached to go to auth")
    navigation.navigate("Auth")
  }
  const noToHome = () => {
    navigation.navigate("Home")
  }
  return (
    <View style = {styles.container}>
      <View>
            <ModernHeader 
                title="Signout?"
                titleStyle = {{fontSize: 18 , color : theme}}
                backgroundColor= {background}
                leftDisable
                rightIconComponent = {
                    <AntDesign name = "logout" size = {20} color = "black" />
                }
                rightIconOnPress = {signout}
                />
      </View>
      <Text style = {styles.question}>Do you want to signout ? </Text>
      <TouchableOpacity style = {styles.button} onPress = {signoutToHome}>
        <Text style = {styles.text}>Sign Out</Text>
      </TouchableOpacity>
      <TouchableOpacity style = {styles.button1} onPress = {noToHome}>
        <Text style = {styles.text1}>No</Text>
      </TouchableOpacity>
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
