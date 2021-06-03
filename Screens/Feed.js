import React, { useState , useEffect, useContext} from 'react'
import { View, Text , ScrollView ,RefreshControl , ToastAndroid , FlatList, ActivityIndicator, StyleSheet, Image , Dimensions} from 'react-native'

// import Header from '../Components/Header/HeaderHamburger'
// //import { add } from '../Components/Helpers/S3Upload';
// import axios from 'axios';
// import {AuthContext} from '../Components/Context/Auth'
// import {mishfitURL} from '../assets/Constants'
// import * as Colors from '../assets/Colors'


const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

const Loader = () => (
  <View style={{ minHeight: 230, padding: 20 }}>
    <ActivityIndicator
      color="#000"
      size="large"
      style={{ alignSelf: "center" }}
    />
  </View>
);


const {width} = Dimensions.get("window");
const height = width * 1.2
const images = [
    'https://images.pexels.com/photos/4016173/pexels-photo-4016173.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'https://images.pexels.com/photos/3514150/pexels-photo-3514150.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'https://images.pexels.com/photos/3514150/pexels-photo-3514150.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
]

const FeedItem = (props) => {
    return(
        <View style = {styles.container}>
            <Text style ={styles.username} >Username</Text>    
            <ScrollView 
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator = {false}
        >
            {images.map((image , index) => (
                <Image
                key = {index}
                source = {{uri: image}}
                style = {styles.image}
            />
            ))}
            
        </ScrollView>
        <Text style ={styles.productTitle} >Product Name</Text>
        <Text style ={styles.content} >I have been using this product for ...</Text>
        
            
        </View>
    );
};


const Feed = (props) => {
  const [refreshing, setRefreshing] = useState(false);
  //const [accessToken,idToken,userId,eventId] = useContext(AuthContext);
  //const [mishfitURL,setMishfitURL] = useState("https://xcn5s80hy6.execute-api.ap-south-1.amazonaws.com/Dev")
  const [itemsForFeed,setItemsForFeed] = useState([])
  const [error, setError] = useState(false);
  const [pageNumber,setPageNumber] = useState(1)
  const [loadingMore,setLoadingMore] = useState(false)

  // const fetchMoreItems = async() => {
  //   axios.get(mishfitURL + "/itemsforfeed", {
  //     params: {
  //       user_id : userId,
  //       page_number : pageNumber+1
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
    // console.log("=============NEW REQUEST===========================")
    // ToastAndroid.show("Welcome - Write & Read authentic reviews", ToastAndroid.SHORT);
    // axios.get(mishfitURL + "/itemsforfeed", {
    //     params: {
    //       user_id : userId,
    //       page_number : 1
    //     }
    //   })
    // .then(res => res.data)
    // .then(function (responseData) {
    //     console.log("ARRAY LENGTH ++++++++++++++++++++++++++++++++++++++++++++++")
    //   //console.log(responseData)
    //     console.log(responseData.length)
    //     setItemsForFeed(responseData)
    //     })
    // .catch(function (error) {
    //   setError(true);      
    // });
  },[]);



  const items = ({item}) => (
        (item.item_cover_photo && item.user_name) ?
        <View>     
            <FeedItem 
              // user_id = {item.user_id}
              //         item_id = {item.item_id}
              //         username = {item.user_name}
              //         imageurl = {item.item_cover_photo}
              //         title = {item.item_details}
              //         numberLikes = {item.item_feed_likes}
              //         numberBuy = {item.item_feed_wishbuys}
              //         like = {item.likes}
              //         buy = {item.wishbuys}
              //         time = {item.event_ts}
            /> 
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
        onEndReachedThreshold={0.01}
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
