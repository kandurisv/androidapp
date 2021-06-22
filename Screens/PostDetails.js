import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {  StyleSheet, Text, View  ,Image, ScrollView ,Easing ,Animated, Dimensions, SafeAreaView, TouchableOpacity, FlatList, TextInput, KeyboardAvoidingView, ToastAndroid} from 'react-native';
import Fontisto from "react-native-vector-icons/Fontisto";
import {URL, LoadingPage, ErrorPage, TimeoutPage, background, theme, borderColor, headerStyle} from './exports'
import { useNavigation , useRoute } from '@react-navigation/native';
import moment from 'moment';
import LottieView from 'lottie-react-native';
import axios from 'axios';
import {MaterialIcons} from '@expo/vector-icons';
import {Avatar} from 'react-native-paper';
import { ModernHeader, ProfileHeader } from "@freakycoder/react-native-header-view";

import * as Amplitude from 'expo-analytics-amplitude';
Amplitude.initializeAsync("af380775c59ead50c4c02536befef5e5");

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
    const [commentCount,setCommentCount] = React.useState(props.comments)
    const navigation = useNavigation()
    const getFeedByUser = () => {
       // navigation.navigate("Feed", {varValue : "user_id" , id : props.userId, value : props.username })
        console.log("Go to Feed")
        }

    React.useEffect(()=>{
        if(liked) {
            Animated.timing(progress, {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear,
                useNativeDriver : true
              },).start();  
        }
    },[])


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
            
        const body = {
            "engagement_id": 22,
            "review_sum_id": "32",
            "user_id": 3,
            "engagement_user_id": 2,
            "product_id": 2,
            "category_id": 2,
            "engagement_user_name": "abcde",
            "upvote": 1,
            "downvote": null,
            "comment": null
        }
        
            console.log(body)
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
                {/* <StatusBar height = {0} translucent backgroundColor='transparent'/> */}
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
                        source={require('../assets/animation/like-icon5.json')}
                    />
                    </TouchableOpacity>
                </View>
                <View style = {styles.heartText2}>
                    <Text style = {styles.likeNumber2}>{likeCount}</Text>
                </View>
                <View style = {styles.comment2}>
                    <Fontisto name = "comment" size = {22} color = {background} />
                </View>
                <View style = {styles.commentText2}>
                    <Text style = {styles.commentNumber2}>{commentCount}</Text>
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

