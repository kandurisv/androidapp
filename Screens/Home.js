import React from 'react'
import { Text, View , FlatList , Dimensions, ImageBackground, TouchableOpacity, Animated, ScrollView, Alert, TextInput, ToastAndroid} from 'react-native'
import { useNavigation , useRoute } from '@react-navigation/native';
import {ImageLoader} from 'react-native-image-fallback';
import axios from 'axios';
import {URL, LoadingPage, ErrorPage, TimeoutPage, background, theme, firebaseConfig, AuthContext, headerStyle} from './exports'
import { ModernHeader } from "@freakycoder/react-native-header-view";
import { AntDesign } from '@expo/vector-icons';
import RadioGroup from 'react-native-custom-radio-group';
import { header1, home } from './styles';

import * as Amplitude from 'expo-analytics-amplitude';
Amplitude.initializeAsync("af380775c59ead50c4c02536befef5e5");

const {width, height} = Dimensions.get("window")
const CAROUSEL_ITEM_SQUARE_SIZE = 100
const CAROUSEL_ITEM_SPACING = 5

const radioGroupList = [{
    label: 'Male',
    value: 'Male'
  }, {
    label: 'Female',
    value: 'Female'
  }, {
    label: 'Others',
    value: 'Others'
  }];


  const Carousel = ({DATA , onClickItem , varValue}) => {
    const [data,setData] = React.useState([...DATA])
    const scrollX = React.useRef(new Animated.Value(0)).current
    const ITEM_SIZE = CAROUSEL_ITEM_SQUARE_SIZE + CAROUSEL_ITEM_SPACING 
    const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)
    
    const renderItem = ({item , index}) => {
        const itemClick = (item) => {
            onClickItem(item.name , item.id, varValue)
        }
       
        const inputRange = [
            ITEM_SIZE*(index-3),
            ITEM_SIZE*index,
            ITEM_SIZE*(index+1),
            ITEM_SIZE*(index+2),   
        ]
        const opacityInputRange = [
            -1,
            0,
            ITEM_SIZE*index,
            ITEM_SIZE*(index+1),   
        ]
        const scale = scrollX.interpolate({
            inputRange,
            outputRange : [0.95,1,0.5,0]
        })
        const opacity = scrollX.interpolate({
            inputRange : opacityInputRange,
            outputRange : [1,1,1,0]
        })

        return(
            <Animated.View style={[home.mainViewCarouselScrollableItemContainer , {transform : [{scale}]}]}>
                <TouchableOpacity style = {home.mainViewCarouselScrollableItemButton} onPress = {() => {itemClick(item)}}>
                    <ImageBackground source = {{uri : item.image}} 
                        style = {home.mainViewCarouselScrollableItemImageBackground} blurRadius = {3}>
                    </ImageBackground>
                    <View style = {home.mainViewCarouselScrollableItemTextContainer}>
                        <Text style={home.mainViewCarouselScrollableItemText}>{item.name}</Text>
                    </View>
                </TouchableOpacity>
            </Animated.View>
        )
    }

    return (  
            <Animated.FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            horizontal = {true}
            contentContainerStyle = {home.mainViewCarouselScrollableItem}
            onScroll = {Animated.event(
                [{nativeEvent :  {contentOffset : {x : scrollX}}}],
                {useNativeDriver : true}
            )}
            snapToInterval = {ITEM_SIZE+5}
            showsHorizontalScrollIndicator = {false}
            />
    )
}

