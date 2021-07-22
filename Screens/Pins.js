import React, { Component } from 'react';
import { View, Text , ImageBackground, Dimensions, ScrollView, TouchableOpacity} from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import axios from 'axios'
import {AuthContext, background, borderColor,URL} from './exports'
import { ModernHeader } from "@freakycoder/react-native-header-view";
import { useNavigation } from '@react-navigation/native';

import * as Amplitude from 'expo-analytics-amplitude';
import { header, pins, user } from './styles';
Amplitude.initializeAsync("af380775c59ead50c4c02536befef5e5");

export default function Pins() {

  const [userId,isLoggedIn] = React.useContext(AuthContext)
  const [pinsPost,setPinsPost] = React.useState([])
  const [pinsPostEmpty,setPinsPostEmpty] = React.useState(true)
  const [pinsProductEmpty,setPinsProductEmpty] = React.useState(true)
  const [pinsProduct,setPinsProduct] = React.useState([])
  const [postError,setPostError] = React.useState(false)
  const [productError,setProductError] = React.useState(false)

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


  const onClickProduct = (product) => {
    axios.get(URL + "/search/review", {params:{str2Match : product }} , {timeout:5000})
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

  const onClickPost = (item,review,context) => {
    navigation.navigate("PostDetails", {details : item , reviewDetails : review , contextDetails : context})
}

  return (
    <View style = {pins.container}>
      <View style = {header.headerView}>
        <ModernHeader 
          title="Pins"
          titleStyle = {header.headerText}
          backgroundColor= {background}
          leftIconColor = {borderColor}
          leftIconOnPress={() => navigation.goBack()} 
          rightDisable
          />
      </View>
      <ScrollView 
        contentContainerStyle = {user.mainViewContentContainer}
        style = {user.mainViewContainer}
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
            <ImageBackground source = {{uri : item.image_list[0]}} style = {pins.mainViewSubContainerItemImageBackground} blurRadius = {0}></ImageBackground>
            <View style = {[pins.mainViewSubContainerItemTextView, {marginTop : width * 0.15}]}>
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
            onPress = {() => onClickProduct(item.product_name) }
          >
            <ImageBackground source = {{uri : item.image}} style = {pins.mainViewSubContainerItemImageBackground} blurRadius = {2}></ImageBackground>
            <View style = {[pins.mainViewSubContainerItemTextView, {marginTop : width * 0.05}]}>
              <Text style={pins.mainViewSubContainerItemText}>{item.product_name}</Text>
            </View>
          </TouchableOpacity>)}
        />}
      </View>
      </ScrollView>
    </View>
  );
}

