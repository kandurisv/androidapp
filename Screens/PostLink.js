import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {  StyleSheet, Text, View  ,Image, ScrollView ,Easing ,Animated, Dimensions, SafeAreaView, TouchableOpacity, FlatList, TextInput, KeyboardAvoidingView, ToastAndroid , ImageBackground} from 'react-native';
import Fontisto from "react-native-vector-icons/Fontisto";
import {URL,  background, theme, borderColor, AuthContext} from './exports'
import { useIsFocused, useNavigation , useRoute } from '@react-navigation/native';
import moment from 'moment';
import LottieView from 'lottie-react-native';
import axios from 'axios';
import {MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';
import {Avatar} from 'react-native-paper';
import { ModernHeader, ProfileHeader } from "@freakycoder/react-native-header-view";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as WebBrowser from 'expo-web-browser';


import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import * as firebase from "firebase";
import { postDetails , header, header1} from './styles';

import * as Amplitude from 'expo-analytics-amplitude';

Amplitude.initializeAsync("af380775c59ead50c4c02536befef5e5");


try {
    firebase.initializeApp(firebaseConfig);
  } catch (err) {
    // ignore app already initialized error in snack
  }


  const Cover = (props) => {
    const isFocused = useIsFocused()

    const progress = React.useRef(new Animated.Value(0)).current
    const [liked,setLiked] = React.useState(props.likeIndicator)
    const [likeCount,setLikeCount] = React.useState(Math.max(props.upvotes,0))

    const [result, setResult] = useState(null);
    
    const [commentCount,setCommentCount] = React.useState(props.comments)
    const navigation = useNavigation()
    const getFeedByUser = () => {
     //   console.log("Username click")
        axios.get(URL + "/user/instagram", {params:{user_id : userId.slice(1,13) }} , {timeout : 5})
        .then(res => res.data)
        .then(async function(responseData) {
        //    console.log(responseData)
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
            <View style = {postDetails.reviewImageContainerScrollableContainer}>
                {/* <StatusBar height = {0} translucent backgroundColor='transparent'/> */}
                <View style = {postDetails.reviewImageContainerUserNameView}>
                <TouchableOpacity style ={postDetails.reviewImageContainerUserNameButton} onPress = {getFeedByUser}>
                    <Text style ={postDetails.reviewImageContainerUserNameText} >{props.username}</Text> 
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
                <View style ={postDetails.reviewImageContainerProductNameView}>
                    <Text style ={postDetails.reviewImageContainerProductNameText} >{props.productname}</Text>
                </View>
                
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
    {status: 'Profile'}
]

const Data = [{
        status: 'Review',
        content : 'Review'
    }, {
        status: 'Claim',
        content : 'Claim'
    }, {
        status: 'Profile',
        content : 'Profile'
    },
]

const Tab = ({reviewArray, dayArray, review,claim,context}) => {
    const [status, setStatus] = useState('Review');
    const [dataList , setDataList] = useState ([listTab[0]]);
    const setStatusFilter = status => {
        setDataList([...Data.filter(e => e.status === status)]);
        setStatus(status);
    }


    var reviewContent = ""
    reviewArray.map((reviewItem,index) => {
      if(reviewItem.length > 0) {
        reviewContent = reviewContent + "Day " + dayArray[index] + ": " + reviewItem + "\n"
        }
    })
    
    var contextContent = ""
    review.category_ques.map((contextItem,index)=>{
        contextContent = contextContent + review.category_ques[index] + " : " + review.category_ans[index] + "\n" + "\n"
    })

    const renderItem = ({item , index}) =>{
        
        const ReviewItem = ({item,dayIndex}) => {
            return(
                    <View style = {{}} key = {dayIndex}>
                        <Text style = {{fontWeight : 'bold' , marginTop : 10,}}>Day {dayArray[dayIndex]}</Text>
                        <Text style = {postDetails.reviewText}>{item}</Text>
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
                    <Text>{contextContent}</Text>
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




const PostLink = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const [loggedin,setLoggedin] = React.useState(false)
    const [review,setReview] = React.useState({})
    const [userDetails,setUserDetails] = React.useState({})
    const [userId,setUserId] = React.useState("")
    
    const [comments,setComments] = React.useState([])
    const [loading,setLoading] = React.useState(true)
    const [timed,setTimed] = React.useState(false)
    const [error,setError] = React.useState(false)
    const [result,setResult] = React.useState(false)
    const [likeIndicator,setLikeIndicator] = React.useState(false)
    const [showComments,setShowComments] = React.useState(false)
    const [renderAgain,setRenderAgain] = useState(false)
    const [message , setMessage] = useState('');
    const [newAnswer,setNewAnswer] = useState(false)
    const [reviewLoading,setReviewLoading] = React.useState(true)
    const [userLoading,setUserLoading] = React.useState(true)

    const [id,setId] = React.useState(route.params.id ? route.params.id : "")

    React.useEffect(()=>{
        console.log("EFFECT IS RUn")
        console.log("u+" + id.slice(2,))
        firebase.auth().onAuthStateChanged(user => {
            if (user != null) {
                setUserId(user.phoneNumber.slice(1,13))
                setLoggedin(true)
                
                axios.get(URL + "/post/getreviewbyid", {
                    params: {
                      id : "u+" + id.slice(2,),
                    }
                  })
                .then(res => res.data)
                .then(function (responseData) {
                    console.log('REVIEW',responseData)
                    setReview(responseData[0])
                    setReviewLoading(false)
                  })
                .catch(function (error) {
                  console.log(error);
                  setError("REVIEW ERROR",true);      
                });

                axios.get(URL + "/user/info" , {params : {user_id : user.phoneNumber.slice(1,13)}}, {timeout : 5000})
                .then(res => res.data).then(function(responseData) {
                    if(responseData.length) {
                        setUserDetails(responseData[0])
                        console.log("responseData",responseData)
                        setUserLoading(false)
                    }
                    else {
                        navigation.navigate("Home")
                    }
                })
                .catch(function(error) {
                    console.log("USER INFO ERROR",error)
                });

                axios.get(URL + "/activity/user", {params:{user_id : userId.slice(1,13) , review_sum_id : id}} , {timeout : 500})
                .then(res => res.data).then(function(responseData) {
                    setLikeIndicator(responseData[0].upvote === "1" ? true : false)
                    setLoading(false)
                    setResult(true)
                })
                .catch(function(error) {
                    setLoading(false)
                    setResult(true)
                    setError("ACTIVITY ERROR",true)
                });

                axios.get(URL + "/post/comments", {params:{review_sum_id : id }} , {timeout : 5})
                .then(res => res.data).then(function(responseData) {
                    setShowComments(true)
                    setComments(responseData)
                    setLoading(false)
                    setResult(true)
                })
                .catch(function(error) {
                    setLoading(false)
                    setResult(true)
                    setError("COMMENTS ERROR",true)
                });
            }
            else {
                navigation.navigate("Auth")
            }
        })
        console.log("Firebase Error")
    },[id])

    const onMicrophonePress = () =>{
        ToastAndroid.show("Please add your comment", ToastAndroid.SHORT);
    }

    const onSendPress =  () =>{
        const body = 
            {
                "review_sum_id":id,
                "user_id":review.user_id,
                "engagement_user_id": userDetails.user_id,
                "product_id":review.product_id,
                "category_id":review.category_id,
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
            Amplitude.logEventWithPropertiesAsync('VISIT_THROUGH_SHARE',{"userId" :review.user_id , "review_sum_id" :id})
            setMessage("")
            ToastAndroid.show("Thanks for comment", ToastAndroid.SHORT);
            
        }
    }

    const onClickLike = () => {
        setRenderAgain(!renderAgain)
    }

    return (
        !userLoading && !reviewLoading ?
        <ScrollView contentContainerStyle={postDetails.contentContainer}>
         
                 <View style = {header1.headerView}>
                <ModernHeader 
                    title="Review"
                    height = {50}
                    titleStyle = {header1.headerText}
                    backgroundColor= {'white'}
                    leftIconColor = {borderColor}
                    leftIconOnPress={() => navigation.navigate("Tab")}
                    leftIconComponent = {
                    <View>
                       <MaterialCommunityIcons name = "keyboard-backspace" size = {25} color = {"#555"} />
                    </View>
                    }
                    rightDisable
                    />
            </View>
            <View style = {postDetails.reviewImageContainer}>
                <Cover 
                    imageList = {review.image_list}
                    imageListDays = {review.day_product_used_image}
                    upvotes = {review.upvote}
                    username = {review.username}
                    productname = {review.product_name}
                    comments = {review.number_of_comments}
                    userId = {review.user_id}
                    details = {review}
                    likeIndicator = {likeIndicator}
                    engagementUserId = {userDetails.user_id}
                    engagementUserName = {userDetails.username}
                    onClickLike = {()=>onClickLike()}
                    />
            </View>
            <View style = {postDetails.reviewTabContainer}>
                <Tab 
                    reviewArray = {review.content}
                    dayArray = {review.day_product_used_content}
                    review = {review}
                    claim = {review.claim}
                    context = {review}
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
                                    uri: 'https://ui-avatars.com/api/?rounded=true&name='+ item.engagement_user_name + '&size=64'
                                }} size={20}/> :
                            <Avatar.Image 
                                source={{
                                    uri: 'https://ui-avatars.com/api/?rounded=true&background=random&size=64'
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
        : null
    )
}

export default PostLink

const styles = StyleSheet.create({})
