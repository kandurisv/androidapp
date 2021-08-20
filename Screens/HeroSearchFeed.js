import React, { useState , useEffect, useContext} from 'react'
import { View, Text , ScrollView ,RefreshControl ,Animated, Easing, ToastAndroid ,  FlatList, ActivityIndicator, StyleSheet, Image , Dimensions} from 'react-native'
import moment from 'moment';
import { useNavigation , useRoute } from '@react-navigation/native';
import axios from 'axios'
import {URL,  background, borderColor , theme, fitem, LoadingPage} from './exports'
import {TouchableOpacity, TouchableWithoutFeedback} from 'react-native-gesture-handler'
import { ModernHeader } from "@freakycoder/react-native-header-view";
import {Avatar} from 'react-native-paper'
import LottieView from 'lottie-react-native';
// import Video from 'react-native-video';

import * as Amplitude from 'expo-analytics-amplitude';
import { feed, header, header1, postDetails } from './styles';
import { Ionicons } from '@expo/vector-icons';

Amplitude.initializeAsync("af380775c59ead50c4c02536befef5e5");

const {width} = Dimensions.get("screen");
const height = width * 1.2

const FeedItem = ({item}) => {
  const navigation = useNavigation()
  
  
    var review = ""
    item.content.map((reviewItem,index) => {
      if(reviewItem.length > 0) {
        review = review + "Day " + item.day_product_used_content[index] + ": " + reviewItem + "\n"
      }
      })
    
    var context = ""
    item.category_ques.map((contextItem,index)=>{
      context = context + item.category_ques[index] + " : " + item.category_ans[index] + "\n" + "\n"
    })

    const onItemClick = () => {
      navigation.navigate("PostDetails", {details : item , reviewDetails : review , contextDetails : context})
    }

    return(
        <TouchableWithoutFeedback style = {feed.scrollableFeedContainer} onPress = {onItemClick} >
            <View style ={[feed.scrollableFeedItemUserNameHeaderView,{borderRadius:5}]}>
            {  item.profile_image && item.profile_image != "None" && item.profile_image != "" ?
                        <Image source = {{uri : item.profile_image}} style = {{width : 28, height : 28 , borderRadius : 28 , marginTop : 5 , marginLeft : 5  }}/> :
              <Avatar.Image
                style = {{marginTop : 5 , marginLeft : 5 , }}
                source={{uri: 'https://ui-avatars.com/api/?rounded=true&name='+ item.username + '&size=64&background=D7354A&color=fff&bold=true'
                            }} 
                size={28}
              /> }
              <Text style ={feed.scrollableFeedItemUserName} >{item.username}</Text>  
              <Text style = {feed.scrollableFeedItemTime}>{moment(item.event_ts,"YYYY-MM-DD hh:mm:ss").add(5,'hours').add(30, 'minutes').fromNow()}</Text>  
            </View>
            <ScrollView 
              // pagingEnabled 
              horizontal 
              showsHorizontalScrollIndicator = {false} 
              contentContainerStyle = {{}}
              snapToInterval = {width}
            >
            {item.image_list.map((image , index) => (
              <View key = {index}>
                <Image key = {index} style = {[feed.scrollableFeedItemHorizontalScrollImage,{borderRadius:5 , width : Dimensions.get('screen').width*0.965}]} source = {{uri: image ? image : "No Image"}}/>
                <View style = {feed.scrollableFeedItemImagesCount}>
                  <Text style = {{fontSize:14, color : theme}} >{index+1}/{item.image_list.length}</Text>
                </View>
              </View>  
            ))} 
            </ScrollView>
            <View style ={[feed.scrollableFeedItemProductView,,{borderRadius:5}]}>
              <Text style ={feed.scrollableFeedItemProductName} >{item.product_name}</Text>
              <Text style ={feed.scrollableFeedItemProductReview} > {review.length > 40 ? review.substring(0,40) + "..." : review} </Text>
            </View>
        </TouchableWithoutFeedback>
    );
};

const HeroSearchFeed = (props) => {

  const route = useRoute()
  const navigation = useNavigation()

  const [itemsForFeed,setItemsForFeed] = useState(route.params.items)
  const [error, setError] = useState(false);


  const items = ({item,index}) => (
        (item.image_list && item.username) ?
          <View key = {index}>     
            <FeedItem key = {index} item = {item}/> 
          </View> : null
        )
 
  return (
    <View style = {feed.container}>
     <View style = {header.headerView}>
        <ModernHeader 
          title={"Feed"}
          height = {50}
          titleStyle = {[header1.headerText,{fontSize : 18}]}
          backgroundColor= {'white'}
          leftIconColor = {borderColor}
          leftIconOnPress={() => navigation.goBack()}
          rightDisable
        />
      </View>
      <View style = {[feed.mainContainer,{height : Dimensions.get('screen').height - 120}]}>
        {error ? 
        <View><Text>Error while loading data 😢</Text></View> : 
        <FlatList 
        keyExtractor={item => item.item_id} 
        style = {feed.scrollableFeedContainer}
        data = {itemsForFeed}            
        renderItem = {items}
        />
      }
      </View> 
    </View>
  )
}

export default HeroSearchFeed
