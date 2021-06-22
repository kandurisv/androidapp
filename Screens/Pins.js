import React, { Component } from 'react';
import { StyleSheet, View, Text , ImageBackground, Dimensions} from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import axios from 'axios'
import {background, borderColor, headerStyle, URL} from './exports'
import { ModernHeader, ProfileHeader } from "@freakycoder/react-native-header-view";
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Amplitude } from '@amplitude/react-native';
const ampInstance = Amplitude.getInstance();
ampInstance.init(af380775c59ead50c4c02536befef5e5);

export default function Pins() {

  const [userId,setUserId] = React.useState(2)
  const [pinsPost,setPinsPost] = React.useState([])
  const [pinsPostEmpty,setPinsPostEmpty] = React.useState(true)
  const [pinsProductEmpty,setPinsProductEmpty] = React.useState(true)
  const [pinsProduct,setPinsProduct] = React.useState([])
  const [postError,setPostError] = React.useState(false)
  const [productError,setProductError] = React.useState(false)

  const navigation = useNavigation()

  const {width,height} = Dimensions.get('screen')

  React.useEffect(()=>{

    const fetchPinsPost = () => {
      ampInstance.logEvent('PINS_PAGE_VISIT',{"userId" : userId })
      axios.get(URL + "/pins/post", {params:{user_id : userId }} , {timeout : 5})
      .then(res => res.data).then(function(responseData) {
          console.log("A", responseData)
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
      axios.get(URL + "/pins/product", {params:{user_id : userId }} , {timeout : 5})
      .then(res => res.data).then(function(responseData) {
          console.log("b", responseData)
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
    <View style = {{flex : 1, backgroundColor: background}}>
      <View>
        <ModernHeader 
          title="Pins"
          titleStyle = {headerStyle.headerText}
          backgroundColor= {background}
          leftIconColor = {borderColor}
          leftIconOnPress={() => navigation.goBack()} 
          rightDisable
          />
      </View>
      
      <View>
        <Text style={styles.header}>My Pinned Posts</Text>
        {pinsPostEmpty ? 
        <View>
          <Text style = {{fontSize : 16}}>No Pinned Posts yet. Please engage on posts to save it here</Text>
        </View> :
        <FlatGrid itemDimension={200} data={pinsPost} renderItem={({item}, i) => (
          <View style = {styles.contentContainer}>
            <ImageBackground source = {{uri : item.image_list[0]}} style = {styles.image} blurRadius = {1}></ImageBackground>
            <View style = {[styles.textView, {marginTop : Dimensions.get('screen').width * 0.15}]}>
              <Text style={styles.text}>{item.username}</Text>
            </View>
          </View>)}
        />}
      </View>
      <View>
        <Text style={styles.header}>My Pinned Product</Text>
        {pinsProductEmpty ? 
          <View>
            <Text style = {{fontSize : 16}}>No Pinned Posts yet. Please engage on posts and get your favourite products here</Text>
          </View> :
        <FlatGrid itemDimension={Dimensions.get('screen').width*0.45} data={pinsProduct} renderItem={({item}, i) => (
          <View style = {styles.contentContainer}>
            <ImageBackground source = {{uri : item.image}} style = {styles.image} blurRadius = {2}></ImageBackground>
            <View style = {styles.textView}>
              <Text style={styles.text}>{item.product_name}</Text>
            </View>
          </View>)}
        />}
      </View>

    </View>
   
    );
}

const styles = StyleSheet.create({
  contentContainer : {
    justifyContent : 'center',
    alignItems : 'center',
    width : Dimensions.get('screen').width * 0.45,
    height : Dimensions.get('screen').width * 0.45,
  
  },
  container1 : {
      marginBottom : 60,
  },
  addReview : {
    backgroundColor : 'pink',
    flex : 1,
    width : Dimensions.get('screen').width,
    height : Dimensions.get('screen').width * 0.8,
  },
  trendingProducts : {
    width : Dimensions.get('screen').width,
    margin : 10 , 
    flex : 1,
    
  },
  productRecommendation : {
    width : Dimensions.get('screen').width,
    margin : 10 ,
    marginTop : 0, 
    flex : 1,
  },
  feed : {
  
  },
  header : {
    fontWeight : '200',
    fontSize : 18,
    marginLeft : 20,
    margin : 10,
  },
 
  image: {
    flex: 1,
    width : Dimensions.get('screen').width * 0.45,
    height : Dimensions.get('screen').width * 0.45,
    borderColor : "black",
    borderWidth : 1,
    resizeMode: "cover",
    justifyContent: "center",
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
    fontSize: 18,
    fontWeight: "200",
    textAlign: "center",
    marginTop : Dimensions.get('screen').width * 0.05
    // position : 'absolute',
    // top : 40,
    
  },
  carouselStyle : {
  
  },
  imageCover : {
      width : Dimensions.get('screen').width,
      height : Dimensions.get('screen').width * 0.8,
    },
  
  })
  