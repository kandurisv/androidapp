import React from 'react'
import { StyleSheet, Text, View , FlatList , Dimensions, ImageBackground, TouchableOpacity, Animated, ScrollView} from 'react-native'
const {width, height} = Dimensions.get("window")
const CAROUSEL_ITEM_SQUARE_SIZE = 100
const CAROUSEL_ITEM_SPACING = 5

const GetProducts = [
  {
      productId : "dfasdfas",
      productName : "Music" ,
      productImageURL : "https://mish-fit-user-post-images.s3.ap-south-1.amazonaws.com/categoryPhotos/music.png"
  },
  {
      productId : "dafdsfsewe",
      productName : "Series" ,
      productImageURL : "https://mish-fit-user-post-images.s3.ap-south-1.amazonaws.com/categoryPhotos/tvseries.png"
  },
  {
      productId : "fwerwerf",
      productName : "Speakers" ,
      productImageURL : "https://mish-fit-user-post-images.s3.ap-south-1.amazonaws.com/categoryPhotos/speakers.png"
  },
  {
      productId : "awretghf",
      productName : "Accessories" ,
      productImageURL : "https://mish-fit-user-post-images.s3.ap-south-1.amazonaws.com/categoryPhotos/smartphone_accessories.png"
  },
  {
      productId : "gfdhgfgsdf",
      productName : "Smartphone" ,
      productImageURL : "https://mish-fit-user-post-images.s3.ap-south-1.amazonaws.com/categoryPhotos/smartphone.png"
  },
  {
      productId : "xvsdgfddfas",
      productName : "Laptop" ,
      productImageURL : "https://mish-fit-user-post-images.s3.ap-south-1.amazonaws.com/categoryPhotos/laptop.png"
  },
  {
      productId : "wtegtfsdfwd",
      productName : "Headphone" ,
      productImageURL : "https://mish-fit-user-post-images.s3.ap-south-1.amazonaws.com/categoryPhotos/headphones.png"
  },
  {
      productId : "4wgefwefsw",
      productName : "Camera" ,
      productImageURL : "https://mish-fit-user-post-images.s3.ap-south-1.amazonaws.com/categoryPhotos/camera.png"
  },
  {
      productId : "rwfsfsafsa",
      productName : "Books" ,
      productImageURL : "https://mish-fit-user-post-images.s3.ap-south-1.amazonaws.com/categoryPhotos/books.png"
  },
  {
      productId : "dfassafsadf",
      productName : "Beauty" ,
      productImageURL : "https://mish-fit-user-post-images.s3.ap-south-1.amazonaws.com/categoryPhotos/beauty.png"
  }       
]


const Carousel = ({DATA , onClickItem}) => {
    const [data,setData] = React.useState([...DATA])

    const scrollX = React.useRef(new Animated.Value(0)).current

    const ITEM_SIZE = CAROUSEL_ITEM_SQUARE_SIZE + CAROUSEL_ITEM_SPACING 
    
    const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

    const renderItem = ({item , index}) => {

        const itemClick = (item) => {
           // console.log(item.productId)
            onClickItem(item.productId)
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
                    <ImageBackground source = {{uri : item.productImageURL}} 
                        style = {styles.image} blurRadius = {3}>
                    </ImageBackground>
                    <View style = {styles.textView}>
                        <Text style={styles.text}>{item.productName}</Text>
                    </View>
                </TouchableOpacity>
            </Animated.View>
        )
    }

    return (  
            <Animated.FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.productId}
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
  
const goToProductFeed = (id) => {
  console.log(id)
}

React.useEffect(() => {
    
},[])

return (
  <ScrollView 
    contentContainerStyle = {styles.contentContainer}
    style = {styles.container1}>
      <View style = {styles.addReview}>
      </View>
      <View style = {styles.trendingProducts}>
          <Text style = {styles.title}>Trending Products</Text>
          <View style = {{marginLeft : 0}}>
              <Carousel DATA = {GetProducts} onClickItem = {goToProductFeed}/>
          </View>
      </View>
      <View style = {styles.productRecommendation}>    
          <Text style = {styles.title}>Recommended Products for you</Text>
          <View style = {{marginLeft : 0}}>
              <Carousel DATA = {GetProducts} onClickItem = {goToProductFeed}/>
          </View>
      </View>
      <View style = {styles.feed}>
      </View>
  </ScrollView>
)
}

export default Home

const styles = StyleSheet.create({
contentContainer : {
  justifyContent : 'center',
  alignItems : 'center'
},
container1 : {

},
addReview : {
  backgroundColor : 'pink',
  flex : 1,
  width : width * 0.9,
  height : width * 0.7,
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
  marginLeft : 20,
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

})
