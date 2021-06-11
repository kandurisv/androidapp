import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {  StyleSheet, Text, View  ,Image, ScrollView ,Easing ,Animated, Dimensions, SafeAreaView, TouchableOpacity, FlatList} from 'react-native';
import Fontisto from "react-native-vector-icons/Fontisto";
import {URL, LoadingPage, ErrorPage, TimeoutPage} from './exports'
import { useNavigation , useRoute } from '@react-navigation/native';
import moment from 'moment';
import LottieView from 'lottie-react-native';
import axios from 'axios';

const {width} = Dimensions.get("window");
const height = width * 1.35
const images = [
    'https://images.pexels.com/photos/4016173/pexels-photo-4016173.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'https://images.pexels.com/photos/3514150/pexels-photo-3514150.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'https://images.pexels.com/photos/3514150/pexels-photo-3514150.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
]

const Cover = (props) => {
    const progress = React.useRef(new Animated.Value(0)).current
    const [liked,setLiked] = React.useState(props.likeIndicator)
    const [likeCount,setLikeCount] = React.useState(props.upvotes)
    const navigation = useNavigation()
    const getFeedByUser = () => {
       // navigation.navigate("Feed", {varValue : "user_id" , id : props.userId, value : props.username })
        console.log("Go to Feed")
        }

    const HeartColor = () => {
           
            
        }

    const likeClick = () => {
        setLiked(!liked)
        if(liked) {
            setLikeCount(likeCount-1)
            Animated.timing(progress, {
                toValue: 0,
                duration: 1000,
                easing: Easing.linear,
                useNativeDriver : true
              },).start();
        }
        else {
            setLikeCount(likeCount+1)
            Animated.timing(progress, {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear,
                useNativeDriver : true
              },).start();
        }
            
        const body = [
            {
                
                    "review_id": props.details.summary_id,
                    "user_id": props.details.user_id,
                    "engagement_user_id": "dfasdfas",
                    "product_id": props.details.product_id,
                    "category_id": props.details.category_id,
                    "engagement_user_name": "abcde",
                    "upvote": liked,
                    "downvote": null,
                    "comment": null
                  
                }
            ]
            
            axios({
                method: 'post',
                url: URL + '/activity',
                data: body
              })
            .then(res => {
                    // console.log(res.data);
          }).catch((e) => console.log(e))
        }
    
    
    return(
        <ScrollView>
            <View style = {styles.container2}>
                <StatusBar height = {0} translucent backgroundColor='transparent'/>
                <View style = {styles.usernameView}>
                <TouchableOpacity  onPress = {getFeedByUser}>
                    <Text style ={styles.username2} >{props.username}</Text>
                </TouchableOpacity>
                </View>
                <ScrollView pagingEnabled horizontal showsHorizontalScrollIndicator = {false}>
                    {props.imageList.map((image , index) => (
                        <Image key = {index} source = {{uri: image}} style = {styles.image2}/>
                    ))}
                </ScrollView>
                <Text style ={styles.productTitle2} >{props.productname}</Text>
                <View style = {styles.heart2}>
                    <TouchableOpacity onPress = {likeClick} >
                    <LottieView
                        ref={animation => animation}
                        progress = {progress}
                        style={{
                                width: 50,
                                height: 50,
                                backgroundColor: 'transparent',
                            }}
                        source={require('../assets/animation/like-icon.json')}
                    />
                    </TouchableOpacity>
                </View>
                <View style = {styles.heartText2}>
                    <Text style = {styles.likeNumber2}>{props.upvotes}</Text>
                </View>
                <View style = {styles.comment2}>
                    <Fontisto name = "comment" size = {25} color = {"#fff"} />
                </View>
                <View style = {styles.commentText2}>
                    <Text style = {styles.commentNumber2}>{props.comments}</Text>
                </View>
            </View>
        </ScrollView>
    );
};

const listTab = [
    {
        status: 'Review'
    },

    {
        status: 'Claim'
    },

    {
        status: 'Context'
    }
]

const Data = [
    {
        status: 'Review',
        content : ' Review , Import your header.js file in the entry of your app, the App.js file, and include the following styles. For styling purposes, our app container has a background color of #eef'
    },

    {
        status: 'Claim',
        content : 'Claim , Import your header.js file in the entry of your app, the App.js file, and include the following styles. For styling purposes, our app container has a background color of #eef'
    },

    {
        status: 'Context',
        content : 'Context , Import your header.js file in the entry of your app, the App.js file, and include the following styles. For styling purposes, our app container has a background color of #eef'
    },
]

const Tab = ({review,claim,context}) => {

    const [status, setStatus] = useState('Review');
    const [dataList , setDataList] = useState ([listTab[0]]);

    const setStatusFilter = status => {
        setDataList([...Data.filter(e => e.status === status)]);
        setStatus(status);
    }

    const renderItem = ({item , index}) =>{
        return(
            <View key ={index} style = {styles.itemContainer1} >
                <Text style = {styles.textItem}>
                    {
                        item.status == "Review" ? review : 
                        item.status == "Claim" ? claim : context
                    }
                    
                </Text>
            </View>
        )
    }

    return(
        <SafeAreaView style = {styles.container1}>
            <View style = {styles.listTab1}>
                {
                    listTab.map(e => (
                        <TouchableOpacity 
                        style = {[styles.btnTab1 , status === e.status && styles.btnTabActive1]}
                        onPress = {() => setStatusFilter(e.status)}
                        >
                            <Text 
                            style = {[styles.textTab1 , status === e.status && styles.textTabActive1]}>
                                {e.status}
                                </Text>
                        </TouchableOpacity>
                    )
                    )
                }
                
            </View>

            <FlatList 
                data = {dataList}
                keyExtractor = {(i,e) =>i.toString() }
                renderItem = {renderItem}
            />

        </SafeAreaView>
    );
};

