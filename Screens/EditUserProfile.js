import React , {useState,useEffect , useContext} from 'react'
import { View, Text , Image ,ImageBackground, TouchableOpacity , TextInput , Dimensions , Button, ToastAndroid , ScrollView} from 'react-native'

import { ModernHeader } from "@freakycoder/react-native-header-view";
import moment from 'moment';
import * as ImagePicker from 'expo-image-picker';
import { Checkbox } from 'react-native-paper';
import axios from 'axios'
import RadioGroup from 'react-native-custom-radio-group';
//import {radioGroupList} from '../assets/Constants'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';
import { useNavigation , useRoute } from '@react-navigation/native';
import { AuthContext, background, borderColor, theme, uploadImageOnS3, URL , s3URL } from './exports';
import { editUserDetails, home, user ,header } from './styles';
import { AntDesign, EvilIcons } from '@expo/vector-icons';
import DateTimePickerModal from "react-native-modal-datetime-picker";


const EditUserProfile = () => {

  const navigation = useNavigation()
  const route = useRoute()

  const radioGroupList = [{
    label: 'Male',
    value: 'Male'
  }, {
    label: 'Female',
    value: 'Female'
  }, {
    label: 'Others',
    value: 'Others'
  }];

  const [selectedItem, setSelectedItem ] = useState(0);
  const [itemList , setItemList ] = useState(['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']);

  const [selectedLanguage, setSelectedLanguage] = useState();

  const onItemSelected = selectedItem => {
    setSelectedItem(selectedItem)
  };

  const onPress = () => {
    setSelectedItem(3)
  };

    const [date, setDate] = useState(new Date())
    const [image, setImage] = useState(route?.params?.userInfo.profile_image ? route.params.userInfo.profile_image : "");
    const [coverImage,setCoverImage] = useState(route?.params?.userInfo.cover_image ? route.params.userInfo.cover_image : "")
    const [gender, setGender] = useState(route?.params?.userInfo.gender ? route.params.userInfo.gender : "")
    const [instagram, setInstagram] = useState(route?.params?.userInfo.instagram_username ? route.params.userInfo.instagram_username : "")
    const [imageUrl,setImageUrl] = useState("")
    const [profileImageChange,setProfileImageChange] = useState(false)
    const [coverImageChange,setCoverImageChange] = useState(false)
    const [age,setAge] = useState("")
    const [userName,setUserName] = React.useState(route.params.userInfo.username)
    const [userId, userDetails, isLoggedIn] = React.useContext(AuthContext)
    const [user_id,setuser_id] = React.useState(route.params.userInfo.user_id)
    const [userInfo,setUserInfo] = React.useState([])

    const [userDob,setUserDob] = useState(route?.params?.userInfo.dob ? route.params.userInfo.dob :"")
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    
    const showDatePicker = () => {setDatePickerVisibility(true);};
    const hideDatePicker = () => {setDatePickerVisibility(false);};
    const handleConfirm = (date) => {
        setUserDob(moment(date).format("YYYY-MM-DD"))
        hideDatePicker();
    };


    useEffect(() => {
    //  console.log("USER DETAILS USE EFFECT" , route.params.userDetails)
       const getUserInfo = () => {
        axios.get(URL + "/user/info", {params:{user_id : user_id }} , {timeout:5000})
        .then(res => res.data).then(function(responseData) {
        //    console.log("USER INFO",responseData)
            setUserInfo(responseData)
           
        })
        .catch(function(error) {
            //
        });
       }
       getUserInfo()
       
    }, [])



    const submit = () => {
      var expoToken = AsyncStorage.getItem('expoToken')
      var deviceToken = AsyncStorage.getItem('deviceToken')
      const body = {
        "var" : "edit user",
        "user_id": user_id,
        "username": userName,
        "gender": gender,
        "dob": userDob,
        "email": "",
        "phone_number": userId,
        "location": "",
        "expo_token" : expoToken,
        "device_token" : deviceToken,
        "instagram_username" : instagram
        
      }

      console.log(body)

    axios({
      method: 'post',
      url: URL + '/user/info',
      data: body
    })
  .then(res => {
      ToastAndroid.show("Thanks for updating your details", ToastAndroid.SHORT)
      setTimeout(function(){
        navigation.navigate("UserDetails")
      }, 500);
    }).catch((e) => console.log(e))

    }


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
      
        if (!result.cancelled) {
       //   console.log(result.uri)
          setImage(result.uri);
          setProfileImageChange(true)
       //   console.log("I am reaching here")
          uploadImageOnS3(user_id + "/profile",result.uri)

          const body = {
            "var" : "edit user",
            "user_id": user_id,
            "username": userName,
            "gender": gender,
            "dob": userDob,
            "email": "",
            "phone_number": userId,
            "location": "",
            "profile_image" : s3URL + user_id + "/profile"
          }
    
          console.log(body)
    
        axios({
          method: 'post',
          url: URL + '/user/info',
          data: body
        })
      .then(res => {
          // Do Nothing
        }).catch((e) => console.log(e))
    

        }
      };   
      
      const pickCoverImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [16, 9],
          quality: 1,
        });
    
      //  console.log(result);
    
        if (!result.cancelled) {
      //    console.log(result.uri)
          setCoverImage(result.uri);
          setCoverImageChange(true)
          uploadImageOnS3(user_id + "/cover",result.uri)
          const body = {
            "var" : "edit user",
            "user_id": user_id,
            "username": userName,
            "gender": gender,
            "dob": userDob,
            "email": "",
            "phone_number": userId,
            "location": "",
            "cover_image" : s3URL + user_id + "/cover"
          }
    
          console.log(body)
    
        axios({
          method: 'post',
          url: URL + '/user/info',
          data: body
        })
        .then(res => {
          console.log(res)
        }).catch((e) => console.log(e))
    
        }
      }; 

     

      const selectGender = (value) => {
       //   console.log(value)
          setGender(value)
      }

    const pickCoverPhoto = () => {
    //  console.log("image picker")
      pickCoverImage()
    }
    const pickProfilePhoto = () => {
    //  console.log("image picker")
      pickImage()
    }

    
    return (
        <ScrollView style = {user.container} >
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
            <View style = {user.mainViewCoverContainer}>
              <TouchableOpacity onPress = {pickCoverPhoto}>
                <ImageBackground source = {coverImage && coverImage != "None" ? {uri : coverImage} :require('../assets/defaultCover.png')} 
                        style = {user.mainViewCoverImage} >
                </ImageBackground>
              </TouchableOpacity>
            </View>
            <View style = {user.editUserDetailsDisplayContainer}>
              <TouchableOpacity style = {user.editUserDetailsDisplayImageButton} onPress = {pickProfilePhoto}>
                <ImageBackground source = {image && image != "None"? {uri : image} : {uri : 'https://ui-avatars.com/api/?rounded=true&name='+ userName.replace(' ','+') + '&size=512'}} 
                        style = {user.editUserDetailsDisplayImage} >
                </ImageBackground>
              </TouchableOpacity>
            </View>
            
            <View style = {user.editUserDetailsInputContainer}>
              <View style = {[home.userDetailsElementContainer,{borderWidth : 0, }]}>
                <Text style = {[home.userDetailsElementText,{fontSize : 16, flex : 1, marginLeft : 0}]}>UserName:</Text>
                <TextInput 
                        placeholder = {userName ? userName : "arianagrande"}
                        style = {[home.userDetailsElementTextInput,{flex : 2, paddingBottom : 0 , marginBottom : 0}]}
                        onChangeText = {(text)=>setUserName(text)}
                        value = {userName}
                />
              </View>
              <View style = {[home.userDetailsElementContainer,{borderWidth : 0, }]}>
                <Text style = {[home.userDetailsElementText,{fontSize : 16, flex : 1, marginLeft : 0}]}>Instagram Username:</Text>
                <TextInput 
                        placeholder = {instagram ? instagram : "arianagrande"}
                        style = {[home.userDetailsElementTextInput,{flex : 2, paddingBottom : 0 , marginBottom : 0}]}
                        onChangeText = {(text)=>setInstagram(text)}
                        value = {instagram}
                />
              </View>
              <View style = {user.dateView}>
                <Text style = {{justifyContent : "center", flex : 1, fontSize : 16, marginLeft : 15}}> 
                    Date of birth : { userDob ? userDob.replace('"','').substring(0,10) : ""} 
                </Text>
                <TouchableOpacity style = {user.datepicker} onPress={showDatePicker}>
                    <EvilIcons name = "calendar" size = {24} color = {theme}/>
                </TouchableOpacity>  
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
              </View>
              <View>
                <Text style = {[home.userDetailsGenderHeading,{fontSize : 16, fontStyle : 'normal', marginLeft : 20}]}> Gender : {gender}</Text>
                <RadioGroup 
                    radioGroupList={radioGroupList} 
                    onChange = {(value) => setGender(value)}
                    initialValue = {gender}
                    containerStyle = {home.userDetailsGenderRadioContainerStyle}
                    buttonContainerStyle ={home.userDetailsGenderRadioButtonContainerStyle}
                    buttonTextStyle = {home.userDetailsGenderRadioButtonTextStyle}
                    buttonContainerActiveStyle = {home.userDetailsGenderRadioButtonContainerActiveStyle}
                    buttonContainerInactiveStyle = {home.userDetailsGenderRadioButtonContainerInactiveStyle}
                    buttonTextActiveStyle = {home.userDetailsGenderRadioButtonTextActiveStyle}
                    buttonTextInactiveStyle = {home.userDetailsGenderRadioButtonTextInactiveStyle}/>
              </View> 
              <View style = {home.userDetailsSubmitContainer}>
                <TouchableOpacity 
                        onPress = {submit}
                        style = {home.userDetailsSubmitButton}>
                  <Text style = {home.userDetailsSubmitText}>Submit</Text>
                </TouchableOpacity>
              </View>                  
            </View>
          </ScrollView>
    )
}

export default EditUserProfile
