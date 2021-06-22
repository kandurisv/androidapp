import React, { useState , useEffect, useContext} from 'react'
import { View, Text , ScrollView ,RefreshControl , ToastAndroid , FlatList, ActivityIndicator, StyleSheet, Image , Dimensions} from 'react-native'

import { useNavigation , useRoute } from '@react-navigation/native';
import axios from 'axios'
import {URL, LoadingPage, ErrorPage, TimeoutPage, background, headerStyle, borderColor} from './exports'
import {TouchableOpacity, TouchableWithoutFeedback} from 'react-native-gesture-handler'
import { ModernHeader } from "@freakycoder/react-native-header-view";

import { Amplitude } from '@amplitude/react-native';
const ampInstance = Amplitude.getInstance();
ampInstance.init(af380775c59ead50c4c02536befef5e5);

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
        <TouchableWithoutFeedback style = {styles.container} onPress = {onItemClick} >
            <Text style ={styles.username} > {item.username}</Text>    
            <ScrollView pagingEnabled horizontal showsHorizontalScrollIndicator = {false}>
            {item.image_list.map((image , index) => (
                <Image key = {index} style = {styles.image} source = {{uri: image}}
            />))} 
            </ScrollView>
            <Text style ={styles.productTitle} >{item.product_name}</Text>
            <Text style ={styles.content} > {review.substring(0,40)} ...</Text>
        </TouchableWithoutFeedback>
    );
};

const Feed = (props) => {

  const route = useRoute()
  const navigation = useNavigation()

  const [refreshing, setRefreshing] = useState(false);
  const [itemsForFeed,setItemsForFeed] = useState([])
  const [error, setError] = useState(false);
  const [pageNumber,setPageNumber] = useState(1)
  const [loadingMore,setLoadingMore] = useState(false)
  const [varValue,setVarValue] = useState(route ? route.params ? route.params.varValue ? route.params.varValue : "time" : "time" : "time")
  const [requestValue,setRequestValue] = useState(route ? route.params ? route.params.value ? route.params.value : null :null : null)
  const [requestId,setRequestId] = useState(route ? route.params ? route.params.id ? route.params.id : null :null : null)
 // const [parameter, setParameter] = useState(route ? route.params ? route.params.varValue ? {var : varValue,value : requestId} : {var : "time"} : {var : "time"} : {var : "time"})
  
  // const fetchMoreItems = async() => {
  //   axios.get(URL + "/post/feed", {
  //     params: {
  //       var : varValue,
  //       value : requestValue
  //     }
  //   })
  // .then(res => res.data)
  // .then(function (responseData) {
  //     setItemsForFeed([...itemsForFeed,...responseData])
  //     if(responseData.length > 0) {
  //       setPageNumber(pageNumber + 1)
  //     }
  //     console.log("*****************LOAD MORE***************")
  //     console.log(pageNumber)
  //     setLoadingMore(false)})
  // .catch(function (error) {
  //   console.log(error);
  //   setError(true);      
  // });
  // }

  // const loadMoreItems = () => {
  //   console.log(pageNumber)
  //   setLoadingMore(true)
  // //  fetchMoreItems()
  // };

  // const onRefresh = React.useCallback(() => {
  //   setRefreshing(true);
  //   axios.get(mishfitURL + "/itemsforfeed", {
  //     params: {
  //       user_id : userId,
  //       page_number : 1
  //     }
  //   })
  // .then(res => res.data)
  // .then(function (responseData) {
  //     console.log(responseData)
  //     setItemsForFeed(responseData)
  //     setRefreshing(false)})
  // .catch(function (error) {
  //   console.log(error);
  //   setError(true);      
  // });
    
  // }, []);

  useEffect(() => {
    console.log("feed ", "VarValue:" ,varValue, "requestId:" , requestId , "requestValue:" , requestValue )
    setVarValue(route ? route.params ? route.params.varValue ? route.params.varValue : "time" : "time" : "time")
    setRequestValue(route ? route.params ? route.params.value ? route.params.value : null : null : null)
    setRequestId(route ? route.params ? route.params.id ? route.params.id : null :null : null)
  //  setParameter(route ? route.params ? route.params.varValue ? {var : varValue,value : requestId} : {var : "time"} : {var : "time"} : {var : "time"})
   

  //  console.log("Parameter", parameter)

    axios.get(URL + "/post/feed", {
         params: {
            var : varValue,
            value : requestId
          }
      })
    .then(res => res.data)
    .then(function (responseData) {
        ampInstance.logEvent('FEED_PAGE_VISIT',{"fromPage" : varValue , "onKey" : requestId })
        console.log(responseData)
        // console.log(responseData.length)
        setItemsForFeed(responseData)
        })
    .catch(function (error) {
      setError(true);   
      console.log("Error" , error)   
    });
  },[varValue,requestId,requestValue]);

  const items = ({item,index}) => (
        (item.image_list && item.username) ?
          <View key = {index}>     
            <FeedItem key = {index} item = {item}/> 
          </View> : null
        )
 
  return (
    <View>
     <View>
            <ModernHeader 
                title="Feed"
                titleStyle = {headerStyle.headerText}
                backgroundColor= {background}
                leftIconColor = {borderColor}
                leftIconOnPress={() => navigation.goBack()}
                rightDisable
                />
      </View>
      <View style = {{ marginBottom : 0}}>
        {error ? 
        <View><Text>Error while loading data 😢</Text></View> : 
        <FlatList 
        keyExtractor={item => item.item_id} 
        style = {{marginBottom:200}}
        data = {itemsForFeed}            
        renderItem = {items}
    //    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    //    ListFooterComponent={loadingMore && <Loader />}
    //    onEndReachedThreshold={0.01}
    //    onEndReached={loadMoreItems}
        // ListEmptyComponent = {<View style = {{alignItems : 'center' , justifyContent : 'center'}}>
        //   <Text style = {{fontSize : 20, fontStyle : 'italic'}}> Loading ... Please wait !</Text>
        //   </View>
        //   }
        />
      }
      </View> 
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        marginBottom: 5,
        width,
        height,
    },
    image:{
        width,
        height,
        aspectRatio:2.5/3,
        resizeMode: 'cover',
        borderRadius: 10,
    },
    productTitle:{
        position:'absolute',
        bottom:0,
        color : 'white',
        marginBottom: 35,
        marginLeft: 10,
        fontSize:30,
        fontWeight:'bold'
        
    },
    content:{
        position:'absolute',
        bottom:0,
        color : 'white',
        marginBottom: 15,
        marginLeft: 10,
        fontSize:15
    },
    username:{
        position:'absolute',
        top:0,
        color : 'white',
        marginTop: 15,
        marginLeft: 15,
        fontSize:20,
        zIndex: 100
    }
});

export default Feed
