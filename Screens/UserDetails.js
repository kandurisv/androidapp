
import React,{useEffect} from 'react'
import { View , ScrollView, TouchableOpacity, ToastAndroid, ImageBackground, Dimensions, Image} from 'react-native'
import {Avatar,Text} from 'react-native-paper';
import { ModernHeader } from "@freakycoder/react-native-header-view";
import { FlatGrid } from 'react-native-super-grid';
import axios from 'axios';
import {URL, LoadingPage, ErrorPage, TimeoutPage, background, headerStyle, borderColor, AuthContext} from './exports'
import {ImageLoader} from 'react-native-image-fallback';
import { useNavigation , useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
const {width,height} = Dimensions.get('screen')
import AsyncStorage from '@react-native-async-storage/async-storage';
//import * as Clipboard from 'expo-clipboard';
//import Clipboard from '@react-native-community/clipboard';
//import { useClipboard } from '@react-native-community/clipboard';

import * as Amplitude from 'expo-analytics-amplitude';
import { header , user } from './styles';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
Amplitude.initializeAsync("af380775c59ead50c4c02536befef5e5");

const UserDetails = () => {

    const navigation = useNavigation()
    const route = useRoute()

  //  const [data, setString] = useClipboard();

    const [userId,isLoggedIn] = React.useContext(AuthContext)

    const [userDetails, setUserDetails] = React.useState([])
    const [userInfo,setUserInfo] = React.useState([])
    const [loading,setLoading] = React.useState(true)
    const [timed,setTimed] = React.useState(false)
    const [error,setError] = React.useState(false)
    const [secs,setSecs] = React.useState(0)
    const [refresh,setRefresh] = React.useState(false)
    const [result,setResult] = React.useState(false)
    const [myPostsEmpty,setMyPostsEmpty] = React.useState(true)
    const [userPosts,setUserPosts]= React.useState([])
    const [userPostsError,setUserPostsError] = React.useState(false)

    const [testpoints,setpoints] = React.useState(500)
    const [testcode,setcode] = React.useState("ABCDE")
 
    React.useEffect(() => {
     //   console.log("timed " , timed, "Result", result , "Response Data" , userDetails )
     //   console.log(userId, isLoggedIn)
        const getData =  async () => {
            const phoneNumber = await AsyncStorage.getItem("phoneNumber")
     //       console.log(phoneNumber)
            axios.get(URL + "/user/summary", {params:{user_id : phoneNumber.slice(1,13)}} , {timeout : 5})
        .then(res => res.data).then(function(responseData) {
            console.log("USER Summary " , responseData)
      //      console.log("REached to response")
      
            setUserDetails(responseData)
            setLoading(false)
            setResult(true)
      //      console.log(responseData)
        })
        .catch(function(error) {
      //      console.log("REached to error")
      //      console.log(error)
            setLoading(false)
            setResult(true)
            setError(true)
        });
    }

      getData()


      const getUserInfo =  async () => {
        const phoneNumber = await AsyncStorage.getItem("phoneNumber")
 //       console.log(phoneNumber)
        axios.get(URL + "/user/info", {params:{user_id : phoneNumber.slice(1,13)}} , {timeout : 5000})
            .then(res => res.data).then(function(responseData) {
        console.log("USER DETAILS " , responseData)
  //      console.log("REached to response")
  
        setUserInfo(responseData)
        setLoading(false)
        setResult(true)
  //      console.log(responseData)
    })
    .catch(function(error) {
  //      console.log("REached to error")
  //      console.log(error)
        setLoading(false)
        setResult(true)
        setError(true)
    });
}

        getUserInfo()


      const fetchPinsPost = () => {
        axios.get(URL + "/user/items", {params:{user_id : userId.slice(1,13) }} , {timeout : 5})
        .then(res => res.data).then(function(responseData) {
      //      console.log("A", responseData)
            if(responseData.length) {
              setMyPostsEmpty(false)
            }
            setUserPosts(responseData)
            
        })
        .catch(function(error) {
            setUserPostsError(true)
        });
    }
      fetchPinsPost()

        
    },[result]);
    
    // const onReviewsClick = () => {
    //     setEnableFeed(true)
    //     setReviewsClick(true)
    //     setUpvotesClick(false)
    //     setDownvotesClick(false)
    //    // setFeedData(Reviews)
    // }

    // const onUpvotesClick = () => {
    //     setEnableFeed(true)
    //     setReviewsClick(falsee)
    //     setUpvotesClick(true)
    //     setDownvotesClick(false)
    //     // setFeedData(Upvote)
    // }

    // const onDownvotesClick = () => {
    //     setEnableFeed(true)
    //     setReviewsClick(false)
    //     setUpvotesClick(false)
    //     setDownvotesClick(true)
    //     // setFeedData(Downvotes)
    // }

    const onEdit = () => {
     //   console.log("EditProfile")
        navigation.navigate("EditUserProfile", {userDetails : userDetails[0] , userInfo : userInfo[0]})
    }

    const onReferralPress = () => {
  //      Clipboard.setString(userDetails[0].existing_referral_code)
  //      ToastAndroid.show("Referral Code copied to clipboard", ToastAndroid.SHORT)
    }

    const onMyReviewClick = (item,review,context) => {
        navigation.navigate("PostDetails", {details : item , reviewDetails : review , contextDetails : context})
    }

    return (   
        error ? (<ErrorPage />) :
        loading ? (<LoadingPage />) :
        (
            <View style = {user.container}>
                <View style = {header.headerView}>
                    <ModernHeader 
                        title="Details"
                        titleStyle = {header.headerText}
                        backgroundColor= {background}
                        leftIconColor = {borderColor}
                        leftIconOnPress={() => navigation.goBack()}
                        rightIconComponent = {<AntDesign name = "logout" size = {20} color = "black"/>}
                        rightIconOnPress = {()=> {
                            Amplitude.logEventAsync('SIGNOUT_FROM_USER')
                            navigation.navigate("Signout")
                            }
                        }
                        />
                </View>   
                <ScrollView 
                contentContainerStyle = {user.mainViewContentContainer}
                style = {user.mainViewContainer}>
                    {userInfo.length && userInfo[0].cover_image ?
                    <View style = {user.mainViewCoverContainer}>
                     <ImageLoader 
                        source = {userInfo[0].cover_image} 
                        style = {{width : width, height : 180 }}
                        fallback = {require("../assets/defaultCover.png")}
                        />
                    </View> : null
                    }
                    <View style = {user.mainViewDisplayContainer}>
                        {  userInfo[0] && userInfo[0].profile_image && userInfo[0].profile_image != "None" && userInfo[0].profile_image != "" ?
                        <Image source = {{uri : userInfo[0].profile_image}} style = {{width : 100, height : 100 , borderRadius : 50 , }}/> :
                        userDetails.length && userDetails[0].username ? 
                                <Avatar.Image 
                                source={{
                                uri: 'https://ui-avatars.com/api/?rounded=true&name='+ userDetails[0].username.replace(' ','+') + '&size=512'
                                }} size={80}/> :
                                <Avatar.Image 
                                source={{
                                uri: 'https://ui-avatars.com/api/?rounded=true&background=random&size=512'
                                }} size={80}/>}
                    </View>
                    <View style = {user.mainViewDetailsContainer}>
                   
                        <View style = {user.mainViewDetailsUserNameContainer}>
                        {userDetails.length && userDetails[0].username ? 
                            <Text style={user.mainViewDetailsUserNameText} >{userDetails[0].username}</Text> : null }
                        </View> 
                        <View style = {user.mainViewDetailsSummaryContainer}>
                        <View style = {user.mainViewDetailsSummaryButtonContainer}>
                            <Text style={user.mainViewDetailsSummaryValue}>{userDetails.length && userDetails[0].number_of_referrals ? userDetails[0].number_of_reviews : 0}</Text>
                            <Text style={user.mainViewDetailsSummaryName}>Referrals</Text>
                        </View>
                        <View style = {user.mainViewDetailsSummaryButtonContainer}>
                            <Text style={user.mainViewDetailsSummaryValue}>{userDetails.length && userDetails[0].number_of_reviews ? userDetails[0].number_of_reviews : 0}</Text>
                            <Text style={user.mainViewDetailsSummaryName}>Reviews</Text>
                        </View>
                        <View style = {user.mainViewDetailsSummaryButtonContainer}>
                            <Text style={user.mainViewDetailsSummaryValue}>{userDetails.length && userDetails[0].number_of_upvotes ?  userDetails[0].number_of_upvotes : 0}</Text>
                            <Text style={user.mainViewDetailsSummaryName}>Pins</Text>
                        </View>   
                        </View>   
                    </View>
                    {userDetails.length &&  userDetails[0].show_referral_code && userDetails[0].existing_referral_code ?
                    <TouchableWithoutFeedback style = {user.mainViewReferralCodeView} onPress = {onReferralPress}>
                        <Text style = {user.mainViewReferralCodeText}>Your referral code is '{userDetails[0].existing_referral_code}'</Text>
                    </TouchableWithoutFeedback> : null
                    }
                    <TouchableOpacity style = {user.mainViewEditProfileButton} onPress={onEdit}>
                        <Text style = {user.mainViewEditProfileText}> Edit Profile </Text>
                    </TouchableOpacity>
                    <View style = {user.myPostedReviewsContainer}>
                        <Text style={user.myPostedReviewsHeading}>My Reviews</Text>
                        {myPostsEmpty ? 
                        <View style = {user.myPostedReviewsEmptyContainer}>
                            <Text style = {user.myPostedReviewsEmptyText}>Please start posting reviews</Text>
                        </View> :
                        <FlatGrid itemDimension={width*0.45} data={userPosts} renderItem={({item}, i) => {
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

                            return(
                                <TouchableOpacity 
                                    style = {user.myPostedReviewsItemContainer}
                                    onPress = {()=>onMyReviewClick(item,review,context)}    
                                >
                                    <ImageBackground source = {{uri : item.image_list[0]}} style = {user.myPostedReviewsItemImageBackground} blurRadius = {2}></ImageBackground>
                                        <View style = {user.myPostedReviewsItemTextView}>
                                            <Text style={user.myPostedReviewsItemText}>{item.product_name}</Text>
                                        </View>
                                </TouchableOpacity>)}
                            }
                        />}
                    </View>
                </ScrollView>
            </View>
        )
    )
}

export default UserDetails

