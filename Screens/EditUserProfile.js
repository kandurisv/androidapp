import React , {useState,useEffect , useContext} from 'react'
import { View, Text , Image ,ImageBackground, TouchableOpacity , TextInput, StyleSheet , Dimensions , Button} from 'react-native'


import moment from 'moment';
import * as ImagePicker from 'expo-image-picker';
import { Checkbox } from 'react-native-paper';

import RadioGroup from 'react-native-custom-radio-group';
//import {radioGroupList} from '../assets/Constants'

import {Picker} from '@react-native-picker/picker';
import { useNavigation , useRoute } from '@react-navigation/native';
import { background, theme, uploadImageOnS3 } from './exports';



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

  onItemSelected = selectedItem => {
    setSelectedItem(selectedItem)
  };

  onPress = () => {
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
  
    
    useEffect(() => {
       
       
    }, [])



    const submit = () => {
      const body = {
        "user_id": 5,
        "username": userName,
        "gender": gender,
        "dob": "1998-01-01",
        "age" : age,
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
        <View>
            <View>
              <TouchableOpacity onPress = {pickCoverPhoto}>
                <ImageBackground source = {coverImage ? {uri : coverImage} :require('../assets/defaultCover.png')} 
                        style = {styles.imageCover} >
                </ImageBackground>
              </TouchableOpacity>
            </View>
            <View style = {{flexDirection : 'row'}}>
              <TouchableOpacity style = {styles.imageProfileView} onPress = {pickProfilePhoto}>
                <ImageBackground source = {image ? {uri : image} : require('../assets/defaultProfile.png')} 
                        style = {styles.imageProfile} >
                </ImageBackground>
              </TouchableOpacity>
            </View>
            
            <View style = {styles.userDetailsMasterContainer}>
              <View style = {styles.userDetailsContainer}>
                <Text style = {styles.userDetailsText}>UserName</Text>
                <TextInput 
                        placeholder = "arianagrande"
                        style = {styles.userDetailsInput}
                        onChangeText = {(text)=>setUserName(text)}
                        value = {userName}
                />
              </View>
              <View style = {styles.userDetailsContainer}>
                <Text style = {styles.userDetailsText}>Age</Text>
                <TextInput 
                        style = {styles.userDetailsInput} 
                        placeholder = "27"
                        onChangeText = {(text)=>setAge(text)}
                        value = {age}
                />
              </View>
              <View>
                <Text style = {{fontSize : 14, fontStyle : "italic" , color : 'black' , margin : 10}}> Gender : {gender}</Text>
                <RadioGroup 
                    radioGroupList={radioGroupList} 
                    onChange = {(value) => setGender(value)}
                    initialValue = {gender}
                    containerStyle = {styles.radioContainerStyle}
                    buttonContainerStyle ={styles.radioButtonContainerStyle}
                    buttonTextStyle = {styles.radioButtonTextStyle}
                    buttonContainerActiveStyle = {styles.radioButtonContainerActiveStyle}
                    buttonContainerInactiveStyle = {styles.radioButtonContainerInactiveStyle}
                    buttonTextActiveStyle = {styles.radioButtonTextActiveStyle}
                    buttonTextInactiveStyle = {styles.radioButtonTextInactiveStyle}/>
              </View> 
              <View style = {{alignItems : 'flex-end'}}>
                <TouchableOpacity 
                        onPress = {submit}
                        style = {styles.userDetailsSubmitButton}>
                  <Text style = {styles.userDetailsSubmitText}>Submit</Text>
                </TouchableOpacity>
              </View>                  
            </View>
          </View>
    )
}

const styles = StyleSheet.create({
    nonEditableFields : {
        borderColor : 'transparent',
        borderBottomColor : 'black',
        width : 0.95 * Dimensions.get('window').width,
        alignSelf : 'center',
        borderWidth : 1,
        marginBottom : 10,
    },
    editableFields : {

    },
    container: {
        flex: 1, 
        justifyContent: 'center', 
        backgroundColor: background, 
        marginTop : 20
      },
      textInput: { 
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1 },
      formComponent : {
        
        
      },
      formText : {
        color : "#E64852",
        paddingLeft : 10,
        fontWeight : 'bold',
        fontStyle : 'italic',
        flex : 1
      },
      formInput : {
        borderColor : 'transparent',
        borderBottomColor : 'black',
        width : 0.95 * Dimensions.get('window').width,
        alignSelf : 'center',
        borderWidth : 1,
        marginBottom : 10,
        
      },
      coverImageView : {
        elevation : 1,
        width : 0.2 * Dimensions.get("window").width,
        alignSelf : 'center',
        marginBottom : 5
      },
      coverImage : {
        width : Dimensions.get("window").width * 0.2,
        height : Dimensions.get("window").width * 0.2,
        borderColor : "#E64852",
        borderRadius : 50,
        justifyContent : 'center',
        alignSelf : 'center',
        borderColor : 'black',
        borderWidth : 2
      },
      imagePickerButton : {
        backgroundColor : "transparent",
        
        alignSelf : 'center',
        width : 150,
        justifyContent : 'center',
        margin : 10 
      },
      coverPickerButton : {
        backgroundColor : "transparent",
        alignSelf : 'center',
        width : '100%',
        height : 150,
        justifyContent : 'center',
        margin : 10 ,

      },
      coverPickerText : {
        color : '#E64852',
        alignSelf : 'center',
        fontWeight : 'bold'
      },
      imagePickerText : {
        alignSelf : 'center',
        color : '#E64852',
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        textShadowRadius : 2,
  
      },
    radioContainerStyle : {
        justifyContent : 'center' , 
        alignItems : 'center' , 
        width : Dimensions.get("window").width,
        alignItems : 'center'
},
    radioButtonContainerStyle: {
        borderWidth : 1, 
        borderColor : 'black' ,
        padding: 5 , 
        borderRadius : 10 , 
        height : 30,
        margin : 10,
        marginTop : 0 ,
        width : 100
        
        
    },
    radioButtonTextStyle: {fontSize : 12},
    radioButtonContainerActiveStyle: {backgroundColor : "#E64852"},
    radioButtonContainerInactiveStyle: {},
    radioButtonTextActiveStyle: {},
    radioButtonTextInactiveStyle: {},
    datepicker : {
        width : 100,
        height : 30,
        backgroundColor : "white" , 
        borderColor : "#E64852",
        borderWidth : 3,
        borderRadius : 50,
        justifyContent : 'center',
        alignSelf : 'center',
        alignItems: 'center',
        marginLeft : 20
    },
    dateView : {flexDirection : 'row', alignItems : 'center', margin : 5, marginLeft : 10},
    changePasswordButton : {
        backgroundColor : '#346666', width : 175, padding : 10,
        borderRadius : 25 , margin : 50,  marginBottom : 30 , marginRight : 20, 
        alignSelf : 'flex-end' , alignItems : 'center',
        justifyContent : 'center' ,
    },
    changePasswordText : {color : 'white' , alignSelf : 'center' },
    saveButton : { width : 100,
        height : 30,
        backgroundColor : "#E64852" , 
        marginTop : 20,
        borderWidth : 3,
        borderRadius : 50,
        justifyContent : 'center',
        alignSelf : 'center',
        alignItems: 'center'},
    saveButtonText : { color : 'white'},
    imageCover : {
      width : '100%',
      height : 150,

    },
    imageProfile : {
      width : 100,
      height : 100,
      borderRadius : 100,
      
    },
    imageProfileView : {
      width : 100,
      height : 100,
      borderRadius : 50,
      
      margin : 20,
      overflow: 'hidden'

    },
    userDetailsText : {
      margin : 10,
      flex : 1, 
      textAlign : 'center',
  },
  userDetailsInput : {   
      flex : 1, 
      borderRadius : 5,
      borderBottomWidth : 1,
      borderColor : '#AAA',
      textAlign : 'center',
      width : Dimensions.get('screen').width*0.5
  },
  userDetailsContainer  : {
      flexDirection : 'row',
      borderRadius : 5,
      borderWidth : 1,
      borderColor : 'black',
      padding : 5 , 
      margin : 5
  },
  userDetailsMasterContainer  : {},
  userDetailsSubmitButton : {
      backgroundColor : theme,
      width : Dimensions.get('screen').width*0.5,
      marginTop : 20,
      alignItems : 'center',
      padding : 10,
      borderRadius : 10,
      marginRight : 10,
  },
  userDetailsSubmitText : {
      color : background,
      textAlign : 'center'
  },
  radioContainerStyle : {
      justifyContent : 'center' , 
      alignItems : 'center' , 
      width : Dimensions.get("window").width,
      alignItems : 'center'
  },
  radioButtonContainerStyle: {
      borderWidth : 1, 
      borderColor : '#AAA' ,
      padding: 5 , 
      borderRadius : 10 ,     
      height : 30,
      margin : 10,
      marginTop : 0 ,
      width : 100
      
      
  },
  radioButtonTextStyle: {fontSize : 12},
  radioButtonContainerActiveStyle: {backgroundColor : theme},
  radioButtonContainerInactiveStyle: {},
  radioButtonTextActiveStyle: {},
  radioButtonTextInactiveStyle: {},
  

})

export default EditUserProfile
