import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { useNavigation , useRoute } from '@react-navigation/native';


const Signout = () => {

  const navigation = useNavigation()
  const route = useRoute()

  const signoutToHome = () => {
    console.log("Signout and navigate to home")
  }
  const noToHome = () => {
    console.log("Dont Signout and navigate to home")
  }
  return (
    <View style = {styles.container}>
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
    flex : 1
  },
  button : {
    backgroundColor : 'orange',
    padding : 10,
    borderRadius : 3, 
    margin : 10,
  },
  question : { 
    fontSize : 20 ,

  },
  text : {
    fontSize : 15,
    color : 'white'
  },
  button1 : {
    backgroundColor : 'pink',
    padding : 10,
    borderRadius : 3, 
    margin : 10,
  },
  text1 : {
    color : 'grey'
  }
})
