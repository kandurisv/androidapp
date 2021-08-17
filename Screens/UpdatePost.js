import React, { useState } from "react";
import {View , FlatList, SafeAreaView,Image, Button,StatusBar, Text, TouchableOpacity, TextInput, Dimensions, ScrollView, KeyboardAvoidingView, ToastAndroid, RecyclerViewBackedScrollView } from "react-native";
import { FlatGrid } from 'react-native-super-grid';
import {AuthContext, background, borderColor, s3URL, theme, uploadImageOnS3, URL} from './exports'
import { useNavigation , useRoute , useIsFocused} from '@react-navigation/native';
import * as ImageManipulator from 'expo-image-manipulator';
import { ImageBrowser } from 'expo-image-picker-multiple';
import { AntDesign, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import axios from 'axios'

import { ModernHeader } from "@freakycoder/react-native-header-view";
import Modal from 'react-native-modal';
import 'react-native-get-random-values'


import * as Amplitude from 'expo-analytics-amplitude';
import { addPost, header, header1 } from "./styles";
Amplitude.initializeAsync("af380775c59ead50c4c02536befef5e5");

const {width,height} = Dimensions.get("screen")

const ImageBrowserScreen = ({ onComplete  , closeScreen }) => {

  const [header, setHeader] = React.useState(
    <View style = {addPost.imageBrowserDynamicHeaderContainer}>
        <TouchableOpacity 
          style = {addPost.imageBrowserDynamicHeaderDoneButton}
          onPress={()=>closeScreen(true)}>
          <Text style = {addPost.imageBrowserDynamicHeaderDoneText}>Done/Back</Text>
        </TouchableOpacity>
      </View>
  );

  const _processImageAsync = async (uri) => {
    const file = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 1000 } }],
      { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
    );
    return file;
  };

  const imagesCallback = (callback) => {
    callback
      .then(async (photos) => {
        const cPhotos = [];
        for (let photo of photos) {
        //  console.log(photo);
          const pPhoto = await _processImageAsync(photo.uri);
          cPhotos.push({
            uri: pPhoto.uri,
            name: photo.filename,
            type: 'image/jpg',
          });
        }
        onComplete(cPhotos);
      })
      .catch((e) => console.log(e));
  };

  const updateHandler = (count, onSubmit) => {
    setHeader(
      <View style = {addPost.imageBrowserDynamicHeaderContainer}>
        <TouchableOpacity 
          style = {addPost.imageBrowserDynamicHeaderDoneButton}
          onPress={onSubmit}>
          <Text style = {addPost.imageBrowserDynamicHeaderDoneText}>Done/Back</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderSelectedComponent = (number) => (
    <View style={addPost.imageBrowserBadgeCountView}>
      <Text style={addPost.imageBrowserBadgeCountText}>{number}</Text>
    </View>
  );

  const emptyStayComponent = (
    <Text style={addPost.imageBrowserEmptyComponentText}>No Photos Selected</Text>
  );

  return (
    <View style = {addPost.imageBrowserMasterContainer}>
    {header}
    <ScrollView style={addPost.imageBrowserContainer}>
      <ImageBrowser
        max={5}
        loadCount = {250}
        onChange={updateHandler}
        callback={imagesCallback}
        renderSelectedComponent={renderSelectedComponent}
        emptyStayComponent={emptyStayComponent}
      />
    </ScrollView>
    </View>
  );
};



const UpdatePost = () => {

  const navigation = useNavigation()
  const route = useRoute()
  const isFocused = useIsFocused();
  const [userId] = React.useContext(AuthContext)
  
  const [imageURLArray,setImageURLArray] = React.useState([])
  const [imageCount,setImageCount] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false);
  const [photos, setPhotos] = React.useState([]);
  const [categoryAnsExists,setCategoryAnsExists] = React.useState(false)
  const [existingReviewExists,setExistingReviewExists] = React.useState(false)
  const [loading,setLoading] = React.useState(false)
  const [error,setError] = React.useState(false)
  const [existingReview,setExistingReview] = React.useState([])
  const [existingCategoryInfo,setExistingCategoryInfo] = React.useState([])
  const [existingUser,setExistingUser] = React.useState(false)
  const [daysUsed,setDaysUsed] = React.useState(10)
  
  const [productId,setProductId] = React.useState('')
  const [categoryId,setCategoryId] = React.useState('')
  const [userName,setUserName] = React.useState("")
  const [productSelected,setProductSelected] = React.useState(false)
  const [editorInfo,setEditorInfo] = React.useState([])
  const [categoryQuestions,setCategoryQuestions] = React.useState([])
  const [categoryAnswers,setCategoryAnswers] = React.useState([])
  const [searchLoading,setSearchLoading] = React.useState(false)
  const [searchArray, setSearchArray] = React.useState([])
  const [inputFocus,setInputFocus] = React.useState(false)
  const [searchText,setSearchText] = React.useState("")
  const [productName,setProductName] = React.useState("")
  const [reviewText,setReviewText] = React.useState("")
  const [contextOptions,setContextOptions] = React.useState([])
  const [contextAnswersValid,setContextAnswersValid] = React.useState(false)
  const [reviewTextValid,setReviewTextValid] = React.useState(false)
  const [productSelectedOther,setProductSelectedOther] = React.useState(false)

  const [brandId,setBrandId] = React.useState("")
  const [brand,setBrand] = React.useState("")
  const [categoryName,setCategoryName] = React.useState("")
  const [claim,setClaim] = React.useState("")

  const [modalVisible,setModalVisible] = React.useState(false)
  const [modalContent,setModalContent] = React.useState("")

  
  React.useEffect(()=>{

    setIsOpen(false)
   // console.log(userId.slice(1,12))
    Amplitude.logEventWithPropertiesAsync('UPDATE_POST_VISIT',{"userId" : userId.slice(1,13) , "productId" : productId })
    console.log("UPDATE POST ITEM " , route.params.item)  
    setBrand(route.params.item.brand)
    setBrandId(route.params.item.brand_id)
    setCategoryAnswers(route.params.item.category_ans)
    setCategoryAnsExists(true)
    setCategoryId(route.params.item.category_id)
    setCategoryName(route.params.item.category_name)
    setCategoryQuestions(route.params.item.category_ques)
    setClaim(route.params.item.claim)
    setUserName(route.params.item.username)
    setProductId(route.params.item.product_id)
    setProductName(route.params.item.product_name)
    

},[isFocused])
  

  const refresh = () => {
    setImageURLArray([])
    setImageCount(false)
    setIsOpen(false);
    setPhotos([]);
    setCategoryAnsExists(false)
    setExistingReviewExists(false)
    setLoading(false)
    setError(false)
    setExistingReview([])
    setExistingCategoryInfo([])
    setExistingUser(false)
    setDaysUsed(1)
    setProductId('')
    setCategoryId('')
    setUserName("")
    setProductSelected(false)
    setEditorInfo([])
    setCategoryQuestions([])
    setCategoryAnswers([])
    setSearchLoading(false)
    setSearchArray([])
    setInputFocus(false)
    setSearchText("")
    setProductName("")
    setReviewText("")
    setClaim("")
    setBrand("")
    setBrandId("")
    
  }


  const onSubmitReview = () => {
    if(!reviewTextValid) {
      ToastAndroid.show("Please add your review !! " , ToastAndroid.SHORT)
    }
    else if ( !contextAnswersValid) {
      ToastAndroid.show("Please answer the contextual questions !! " , ToastAndroid.SHORT)
    }
    else {
    Amplitude.logEventWithPropertiesAsync('UPDATEPOST_SUBMIT',{"userId" : userId , "productId" : productId })
  //  console.log("Review Submit")
    const array = []
    
    photos.slice(0,5).map((item,index) => {
      const imagename = s3URL + userName + userId.slice(1,13) + "/" + productId + "/" + daysUsed + "/" + index
    //  console.log("Item",item)
      uploadImageOnS3(userName + userId.slice(1,13) + "/" + productId + "/" + daysUsed + "/" + index, item.uri )
      array.push(s3URL + userName + userId.slice(1,13) + "/" + productId + "/" + daysUsed + "/" + index)
      setImageURLArray([...imageURLArray,imagename])
    //  console.log("Array Push", array)
    //  console.log("Array State", imageURLArray)
    })
    
    const body = {
        "review_sum_id": "u"+userId+"p"+productId,
        "user_id": userId,
        "product_id": productId,
        "category_id": categoryId,
        "brand_id": brandId,
        "username": userName,
        "product_name": productName,
        "brand": brand,
        "category_name": categoryName,
        "category_ques": categoryQuestions,
        "category_ans": categoryAnswers,
        "claim": claim,
        "content": reviewText,
        "day_product_used": daysUsed,
        "image": array
    }

  //  console.log(body)

    axios({
        method: 'post',
        url: URL + '/post/feed',
        data: body
      })
    .then(res => {
     //   console.log("reached to post feed")
        ToastAndroid.show("Thanks for adding review", ToastAndroid.LONG)
        refresh()
        setTimeout(function(){
          navigation.navigate("UserDetails")
        }, 500);
       
  }).catch((e) => console.log(e))
  } 
}


  const onComplete = (photos) => {
    setPhotos(photos); // this will replace all previously submitted photos with the new ones
    setImageCount(true)
    setIsOpen(false);
  };

  const ReviewSummary = () => {

    var context = ""
    if(existingReview.length) {
      categoryQuestions.map((item,index)=>{
      context = context + "\n" + item + " : " + route.params.item.category_ans[index]  
      })
    }
      
      const renderItem = ({item,index}) => {
        var pieces = item.split("/")
        const calendarText = pieces[pieces.length-2]

        return(
        <View style={addPost.mainViewReviewExistsImagesContainer}>
          <Image source = {{uri : item}} style = {addPost.mainViewReviewExistsImagesItem} />
          <View style = {addPost.mainViewReviewExistsImagesCalendarView}>
            <Text style={addPost.mainViewReviewExistsImagesCalendarText}>{calendarText}</Text>
          </View>
        </View>
        )
      }

      const renderModalButton = ({item,index}) => {
        
        const onModalButtonClick = () => {
          setModalVisible(!modalVisible)
          setModalContent(existingReview[0].content[index])
        }
        return(
        <View style = {addPost.mainViewReviewExistsDayReviewItemContainer}>
          <TouchableOpacity style = {addPost.mainViewReviewExistsDayReviewItemButton} onPress = {onModalButtonClick}>
            <Text style = {addPost.mainViewReviewExistsDayReviewItemText}>Day:{item} Review </Text>
          </TouchableOpacity>
        </View>)
      }

      return (  
    <View style = {addPost.mainViewReviewExistsContainer}>
      <Text style = {addPost.mainViewReviewExistsHeader}>Existing Review</Text>

      {route.params.item.day_product_used_content.length ?
        <FlatList
        data={route.params.item.day_product_used_content}
        renderItem={renderModalButton}
        keyExtractor={item => item}
        horizontal = {true}
        contentContainerStyle = {addPost.carouselStyle}
        showsHorizontalScrollIndicator = {false}
        />
      : null}
      <View style = {addPost.mainViewReviewExistsContextContainer}>
        <Text style = {addPost.mainViewReviewExistsContextHeader}>Profile Information:</Text>
        <Text style = {addPost.mainViewReviewExistsContextText}>{context}</Text>
      </View>
      {route.params.item.image_list.length ?
        <FlatList
        data={route.params.item.image_list}
        renderItem={renderItem}
        keyExtractor={item => item}
        horizontal = {true}
        contentContainerStyle = {addPost.carouselStyle}
        snapToInterval = {width/2-10}
        showsHorizontalScrollIndicator = {false}
        />
      : null}
    </View>
)
    
  }

  const CategoryAnsSummary = () => {
    var context = ""
    categoryQuestions.map((item,index)=>{
      context = context + "\n" + item + " : " + route.params.item.category_ans[index]  
    })
   
    return(
      <View style = {addPost.mainViewContextExistsItemContainer}>
        <Text style = {addPost.mainViewContextExistsItemHeader}>Contextual Information</Text>
        <Text style = {addPost.mainViewContextExistsItemText}>{context}</Text>
      </View>
    )
  }


return(
<View style = {addPost.container}>
    <View style = {header.headerView}>
        <ModernHeader title="Update Review" titleStyle = {header.headerText}
          backgroundColor= {background} leftIconColor = {borderColor}
          leftDisable = {isOpen ? true : false}
          leftIconOnPress={() => navigation.goBack()}
          rightDisable
          />
    </View>
    <Modal 
    isVisible={modalVisible}
    deviceWidth={Dimensions.get('screen').width}
    deviceHeight={Dimensions.get('screen').height}
    onBackdropPress={() => setModalVisible(false)}
    onSwipeComplete={() => setModalVisible(false)}
    swipeDirection="left"
    style = {addPost.modalContainer}
    >
        <View style={addPost.modalView}>
          <Text style = {addPost.modalHeading}>Review:</Text>
          <Text style = {addPost.modalText}>{modalContent}</Text>
        </View>
    </Modal>
    <ScrollView contentContainerStyle = {addPost.scrollableMasterContentContainer} style = {addPost.scrollableMasterContainer}>
        <View style={addPost.scrollableContainer}>
			{isOpen ? (
			<ImageBrowserScreen onComplete={onComplete} closeScreen = {(value)=>setIsOpen(!value)} />) : (
			<View style={addPost.scrollableContainer}>
                <Text style = {addPost.productSearchBarInactiveText}>{productName}</Text>
			    <ReviewSummary /> 
			    <View style = {addPost.mainViewAddImagesContainer}>
					<TouchableOpacity style = {addPost.mainViewAddImagesButton} onPress={() => setIsOpen(true)}>
						<MaterialCommunityIcons name = "image-plus" size = {40} color = "#666"/>
						<Text style = {addPost.mainViewAddImagesText}>Add New Photos</Text>
                        <Text style = {addPost.mainViewAddImagesText}>(Max 2)</Text>
					</TouchableOpacity>
					{!imageCount ? 
					<View style = {addPost.mainViewShowImagesEmptyContainer}>
						<Text></Text>
					</View> : 
					<FlatGrid itemDimension={50} data={photos} renderItem={({item}, i) => ((
						<Image style={addPost.mainViewShowImagesItem} source={{ uri: item.uri }} key={i}/>
                        ))}/>}
				</View>
				<CategoryAnsSummary /> 
				<View style = {addPost.mainViewDaysInputContainer}>
					<View style ={addPost.mainViewDaysQuestionView} >
						<Text style = {addPost.mainViewDaysQuestionText}> #Days Used </Text>
					</View>
                    <TextInput 
                        placeholder = "01"
                        keyboardType = 'number-pad'
                        style = {addPost.mainViewDaysTextInput}
                        onChangeText = {(text)=>{existingUser ? setDaysUsed(100) : setDaysUsed(text)}}
                        value = {existingUser ? "100+" : daysUsed}
                    />  
                    <TouchableOpacity 
                        onPress = {()=>{
                            setExistingUser(!existingUser)
                            setDaysUsed(100)
                        }}
                        style = {{backgroundColor : existingUser ? theme : background , flex : 1, justifyContent : 'center', marginLeft : 10, marginRight : 10, borderRadius : 20, borderWidth : 1, borderColor : !existingUser ? theme : background }}>
                        <Text style = {{color : !existingUser ? theme : background , textAlign: 'center'}}>100+</Text>
                    </TouchableOpacity>
				</View>
				<View style = {addPost.mainViewReviewWritingContainer}>
					<TextInput placeholder = "Add your new review ( Atleast 20 words)"
						style = {addPost.mainViewReviewWritingInput}  multiline autocomplete scrollEnabled
                        onChangeText = {(text)=> {
                            setReviewText(text)
                            if(reviewText) {
                                setReviewTextValid(true)
                            }
                        }}
                        value = {reviewText}
					/>
				</View>
				<TouchableOpacity style = {addPost.mainViewSubmitReviewButton} onPress = {onSubmitReview}>
					<Text style = {addPost.mainViewSubmitReviewText}>Submit</Text>
				</TouchableOpacity>
			</View> 
            )}
		</View>
  </ScrollView>
</View>

)}


export default UpdatePost;