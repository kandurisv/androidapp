import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React from 'react'
import { FlatList, StyleSheet, Text, View , RefreshControl, TouchableOpacity, Image, Pressable, ToastAndroid} from 'react-native'
import { AuthContext, background, ErrorPage, LoadingPage, theme , URL } from './exports'
import {Avatar} from 'react-native-paper';

const ActivityNotification = () => {
    const [userId,userDetails, isLoggedIn] = React.useContext(AuthContext)
    const focussed = useIsFocused()
    const navigation = useNavigation()
    const [notificationsData,setNotificationsData] = React.useState([])
    const [refreshing,setRefreshing] = React.useState(false)
    const [refreshEvents,setRefreshEvents] = React.useState(false)
    const [loading,setLoading] = React.useState(false)
    const [error,setError] = React.useState(false)



    React.useEffect(() => {
        setLoading(true)
        console.log("Reached here")
        const getNotifications = () => {
            axios.get(URL + "/notifications/allnotifications",{params:{user_id : userId.slice(1,13) }} , {timeout : 5000})
                .then(res => res.data).then(function(responseData) {
                    console.log("ALL NOTIFICATIONS",responseData)
                    setLoading(false)
                    setNotificationsData(responseData)
                })
                .catch(function(error) {
                    setError(true)
                });
            }
        getNotifications()

        const addNotificationVisit = () => {
            const body = 
            {
                "user_id": userId.slice(1,13),
            }
            
            axios({
                method: 'post',
                url: URL + '/notifications/lastvisit',
                data: body
              })
            .then(res => {
                console.log("I am happy")
            }).catch((e) => console.log(e))
           
            }
        
            addNotificationVisit()

    },[focussed , refreshEvents])

    const onRefresh = () => {
        setRefreshEvents(!refreshEvents)
    }

    const LikeNotification = ({username, product}) => {
        return(
        <View>
            <Text style = {{flexDirection : 'row' , fontSize : 15}}>
                <Text style = {{fontWeight : 'bold'}}>{username}</Text>
                <Text>{' liked your review on '}</Text>
                <Text style = {{fontWeight : 'bold'}}>{product}</Text>
            </Text>
        </View>)
    }

    const CommentNotification = ({username}) => {
        return(
        <View>
            <Text style = {{flexDirection : 'row' , fontSize : 15}}>
                <Text style = {{fontWeight : 'bold'}}>{username}</Text>
                <Text>{' commented on your post'}</Text>
            </Text>
        </View>)
    }


    const onClickNotification = (review_sum_id) => {
        navigation.navigate("PostLink", {id : review_sum_id})
    }


    const items = ({item,index}) => (
        item && item.engagement_user_name && item.product_name ?
                <TouchableOpacity 
                    style = {{
                        flexDirection : 'row' , 
                        elevation : item.new_notification_indicator ? 1 : 0,
                        alignItems : 'center',
                        padding : 10,
                        marginRight : 10, 
                        marginLeft : 0,
                    }}
                    onPress = {()=>onClickNotification(item.review_sum_id)}
                >
                    <View style = {{marginRight : 10}}>
                     { item  && item.engagement_profile_image && item.engagement_profile_image != "None" && item.engagement_profile_image != "" ?
                        <Image 
                            source = {{uri: item.engagement_profile_image + "?" + new Date()}} 
                            style = {{width :30, height : 30 , borderRadius : 30  }} /> :
                        item.length && item.engagement_user_name ? 
                                <Avatar.Image 
                                source={{
                                uri: 'https://ui-avatars.com/api/?rounded=true&name='+ item.engagement_user_name.replace(' ','+') + '&size=512&background=D7354A&color=fff&bold=true'
                                }} size={30}/> :
                                <Avatar.Image 
                                source={{
                                uri: 'https://ui-avatars.com/api/?rounded=true&size=512&background=D7354A&color=fff&bold=true'
                                }} size={30}/>}
                    </View>

                    <View style = {{marginRight : 10}}>
                        { item.upvote == 1 ?
                            <LikeNotification username = {item.engagement_user_name} product = {item.product_name} /> :
                            <CommentNotification username = {item.engagement_user_name} />
                        }
                    </View>
                   </TouchableOpacity>    : null   
   )


    return (
        
        <View style = {{flex : 1 , marginTop : 25 , backgroundColor : background }}>
            <View style = {{
                backgroundColor : background, 
                height : 50 , 
                flexDirection : 'row' ,
                alignItems: 'center' ,
                borderBottomColor : "#AAA",
                borderBottomWidth : 1 ,
                elevation : 5,
            }}>
                <TouchableOpacity 
                    style = {{marginLeft : 5 }}
                    onPress = {()=>navigation.goBack()}>
                    <MaterialCommunityIcons name = "keyboard-backspace" size = {25} color = {"#555"} />
                </TouchableOpacity>
                <View style = {{flex : 1 , justifyContent : 'center', alignItems : 'center', backgroundColor : background , }}>
                    <Image style={{height : 40 , width : 40 }}
                        source={require('../assets/LogoTransparentSolidColorLine.png')}
                    />          
                </View>
                <View style = {{marginRight : 10}}>
                    <Entypo name = "bell" size = {24} color = {'#555'} />
                </View>
            </View>
            {error ? <ErrorPage /> : loading ? <LoadingPage /> :
            <FlatList 
                keyExtractor={item => item.engagement_id.toString()} 
                style = {{paddingRight : 5}}
                contentContainerStyle = {{paddingRight : 5}}
                showsVerticalScrollIndicator={false}
                data = {notificationsData}            
                renderItem = {items}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            />}
        </View>
    )
}

export default ActivityNotification

const styles = StyleSheet.create({})
