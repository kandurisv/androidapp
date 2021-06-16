import React from 'react'
import { StyleSheet, Text, View , FlatList , Dimensions, ImageBackground, TouchableOpacity, Animated, ScrollView} from 'react-native'
import { useNavigation , useRoute } from '@react-navigation/native';
import {ImageLoader} from 'react-native-image-fallback';
import axios from 'axios';
import {URL, LoadingPage, ErrorPage, TimeoutPage, background} from './exports'
import { ModernHeader } from "@freakycoder/react-native-header-view";


const {width, height} = Dimensions.get("window")
const CAROUSEL_ITEM_SQUARE_SIZE = 100
const CAROUSEL_ITEM_SPACING = 5

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
           // console.log(item.id)
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
                <TouchableOpacity onPress = {() => {
                    itemClick(item)
                }}>
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

    const navigation = useNavigation()
    const route = useRoute()
    const [response, setResponse] = React.useState([])
    const [loading,setLoading] = React.useState(true)
    const [timed,setTimed] = React.useState(false)
    const [error,setError] = React.useState(false)
    const [secs,setSecs] = React.useState(0)
    const [refresh,setRefresh] = React.useState(false)
    const [result,setResult] = React.useState(false)
  
    const goToProductFeed = (name, idValue, value) => {
        navigation.navigate("Feed", {varValue : value , id : idValue, value : name } )
    }

    React.useEffect(() => {
    const getData = () => {
        axios.get(URL + "/home", {timeout : 5000})
        .then(res => res.data).then(function(responseData) {
            console.log("Reached to response")
            setResponse(responseData)
            setLoading(false)
            setResult(true)
            // console.log(responseData)
        })
        .catch(function(error) {
            console.log("Reached to error")
            console.log(error)
            setLoading(false)
            setResult(true)
            setError(true)
        });
    }
    
      getData()
    // console.log("DATA", response)

},[result])

return (
    <View>
        <View>
            <ModernHeader 
                title="Home"
                titleStyle = {{fontWeight : 'bold' , fontSize: 20}}
                backgroundColor= {background}
                leftDisable
                />
        </View>
        <ScrollView 
            contentContainerStyle = {styles.contentContainer}
            style = {styles.container1}>
                <View style = {styles.addReview}>
                    <ImageLoader
                        source={"https://mish1-fit-user-post-images.s3.ap-south-1.amazonaws.com/categoryPhotos/books.png"}
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
    
        
       
     
    </ScrollView>
  </View>
)
}

export default Home

const styles = StyleSheet.create({
contentContainer : {
  justifyContent : 'center',
  alignItems : 'center',
  marginBottom : 60,

},
container1 : {
    marginBottom : 130,
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
  fontSize: 15,
  fontWeight: "bold",
  textAlign: "center",
  marginTop : 40
  // position : 'absolute',
  // top : 40,
  
},
carouselStyle : {

},
imageCover : {
    width : width,
    height : width * 0.8,
  },

})
