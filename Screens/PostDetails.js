import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {  StyleSheet, Text, View  ,Image, ScrollView ,Easing ,Animated, Dimensions, SafeAreaView, TouchableOpacity, FlatList, TextInput, KeyboardAvoidingView, ToastAndroid , ImageBackground} from 'react-native';
import Fontisto from "react-native-vector-icons/Fontisto";
import {URL, LoadingPage, ErrorPage, TimeoutPage, background, theme, borderColor, headerStyle, AuthContext} from './exports'
import { useIsFocused, useNavigation , useRoute } from '@react-navigation/native';
import moment from 'moment';
import LottieView from 'lottie-react-native';
import axios from 'axios';
import {MaterialIcons} from '@expo/vector-icons';
import {Avatar} from 'react-native-paper';
import { ModernHeader, ProfileHeader } from "@freakycoder/react-native-header-view";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as WebBrowser from 'expo-web-browser';

import * as Amplitude from 'expo-analytics-amplitude';
import { header, postDetails } from './styles';
Amplitude.initializeAsync("af380775c59ead50c4c02536befef5e5");

const {width} = Dimensions.get("window");
const height = width * 1.35
const images = [
    'https://images.pexels.com/photos/4016173/pexels-photo-4016173.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'https://images.pexels.com/photos/3514150/pexels-photo-3514150.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'https://images.pexels.com/photos/3514150/pexels-photo-3514150.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
]

const Cover = (props) => {
    const isFocused = useIsFocused()

    const progress = React.useRef(new Animated.Value(0)).current
    const [liked,setLiked] = React.useState(props.likeIndicator)
    const [likeCount,setLikeCount] = React.useState(Math.max(props.upvotes,0))

    const [result, setResult] = useState(null);
    
    const [commentCount,setCommentCount] = React.useState(props.comments)
    const navigation = useNavigation()
    const getFeedByUser = () => {
        console.log("Username click")
        axios.get(URL + "/user/instagram", {params:{username : props.username }} , {timeout : 5})
        .then(res => res.data)
        .then(async function(responseData) {
            console.log(responseData)
            if (responseData.length && responseData[0].instagram_username) {
                let result = await WebBrowser.openBrowserAsync('https://www.instagram.com/'+responseData[0].instagram_username+'/');
                setResult(result);
            }
        })
        .catch(function(error) {
          
        });
    }


        

    React.useEffect(()=>{
        setLiked(props.likeIndicator)
        setLikeCount(props.upvotes+props.likeIndicator)
     //   console.log("Like", props.likeIndicator , "liked indictor ", liked)
        if(liked) {
            Animated.timing(progress, {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear,
                useNativeDriver : true
              },).start();  
        }
    },[props])

  
    const likeClick =  () => {
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
            "review_sum_id": props.details.review_sum_id,
            "user_id": props.userId,
            "engagement_user_id": props.engagementUserId,
            "product_id": props.details.product_id,
            "category_id": props.details.category_id,
            "engagement_user_name": props.engagementUserName,
            "upvote": !liked,
            "downvote": null,
            "comment": null
        }
        
         //   console.log(body)
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
            <View style = {postDetails.reviewImageContainerScrollableContainer}>
                {/* <StatusBar height = {0} translucent backgroundColor='transparent'/> */}
                <View style = {postDetails.reviewImageContainerUserNameView}>
                <TouchableOpacity style ={postDetails.reviewImageContainerUserNameButton} onPress = {getFeedByUser}>
                    <Text style ={postDetails.reviewImageContainerUserNameText} >{props.username}</Text>
                    <Text style = {postDetails.reviewImageContainerUserNameTime}>{props.category_name}</Text>  
                </TouchableOpacity>
                </View>
                <ScrollView pagingEnabled horizontal showsHorizontalScrollIndicator = {false}>
                    {props.imageList.map((image , index) => {
                        var pieces = image.split("/")
                        const calendarText = pieces[pieces.length-2]
                    return(
                        // <View style = {postDetails.reviewImageContainerScrollableImageCover}>
                            <Image key = {index} source = {{uri: image}} style = {postDetails.reviewImageContainerScrollableImage}/>
                        //     <View style = {postDetails.reviewImageContainerCalendarView}>
                        //         <ImageBackground source = {{uri : image}} style = {postDetails.reviewImageContainerCalendarImage} blurRadius = {0}></ImageBackground>
                        //         <View style = {[postDetails.reviewImageContainerCalendarTextView, {marginTop : width * 0.15}]}>
                        //             <Text style={postDetails.reviewImageContainerCalendarText}>{calendarText}</Text>
                        //         </View>
                        //     </View>
                        // </View> 
                        )  
                        
                    })}
                </ScrollView>
                <Text style ={postDetails.reviewImageContainerProductNameText} >{props.productname}</Text>
                <View style = {postDetails.reviewImageContainerHeartContainer}>
                    <TouchableOpacity style = {postDetails.reviewImageContainerHeartImageButton} onPress = {likeClick} >
                    <LottieView
                        ref={animation => animation}
                        progress = {progress}
                        style={postDetails.reviewImageContainerHeartImage}
                        source={require('../assets/animation/like-icon5.json')}
                    />
                    </TouchableOpacity>
                </View>
                <View style = {postDetails.reviewImageContainerHeartTextView}>
                    <Text style = {postDetails.reviewImageContainerHeartTextValue}>{Math.max(likeCount,0)}</Text>
                </View>
                <View style = {postDetails.reviewImageContainerCommentContainer}>
                    <Fontisto name = "comment" size = {22} color = "#AAA" />
                </View>
                <View style = {postDetails.reviewImageContainerCommentTextView}>
                    <Text style = {postDetails.reviewImageContainerCommentTextValue}>{commentCount}</Text>
                </View>
            </View>
        </ScrollView>
    );
};