const PostDetails = (props) => {

    const navigation = useNavigation()
    const route = useRoute()

    const [comments,setComments] = React.useState([])
    const [loading,setLoading] = React.useState(true)
    const [timed,setTimed] = React.useState(false)
    const [error,setError] = React.useState(false)
    const [result,setResult] = React.useState(false)
    const [likeIndicator,setLikeIndicator] = React.useState(false)

    React.useEffect(() => {
        // console.log("ROUTE PARAMS", route.params)

        // console.log("timed " , timed, "Result", result , "Response Data" , userDetails )
      
        const getData = () => {
        axios.get(URL + "/activity/user", {params:{user_id : route.params.details.user_id , review_sum_id : route.params.details.review_sum_id }} , {timeout : 5})
        .then(res => res.data).then(function(responseData) {
            // console.log("Reached to response")
            setLikeIndicator(responseData[0].upvote)
            setLoading(false)
            setResult(true)
            // console.log(responseData)
        })
        .catch(function(error) {
            // console.log("Reached to error")
            // console.log(error)
            setLoading(false)
            setResult(true)
            setError(true)
        });
    }


    
      getData()





    },[])

    const getComments = () => {

    }

  return (
   
      <ScrollView contentContainerStyle={styles.container}>
        <View style = {styles.review}>
          <Cover 
            imageList = {route.params.details.image_list}
            imageListDays = {route.params.details.day_product_used_image}
            upvotes = {route.params.details.upvote}
            username = {route.params.details.username}
            productname = {route.params.details.product_name}
            comments = {route.params.details.number_of_comments}
            userId = {route.params.details.user_id}
            details = {route.params.details}
            likeIndicator = {likeIndicator}
            />
        </View>
        <View style = {styles.tab}>
          <Tab 
            review = {route.params.reviewDetails}
            claim = {route.params.details.claim}
            context = {route.params.contextDetails}
          />
        </View>
        <View>
            <TouchableOpacity onPress = {getComments}>
                <Text> View Comments</Text>
            </TouchableOpacity>
        </View>
      </ScrollView>
   
  );
}

export default PostDetails

const styles = StyleSheet.create({
  container:{
    paddingTop: 50,
    paddingBottom : 60
   },
   tinyLogo: {
    width: 50,
    height: 50,
  },
  tab:{
    // position:'absolute',
    // bottom:-60,
    marginTop:-23,
    zIndex: 101
  },

  review:{
    backgroundColor:'black'
  },

  container2:{
    marginTop: 0,
    width,
    height,
    // backgroundColor:'black'
},

image2:{
    width,
    height,
    // width:'100%',
    aspectRatio:2/3,
    resizeMode: 'cover',
    // borderRadius: 20,
    // margin: 10
},
productTitle2:{
    position:'absolute',
    bottom:0,
    color : 'white',
    marginBottom: 40,
    marginLeft: 10,
    fontSize:30,
    fontWeight:'bold'
    
},
content2:{
    position:'absolute',
    bottom:0,
    color : 'white',
    marginBottom: 15,
    marginLeft: 10,
    fontSize:15
},
usernameView : {
    position:'absolute',
    top:0,
    zIndex : 103,
    marginTop: 15,
    marginLeft: 15,
   
},
username2:{
    color : 'white',
    fontSize:20,
   
},

heart2:{
    position:'absolute',
    bottom:0,
    color : 'white',
    marginBottom: 150,
    marginLeft: width - 50,
    fontSize:20,
    zIndex: 100
},

heartText2:{
    position:'absolute',
    bottom:0,
    // backgroundColor : 'white',
    marginBottom: 120,
    marginLeft: width - 48,
    // fontSize:20,
//     zIndex: 101
},
likeNumber2:{
    fontSize:20,
    fontWeight:'bold',
    color:'#fff',
},

comment2:{
    position:'absolute',
    bottom:0,
    color : 'white',
    marginBottom: 60,
    marginLeft: width - 50,
    fontSize:20,
    zIndex: 100
},

commentText2:{
    position:'absolute',
    bottom:0,
    // backgroundColor : 'white',
    marginBottom: 30,
    marginLeft: width - 48,
    // fontSize:20,
//     zIndex: 101
},
commentNumber2:{
    fontSize:20,
    fontWeight:'bold',
    color:'#fff',
},

container1:{
    flex: 1,
    paddingHorizontal: 10,
    justifyContent:'center'
},

listTab1:{
    flexDirection: 'row',
    alignSelf:'center',
    marginBottom: 20
},

btnTab1:{
    width: Dimensions.get('window').width /5,
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor:'#EBEBEB',
    padding: 10,
    justifyContent: 'center',
    backgroundColor:'#fff'
},

textTab1:{
    fontSize: 16,
    color:'black'
},

btnTabActive1:{
    backgroundColor:'#E68380'
},

textTabActive1 :{
    color: '#fff'
},

itemContainer1:{
    width : '90%',
    alignSelf:'center'
},

textItem:{
    fontSize: 18,
    

}


});
