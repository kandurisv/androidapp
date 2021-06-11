
import React,{useEffect} from 'react'
import { View , StyleSheet, ScrollView, TouchableOpacity, ToastAndroid} from 'react-native'
import {Avatar,Text} from 'react-native-paper';
import faker from 'faker'


import axios from 'axios';
import {URL, LoadingPage, ErrorPage, TimeoutPage} from './exports'

import { useNavigation , useRoute } from '@react-navigation/native';


const UserDetails = () => {

    const navigation = useNavigation()
    const route = useRoute()
    const [userDetails, setUserDetails] = React.useState({})
    const [loading,setLoading] = React.useState(true)
    const [timed,setTimed] = React.useState(false)
    const [error,setError] = React.useState(false)
    const [secs,setSecs] = React.useState(0)
    const [refresh,setRefresh] = React.useState(false)
    const [result,setResult] = React.useState(false)
 
    React.useEffect(() => {
        console.log("timed " , timed, "Result", result , "Response Data" , userDetails )
      
        const getData = () => {
        axios.get(URL + "/user/summary", {params:{user_id : 1}} , {timeout : 5})
        .then(res => res.data).then(function(responseData) {
            console.log("REached to response")
            setUserDetails(responseData[0])
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
        navigation.navigate("EditUserProfile")
    }



    return (
        error ? (<View style = {{flex : 1, justifyContent : 'center' , alignItems : 'center'}}><Text>Error</Text></View>) :
        loading ? (<View style = {{flex : 1, justifyContent : 'center' , alignItems : 'center'}}><Text>Loading</Text></View>) :
        (<ScrollView style = {styles.container}>
            {/* <HeaderBack title = "My Profile" color = "#E60023"/> */}
            <View style = {styles.coverPhoto}>
                <Text> Cover photo </Text>
            </View>
            <View style = {styles.dp}>
            {userDetails.username ? 
                    <Avatar.Image 
                    source={{
                    uri: 'https://ui-avatars.com/api/rounded=true&name='+ userDetails.username + '&size=512'
                    }} size={80}/> :
                    <Avatar.Image 
                    source={{
                    uri: 'https://ui-avatars.com/api/rounded=true&background=random&size=512'
                    }} size={80}/>}
            </View>
            <View style = {styles.mainContainer}>
                <View style = {styles.username}>
                    <Text style={styles.title} >{userDetails.username}</Text>
                </View>
                <View style = {styles.numContainer}>
                <TouchableOpacity style = {styles.contentContainer} onPress = {onReviewsClick}>
                    <Text style={styles.contentTop}>{userDetails.number_of_reviews}</Text>
                    <Text style={styles.contentBottom}>Reviews</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.contentContainer} onPress = {onUpvotesClick}>
                    <Text style={styles.contentTop}>{userDetails.number_of_upvotes}</Text>
                    <Text style={styles.contentBottom}>UpVotes</Text>
                </TouchableOpacity>   
                <TouchableOpacity style = {styles.contentContainer} onPress = {onDownvotesClick}>
                    <Text style={styles.contentTop}>{userDetails.number_of_downvotes}</Text>
                    <Text style={styles.contentBottom}>Downvotes</Text>
                </TouchableOpacity>
                </View>   
            </View>
            <TouchableOpacity style = {styles.editButton} onPress={onEdit}>
                <Text style = {styles.editText}> Edit Profile </Text>
            </TouchableOpacity>
        </ScrollView>)
    
    )
  
        
}



export default UserDetails

const styles = StyleSheet.create({
    feed : {
        flex : 1, 
        

    },
    mainContainer : {
        
        flexDirection : 'row',
        marginTop : 40,
        //backgroundColor : 'pink',
        justifyContent : 'center',
        
        
        
    },
    coverPhoto : {
        height : 150,
        backgroundColor : "#ddd",
        justifyContent :'center',
        alignItems :'center',
        
    },
    username : {
        alignItems : 'center',
        
        padding : 5,
        marginLeft : 0,
        width : 120,

    },
    dp : {
        position : 'absolute',
        top : 110,
        left : 20,
    },
    numContainer : {
        flex : 1 ,
        alignItems : 'center',
        flexDirection : 'row',
        justifyContent : 'center'
    },

    container: {
      flex: 1,
      
      
    },
    contentContainer : {
        justifyContent : 'center',
        alignItems : 'center',
      //  backgroundColor : "#aaa"
      shadowColor : "#ddd",

    },
    contentTop : {
       // marginTop : 10,
        marginRight : 15,
        fontWeight : 'bold'
    },
    contentBottom : {
        marginTop : 2,
        marginRight : 15,
        fontSize : 12,
    },
    title : {
      padding : 8,
     
      textAlign : 'center',
      fontWeight : 'bold',
      fontSize : 13
    },
  
    question : {
      fontWeight : 'bold'
    },
    flatlist : {
  
    },
    input : {
      elevation : 2,
      borderRadius : 15,
      backgroundColor : 'white',
      width : '99%',
      height : '15%'
    },
    editButton : {
        backgroundColor : "#eee",
        margin : 10 ,
        borderRadius : 5,
        padding : 5,
        justifyContent : 'center',
        alignItems : 'center',
        borderWidth : 1,
        borderColor : "#999",
        shadowColor : "#aaa"

    },
    editText : {
        fontWeight : 'bold',
        shadowOpacity : 2,
    },
    });