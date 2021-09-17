import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ModernHeader } from "@freakycoder/react-native-header-view";
import { header1 } from './styles'
import { borderColor } from './exports';
import { useNavigation } from '@react-navigation/native';


const AddPostSelector = () => {

    const navigation = useNavigation()

    return (
        <View>
            <View style = {header1.headerView}>
                <ModernHeader title="POST" titleStyle = {header1.headerText}
                backgroundColor= {'white'} leftIconColor = {borderColor} height = {50}
                leftIconOnPress={() => navigation.goBack()}
                rightDisable
                />
            </View>
            <View style = {{flex : 1}}>
                <TouchableOpacity style = {inpagestyle.button} onPress = {()=>console.log("Review")}>
                    <Text style = {inpagestyle.buttonText}>Post Review</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {inpagestyle.button} onPress = {()=>console.log("Discussion")}>
                    <Text style = {inpagestyle.buttonText}>Start Discussion</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {inpagestyle.button} onPress = {()=>console.log("Recommendation")}>
                    <Text style = {inpagestyle.buttonText}>Give Recommendation</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default AddPostSelector

const inpagestyle = StyleSheet.create({
    button : {
        height : 50 , 
        paddingLeft : 20, 
        justifyContent: 'center' , 
        elevation : 1 
    },
    buttonText : {
        fontWeight : 'bold'
    },  




})