const Tab = ({reviewArray, dayArray, review,claim,context}) => {

    const [status, setStatus] = useState('Review');
    const [dataList , setDataList] = useState ([listTab[0]]);

    const setStatusFilter = status => {
        setDataList([...Data.filter(e => e.status === status)]);
        setStatus(status);
    }

    const renderItem = ({item , index}) =>{
        const ReviewItem = ({item,dayIndex}) => {
            
            return(
               
                    <View style = {{}} key = {dayIndex}>
                        
                            <Text style = {{fontWeight : 'bold' , marginTop : 10,}}>Day {dayArray[dayIndex]}</Text>
                            <Text>{item}</Text>
                        
                    </View>  
                   
            )
        }
        const ClaimItem = () => {
            return(
                <View>
                    <Text>{claim}</Text>
                </View>
            )
        }
        const ContextItem = () => {
            return(
                <View>
                    <Text>{context}</Text>
                </View>
            )
        }

        return(
            <View key ={index} style = {styles.itemContainer1} >
                {/* <Text style = {styles.textItem}>
                    {
                        item.status == "Review" ? review : 
                        item.status == "Claim" ? claim : context
                    } 
                </Text> */}
              
                    {
                        item.status == "Review" ? 
                        reviewArray.map((reviewItem,reviewIndex)=>{
                        
                        return (
                        reviewItem ? 
                        <ReviewItem key = {reviewIndex} dayIndex = {reviewIndex} item = {reviewItem}/> : null
                        )  
                        
                    })
                        : 
                        item.status == "Claim" ? <ClaimItem /> : <ContextItem />
                    } 
               
            </View>
        )
    }

    return(
        <SafeAreaView style = {styles.container1}>
            <View style = {styles.listTab1}>
                {
                    listTab.map((e,i) => (
                        <TouchableOpacity 
                        key = {i}
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
                keyExtractor = {(item,index) =>index.toString() }
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
    const [showComments,setShowComments] = React.useState(false)
    

    React.useEffect(() => {
     
    const getData = () => {
        axios.get(URL + "/activity/user", {params:{user_id : route.params.details.user_id , review_sum_id : route.params.details.review_sum_id }} , {timeout : 5})
        .then(res => res.data).then(function(responseData) {
            Amplitude.logEventWithPropertiesAsync('POST_DETAILS_VISIT',{"userId" : route.params.details.user_id , "review_sum_id" : route.params.details.review_sum_id })
            console.log(responseData[0].upvote)
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

    const fetchComments = () => {
        axios.get(URL + "/post/comments", {params:{review_sum_id : route.params.details.review_sum_id }} , {timeout : 5})
        .then(res => res.data).then(function(responseData) {
            console.log(responseData)
            setShowComments(true)
            setComments(responseData)
            setLoading(false)
            setResult(true)
        })
        .catch(function(error) {
            // console.log("Reached to error")
            // console.log(error)
            setLoading(false)
            setResult(true)
            setError(true)
        });
    }
      
        fetchComments()
        getData()

    },[])



    const [message , setMessage] = useState('');
    const [newAnswer,setNewAnswer] = useState(false)
    
    const onMicrophonePress = () =>{
        ToastAndroid.show("Please add your comment", ToastAndroid.SHORT);
    }

    const onSendPress = async () =>{
        const body = 
            {
                "review_sum_id": "32",
                "user_id": 3,
                "engagement_user_id": 2,
                "product_id": 2,
                "category_id": 2,
                "engagement_user_name": "abcde",
                "upvote": 3,
                "downvote": 1,
                "comment": message
            }
            
            console.log(body)
            axios({
                method: 'post',
                url: URL + '/activity',
                data: body
              })
            .then(res => {
                setMessage('')
          }).catch((e) => console.log(e))
    }

    const onCommentsSend = () =>{
        if(!message){
            onMicrophonePress();
        }
        else {
            onSendPress()
            setMessage("")
            ToastAndroid.show("Thanks for comment", ToastAndroid.SHORT);
            
        }
    }

  return (
      <ScrollView contentContainerStyle={styles.container}>
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
            reviewArray = {route.params.details.content}
            dayArray = {route.params.details.day_product_used_content}
            review = {route.params.reviewDetails}
            claim = {route.params.details.claim}
            context = {route.params.contextDetails}
          />
        </View>
        <View>
            <View style ={styles.container5} > 
                <KeyboardAvoidingView style ={styles.mainContainer5} >
                    <TextInput 
                    placeholder ={"Add a comment"}
                    style ={styles.textInput5} 
                    multiline
                    value = {message}
                    onChangeText = {setMessage}
                    />
                </KeyboardAvoidingView>

                <View style ={styles.buttonContainer5} >
                    <TouchableOpacity onPress = {onCommentsSend}>
                        <MaterialIcons name = "send" size={24} color = '#0080FF' />
                    </TouchableOpacity>
                </View>
            </View>
            <View style = {styles.commentsView}>
                {comments.length > 0 && comments.map((item,index)=> {
                   return(
                    <View key = {index} style = {styles.commentContainer} >
                        <View style = {styles.dp}>
                        {item.engagement_user_name ? 
                        <Avatar.Image 
                            source={{
                                uri: 'https://ui-avatars.com/api/rounded=true&name='+ item.engagement_user_name + '&size=64'
                            }} size={20}/> :
                        <Avatar.Image 
                            source={{
                                uri: 'https://ui-avatars.com/api/rounded=true&background=random&size=64'
                             }} size={20}/>}
                        <Text style = {styles.commentContainerName}>{item.engagement_user_name}</Text>
                        </View>
                        
                        <Text style = {styles.commentContainerText}>{item.comment}</Text>
                    </View>) 
                })}
                {comments.length == 0 && 
                    <View style = {styles.commentContainer} >
                        <Text style = {styles.commentContainerText}>No comments yet</Text>
                    </View>}
                
            </View>
        </View>
      </ScrollView>
   
  );
}

export default PostDetails

const styles = StyleSheet.create({
    dp : {
        flexDirection : 'row',
        alignItems : 'center',
        
    },
    commentContainer : {
        padding : 5 ,
        marginTop : 10,
        backgroundColor : 'white',
        borderRadius : 5,

    },
    commentContainerText : {
        marginTop : 10
    },
    commentContainerName : {
        fontWeight : 'bold',
        marginLeft : 10,
    },
    commentsView: {
        margin : 10,

    },
  container:{
    backgroundColor : background,
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
    top:0,
    color : 'white',
    marginTop: 100,
    marginLeft: width - 60,
    fontSize:20,
    zIndex: 100
},

heartText2:{
    position:'absolute',
    top:0,
    // backgroundColor : 'white',
    marginTop: 140,
    marginLeft: width * 0.89,
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
    top:0,
    color : '#AAA',
    marginTop: 190,
    marginLeft: width - 48,
    fontSize:20,
    zIndex: 100
},

commentText2:{
    position:'absolute',
    top:0,
    // backgroundColor : 'white',
    marginTop: 212,
    marginLeft: width - 42,
    // fontSize:20,
//     zIndex: 101
},
commentNumber2:{
    fontSize:20,
    fontWeight:'bold',
    color: background,
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
    borderColor: background,
    padding: 10,
    justifyContent: 'center',
    backgroundColor: background
},

textTab1:{
    fontSize: 13,
    color: borderColor
},

btnTabActive1:{
    backgroundColor: theme
},

textTabActive1 :{
    color: background
},

itemContainer1:{
    width : '90%',
    alignSelf:'center',
    backgroundColor : background
},

textItem:{
    fontSize: 16,
    

},
container5:{
    flexDirection :'row',
    borderRadius : 5,
    backgroundColor : '#FFFFFF',
    borderWidth : 1,
    borderColor : '#EEEEEE',
    marginLeft : 10,
    marginRight : 10,
    marginTop : 20,
},

mainContainer5:{
    flexDirection: 'row',
    backgroundColor : '#FFFFFF',
    borderRadius : 5,
    alignContent : 'center',
    flex : 1,
    alignItems: 'center',
    paddingLeft : 10,
},

textInput5 :{
    flex: 1,
    marginHorizontal: 10,
    fontSize : 16,
    color : 'black'
},

icon5:{
    marginHorizontal: 5,
},

buttonContainer5:{
    backgroundColor:"#FFF",
    borderRadius:25,
    width:50,
    height : 50,
    justifyContent:'center',
    alignItems:'center',
    alignSelf : 'center'
    
}

});