const listTab = [
    {status: 'Review'},
    {status: 'Claim'},
    {status: 'Context'}
]

const Data = [{
        status: 'Review',
        content : 'Review'
    }, {
        status: 'Claim',
        content : 'Claim'
    }, {
        status: 'Context',
        content : 'Context'
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
            <View key ={index} style = {postDetails.reviewTabItemContainer}>
            {item.status == "Review" ? 
                reviewArray.map((reviewItem,reviewIndex)=>{
                    return ( reviewItem ? <ReviewItem key = {reviewIndex} dayIndex = {reviewIndex} item = {reviewItem}/> : null)  
                }) : item.status == "Claim" ? <ClaimItem /> : <ContextItem />
            }   
            </View>
        )
    }

    return(
        <SafeAreaView style = {postDetails.reviewTabItemContainer}>
            <View style = {postDetails.reviewTabBar}>
            {listTab.map((e,i) => (
                <TouchableOpacity key = {i} onPress = {() => setStatusFilter(e.status)}
                    style = {[postDetails.reviewTabBarButton , status === e.status && postDetails.reviewTabBarSelectedButton]}>
                    <Text style = {[postDetails.reviewTabBarText , status === e.status && postDetails.reviewTabBarSelectedText]}>
                        {e.status}
                    </Text>
                </TouchableOpacity>
                ))}   
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
    const isFocused = useIsFocused(); 


    const [userId,userDetails,isLoggedIn] = React.useContext(AuthContext)
    const [comments,setComments] = React.useState([])
    const [loading,setLoading] = React.useState(true)
    const [timed,setTimed] = React.useState(false)
    const [error,setError] = React.useState(false)
    const [result,setResult] = React.useState(false)
    const [likeIndicator,setLikeIndicator] = React.useState(false)
    const [showComments,setShowComments] = React.useState(false)
    const [renderAgain,setRenderAgain] = useState(false)

    React.useEffect(() => {
  //  console.log("________________THIS IS A NEW RENDER _____________________")
  //  console.log("USER DETAILS", userDetails)
  //  console.log(route.params.details.user_id, route.params.details.review_sum_id )
    const getData = () => {
        axios.get(URL + "/activity/user", {params:{user_id : userId.slice(1,13) , review_sum_id : route.params.details.review_sum_id }} , {timeout : 500})
        .then(res => res.data).then(function(responseData) {
            Amplitude.logEventWithPropertiesAsync('POST_DETAILS_VISIT',{"userId" : route.params.details.user_id , "review_sum_id" : route.params.details.review_sum_id })
            console.log("Like identifier ", responseData[0])
            setLikeIndicator(responseData[0].upvote === "1" ? true : false)
            setLoading(false)
            setResult(true)
      //      console.log(responseData[0].upvote === "1" ? true : false)
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
       //     console.log(responseData)
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

    },[renderAgain,isFocused, likeIndicator])



    const [message , setMessage] = useState('');
    const [newAnswer,setNewAnswer] = useState(false)
  
    
    const onMicrophonePress = () =>{
        ToastAndroid.show("Please add your comment", ToastAndroid.SHORT);
    }

    const onSendPress =  () =>{
        const body = 
            {
                "review_sum_id": route.params.details.review_sum_id,
                "user_id": route.params.details.user_id,
                "engagement_user_id": userDetails.user_id,
                "product_id": route.params.details.product_id,
                "category_id": route.params.details.category_id,
                "engagement_user_name": userDetails.username,
                "upvote": null,
                "downvote": null,
                "comment": message
            }
            
       //     console.log(body)
            axios({
                method: 'post',
                url: URL + '/activity',
                data: body
              })
            .then(res => {
                setMessage('')
                setRenderAgain(!renderAgain)
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

    const onClickLike = () => {
        setRenderAgain(!renderAgain)
    }

  return (
      <ScrollView contentContainerStyle={postDetails.contentContainer}>
        <View style = {header.headerView}>
        <ModernHeader 
          title="Review"
          titleStyle = {header.headerText}
          backgroundColor= {background}
          leftIconColor = {borderColor}
          leftIconOnPress={() => navigation.goBack()} 
          rightDisable
          />
        </View>
        <View style = {postDetails.reviewImageContainer}>
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
            engagementUserId = {userDetails.user_id}
            engagementUserName = {userDetails.username}
            onClickLike = {()=>onClickLike()}
            />
        </View>
        <View style = {postDetails.reviewTabContainer}>
          <Tab 
            reviewArray = {route.params.details.content}
            dayArray = {route.params.details.day_product_used_content}
            review = {route.params.reviewDetails}
            claim = {route.params.details.claim}
            context = {route.params.contextDetails}
          />
        </View>
        <View>
            <View style ={postDetails.reviewCommentContainerAddCommentContainer} > 
                <KeyboardAvoidingView style ={postDetails.reviewCommentContainerTextInputContainer} >
                    <TextInput 
                    placeholder ={"Add a comment"}
                    style ={postDetails.reviewCommentContainerTextInput} 
                    multiline
                    value = {message}
                    onChangeText = {(text)=>setMessage(text)}
                    />
                </KeyboardAvoidingView>

                <View style ={postDetails.reviewCommentContainerSubmitContainer} >
                    <TouchableOpacity onPress = {onCommentsSend}>
                        <MaterialIcons name = "send" size={24} color = '#0080FF' />
                    </TouchableOpacity>
                </View>
            </View>
            <View style = {postDetails.reviewCommentContainerReadCommentContainer}>
                {comments.length > 0 && comments.map((item,index)=> {
                   return(
                    <View key = {index} style = {postDetails.reviewCommentContainerReadCommentItem} >
                        <View style = {postDetails.reviewCommentContainerReadCommentItemView}>
                        {item.engagement_user_name ? 
                        <Avatar.Image 
                            source={{
                                uri: 'https://ui-avatars.com/api/rounded=true&name='+ item.engagement_user_name + '&size=64'
                            }} size={20}/> :
                        <Avatar.Image 
                            source={{
                                uri: 'https://ui-avatars.com/api/rounded=true&background=random&size=64'
                             }} size={20}/>}
                            <Text style = {postDetails.reviewCommentContainerReadCommentUserName}>{item.engagement_user_name}</Text>
                            <Text style = {postDetails.reviewCommentContainerReadCommentTime}>{moment(item.created_at,"YYYY-MM-DD hh:mm:ss").add(5,'hours').add(30, 'minutes').fromNow()}</Text>
                        </View> 
                        <Text style = {postDetails.reviewCommentContainerReadCommentUserComment}>{item.comment}</Text>
                    </View>) 
                })}
                {comments.length == 0 && 
                    <View style = {postDetails.reviewCommentContainerReadCommentEmptyContainer} >
                        <Text style = {postDetails.reviewCommentContainerReadCommentEmptyContainerText}>No comments yet</Text>
                    </View>}
            </View>
        </View>
      </ScrollView>
   
  );
}

export default PostDetails

