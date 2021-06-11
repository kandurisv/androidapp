import React, { useState , useEffect, useContext} from 'react'
import { View, Text , ScrollView ,RefreshControl , ToastAndroid , FlatList, ActivityIndicator, StyleSheet, Image , Dimensions} from 'react-native'

import { useNavigation , useRoute } from '@react-navigation/native';
import axios from 'axios'
import {URL, LoadingPage, ErrorPage, TimeoutPage} from './exports'
import {TouchableOpacity, TouchableWithoutFeedback} from 'react-native-gesture-handler'


const {width} = Dimensions.get("window");
const height = width * 1.2
const images = [
    'https://images.pexels.com/photos/4016173/pexels-photo-4016173.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'https://images.pexels.com/photos/3514150/pexels-photo-3514150.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'https://images.pexels.com/photos/3514150/pexels-photo-3514150.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
]



const FeedItem = ({item}) => {
  const navigation = useNavigation()
  
   // const review = item.content.toString();
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
        <TouchableWithoutFeedback style = {styles.container} onPress = {onItemClick}>
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
        console.log("ARRAY LENGTH ++++++++++++++++++++++++++++++++++++++++++++++")
        // console.log(responseData)
        // console.log(responseData.length)
        setItemsForFeed(responseData)
        })
    .catch(function (error) {
      setError(true);   
      console.log("Error" , error)   
    });
  },[varValue, requestId , requestValue ]);



  const items = ({item}) => (
        (item.image_list && item.username) ?
          <View>     
            <FeedItem item = {item}/> 
          </View> : null
        )
 

  return (
    <View>
      {/* <Header title = "Feed" color = "#E64852"/> */}
      <View style = {{ marginBottom : 25}}>
        {error ? 
        <View><Text>Error while loading data 😢</Text></View> : 
        <FlatList 
        keyExtractor={item => item.item_id} 
        style = {{marginBottom:70}}
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
        marginTop: 20,
        width,
        height,
        // backgroundColor:'black'
    },

    image:{
        width,
        height,
        // width:'100%',
        aspectRatio:2.5/3,
        resizeMode: 'cover',
        borderRadius: 20,
        // margin: 10
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
