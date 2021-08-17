import React from 'react'
import { RefreshControl, StyleSheet, Text, TouchableOpacity, View, FlatList , Image, Dimensions } from 'react-native'
import axios from 'axios'
import { AuthContext , theme , background, LoadingPage, ErrorPage, URL, borderColor} from './exports'
import { useNavigation, useRoute } from '@react-navigation/native'
import { header1 , header } from './styles'
import { ModernHeader } from "@freakycoder/react-native-header-view";
import { MaterialCommunityIcons } from '@expo/vector-icons'


const BrandsPage = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const [noFollowers,setNoFollowers] = React.useState(0)

    const {brand_id,brand_name, brand_image, brand_content, following} = route.params

    React.useEffect(()=> {

    },[])


    return (
        <View style = {{backgroundColor: background , flex : 1}}>
            <View style = {[header1.headerView, {height : 40 , backgroundColor: background , justifyContent : 'flex-start' , alignItems : 'center', marginLeft : 10}]}>
                <TouchableOpacity onPress = {()=>navigation.goBack()}>
                    <MaterialCommunityIcons name = "keyboard-backspace" size = {25} color = {"#222"} />
                </TouchableOpacity>
            </View>
            <View style = {{flexDirection : 'row'}}>
                <View style = {{marginLeft : 20, marginTop : 10 , }}>
                    <Image 
                        source = {{uri : brand_image}}
                        style = {{width : Dimensions.get('screen').width * 0.3 , height : Dimensions.get('screen').width * 0.3 , backgroundColor : 'pink'}} />
                </View>
                
                <View style = {{justifyContent : 'center' , margin : 10 , flex : 1 }}>
                    <View style = {{justifyContent : 'center' , alignItems : 'center', marginBottom : 10  }}>
                        <Text style = {{fontWeight : 'bold'}}>{brand_name}</Text>
                    </View>
                    <View style = {{justifyContent : 'center' , alignItems : 'center', }}>
                        <Text>{brand_content}</Text>
                    </View>
                </View>
            </View>

           
        </View>
    )
}

export default BrandsPage

const styles = StyleSheet.create({})
