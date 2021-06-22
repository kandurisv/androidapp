
import React,{useEffect} from 'react'
import { View , StyleSheet, ScrollView, TouchableOpacity, ToastAndroid, ImageBackground, Dimensions} from 'react-native'
import {Avatar,Text} from 'react-native-paper';
import faker from 'faker'
import { ModernHeader } from "@freakycoder/react-native-header-view";
import { FlatGrid } from 'react-native-super-grid';
import axios from 'axios';
import {URL, LoadingPage, ErrorPage, TimeoutPage, background, headerStyle, borderColor, AuthContext} from './exports'

import { useNavigation , useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
const {width,height} = Dimensions.get('screen')

import { Amplitude } from '@amplitude/react-native';
const ampInstance = Amplitude.getInstance();
ampInstance.init(af380775c59ead50c4c02536befef5e5);

const UserDetails = () => {

    const navigation = useNavigation()
    const route = useRoute()
    const userId = React.useContext(AuthContext)

    const [userDetails, setUserDetails] = React.useState({})
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

      const fetchPinsPost = () => {
        axios.get(URL + "/user/items", {params:{user_id : userId }} , {timeout : 5})
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
        navigation.navigate("EditUserProfile")
    }



    return (
       
        error ? (<ErrorPage />) :
        loading ? (<LoadingPage />) :
        (
            <View style = {{flex : 1}}>
                <View>
                    <ModernHeader 
                        title="Details"
                        titleStyle = {headerStyle.headerText}
                        backgroundColor= {background}
                        leftIconColor = {borderColor}
                        leftIconOnPress={() => navigation.goBack()}
                        rightIconComponent = {<AntDesign name = "logout" size = {20} color = "black"/>}
                        rightIconOnPress = {()=> {
                            ampInstance.logEvent('SIGNOUT_FROM_USER')
                            navigation.navigate("Signout")
                            }
                        }
                        />
                </View>
        
                <ScrollView style = {styles.container}>
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
                    <View>
                        <Text style={styles.header}>My Reviews</Text>
                        {myPostsEmpty ? 
                        <View>
                            <Text style = {{fontSize : 16}}>Please start posting reviews</Text>
                        </View> :
                        <FlatGrid itemDimension={width*0.45} data={userPosts} renderItem={({item}, i) => (
                        <View style = {styles.contentContainer}>
                            <ImageBackground source = {{uri : item.image_list[0]}} style = {styles.image} blurRadius = {2}></ImageBackground>
                            <View style = {styles.textView}>
                            <Text style={styles.text}>{item.product_name}</Text>
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

const styles = StyleSheet.create({
    feed : {flex : 1},
    mainContainer : {flexDirection : 'row',marginTop : 40,justifyContent : 'center'},
    coverPhoto : {height : 150,backgroundColor : "#ddd",justifyContent :'center',alignItems :'center'},
    username : {alignItems : 'center',padding : 5,marginLeft : 0,width : 120},
    dp : {position : 'absolute',top : 100,left : 20,},
    numContainer : {flex : 1 ,alignItems : 'center',flexDirection : 'row',justifyContent : 'center'},
    container: {flex: 1,},
    contentContainer : {justifyContent : 'center',alignItems : 'center',shadowColor : "#ddd"},
    contentTop : {marginRight : 15,fontWeight : 'bold'},
    contentBottom : {marginTop : 2,marginRight : 15,fontSize : 12},
    title : {padding : 8,textAlign : 'center',fontWeight : 'bold',fontSize : 13},
    question : {fontWeight : 'bold'},
    flatlist : {},
    input : {elevation : 2,borderRadius : 15,backgroundColor : 'white',width : '99%',height : '15%'},
    editButton : {backgroundColor : "#eee",margin : 10 ,borderRadius : 5,padding : 5,justifyContent : 'center',alignItems : 'center',borderWidth : 1,borderColor : "#999",shadowColor : "#aaa"},
    editText : {fontWeight : 'bold',shadowOpacity : 2},
    container1 : {marginBottom : 60},
    addReview : {backgroundColor : 'pink',flex : 1,width,height : width * 0.8},
    trendingProducts : {width,margin : 10, flex : 1},
    productRecommendation : {width,margin : 10 ,marginTop : 0, flex : 1},
   
    header : {fontWeight : 'bold',fontSize : 18,marginLeft : 20,margin : 5},
    image: {flex: 1,width : width * 0.45,height : width * 0.45,borderColor : "black",borderWidth : 1,
    resizeMode: "cover",justifyContent: "center",borderRadius : 10,opacity : 0.4,backgroundColor : 'black',
        // ...StyleSheet.absoluteFillObject,  
    },
    textView: {...StyleSheet.absoluteFillObject},
    text: {color: "white",fontSize: 18,fontWeight: "200",textAlign: "center",marginTop : width * 0.05},
    carouselStyle : {},
    imageCover : {width : width,height : width * 0.8},  
    });