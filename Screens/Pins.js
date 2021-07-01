import React, { Component } from 'react';
import { View, Text , ImageBackground, Dimensions, ScrollView} from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import axios from 'axios'
import {AuthContext, background, borderColor,URL} from './exports'
import { ModernHeader } from "@freakycoder/react-native-header-view";
import { useNavigation } from '@react-navigation/native';

import * as Amplitude from 'expo-analytics-amplitude';
import { header, pins } from './styles';
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
      <ScrollView style = {{}}>
      <View style = {pins.mainViewItem}>
        <Text style={pins.mainViewSubContainerHeader}>My Pinned Posts</Text>
        {pinsPostEmpty ? 
        <View style={pins.mainViewSubContainerEmptyView}>
          <Text style = {pins.mainViewSubContainerEmptyText}>No Pinned Posts yet. Please engage on posts to save it here</Text>
        </View> :
        <FlatGrid itemDimension={width*0.45} data={pinsPost} renderItem={({item}, i) => (
          <View style = {pins.mainViewSubContainerItemContainer}>
            <ImageBackground source = {{uri : item.image_list[0]}} style = {pins.mainViewSubContainerItemImageBackground} blurRadius = {0}></ImageBackground>
            <View style = {[pins.mainViewSubContainerItemTextView, {marginTop : width * 0.15}]}>
              <Text style={pins.mainViewSubContainerItemText}>{item.username}</Text>
            </View>
          </View>)}
        />}
      </View>
      <View style = {pins.mainViewItem}>
        <Text style={pins.mainViewSubContainerHeader}>My Pinned Product</Text>
        {pinsProductEmpty ? 
          <View style={pins.mainViewSubContainerEmptyView}>
            <Text style = {pins.mainViewSubContainerEmptyText}>No Pinned Posts yet. Please engage on posts and get your favourite products here</Text>
          </View> :
        <FlatGrid itemDimension={width*0.45} data={pinsProduct} renderItem={({item}, i) => (
          <View style = {pins.mainViewSubContainerItemContainer}>
            <ImageBackground source = {{uri : item.image}} style = {pins.mainViewSubContainerItemImageBackground} blurRadius = {2}></ImageBackground>
            <View style = {[pins.mainViewSubContainerItemTextView, {marginTop : width * 0.05}]}>
              <Text style={pins.mainViewSubContainerItemText}>{item.product_name}</Text>
            </View>
          </View>)}
        />}
      </View>
      </ScrollView>
    </View>
  );
}

