import React from 'react'
import { StyleSheet, Text, View , TouchableOpacity} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import {Entypo,AntDesign} from '@expo/vector-icons'

const Header = () => {
  return (
    <View style = {styles.header}>
    <View style = {styles.headerLeft}>
        <TouchableOpacity style = {styles.menu} onPress = {() => navigation.goBack()}>
            <AntDesign name = "arrowleft" size = {24} color = "black"/>
        </TouchableOpacity>
        
    </View>
    <View style = {styles.headerMiddle}>
      <Text style = {styles.title}>MISH</Text>
    </View>
    <View style = {styles.headerRight}>
        {/* <TouchableOpacity style = {styles.addItem} onPress = {()=>navigation.navigate("+")}>
            <Text style = {{color : 'white' , fontSize : 12}}>Add Item</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.createPoll} onPress = {()=>navigation.navigate("CreatePoll")}>
        <Text style = {{color : 'white' , fontSize : 12}}>Create Poll</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.userButton} onPress = {()=>navigation.navigate("User")}>
            <Entypo name = "user" size = {24} color = "white"/>
        </TouchableOpacity> */}
    </View>  
</View>
  )
}

export default Header

const styles = StyleSheet.create({
  header : {
      flexDirection : 'row', 
      // marginTop : 25 , 
      height : 60 , 
      backgroundColor : 'white',
      alignItems : 'center'
  },
  headerLeft : {
      flexDirection : 'row', 
      flex: 1,
      width : 20,
      backgroundColor : 'pink'
  },
  headerMiddle : {
    flexDirection : 'row', 
    flex: 1,
    backgroundColor : 'orange'
  },
  headerRight : {
      flex : 1, 
      flexDirection : 'row' ,
      backgroundColor : 'red'
  },
  menu : {
      padding:5,
      paddingTop :10
      
  },
  title : {
      color : 'black',
      paddingTop : 10,
      paddingLeft : 10 ,
      fontWeight : "bold",
      fontSize : 20 ,
  
  },
  addItem : {
      color : 'white',
      padding : 5,
      paddingTop : 15 ,
      elevation : 1 ,
      borderRadius : 5,
     
  },
  createPoll : {
      color : 'white',
      textShadowColor : 'white',
      padding : 5,
      paddingTop : 15 ,
      elevation : 1 ,
      borderRadius : 5,
      
  },
  userButton : {
      padding : 10
  },
})

