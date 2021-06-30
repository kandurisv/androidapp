
import React,{useEffect} from 'react'
import { View , ScrollView, TouchableOpacity, ToastAndroid, ImageBackground, Dimensions} from 'react-native'
import {Avatar,Text} from 'react-native-paper';
import faker from 'faker'
import { ModernHeader } from "@freakycoder/react-native-header-view";
import { FlatGrid } from 'react-native-super-grid';
import axios from 'axios';
import {URL, LoadingPage, ErrorPage, TimeoutPage, background, headerStyle, borderColor, AuthContext} from './exports'

import { useNavigation , useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
const {width,height} = Dimensions.get('screen')
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as Amplitude from 'expo-analytics-amplitude';
import { header , user } from './styles';
Amplitude.initializeAsync("af380775c59ead50c4c02536befef5e5");

const UserDetails = () => {

    const navigation = useNavigation()
    const route = useRoute()
    const [userId,isLoggedIn] = React.useContext(AuthContext)

    const [userDetails, setUserDetails] = React.useState([])
    const [loading,setLoading] = React.useState(true)
    const [timed,setTimed] = React.useState(false)
    const [error,setError] = React.useState(false)
    const [secs,setSecs] = React.useState(0)
    const [refresh,setRefresh] = React.useState(false)
    const [result,setResult] = React.useState(false)
    const [myPostsEmpty,setMyPostsEmpty] = React.useState(true)
    const [userPosts,setUserPosts]= React.useState([])
    const [userPostsError,setUserPostsError] = React.useState(false)
 
    React.useEffect(() => {
        console.log("timed " , timed, "Result", result , "Response Data" , userDetails )
        console.log(userId, isLoggedIn)
        const getData =  async () => {
            const phoneNumber = await AsyncStorage.getItem("phoneNumber")
            axios.get(URL + "/user/summary", {params:{user_id : phoneNumber}} , {timeout : 5})
        .then(res => res.data).then(function(responseData) {
            console.log(phoneNumber)
            console.log("REached to response")
      
            setUserDetails(responseData)
            setLoading(false)
            setResult(true)
            console.log(responseData)
        })
        .catch(function(error) {
            console.log("REached to error")
            console.log(error)
            setLoading(false)
            setResult(true)
            setError(true)
        });
    }

      getData()

      const fetchPinsPost = () => {
        axios.get(URL + "/user/items", {params:{user_id : userId.slice(1,13) }} , {timeout : 5})
        .then(res => res.data).then(function(responseData) {
            console.log("A", responseData)
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
    
    const onReviewsClick = () => {
        setEnableFeed(true)
        setReviewsClick(true)
        setUpvotesClick(false)
        setDownvotesClick(false)
       // setFeedData(Reviews)
    }

    const onUpvotesClick = () => {
        setEnableFeed(true)
        setReviewsClick(falsee)
        setUpvotesClick(true)
        setDownvotesClick(false)
        // setFeedData(Upvote)
    }

    const onDownvotesClick = () => {
        setEnableFeed(true)
        setReviewsClick(false)
        setUpvotesClick(false)
        setDownvotesClick(true)
        // setFeedData(Downvotes)
    }

    const onEdit = () => {
        console.log("EditProfile")
        navigation.navigate("EditUserProfile", {userId : userId})
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
                    <View style = {user.mainViewCoverContainer}>
                        <Text> Cover photo </Text>
                    </View>
                    <View style = {user.mainViewDisplayContainer}>
                        {userDetails.length && userDetails[0].username ? 
                                <Avatar.Image 
                                source={{
                                uri: 'https://ui-avatars.com/api/rounded=true&name='+ userDetails[0].username + '&size=512'
                                }} size={80}/> :
                                <Avatar.Image 
                                source={{
                                uri: 'https://ui-avatars.com/api/rounded=true&background=random&size=512'
                                }} size={80}/>}
                    </View>
                    <View style = {user.mainViewDetailsContainer}>
                    {userDetails.length && userDetails[0].username ? 
                        <View style = {user.mainViewDetailsUserNameContainer}>
                            <Text style={user.mainViewDetailsUserNameText} >{userDetails[0].username}</Text>
                        </View> : null }
                        <View style = {user.mainViewDetailsSummaryContainer}>
                    
                        <TouchableOpacity style = {user.mainViewDetailsSummaryButtonContainer} onPress = {onReviewsClick}>
                            <Text style={user.mainViewDetailsSummaryValue}>{userDetails.length && userDetails[0].number_of_reviews ? userDetails[0].number_of_reviews : 0}</Text>
                            <Text style={user.mainViewDetailsSummaryName}>Reviews</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style = {user.mainViewDetailsSummaryButtonContainer} onPress = {onUpvotesClick}>
                            <Text style={user.mainViewDetailsSummaryValue}>{userDetails.length && userDetails[0].number_of_upvotes ?  userDetails[0].number_of_upvotes : 0}</Text>
                            <Text style={user.mainViewDetailsSummaryName}>UpVotes</Text>
                        </TouchableOpacity>   
                        <TouchableOpacity style = {user.mainViewDetailsSummaryButtonContainer} onPress = {onDownvotesClick}>
                            <Text style={user.mainViewDetailsSummaryValue}>{userDetails.length &&  userDetails[0].number_of_downvotes ?  userDetails[0].number_of_downvotes : 0}</Text>
                            <Text style={user.mainViewDetailsSummaryName}>Downvotes</Text>
                        </TouchableOpacity>
                        </View>   
                    </View>
                    <TouchableOpacity style = {user.mainViewEditProfileButton} onPress={onEdit}>
                        <Text style = {user.mainViewEditProfileText}> Edit Profile </Text>
                    </TouchableOpacity>
                    <View style = {user.myPostedReviewsContainer}>
                        <Text style={user.myPostedReviewsHeading}>My Reviews</Text>
                        {myPostsEmpty ? 
                        <View style = {user.myPostedReviewsEmptyContainer}>
                            <Text style = {user.myPostedReviewsEmptyText}>Please start posting reviews</Text>
                        </View> :
                        <FlatGrid itemDimension={width*0.45} data={userPosts} renderItem={({item}, i) => (
                        <View style = {user.myPostedReviewsItemContainer}>
                            <ImageBackground source = {{uri : item.image_list[0]}} style = {user.myPostedReviewsItemImageBackground} blurRadius = {2}></ImageBackground>
                            <View style = {user.myPostedReviewsItemTextView}>
                            <Text style={user.myPostedReviewsItemText}>{item.product_name}</Text>
                            </View>
                        </View>)}
                        />}
                    </View>
                </ScrollView>
            </View>
        )
    )
}

export default UserDetails

