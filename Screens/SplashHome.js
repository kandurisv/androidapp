import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { theme } from './exports'

const SplashHome = () => {
    return (
        <View style = {{flex : 1}}>
            
            <TouchableOpacity
                style = {{
                    backgroundColor: theme , 
                    borderRadius : 5, 
                    width : '70%' , 
                    position : 'absolute',
                    bottom : 0 , 
                    marginBottom : Dimensions.get('screen').width * 0.2,
                }}
            >
                Get Started
            </TouchableOpacity>
        </View>
    )
}

export default SplashHome

const styles = StyleSheet.create({})
