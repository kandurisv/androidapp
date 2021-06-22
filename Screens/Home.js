import React from 'react'
import { StyleSheet, Text, View , FlatList , Dimensions, ImageBackground, TouchableOpacity, Animated, ScrollView, Alert, TextInput, ToastAndroid} from 'react-native'
import { useNavigation , useRoute } from '@react-navigation/native';
import {ImageLoader} from 'react-native-image-fallback';
import axios from 'axios';
import {URL, LoadingPage, ErrorPage, TimeoutPage, background, theme, firebaseConfig, AuthContext, headerStyle} from './exports'
import { ModernHeader } from "@freakycoder/react-native-header-view";
import { AntDesign } from '@expo/vector-icons';
import RadioGroup from 'react-native-custom-radio-group';

import { Amplitude } from '@amplitude/react-native';
const ampInstance = Amplitude.getInstance();
ampInstance.init(af380775c59ead50c4c02536befef5e5);

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

const GetProducts = [
    {
        type: "category",
        var: "category_id",
        header: "Browse by category",
        items :  [{
            id : "dfasdfas",
            name : "Music" ,
            image : "https://mish-fit-user-post-images.s3.ap-south-1.amazonaws.com/categoryPhotos/music.png"
        },
        {
            id : "dafdsfsewe",
            name : "Series" ,
            image : "https://mish-fit-user-post-images.s3.ap-south-1.amazonaws.com/categoryPhotos/tvseries.png"
        },
        {
            id : "fwerwerf",
            name : "Speakers" ,
            image : "https://mish-fit-user-post-images.s3.ap-south-1.amazonaws.com/categoryPhotos/speakers.png"
        },
        {
            id : "gfdhgfgsdf",
            name : "Smartphone" ,
            image : "https://mish-fit-user-post-images.s3.ap-south-1.amazonaws.com/categoryPhotos/smartphone.png"
        },
        {
            id : "xvsdgfddfas",
            name : "Laptop" ,
            image : "https://mish-fit-user-post-images.s3.ap-south-1.amazonaws.com/categoryPhotos/laptop.png"
        }]
    },
    {
    type: "product",
    var: "product_id",
    header: "Get Recommended Products",
      items : [
        {
            id : "wtegtfsdfwd",
            name : "Headphone" ,
            image : "https://mish-fit-user-post-images.s3.ap-south-1.amazonaws.com/categoryPhotos/headphones.png"
        },
        {
            id : "4wgefwefsw",
            name : "Camera" ,
            image : "https://mish-fit-user-post-images.s3.ap-south-1.amazonaws.com/categoryPhotos/camera.png"
        },
        {
            id : "rwfsfsafsa",
            name : "Books" ,
            image : "https://mish-fit-user-post-images.s3.ap-south-1.amazonaws.com/categoryPhotos/books.png"
        },
        {
            id : "dfassafsadf",
            name : "Beauty" ,
            image : "https://mish-fit-user-post-images.s3.ap-south-1.amazonaws.com/categoryPhotos/beauty.png"
        }]
    }
]
        



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
            <Animated.View style={[styles.container , {transform : [{scale}]}]}>
                <TouchableOpacity onPress = {() => {itemClick(item)}}>
                    <ImageBackground source = {{uri : item.image}} 
                        style = {styles.image} blurRadius = {3}>
                    </ImageBackground>
                    <View style = {styles.textView}>
                        <Text style={styles.text}>{item.name}</Text>
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
            contentContainerStyle = {styles.carouselStyle}
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
    // console.log("DATA", response)

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
    <View style = {{flex : 1 , backgroundColor : background}}>
        <View>
            <ModernHeader 
                title="Home"
                titleStyle = {headerStyle.headerText}
                backgroundColor= {background}
                leftDisable
                rightIconComponent = {
                    <AntDesign name = "logout" size = {20} color = "black" />
                }
                rightIconOnPress = {()=> {
                    ampInstance.logEvent('SIGNOUT_FROM_HOME')
                    navigation.navigate("Signout")
                }}
                />
        </View>

        {(infoLoading || homeLoading) ? <LoadingPage /> : 
        !userDetailsAvailable ? (
            <View style = {styles.userDetailsMasterContainer}>
                <View style = {styles.userDetailsContainer}>
                    <Text style = {styles.userDetailsText}>UserName</Text>
                    <TextInput 
                        placeholder = "arianagrande"
                        style = {styles.userDetailsInput}
                        onChangeText = {(text)=>setUserName(text)}
                        value = {userName}
                    />
                </View>
                <View style = {styles.userDetailsContainer}>
                    <Text style = {styles.userDetailsText}>Age</Text>
                    <TextInput 
                        style = {styles.userDetailsInput} 
                        placeholder = "27"
                        onChangeText = {(text)=>setAge(text)}
                        value = {age}
                    />
                </View>
                <View>
                <Text style = {{fontSize : 14, fontStyle : "italic" , color : 'black' , margin : 10}}> Gender : {gender}</Text>
                <RadioGroup 
                    radioGroupList={radioGroupList} 
                    onChange = {(value) => setGender(value)}
                    initialValue = {gender}
                    containerStyle = {styles.radioContainerStyle}
                    buttonContainerStyle ={styles.radioButtonContainerStyle}
                    buttonTextStyle = {styles.radioButtonTextStyle}
                    buttonContainerActiveStyle = {styles.radioButtonContainerActiveStyle}
                    buttonContainerInactiveStyle = {styles.radioButtonContainerInactiveStyle}
                    buttonTextActiveStyle = {styles.radioButtonTextActiveStyle}
                    buttonTextInactiveStyle = {styles.radioButtonTextInactiveStyle}/>
                </View> 
                <View style = {{alignItems : 'flex-end'}}>
                    <TouchableOpacity 
                        onPress = {submitUserDetails}
                        style = {styles.userDetailsSubmitButton}>
                        <Text style = {styles.userDetailsSubmitText}>Submit</Text>
                    </TouchableOpacity>
                    
                </View>
            </View>
        ) : (
        <ScrollView 
            contentContainerStyle = {styles.contentContainer}
            style = {styles.container1}>
                <View style = {styles.addReview}>
                    <ImageLoader
                        source={hero}
                        fallback={require('../assets/hero.png')}
                        style = {styles.imageCover}
                    />
                </View>

        {response.length > 0 && response.map((item,index) =>{
            return (
            <View key = {index} style = {styles.trendingProducts}>
                <Text style = {styles.title}>{item.header}</Text>
                <View style = {{marginLeft : 0}}>
                    <Carousel DATA = {item.data} onClickItem = {goToProductFeed} varValue = {item.var}/>
                </View>
            </View> )
        })}
    </ScrollView> )
}
  </View>
)}



