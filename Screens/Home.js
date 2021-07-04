import React from 'react'
import { Text, View , FlatList , Dimensions, ImageBackground, TouchableOpacity, Animated, ScrollView, Alert, TextInput, ToastAndroid, Platform , Share} from 'react-native'
import { useNavigation , useRoute } from '@react-navigation/native';
import {ImageLoader} from 'react-native-image-fallback';
import axios from 'axios';
import {URL, LoadingPage, ErrorPage, TimeoutPage, background, theme, firebaseConfig, AuthContext, headerStyle} from './exports'
import { ModernHeader } from "@freakycoder/react-native-header-view";
import { AntDesign } from '@expo/vector-icons';
import RadioGroup from 'react-native-custom-radio-group';
import { header1, home } from './styles';
//import SpInAppUpdates, {NeedsUpdateResponse, IAUUpdateKind, StartUpdateOptions} from 'sp-react-native-in-app-updates';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import * as Amplitude from 'expo-analytics-amplitude';
Amplitude.initializeAsync("af380775c59ead50c4c02536befef5e5");

import * as firebase from "firebase";
try {
    firebase.initializeApp(firebaseConfig);
  } catch (err) {
    // ignore app already initialized error in snack
  }

const {width, height} = Dimensions.get("window")
const CAROUSEL_ITEM_SQUARE_SIZE = 100
const CAROUSEL_ITEM_SPACING = 5

// const inAppUpdates = new SpInAppUpdates(
//     true
//      // isDebug
//   );

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

    const [userId,userDetails, isLoggedIn] = React.useContext(AuthContext)
    

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
    const [heroImage,setHeroImage] = React.useState("")
    const [heroLink,setHeroLink] = React.useState("https://play.google.com/store/apps/details?id=com.mishreview.androidapp")
    const [heroLinkExists,setHeroLinkExists] = React.useState(false)

    const [updateAvailable,setUpdateAvailable] = React.useState(false)
    const [updateApp, setUpdateApp] = React.useState(false)
    const [updateOptions,setUpdateOptions] = React.useState({})
    

    const [userDetailsAvailable,setUserDetailsAvailable] = React.useState(false)

    const [userName,setUserName] = React.useState("")
    const [age,setAge] = React.useState("")
    const [gender,setGender] = React.useState('')
 
  
    const goToProductFeed = (name, idValue, value) => {
        navigation.navigate("Feed", {varValue : value , id : idValue, value : name } )
    }

    React.useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if (user != null) {
                const getData =  () => {
                    axios.get(URL + "/user/info", {params:{user_id : user.phoneNumber.slice(1,13) }} , {timeout:5000})
                    .then(res => res.data).then(async (responseData) => {
                    //    console.log("HOME USER RESPONSE",responseData)
                        setUserResponse(responseData[0])
                        setInfoLoading(false)
                        if(responseData.length && responseData[0].username) {
                            setUserDetailsAvailable(true)
                            await AsyncStorage.setItem('isLogin', "TRUE")
                            await AsyncStorage.setItem('phoneNumber', user.phoneNumber)
                            await AsyncStorage.setItem('userName', responseData[0].username )
                        }
                        setRefresh(false)
                    })
                    .catch(function(error) {
                        setInfoLoading(false)
                    //    console.log(error)
                        setError(true)
                    });
                axios.get(URL + "/home", {timeout : 5000})
                .then(res => res.data).then(function(responseData) {
                    
                    setResponse(responseData)
                    setHomeLoading(false)
                    setResult(true)
                    
                })
                .catch(function(error) {
                    setInfoLoading(false)
                    setHomeLoading(false)
                    setResult(true)
                    setError(true)
                });
                axios.get(URL + "/home/hero", {timeout : 5000})
                .then(res => res.data).then(function(responseData) {
                //    console.log(responseData)
                    setHeroImage(responseData[0].image)
                    setHeroLink(responseData[0].clickable_link)
                    setHeroLinkExists(responseData[0].clickable)
                })
                .catch(function(error) {
                  
                });
            }
            getData()
            
            } else {
                navigation.navigate("Auth")
            }
        })

     //   console.log("USERID DEFAULT", userId)
     //   console.log("USER DETAILS", userDetails)
        

// App Update 

    // inAppUpdates.checkNeedsUpdate().then((result) => {
    //     if (result.shouldUpdate) {
    //         setUpdateAvailable(true)
    //         if (Platform.OS === 'android') {
    //         // android only, on iOS the user will be promped to go to your app store page
    //         setUpdateOptions({updateType: IAUUpdateKind.FLEXIBLE})
    //     }
    //     }
    // });


},[result])


const heroBannerClick = (link) => {
    WebBrowser.openBrowserAsync(link);
  };


  const share = async () => {
    Amplitude.logEventWithPropertiesAsync('REFERRAL', {userId : userId})
    try {
        const result = await Share.share({
          message: 'Install Candid App at https://play.google.com/store/apps/details?id=com.mishreview.androidapp',
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
         //     console.log(result.activityType)
            } 
          else {
        //  console.log(result)
        }
        } 
        else if (result.action === Share.dismissedAction) {
        //    console.log(result)
        }
      } catch (error) {
        alert(error.message);
      }
}



const onClickUpdateApp = () => {
    // inAppUpdates.startUpdate(updateOptions);
    // inAppUpdates.addStatusUpdateListener(onStatusUpdate);
}

const onStatusUpdate = (status) => {
    ToastAndroid.show("Your app is updated. Enjoy using the app", ToastAndroid.SHORT)
}

const signout = () => {
    navigation.navigate("Signout")
}

const submitUserDetails = () => {
    const body = {
        "var" : "new user",
        "username": userName,
        "phone_number" : userId,
        "cover_photo" : "https://mish-fit-user-post-images.s3.ap-south-1.amazonaws.com/defaultCover.jpg"
    }
  //  console.log(body)
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
        <View style = {header1.headerView}>
            <ModernHeader 
                title="Home"
                titleStyle = {header1.headerText}
                backgroundColor= {background}
                leftDisable
                rightIconComponent = {
                    <AntDesign name = "sharealt" size = {20} color = "black" />
                }
                rightIconOnPress = {share}
                />
        </View>

        {(infoLoading || homeLoading) ? <LoadingPage /> : 
        !userDetailsAvailable ? (
            <View style = {home.userDetailsContainer}>
                <View style = {home.userDetailsUserNameContainer}>
                    <Text style = {home.userDetailsUserNameText}>Select your username</Text>
                    <TextInput 
                        placeholder = "arianagrande"
                        style = {home.userDetailsUserNameTextInput}
                        onChangeText = {(text)=>setUserName(text)}
                        value = {userName}
                        autoFocus
                    />
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
                    <TouchableOpacity onPress = {() => heroBannerClick(heroLink)} disabled = {!heroLinkExists}>
                    <ImageLoader
                        source={heroImage}
                        fallback={require('../assets/hero.png')}
                        style = {home.mainViewHeroBannerImage}
                    />
                    </TouchableOpacity>
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

