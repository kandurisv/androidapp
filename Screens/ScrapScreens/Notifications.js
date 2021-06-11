import React from 'react'
import { StyleSheet, Text, View, Animated, TouchableOpacity, Dimensions } from 'react-native'
import faker from 'faker'
import {Avatar} from 'react-native-paper'
import { useNavigation , useRoute } from '@react-navigation/native';




const Notifications = () => {
  const navigation = useNavigation()
  const route = useRoute()


  const data = [
    {
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
        title: faker.name.firstName() + " added review about " + faker.commerce.product(),
      },
      {
        id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
        title: faker.name.firstName() + " upvoted " + faker.name.firstName() +"'s review" +" on "+ faker.commerce.product() +" product",
      },
      {
        id: "58694a0f-3da1-471f-bd96-145571e29d72",
        title: faker.name.firstName() + " downvoted " + faker.name.firstName() +"'s review" +" on "+ faker.commerce.product() +" product",
      },
      {
        id: "rtwdfasd-c1b1-46c2-aed5-3ad53abb28ba",
        title: faker.name.firstName() + " added review about " + faker.commerce.product(),
      },
      {
        id: "reqwrq-c605-48d3-a4f8-fbd91aa97f63",
        title: faker.name.firstName() + " upvoted " + faker.name.firstName() +"'s review" +" on "+ faker.commerce.product() +" product",
      },
      {
        id: "dfafsafas-3da1-471f-bd96-145571e29d72",
        title: faker.name.firstName() + " downvoted " + faker.name.firstName() +"'s review" +" on "+ faker.commerce.product() +" product",
      },
  
      {
        id: "ghghrgedwf-c1b1-46c2-aed5-3ad53abb28ba",
        title: faker.name.firstName() + " added review about " + faker.commerce.product(),
      },
      {
        id: "sdfaasda-c605-48d3-a4f8-fbd91aa97f63",
        title: faker.name.firstName() + " upvoted " + faker.name.firstName() +"'s review" +" on "+ faker.commerce.product() +" product",
      },
      {
        id: "rwtetwvsd-3da1-471f-bd96-145571e29d72",
        title: faker.name.firstName() + " added review about " + faker.commerce.product(),
      },
      {
        id: "fdfad-c1b1-46c2-aed5-3ad53abb28ba",
        title: faker.name.firstName() + " added review about " + faker.commerce.product(),
      },
      {
        id: "fddsfas-c605-48d3-a4f8-fbd91aa97f63",
        title: faker.name.firstName() + " upvoted " + faker.name.firstName() +"'s review" +" on "+ faker.commerce.product() +" product",
      },
      {
        id: "fqfdsfs-3da1-471f-bd96-145571e29d72",
        title: faker.name.firstName() + " added review about " + faker.commerce.product(),
      },
  ]
  

  const scrollY = React.useRef(new Animated.Value(0)).current

  const CAROUSEL_ITEM_SQUARE_SIZE = 40
  const CAROUSEL_ITEM_SPACING = 10
  const ITEM_SIZE = CAROUSEL_ITEM_SQUARE_SIZE + CAROUSEL_ITEM_SPACING * 3
  
  const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)



  const renderItem = ({item , index}) => {

      const itemClick = (item) => {
         // console.log(item.productId)
          onClickItem(item.id)
      }
     

      
      const inputRange = [
        -1,
        0,
        ITEM_SIZE*index,
        ITEM_SIZE*(index+4),
      ]

      const opacityInputRange = [
          -1,
          0,
          ITEM_SIZE*index,
          ITEM_SIZE*(index+1),
          ITEM_SIZE*(index+2),
         
      ]

      const scale = scrollY.interpolate({
          inputRange,
          outputRange : [1,1,1,0]
      })

      const opacity = scrollY.interpolate({
          inputRange : opacityInputRange,
          outputRange : [1,1,1,0.3,0]
      })

      return(
          <Animated.View style={[styles.container , {transform : [{scale}], opacity}]}>
          {/* <Animated.View style={styles.container}> */}
              <TouchableOpacity onPress = {() => {
                  itemClick(item)
              }}>
                  
                  <View style = {styles.textView}>
                  <Avatar.Image style = {styles.image}
                    source={{
                    uri: 'https://ui-avatars.com/api/rounded=true&background=random&size=512'
                    }} size={30}/>
                    <View style = {styles.textView1}>
                      <Text style={styles.text}>{item.title}</Text>
                    </View>
                  </View>
              </TouchableOpacity>
          </Animated.View>
      )
  }

  return (
          
          <Animated.FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle = {styles.carouselStyle}
          onScroll = {Animated.event(
              [{nativeEvent :  {contentOffset : {y : scrollY}}}],
              {useNativeDriver : true}
          )}
          snapToInterval = {ITEM_SIZE}
          />
      
  )

}

export default Notifications

const styles = StyleSheet.create({
  carouselStyle : {
   

  },
  text : {
    fontSize : 16,
    
  },
  textView1 : {
    flexShrink : 1
  },
  image : {
    margin : 10, 
    marginLeft :0,
  },
  textView : {
    padding : 5 ,
    borderRadius : 6,
    backgroundColor : '#EEE',
    flexDirection : 'row',
    width : Dimensions.get("screen").width* 0.95,
    alignSelf : 'flex-start',
    alignItems : 'center',
    
  },
  container : {
    padding : 10,
    backgroundColor : 'white'
  }


})
