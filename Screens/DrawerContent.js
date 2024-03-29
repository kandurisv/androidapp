import React, { useContext } from 'react';
import { View, StyleSheet, Linking, Image} from 'react-native';
import {useTheme,Avatar,Title,Caption,Paragraph,Drawer,Text,TouchableRipple,Switch} from 'react-native-paper';
import {DrawerContentScrollView,DrawerItem} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MaterialIcons, AntDesign , MaterialCommunityIcons} from "@expo/vector-icons";
import { AuthContext , background, borderColor, theme, URL } from './exports';
import axios from 'axios'




 
export default function DrawerContent(props) {
    const [userId,userDetails] = React.useContext(AuthContext)
    const [brandStories,setBrandStories] = React.useState([])
    const [firstLoad,setFirstLoad] = React.useState(false)
    const [error,setError] = React.useState(false)
    const [userName,setUserName] = React.useState("")
    const [userImage,setUserImage] = React.useState("")
    const [isEditProfileChanged,setEditProfileChanged] = React.useState("")

    React.useEffect(() => {
        const fetchData = async () => {
            axios.get(URL + "/drawer/brandstories" , {timeout : 5000})
            .then(res => res.data).then(function(responseData) {
            //    console.log("Brand Stroies", responseData)
                setBrandStories(responseData)
                setFirstLoad(true)
            })
            .catch(function(error) {
            //    console.log(error)
                setError(true)
            });
        }
        
        fetchData()


        const fetchUser = async () => {
            axios.get(URL + "/user/info" , {params : {user_id : userId.slice(1,13)}}, {timeout : 5000})
            .then(res => res.data).then(function(responseData) {
            //    console.log("user id ", userId)
            //    console.log("Name" , userName)
              
                setUserName(responseData[0].username)
                setUserImage(responseData[0].profile_image)
                
               
            //    console.log("responseData",responseData)
            })
            .catch(function(error) {
            //    console.log(error)
                setUserName("Error getting name")
            });

            axios.get(URL + "/visit/cache",{params:{user_id : userId.slice(1,13) }} , {timeout : 5000})
            .then(res => res.data).then(function(responseData) {
            //    console.log(responseData)
                setEditProfileChanged(responseData[0].indicator ? "?"+new Date() : "")
            })
            .catch(function(error) {
              
            });
        }
        
        fetchUser()

        
    }, [userId])

    return(
        <View style={{flex:1 , backgroundColor : 'white'}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15}}>
                            { userImage && userImage != "None" && userImage != "" ?
                             <Image source = {{uri : userImage + isEditProfileChanged}} style = {{width : 30, height : 30 , borderRadius : 30 , }}/> :
                            userName ? 
                            <Avatar.Image 
                                source={{
                                    uri: 'https://ui-avatars.com/api/?rounded=true&name='+ userName.replace(" ","+") + '&size=512&background=D7354A&color=fff'
                                }}
                                size={50}
                            /> :
                            <Avatar.Image 
                            source={{
                                uri: 'https://ui-avatars.com/api/?rounded=true&background=D7354A&color=fff&size=512'
                            }}
                            size={50}
                            />
                            }
                            <View style={{marginLeft:15, flexDirection:'column', alignItems : 'center', justifyContent : 'center'}}>
                                <Title style={styles.title}>{userName}</Title>
                            </View>
                        </View>


                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        
                        <DrawerItem 
                            icon={({color, size}) => (
                                <AntDesign 
                                name="user" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="My Profile"
                            onPress={() => {props.navigation.navigate('UserDetails')}}
                        />
                        <DrawerItem
                            icon={({color, size}) => (
                                <AntDesign 
                                name="profile" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="About Us"
                            onPress={() => Linking.openURL('https://www.getcandid.app/aboutus')}
                        />
                    </Drawer.Section>
                    {brandStories.length > 0 ? <Drawer.Section style={styles.bottomDrawerSection}>
                        <View style = {styles.headerView}>
                            <Text style = {styles.header}> Brand Stories </Text>
                        </View>
                        
                       {brandStories.map((item,index)=>{
                            return(
                                <DrawerItem 
                                key = {index}
                                icon={({color, size}) => (
                                    <Image source = {{uri:item.brand_image + "?" + new Date()}} style = {{width : 22, height : 22 , borderRadius : 5}} />
                                )}
                                label={item.title}
                                onPress={() => Linking.openURL(item.link)}
                            />
                        )
                        }) }
                    </Drawer.Section> : null}
                    <Drawer.Section style={styles.bottomDrawerSection}>
                        <View style = {styles.headerView}>
                            <Text style = {styles.header}>Follow Candid on Social Media </Text>
                        </View>
                        
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Image source = {require("../assets/instagram.png")} style = {{width : 22, height : 22}} />
                            )}
                            label="Instagram"
                            onPress={() => Linking.openURL('https://www.instagram.com/getcandidapp/')}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <AntDesign name = 'facebook-square' size = {22} color = {'#4267B2'} />
                            )}
                            label="Facebook"
                            onPress={() => Linking.openURL('https://www.facebook.com/getcandidapp/')}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <AntDesign name = 'twitter' size = {22} color = {'#1DA1F2'} />
                            )}
                            label="Twitter"
                            onPress={() => Linking.openURL('https://www.twitter.com/getcandidapp/')}
                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={({color, size}) => (
                        <MaterialCommunityIcons name = 'logout' size = {22} color = {'black'} />
                    )}
                    label="Sign Out"
                    onPress={() => {props.navigation.navigate('SignOut')}}
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
      paddingBottom : 10,
      backgroundColor : background
    },
    title: {
      fontSize: 16,
      marginTop: 0,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
    
    },
    bottomDrawerSection: {
        // marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    headerView: {
        backgroundColor: background,
        paddingBottom : 2,
    },
    header : {
        fontWeight : 'bold',
        marginLeft : 10,
        marginTop : 5,
        color : borderColor
    },
  });