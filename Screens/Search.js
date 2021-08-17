import { Fontisto, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, View , TextInput, TouchableOpacity, ScrollView , Pressable} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { background, theme } from './exports'


const Search = () => {
    const [heroSearchText,setHeroSearchText] = React.useState("")
    const isFocussed = useIsFocused()
    const [searchActive,setSearchActive] = React.useState(true)
    const navigation = useNavigation()
    const inputRef = React.createRef()

    React.useEffect(() => {
        inputRef.current.focus()
    },[isFocussed])

    return (
        <View style = {{flex : 1 , justifyContent : 'center', alignItems : 'center' , backgroundColor : background}}>
            <View style = {{ flexDirection : 'row', justifyContent : 'center' , alignItems : 'center',
                borderBottomWidth : 1 , borderBottomColor : "#AAA" , elevation : 5 , backgroundColor : background  }}>
            <Pressable 
                style = {{marginLeft : 5 }}
                onPress = {()=>navigation.goBack()}>
                <MaterialCommunityIcons name = "keyboard-backspace" size = {25} color = {"#555"} />
            </Pressable>
            <View style = {{
                flexDirection : 'row', height : 50 , backgroundColor : '#EEE' , 
                margin : 10 , justifyContent : 'center', alignItems : 'center', 
                flex: 1, borderWidth : 1 , borderRadius : 3 , borderColor : "#BBB",
                
                }}>
                <TextInput 
                    style = {{flex : 1 , fontSize : 14, padding : 5, paddingLeft : 10,}}
                    ref = {inputRef}
                    placeholder = "Search categories, brands or products"
                    onChangeText = {(text)=>setHeroSearchText(text)}
                    value = {heroSearchText}
                    autoFocus
                />
                <TouchableOpacity 
                  style = {{ paddingTop : 2, paddingBottom : 2, paddingLeft : 5, paddingRight: 5, justifyContent : 'center' , alignItems : 'center', borderRadius : 5 , marginRight : 10}}
                  //onPress = {onSearchHero}
                >
                  <Fontisto name = "search" size = {20} color = {theme} />
                </TouchableOpacity>
            </View>
            </View>
            <View style = {{flexDirection : 'row' , margin : 10 , }}>
                <Text style = {{flex : 1 , fontSize : 24, color : "#333"}}>
                    Search Options
                </Text>
                <Pressable
                    style = {{marginRight : 10, justifyContent: 'center', alignItems : 'center'}}
                    onPress = {()=>setSearchActive(!searchActive)}
                >
                    <Text
                        style = {{
                            color : searchActive ? theme : "#666",
                            fontWeight : searchActive ? 'bold' : 'normal',
                            fontSize : 12,
                        
                        }}
                    >RESET</Text>
                </Pressable>
            </View>
            <KeyboardAwareScrollView 
                style= {{flex : 1, width : '100%' }}
                contentContainerStyle = {{justifyContent : 'center'}}    
            >
                <View>
                    <Text>Trending Brands</Text>
                    
                </View>
                <View>
                    <Text>Trending Categories</Text>
                    
                </View>
                <View>
                    <Text>Trending Search Queries</Text>
                    
                </View>
                <View>
                    <Text>Trending Products</Text>
                    
                </View>
                <Text>Advanced Search Features</Text>
                <Text>Advanced Search Features</Text>
                <Text>Advanced Search Features</Text>
                <Text>Advanced Search Features</Text>
                <Text>Advanced Search Features</Text>
                <Text>Advanced Search Features</Text>
                <Text>Advanced Search Features</Text>
                <Text>Advanced Search Features</Text>
                <Text>Advanced Search Features</Text>
                <Text>Advanced Search Features</Text>
                <Text>Advanced Search Features</Text>
                <Text>Advanced Search Features</Text>
                <Text>Advanced Search Features</Text>
                <Text>Advanced Search Features</Text>
                <Text>Advanced Search Features</Text>
                <Text>Advanced Search Features</Text>
                <Text>Advanced Search Features</Text>
                <Text>Advanced Search Features</Text>
                <Text>Advanced Search Features</Text>
                <Text>Advanced Search Features</Text>
                <Text>Advanced Search Features</Text>
                <Text>Advanced Search Features</Text>
                <Text>Advanced Search Features</Text>
                <Text>Advanced Search Features</Text>
                <Text>Advanced Search Features</Text>
                <Text>Advanced Search Features</Text>
                <Text>Advanced Search Features</Text>
                <Text>Advanced Search Features</Text>
                <Text>Advanced Search Features</Text>
                <Text>Advanced Search Features</Text>
                <Text>Advanced Search Features</Text>
                <Text>Advanced Search Features</Text>
                <Text>Advanced Search Features</Text>
                <Text>Advanced Search Features</Text>
                <Text>Advanced Search Features</Text>
                <Text>Advanced Search Features</Text>
                <Text>Advanced Search Features</Text>
                <Text>Advanced Search Features</Text>
                <Text>Advanced Search Features</Text>
                <Text>Advanced Search Features</Text>
                <Text>Advanced Search Features</Text>
                <Text>Advanced Search Features</Text>
                <Text>Advanced Search Features</Text>
                <Text>Advanced Search Features</Text>
                <Text>Advanced Search Features</Text>
                <Text>Advanced Search Features</Text>
                <Text>Advanced Search Features</Text>
                <Text>Advanced Search Features</Text>
                <Text>Advanced Search Features</Text>
                <Text>Advanced Search Features</Text>
                <Text>Advanced Search Features</Text>
                <Text>Advanced Search Features</Text>
                <Text>Advanced Search Features</Text>
                <Text>Advanced Search Features</Text>
                <Text>Advanced Search Features</Text>
                <Text>Advanced Search Features</Text>
                <Text>Advanced Search Features</Text>
                <Text>Advanced Search Features</Text>
            </KeyboardAwareScrollView>
            <TouchableOpacity 
                    style = {{
                        position : 'absolute', 
                        bottom: 0 , 
                        right : 0,
                        width : '50%' , 
                        height : 40 , 
                        backgroundColor : theme,
                        justifyContent : 'center',
                        alignItems : 'center',
                        marginBottom : 10,
                        marginRight : 10,
                        borderRadius : 5, 
                    }}>
                <Text style = {{color : 'white'}}>Search</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Search

const styles = StyleSheet.create({})
