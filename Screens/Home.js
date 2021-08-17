import React from 'react'
import { StatusBar } from 'expo-status-bar';
import {Avatar} from 'react-native-paper';
import Modal from 'react-native-modal';
import { Text, View , FlatList , Dimensions, ImageBackground, TouchableOpacity, Animated, ScrollView, Alert, TextInput, ToastAndroid, Platform , Share, Image, Pressable} from 'react-native'
import { useNavigation , useRoute } from '@react-navigation/native';
import {ImageLoader} from 'react-native-image-fallback';
import axios from 'axios';
import {URL, LoadingPage,  background, theme, firebaseConfig, AuthContext, borderColor} from './exports'
import { ModernHeader } from "@freakycoder/react-native-header-view";
import { AntDesign, Entypo, FontAwesome, Fontisto, Ionicons } from '@expo/vector-icons';
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
import { SliderBox } from "react-native-image-slider-box";

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
                    <ImageBackground source = {{uri : item.image ? item.image : "No Image"}} 
                        style = {home.mainViewCarouselScrollableItemImageBackground} blurRadius = {1}>
                    </ImageBackground>
                    <View style = {home.mainViewCarouselScrollableItemTextContainer}>
                        <Text style={home.mainViewCarouselScrollableItemText}>{item.name.length > 75 ? item.name.substring(0,75) + "..." : item.name} </Text>
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


