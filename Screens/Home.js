import React from 'react'
import { Text, View , FlatList , Dimensions, ImageBackground, TouchableOpacity, Animated, ScrollView, Alert, TextInput, ToastAndroid, Platform , Share} from 'react-native'
import { useNavigation , useRoute } from '@react-navigation/native';
import {ImageLoader} from 'react-native-image-fallback';
import axios from 'axios';
import {URL, LoadingPage,  background, theme, firebaseConfig, AuthContext} from './exports'
import { ModernHeader } from "@freakycoder/react-native-header-view";
import { AntDesign, Ionicons } from '@expo/vector-icons';
import RadioGroup from 'react-native-custom-radio-group';
import { header1, home } from './styles';
//import SpInAppUpdates, {NeedsUpdateResponse, IAUUpdateKind, StartUpdateOptions} from 'sp-react-native-in-app-updates';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import * as Amplitude from 'expo-analytics-amplitude';

import * as Notifications from 'expo-notifications'
import Constants from 'expo-constants';

import 'react-native-get-random-values'
import { nanoid } from 'nanoid'


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
    const [heroLink,setHeroLink] = React.useState("https://play.google.com/store/apps/details?id=com.candid.app")
    const [heroLinkExists,setHeroLinkExists] = React.useState(false)

    const [updateAvailable,setUpdateAvailable] = React.useState(false)
    const [updateApp, setUpdateApp] = React.useState(false)
    const [updateOptions,setUpdateOptions] = React.useState({})

    const [deviceToken , setDeviceToken] = React.useState("")
    const [expoToken , setExpoToken] = React.useState("")
    

    const [userDetailsAvailable,setUserDetailsAvailable] = React.useState(false)

    const [userName,setUserName] = React.useState("")
    const [instagram,setInstagram] = React.useState("")
    const [coupon,setCoupon] = React.useState('')
    const [couponValid,setCouponValid] = React.useState(false)
    const [couponUserName,setCouponUserName] = React.useState("")
    const [couponPoints,setCouponPoints] = React.useState(0)
    const [myCouponCode,setMyCouponCode] = React.useState(nanoid(5))

    const [heroSearchText,setHeroSearchText] = React.useState("")
  
    const goToProductFeed = (name, idValue, value) => {
        navigation.navigate("Feed", {varValue : value , id : idValue, value : name } )
    }


    const registerForExpoPushNotificationsAsync= async() => {
        let token;
        
        if (Constants.isDevice) {
          const { status: existingStatus } = await Notifications.getPermissionsAsync();
          
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            ToastAndroid.show('Failed to get push token for push notification!',ToastAndroid.SHORT);
            return;
          }
          try {
            token = await Notifications.getExpoPushTokenAsync({
              experienceId : '@kandurisv/candidapp'
            })
          }
          catch(e) {
            console.log(e)
          }
           } 
        else {
          alert('Must use physical device for Push Notifications');
        }

      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }
      
      return token.data;
    }
    
    const registerForDevicePushNotificationsAsync = async() => {
      let token;
     
      if (Constants.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
       
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          alert('Failed to get push token for push notification!');
          return;
        }

        token = (await Notifications.getDevicePushTokenAsync()).data;
        
      } else {
        alert('Must use physical device for Push Notifications');
      }
      console.log("token", token)
      return token;
    }
    

    
    

    React.useEffect(() => {
      const registerNotification = async () => {
        registerForExpoPushNotificationsAsync().then(token => {
          console.log("expo token", token)
          setExpoToken(token)
          AsyncStorage.setItem('expoToken', token )
        });
        registerForDevicePushNotificationsAsync().then(token => {
          console.log("device token", token)
          setDeviceToken(token)
          AsyncStorage.setItem('deviceToken', token )
        });
    }
        registerNotification()
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
          message: 'Write your first review on Candid App at https://play.google.com/store/apps/details?id=com.candid.app'
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

const onSearchHero = () => {
  axios.get(URL + "/search/review", {params:{str2Match : heroSearchText }} , {timeout:5000})
  .then(res => res.data).then(async (responseData) => {
    console.log(responseData)
    if (responseData.length) {
      navigation.navigate("HeroSearchFeed", {items : responseData})
    } else {
      ToastAndroid.show("Invalid Seach Query", ToastAndroid.SHORT)
    }
  })
  .catch(function(error) {
    ToastAndroid.show("Invalid Search Query", ToastAndroid.SHORT)
  });
}

const onCouponValid = () => {
  console.log("COUPON", coupon)
  axios.get(URL + "/referral", {params:{existing_referral_code : coupon }} , {timeout:5000})
  .then(res => res.data).then(async (responseData) => {
    console.log(responseData)
    if (responseData[0].validation) {
      setCouponUserName(responseData[0].username)
      setCouponValid(true)
      ToastAndroid.show("Congrats ! Coupon Code applied", ToastAndroid.SHORT)
    } else {
      ToastAndroid.show("Invalid Coupon Code", ToastAndroid.SHORT)
    }
    
  })
  .catch(function(error) {
    ToastAndroid.show("Invalid Coupon Code", ToastAndroid.SHORT)
  });
}

const submitUserDetails = () => {
    const body = {
        "var" : "new user",
        "username": userName,
        "phone_number" : userId,
        "cover_image" : "https://mish-fit-user-post-images.s3.ap-south-1.amazonaws.com/defaultCover.jpg",
        "expo_token" : expoToken,
        "device_token" : deviceToken,
        "instagram_username" : instagram.toLowerCase()
    }

    const body1 = {
      "new_user_id": userId.slice(1,13),
      "username": userName,
      "new_referral_code": myCouponCode ,
      "existing_referral_code": coupon
    }

    console.log(body)
    axios({method: 'post',url: URL + '/user/info',data: body})
    .then(res => {
        ToastAndroid.show("Thanks for your details",ToastAndroid.SHORT)
    }).catch((e) => ToastAndroid.show("Sorry ! Let's try later",ToastAndroid.SHORT) )

    axios({method: 'post',url: URL + '/referral',data: body1})
    .then(res => {
      console.log("res")
    }).catch((e) => console.log(e) )

    
    setUserDetailsAvailable(true)
}

return (
    <View style = {home.container}>  
        <View style = {header1.headerView}>
            <ModernHeader 
                title="Candid"
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
                <View style = {home.userDetailsUserNameContainer}>
                    <Text style = {home.userDetailsUserNameText}>Instagram UserName (Optional)</Text>
                    <TextInput 
                        placeholder = "Instagram username"
                        style = {[home.userDetailsUserNameTextInput,{fontSize : 14}]}
                        onChangeText = {(text)=>setInstagram(text )}
                        value = {instagram}
                    />
                </View>
                <View style = {home.userDetailsUserNameContainer}>
                    <Text style = {home.userDetailsUserNameText}>Coupon Code (Optional)</Text>
                    <View style = {{flexDirection : 'row', justifyContent : 'center', alignItems:'center', padding:0}}>
                    <TextInput 
                        placeholder = "ABCD"
                        style = {[home.userDetailsUserNameTextInput,{fontSize : 16 , flex : 1, marginTop : 0}]}
                        onChangeText = {(text)=>setCoupon(text)}
                        value = {coupon}
                    />
                    <TouchableOpacity 
                      onPress = {onCouponValid}
                      style = {[home.userDetailsUserNameCouponValid,{elevation : 1,}]}>
                      <Ionicons name = "checkmark-sharp" size = {couponValid ? 30 : 26} color = {couponValid ? "green" : "black"} />
                    </TouchableOpacity>
                    </View>
                </View>
                 
                <View style = {home.userDetailsSubmitContainer}>
                    <TouchableOpacity
                        disabled = {userName === "" ? true : false} 
                        onPress = {submitUserDetails}
                        style = {userName === "" ? home.userDetailsDisabledSubmitButton : home.userDetailsSubmitButton}>
                        <Text style = {home.userDetailsSubmitText}>Submit</Text>
                    </TouchableOpacity>
                </View>

                
            </View>
        ) : (
        <ScrollView 
            contentContainerStyle = {home.mainViewScrollableContentContainer}
            style = {home.mainViewScrollableContainer}
            >
              <View style = {{flexDirection : 'row' , borderWidth : 1 , borderColor : '#111', padding : 5, margin : 5}}>
                <TextInput 
                  style = {{flex : 1 , fontSize : 16}}
                  placeholder = "Ask Questions, Search Products"
                  onChangeText = {(text)=>setHeroSearchText(text)}
                  value = {heroSearchText}
                />
                <TouchableOpacity 
                  style = {{borderColor : "#D7354A" , paddingTop : 2, paddingBottom : 2, paddingLeft : 5, paddingRight: 5, justifyContent : 'center' , alignItems : 'center', borderRadius : 5 , borderWidth : 1}}
                  onPress = {onSearchHero}
                >
                  <Text style = {{color : "#D7354A", marginLeft : 5, marginRight : 5}}> Search </Text>
                </TouchableOpacity>
              </View>

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