const Home = () => {

    const userId = React.useContext(AuthContext)

    const navigation = useNavigation()
    const route = useRoute()
    const [response, setResponse] = React.useState([])
    const [userResponse, setUserResponse] = React.useState([])
    const [homeLoading,setHomeLoading] = React.useState(true)
    const [infoLoading,setInfoLoading] = React.useState(true)
    const [timed,setTimed] = React.useState(false)
    const [error,setError] = React.useState(false)
    const [secs,setSecs] = React.useState(0)
    const [refresh,setRefresh] = React.useState(false)
    const [result,setResult] = React.useState(false)
    const [hero,setHero] = React.useState("")

    const [userDetailsAvailable,setUserDetailsAvailable] = React.useState(false)

    const [userName,setUserName] = React.useState("")
    const [age,setAge] = React.useState("")
    const [gender,setGender] = React.useState('')
 
  
    const goToProductFeed = (name, idValue, value) => {
        navigation.navigate("Feed", {varValue : value , id : idValue, value : name } )
    }

    React.useEffect(() => {
    const getData = () => {
        axios.get(URL + "/user/info", {params:{user_id : 1}} , {timeout:5000})
            .then(res => res.data).then(function(responseData) {
                setUserResponse(responseData[0])
                setInfoLoading(false)
                if(responseData[0].username) {
                    setUserDetailsAvailable(true)
                }
                setRefresh(false)
            })
            .catch(function(error) {
                console.log(error)
                setError(true)
            });
        axios.get(URL + "/home", {timeout : 5000})
        .then(res => res.data).then(function(responseData) {
            
            setResponse(responseData)
            setHomeLoading(false)
            setResult(true)
            
        })
        .catch(function(error) {
            
            setLoading(false)
            setResult(true)
            setError(true)
        });
        axios.get(URL + "/home/hero", {timeout : 5000})
        .then(res => res.data).then(function(responseData) {
            setHero(responseData[0].image)
        })
        .catch(function(error) {
          
        });
    }
      getData()
},[result])

const signout = () => {
    navigation.navigate("Signout")
}

const submitUserDetails = () => {
    const body = {
        "username": userName,
        "age" : age,
        "gender" : gender,
        "phonenumber" : userId
    }
    axios({
      method: 'post',
      url: URL + '/user/info',
      data: body
    })
    .then(res => {
        ToastAndroid.show("Thanks for your details",ToastAndroid.SHORT)
    }).catch((e) => ToastAndroid.show("Sorry ! Let's try later",ToastAndroid.SHORT) )

    
    setUserDetailsAvailable(true)
}

return (
    <View style = {home.container}>  
        <View style = {home.userDetailsContainer}>
            <ModernHeader 
                title="Home"
                titleStyle = {header1.headerText}
                backgroundColor= {background}
                leftDisable
                rightIconComponent = {
                    <AntDesign name = "logout" size = {20} color = "black" />
                }
                rightIconOnPress = {()=> {
                    Amplitude.logEventAsync('SIGNOUT_FROM_HOME')
                    navigation.navigate("Signout")
                }}
                />
        </View>

        {(infoLoading || homeLoading) ? <LoadingPage /> : 
        !userDetailsAvailable ? (
            <View style = {home.userDetailsContainer}>
                <View style = {home.userDetailsElementContainer}>
                    <Text style = {home.userDetailsElementText}>UserName</Text>
                    <TextInput 
                        placeholder = "arianagrande"
                        style = {home.userDetailsElementTextInput}
                        onChangeText = {(text)=>setUserName(text)}
                        value = {userName}
                    />
                </View>
                <View style = {home.userDetailsElementContainer}>
                    <Text style = {home.userDetailsElementText}>Age</Text>
                    <TextInput 
                        style = {home.userDetailsElementTextInput} 
                        placeholder = "27"
                        onChangeText = {(text)=>setAge(text)}
                        value = {age}
                    />
                </View>
                <View style = {home.userDetailsGenderView}>
                <Text style = {home.userDetailsGenderHeading}> Gender : {gender}</Text>
                <RadioGroup 
                    radioGroupList={radioGroupList} 
                    onChange = {(value) => setGender(value)}
                    initialValue = {gender}
                    containerStyle = {home.userDetailsGenderRadioContainerStyle}
                    buttonContainerStyle ={home.userDetailsGenderRadioButtonContainerStyle}
                    buttonTextStyle = {home.userDetailsGenderRadioButtonTextStyle}
                    buttonContainerActiveStyle = {home.userDetailsGenderRadioButtonContainerActiveStyle}
                    buttonContainerInactiveStyle = {home.userDetailsGenderRadioButtonContainerInactiveStyle}
                    buttonTextActiveStyle = {home.userDetailsGenderRadioButtonTextActiveStyle}
                    buttonTextInactiveStyle = {home.userDetailsGenderRadioButtonTextInactiveStyle}/>
                </View> 
                <View style = {home.userDetailsSubmitContainer}>
                    <TouchableOpacity 
                        onPress = {submitUserDetails}
                        style = {home.userDetailsSubmitButton}>
                        <Text style = {home.userDetailsSubmitText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        ) : (
        <ScrollView 
            contentContainerStyle = {home.mainViewScrollableContentContainer}
            style = {home.mainViewScrollableContainer}
            >
                <View style = {home.mainViewHeroBannerContainer}>
                    <ImageLoader
                        source={hero}
                        fallback={require('../assets/hero.png')}
                        style = {home.mainViewHeroBannerImage}
                    />
                </View>

        {response.length > 0 && response.map((item,index) =>{
            return (
            <View key = {index} style = {home.mainViewCarouselContainer}>
                <Text style = {home.mainViewCarouselTitle}>{item.header}</Text>
                <View style = {home.mainViewCarouselChild}>
                    <Carousel DATA = {item.data} onClickItem = {goToProductFeed} varValue = {item.var}/>
                </View>
            </View> )
        })}
    </ScrollView> )
}
  </View>
)}


export default Home