export default Home

const styles = StyleSheet.create({
contentContainer : {
  justifyContent : 'center',
  alignItems : 'center',
  marginBottom : 60,

},
container1 : {
    marginBottom : 60,
},
addReview : {
  backgroundColor : 'pink',
  flex : 1,
  width : width,
  height : width * 0.8,
},
trendingProducts : {
  width,
  margin : 10 , 
  flex : 1,
  
},
productRecommendation : {
  width,
  margin : 10 ,
  marginTop : 0, 
  flex : 1,
},
feed : {

},
title : {
  fontWeight : 'bold',
  fontSize : 20,
  marginLeft : 20,
  margin : 10,
},
container: {
  flex: 1,
  height : CAROUSEL_ITEM_SQUARE_SIZE,
  width : CAROUSEL_ITEM_SQUARE_SIZE,
  justifyContent : 'center',
  alignItems :'center',
  borderRadius : 10,
  marginLeft : CAROUSEL_ITEM_SPACING*2, 
  marginTop : CAROUSEL_ITEM_SPACING,
  backgroundColor : '#666',
  opacity : 0.8,
  position : 'relative'
},
image: {
  flex: 1,
  resizeMode: "cover",
  justifyContent: "center",
  height : CAROUSEL_ITEM_SQUARE_SIZE,
  width : CAROUSEL_ITEM_SQUARE_SIZE,
  borderRadius : 10,
  opacity : 0.4,
  backgroundColor : 'black',
  // ...StyleSheet.absoluteFillObject,  
},
textView: {
  ...StyleSheet.absoluteFillObject,
},
text: {
  color: "white",
  fontSize: 12,
  fontWeight: "400",
  textAlign: "center",
  marginTop : 10
  // position : 'absolute',
  // top : 40,
  
},
carouselStyle : {

},
imageCover : {
    width : width,
    height : width * 0.8,
  },


userDetailsText : {
    margin : 10,
    flex : 1, 
    textAlign : 'center',
},
userDetailsInput : {   
    flex : 1, 
    borderRadius : 5,
    borderBottomWidth : 1,
    borderColor : '#AAA',
    textAlign : 'center',
    width : Dimensions.get('screen').width*0.5
},
userDetailsContainer  : {
    flexDirection : 'row',
    borderRadius : 5,
    borderWidth : 1,
    borderColor : 'black',
    padding : 5 , 
    margin : 5
},
userDetailsMasterContainer  : {},
userDetailsSubmitButton : {
    backgroundColor : theme,
    width : Dimensions.get('screen').width*0.5,
    marginTop : 20,
    alignItems : 'center',
    padding : 10,
    borderRadius : 10,
    marginRight : 10,
},
userDetailsSubmitText : {
    color : background,
    textAlign : 'center'
},
radioContainerStyle : {
    justifyContent : 'center' , 
    alignItems : 'center' , 
    width : Dimensions.get("window").width,
    alignItems : 'center'
},
radioButtonContainerStyle: {
    borderWidth : 1, 
    borderColor : '#AAA' ,
    padding: 5 , 
    borderRadius : 10 ,     
    height : 30,
    margin : 10,
    marginTop : 0 ,
    width : 100
    
    
},
radioButtonTextStyle: {fontSize : 12},
radioButtonContainerActiveStyle: {backgroundColor : theme},
radioButtonContainerInactiveStyle: {},
radioButtonTextActiveStyle: {},
radioButtonTextInactiveStyle: {},

})