const UpdatedCarousel = ({DATA , onClickItem , varValue}) => {
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
          outputRange : [1,1,0.5,0]
      })
      const opacity = scrollX.interpolate({
          inputRange : opacityInputRange,
          outputRange : [1,1,1,0]
      })

      return(
          <Animated.View style={[home.mainViewCarouselScrollableItemContainer  , {transform : [{scale}]}]}>
              <TouchableOpacity style = {home.mainViewCarouselScrollableItemButton} onPress = {() => {itemClick(item)}}>
                  <View style = {{flex: 1  , width : 100, backgroundColor : background}}>
                    <Image source = {{uri : item.image ? item.image : "No Image"}} 
                        style = {[home.mainViewCarouselScrollableItemImageBackground, {opacity : 1 , backgroundColor : background, borderRadius : 5 , width : 80, height : 80 , marginLeft : 10} ]} />
                  </View>
                  <View style = {{backgroundColor : "#FFF" , height : 45 , borderRadius : 5, }}>
                      <Text style={[home.mainViewCarouselScrollableItemText,{margin:1 ,fontSize : 10 , color : borderColor}]}>{item.name.length > 30 ? item.name.substring(0,30) + "..." : item.name}</Text>
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
          style = {{width : Dimensions.get('screen').width*0.94}}
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
    const [userResponse, setUserResponse] = React.useState({})
    const [homeLoading,setHomeLoading] = React.useState(true)
    const [infoLoading,setInfoLoading] = React.useState(true)
    const [timed,setTimed] = React.useState(false)
    const [error,setError] = React.useState(false)
    const [secs,setSecs] = React.useState(0)
    const [refresh,setRefresh] = React.useState(false)
    const [result,setResult] = React.useState(false)
   
    const [heroImage,setHeroImage] = React.useState([])
    const [heroLink,setHeroLink] = React.useState([])
    const [heroLinkExists,setHeroLinkExists] = React.useState([])

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

    const [activityModal, setActivityModal] = React.useState(false)
    const [activityCount, setActivityCount] = React.useState(0)

    const [heroSearchText,setHeroSearchText] = React.useState("")

    const [brandCarousel,setBrandCarousel] = React.useState([])


    const [sliderImages,setSliderImages] = React.useState([
      "https://mish-fit-user-post-images.s3.ap-south-1.amazonaws.com/LoginPage/1.jpg",
      "https://mish-fit-user-post-images.s3.ap-south-1.amazonaws.com/LoginPage/2.jpg",
      "https://mish-fit-user-post-images.s3.ap-south-1.amazonaws.com/LoginPage/3.jpg",  
    ])

  
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
          //  console.log(e)
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
     // console.log("token", token)
      return token;
    }
    

    
    

    React.useEffect(() => {
      const registerNotification = async () => {
        registerForExpoPushNotificationsAsync().then(token => {
        //  console.log("expo token", token)
          setExpoToken(token)
          AsyncStorage.setItem('expoToken', token )
        });
        registerForDevicePushNotificationsAsync().then(token => {
        //  console.log("device token", token)
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
                        console.log("HOME USER RESPONSE",responseData)
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
                    console.log(responseData)
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
                    setHeroImage(responseData[0].image)
                    setHeroLink(responseData[0].clickable_link)
                    setHeroLinkExists(responseData[0].clickable)
                })
                .catch(function(error) {   });
                axios.get(URL + "/notifications/newcount",{params:{user_id : user.phoneNumber.slice(1,13) }} , {timeout : 5000})
                .then(res => res.data).then(function(responseData) {
                    console.log(responseData)
                    setActivityCount(responseData[0].new_notification_indicator)
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
  console.log(link)
  //  WebBrowser.openBrowserAsync(link);
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
  //  console.log(responseData)
    if (responseData.length) {
      navigation.navigate("HeroSearchFeed", {items : responseData})
      Amplitude.logEventWithPropertiesAsync('HERO_SEARCH_FEED_VISIT_FROM_HOME',{"userId" : userId , "search" : heroSearchText })

    } else {
      ToastAndroid.show("Invalid Seach Query", ToastAndroid.SHORT)
    }
  })
  .catch(function(error) {
    ToastAndroid.show("Invalid Search Query", ToastAndroid.SHORT)
  });
}

const onCouponValid = () => {
 // console.log("COUPON", coupon)
  axios.get(URL + "/referral", {params:{existing_referral_code : coupon }} , {timeout:5000})
  .then(res => res.data).then(async (responseData) => {
  //  console.log(responseData)
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

  //  console.log(body)
    axios({method: 'post',url: URL + '/user/info',data: body})
    .then(res => {
        ToastAndroid.show("Thanks for your details",ToastAndroid.SHORT)
    }).catch((e) => ToastAndroid.show("Sorry ! Let's try later",ToastAndroid.SHORT) )

    axios({method: 'post',url: URL + '/referral',data: body1})
    .then(res => {
    //  console.log("res")
    }).catch((e) => console.log(e) )

    
    setUserDetailsAvailable(true)
}

return (
    <View style = {home.container}>  
        <StatusBar style="dark" />
        <View style = {[header1.headerView,{backgroundColor : 'white'}]}>
            {/* <ModernHeader 
              
                titleStyle = {header1.headerText}
                title = {userResponse ? userResponse.username ? "Hola " + userResponse.username + "!" : "Hola!" : "Hola!"}
                backgroundColor= {'white'}
                height = {50}
                leftIconComponent = {
                  <View style = {{flex : 1 }}>
                    <Image style={{height : 30 , width : 30}}
                          source={require('../assets/NameLogoColorWhiteSolid.png')}
                      />
                  </View>
                }
                rightIconComponent = {
                  <View style = {{flexDirection : 'row'}}>
                    <TouchableOpacity style = {{marginRight : 15}} onPress = {() => {
                      //setActivityModal(!activityModal)
                      setActivityCount(0)
                      navigation.navigate("ActivityNotification")
                    }}>
                      { activityModal ?
                      null : activityCount ?
                      <View style = {{backgroundColor : 'orange' , borderRadius : 12 , position : 'absolute' , top : 0 , right : 0 , width : 12, height : 12 , justifyContent : 'center', alignItems : 'center' , zIndex : 101}}>
                        <Text style = {{fontSize : 10 , color : 'black'}}>{activityCount}</Text>
                      </View> : null
                      }
                      { activityModal ?
                        <Entypo name = "bell" size = {20} color = {theme} /> :
                        <FontAwesome name = "bell" size = {20} color = {theme} />
                      }
                    </TouchableOpacity>
                    <TouchableOpacity style = {{marginRight : 5}} onPress = {share}>
                      <AntDesign name = "sharealt" size = {20} color = {theme} />
                    </TouchableOpacity>
                  </View>   
                }
                /> */}
            <TouchableOpacity 
              onPress = {()=>navigation.openDrawer()}
              style = {{ justifyContent : 'center' , alignItems : 'center' , marginLeft : 10 , marginRight : 5 , borderColor : theme, borderWidth : 1, borderRadius : 30}}>
                { userResponse  && userResponse.profile_image && userResponse.profile_image != "None" && userResponse.profile_image != "" ?
                        <Image source = {{uri : userResponse.profile_image}} style = {{width : 30, height : 30 , borderRadius : 30 , }}/> :
                        userResponse.length && userResponse.username ? 
                                <Avatar.Image 
                                source={{
                                uri: 'https://ui-avatars.com/api/?rounded=true&name='+ userResponse.username.replace(' ','+') + '&size=512&background=D7354A&color=fff&bold=true'
                                }} size={30}/> :
                                <Avatar.Image 
                                source={{
                                uri: 'https://ui-avatars.com/api/?rounded=true&size=512&background=D7354A&color=fff&bold=true'
                                }} size={30}/>}
                    </TouchableOpacity>
            <View style = {{flex : 1 , justifyContent : 'center', alignItems : 'center', backgroundColor : 'white' , }}>
              <Image style={{height : 40 , width : 40 }}
                          source={require('../assets/LogoTransparentSolidColorLine.png')}
              />          
            </View>
            <View>
            <View style = {{flexDirection : 'row', marginRight : 15}}>
                    <TouchableOpacity style = {{}} onPress = {() => {
                      //setActivityModal(!activityModal)
                      setActivityCount(0)
                      navigation.navigate("ActivityNotification", {userId : userId.slice(1,13)})
                    }}>
                      { activityModal ?
                      null : activityCount && activityCount > 0 ?
                      <View style = {{backgroundColor : theme , borderRadius : 12 , position : 'absolute' , top : 0 , right : 0 , width : 14, height : 14 , justifyContent : 'center', alignItems : 'center' , zIndex : 101}}>
                        <Text style = {{fontSize : 10 , color : 'white'}}>{activityCount}</Text>
                      </View> : null
                      }
                      { activityModal ?
                        <Entypo name = "bell" size = {24} color = {'#555'} /> :
                        <FontAwesome name = "bell" size = {24} color = {'#555'} />
                      }
                    </TouchableOpacity>
                  </View>   

            </View>

        </View>

        {/* <Modal 
          isVisible={activityModal}
          deviceWidth={Dimensions.get('screen').width}
          deviceHeight={Dimensions.get('screen').height}
          onBackdropPress={() => setActivityModal(false)}
          onSwipeComplete={() => setActivityModal(false)}
          swipeDirection="left"
          style = {home.modalContainer}
        >
          <View style={home.modalView}>
            <Text style = {home.modalHeading}>Review:</Text>
            <Text style = {home.modalText}>This is test</Text>
          </View>
        </Modal> */}



        {(infoLoading || homeLoading) ? <LoadingPage /> : 
        !userDetailsAvailable ? (
            <View style = {home.userDetailsContainer}>
                <View style = {home.userDetailsUserNameContainer}>
                    <Text style = {home.userDetailsUserNameText}>Select your username</Text>
                    <TextInput 
                        placeholder = "username"
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
              <View
                style = {{flexDirection : 'row' , borderWidth : 1 , borderColor : '#bbb', backgroundColor : '#EEE' ,
                borderRadius : 2, padding : 5, margin : 5 , height : 50, justifyContent: 'center', 
                alignItems:'center'}}>
                <TextInput 
                  style = {{flex : 1 , fontSize : 14}}
                  placeholder = "Search categories, brands or products"
                  onChangeText = {(text)=>setHeroSearchText(text)}
                  value = {heroSearchText}
                />
                {/* <Text 
                  style = {{flex : 1 , fontSize : 14 , paddingLeft : 10, color : "#888"}} >
                    Search categories, brands or products
                </Text> */}
                <TouchableOpacity 
                  style = {{ paddingTop : 2, paddingBottom : 2, paddingLeft : 5, paddingRight: 5, justifyContent : 'center' , alignItems : 'center', borderRadius : 5 }}
                  onPress = {onSearchHero}
                >
                  <Fontisto name = "search" size = {20} color = {theme} />
                </TouchableOpacity>
              </View>
              {heroImage.length > 0 ?
              <View style = {home.mainViewHeroBannerContainer}>
                
                  <SliderBox 
                    images={heroImage} 
                    onCurrentImagePressed =  {index => heroBannerClick(heroLink[index]) }
                    sliderBoxHeight= {Dimensions.get('screen').height*0.25}
                    dotColor="#DDDDDD"
                    inactiveDotColor="#EEEEEE"
                    circleLoop
                    autoPlay
                  />
                
              </View>
              : null }

        {response.length > 0 && response.map((item,index) =>{
            return (
            <View key = {index} style = {[home.mainViewCarouselContainer,{marginTop : 0, paddingRight : 10 , elevation:1 , shadowRadius : 2, shadowColor : theme  , backgroundColor : background  }]}>
              <Text style = {[home.mainViewCarouselTitle,{marginTop : 5}]}>{item.header}</Text>
              <View style = {home.mainViewCarouselChild}>
                <UpdatedCarousel DATA = {item.data} onClickItem = {goToProductFeed} varValue = {item.var}/>
              </View>
            </View> )
        })}
    </ScrollView> )
}
  </View>
)}


export default Home

