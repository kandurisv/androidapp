import React, { Component , useState} from 'react';
import { View, Text , Image, ImageBackground, Dimensions, ScrollView, TouchableOpacity , Animated, Easing, RefreshControl} from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import axios from 'axios'
import {AuthContext, background, borderColor,theme,URL} from './exports'
import { ModernHeader } from "@freakycoder/react-native-header-view";
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import * as Amplitude from 'expo-analytics-amplitude';
import { header, header1, pins, user } from './styles';
Amplitude.initializeAsync("af380775c59ead50c4c02536befef5e5");

export default function Pins() {

  const progress = React.useRef(new Animated.Value(0)).current

  const [userId,isLoggedIn] = React.useContext(AuthContext)
  const [pinsPost,setPinsPost] = React.useState([])
  const [pinsPostEmpty,setPinsPostEmpty] = React.useState(true)
  const [pinsProductEmpty,setPinsProductEmpty] = React.useState(true)
  const [pinsProduct,setPinsProduct] = React.useState([])
  const [postError,setPostError] = React.useState(false)
  const [productError,setProductError] = React.useState(false)
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);

  const navigation = useNavigation()

  const {width} = Dimensions.get('screen')

  React.useEffect(()=>{
    const fetchPinsPost = () => {
    //  console.log(userId)
      Amplitude.logEventWithPropertiesAsync('PINS_PAGE_VISIT',{"userId" : userId })
      axios.get(URL + "/pins/post", {params:{user_id : userId.slice(1,13) }} , {timeout : 5})
      .then(res => res.data).then(function(responseData) {
       //   console.log("A", responseData)
          if(responseData.length) {
            setPinsPostEmpty(false)
          }
          setPinsPost(responseData)
          
      })
      .catch(function(error) {
          setPostError(true)
      });
  }
    fetchPinsPost()

    const fetchPinsProduct = () => {
      axios.get(URL + "/pins/product", {params:{user_id : userId.slice(1,13) }} , {timeout : 5})
      .then(res => res.data).then(function(responseData) {
      //    console.log("b", responseData)
          if(responseData.length) {
            setPinsProductEmpty(false)
          }
          setPinsProduct(responseData)
      })
      .catch(function(error) {
          setProductError(true)
      });
  }
  fetchPinsProduct()
  },[])


  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    progress.setValue(0)
    
    axios.get(URL + "/pins/post", {params:{user_id : userId.slice(1,13) }} , {timeout : 5})
    .then(res => res.data).then(function(responseData) {
     //   console.log("A", responseData)
        if(responseData.length) {
          setPinsPostEmpty(false)
          setRefreshing(false)
        }
        setPinsPost(responseData)
        setRefreshing(false)
    })
    .catch(function(error) {
        setPostError(true)
        setRefreshing(false)
    });

    axios.get(URL + "/pins/product", {params:{user_id : userId.slice(1,13) }} , {timeout : 5})
      .then(res => res.data).then(function(responseData) {
      //    console.log("b", responseData)
          if(responseData.length) {
            setPinsProductEmpty(false)
            setRefreshing(false)
          }
          setPinsProduct(responseData)
          setRefreshing(false)
      })
      .catch(function(error) {
          setProductError(true)
          setRefreshing(false)
      });


  });
  



  const onClickProduct = (product) => {
    axios.get(URL + "/search/review", {params:{str2Match : product }} , {timeout:5000})
    .then(res => res.data).then(async (responseData) => {
    //  console.log(responseData)
      if (responseData.length) {
        navigation.navigate("HeroSearchFeed", {items : responseData})
        Amplitude.logEventWithPropertiesAsync('HERO_SEARCH_FEED_VISIT_FROM_PINS',{"userId" : userId , "search" : product })

      } else {
        ToastAndroid.show("Invalid Seach Query", ToastAndroid.SHORT)
      }
    })
    .catch(function(error) {
      ToastAndroid.show("Invalid Search Query", ToastAndroid.SHORT)
    });
  }

  const onClickPost = (item,review,context) => {
    navigation.navigate("PostDetails", {details : item , reviewDetails : review , contextDetails : context})
    Amplitude.logEventWithPropertiesAsync('POST_DETAILS_VISIT_FROM_PINS',{"userId" : userId.slice(1,13) , "review_sum_id" : item.review_sum_id })
  }

  const refreshPage = () => {
    onRefresh()
    Animated.timing(progress, {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear,
                useNativeDriver : true
              },).start();
    
        
  }

  return (
    <View style = {pins.container}>
      <View style = {header1.headerView}>
        <ModernHeader 
                title="Pins"
                height = {50}
                titleStyle = {header1.headerText}
                backgroundColor= {'white'}
                leftIconColor = {borderColor}
                leftIconOnPress={() => navigation.popToTop()}
                leftIconComponent = {
                  <View>
                    <Image style={{height : 30 , width : 30}}
                          source={require('../assets/LogoTransparentSolidColorLine.png')}
                      />
                  </View>
                }
                rightDisable
                />
      </View>
      <ScrollView 
        contentContainerStyle = {user.mainViewContentContainer}
        style = {[user.mainViewContainer,{marginBottom : 60}]}
        showsVerticalScrollIndicator = {false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />}
      >
      <View style = {pins.mainViewItem}>
        <Text style={pins.mainViewSubContainerHeader}>My Pinned Posts</Text>
        {pinsPostEmpty ? 
        <View style={pins.mainViewSubContainerEmptyView}>
          <Text style = {pins.mainViewSubContainerEmptyText}>No Pinned Posts yet. Please engage on posts to save it here</Text>
        </View> :
        <FlatGrid itemDimension={width*0.45} data={pinsPost} renderItem={({item}, i) => {
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
          return (
          <TouchableOpacity onPress = {()=>onClickPost(item,review,context)}
            style = {pins.mainViewSubContainerItemContainer}>
            <Image source = {{uri : item.image_list[0]  ? item.image_list[0] : "None"}} style = {pins.mainViewSubContainerItemImageBackground} ></Image>
            <View style = {[pins.mainViewSubContainerItemTextView, {marginTop : width * 0.15 , backgroundColor : 'rgba(52, 52, 52, 0.6)'}]}>
              <Text style={pins.mainViewSubContainerItemText}>{item.username}</Text>
            </View>
          </TouchableOpacity>)}
          }
        />}
      </View>
      <View style = {pins.mainViewItem}>
        <Text style={pins.mainViewSubContainerHeader}>My Pinned Product</Text>
        {pinsProductEmpty ? 
          <View style={pins.mainViewSubContainerEmptyView}>
            <Text style = {pins.mainViewSubContainerEmptyText}>No Pinned Posts yet. Please engage on posts and get your favourite products here</Text>
          </View> :
        <FlatGrid itemDimension={width*0.45} data={pinsProduct} renderItem={({item}, i) => (
          <TouchableOpacity 
            style = {pins.mainViewSubContainerItemContainer}
           // onPress = {() => onClickProduct(item.product_name) }
          >
            <ImageBackground source = {{uri : item.image ? item.image : "None"}} style = {pins.mainViewSubContainerItemImageBackground} blurRadius = {0}></ImageBackground>
            <View style = {[pins.mainViewSubContainerItemTextView, {marginTop : width * 0.05 , height : '40%' , backgroundColor : 'rgba(52, 52, 52, 0.6)'}]}>
              <Text style={[pins.mainViewSubContainerItemText,{fontSize : 14, marginLeft : 5, marginRight : 5}]}>{item.product_name.length > 50 ? item.product_name.slice(0,50) + "..." : item.product_name}</Text>
            </View>
          </TouchableOpacity>)}
        />}
      </View>
      </ScrollView>
    </View>
  );
}

