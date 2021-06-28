import React , {useState,useEffect , useContext} from 'react'
import { View, Text , Image ,ImageBackground, TouchableOpacity , TextInput , Dimensions , Button} from 'react-native'

import { ModernHeader } from "@freakycoder/react-native-header-view";
import moment from 'moment';
import * as ImagePicker from 'expo-image-picker';
import { Checkbox } from 'react-native-paper';
import axios from 'axios'
import RadioGroup from 'react-native-custom-radio-group';
//import {radioGroupList} from '../assets/Constants'

import {Picker} from '@react-native-picker/picker';
import { useNavigation , useRoute } from '@react-navigation/native';
import { AuthContext, background, borderColor, theme, uploadImageOnS3 } from './exports';
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
    const [image, setImage] = useState("");
    const [coverImage,setCoverImage] = useState("")
    const [gender, setGender] = useState("")
    const [imageUrl,setImageUrl] = useState("")
    const [imageChange,setImageChange] = useState(false)
    const [age,setAge] = useState("")
    const [userName,setUserName] = React.useState("")
    const [phoneNumber,setPhoneNumber] = React.useState("")
    const userId = React.useContext(AuthContext)
    const [userInfo,setUserInfo] = React.useState([])

    const [userDob,setUserDob] = useState("")
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    
    const showDatePicker = () => {setDatePickerVisibility(true);};
    const hideDatePicker = () => {setDatePickerVisibility(false);};
    const handleConfirm = (date) => {
        setUserDob(moment(date).format("YYYY-MM-DD"))
        hideDatePicker();
    };


    useEffect(() => {
       const getUserInfo = () => {
        axios.get(URL + "/user/info", {params:{phone_number : userId }} , {timeout:5000})
        .then(res => res.data).then(function(responseData) {
            console.log(responseData)
            setUserInfo(responseData)
           
        })
        .catch(function(error) {
            //
        });
       }
       getUserInfo()
       
    }, [])



    const submit = () => {
      const body = {
        "user_id": userId,
        "username": userName,
        "gender": gender,
        "dob": userDob,
        "email": "",
        "phone_number": phoneNumber,
        "location": ""
      }

    axios({
      method: 'post',
      url: URL + '/user/info',
      data: body
    })
  .then(res => {
      setMessage('')
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
          console.log(result.uri)
          setImage(result.uri);
          setImageChange(true)
          console.log("I am reaching here")
          uploadImageOnS3("name",result.uri)
        }
      };   
      
      const pickCoverImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          console.log(result.uri)
          setCoverImage(result.uri);
          setImageChange(true)
        }
      }; 

     

      const selectGender = (value) => {
          console.log(value)
          setGender(value)
      }

    const pickCoverPhoto = () => {
      console.log("image picker")
      pickCoverImage()
    }
    const pickProfilePhoto = () => {
      console.log("image picker")
      pickImage()
    }

    
    return (
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
            <View style = {user.mainViewCoverContainer}>
              <TouchableOpacity onPress = {pickCoverPhoto}>
                <ImageBackground source = {coverImage ? {uri : coverImage} :require('../assets/defaultCover.png')} 
                        style = {user.mainViewCoverImage} >
                </ImageBackground>
              </TouchableOpacity>
            </View>
            <View style = {user.editUserDetailsDisplayContainer}>
              <TouchableOpacity style = {user.editUserDetailsDisplayImageButton} onPress = {pickProfilePhoto}>
                <ImageBackground source = {image ? {uri : image} : require('../assets/defaultProfile.png')} 
                        style = {user.editUserDetailsDisplayImage} >
                </ImageBackground>
              </TouchableOpacity>
            </View>
            
            <View style = {user.editUserDetailsInputContainer}>
              <View style = {home.userDetailsElementContainer}>
                <Text style = {home.userDetailsElementText}>UserName</Text>
                <TextInput 
                        placeholder = "arianagrande"
                        style = {home.userDetailsElementTextInput}
                        onChangeText = {(text)=>setUserName(text)}
                        value = {userName}
                />
              </View>
              <View style = {user.dateView}>
                <Text style = {{justifyContent : "center", flex : 1, fontSize : 16}}> 
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
                <Text style = {home.userDetailsGenderHeading}> Gender : {gender}</Text>
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
          </View>
    )
}

export default EditUserProfile
