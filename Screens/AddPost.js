import React, { useState } from "react";
import {View , FlatList, SafeAreaView,Image, Button,StatusBar, Text, TouchableOpacity, TextInput, Dimensions, ScrollView, KeyboardAvoidingView, ToastAndroid, RecyclerViewBackedScrollView } from "react-native";
import { FlatGrid } from 'react-native-super-grid';
import {AuthContext, background, borderColor, s3URL, theme, uploadImageOnS3, URL} from './exports'
import { useNavigation , useRoute , useIsFocused} from '@react-navigation/native';
import * as ImageManipulator from 'expo-image-manipulator';
import { ImageBrowser } from 'expo-image-picker-multiple';
import { AntDesign, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import axios from 'axios'
import Fontisto from "react-native-vector-icons/Fontisto";
import { ModernHeader } from "@freakycoder/react-native-header-view";
import Modal from 'react-native-modal';
import 'react-native-get-random-values'
import { nanoid , customAlphabet  } from 'nanoid'

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
        loadCount = {1000}
        onChange={updateHandler}
        callback={imagesCallback}
        renderSelectedComponent={renderSelectedComponent}
        emptyStayComponent={emptyStayComponent}
      />
    </ScrollView>
    </View>
  );
};


   
const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[addPost.mainViewContextQuestionsItemOptionsItemButton, backgroundColor]}>
    <Text style={[addPost.mainViewContextQuestionsItemOptionsItemText, textColor]}>{item}</Text>
  </TouchableOpacity>
);

const OptionsQuestions = ({questions, selectedAnswer}) => {
  const [selectedId, setSelectedId] = useState(null);

  const setAnswer = (item) => {
    setSelectedId(item)
    selectedAnswer(questions.key,item)
  }

  const renderItem = ({ item }, index) => {
    const backgroundColor = item === selectedId ? theme : background;
    const color = item === selectedId ? background : borderColor;

    return (
      <Item
        item={item}
        onPress={() => setAnswer(item)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
        />
        );
    };

  return (
    <SafeAreaView style={addPost.mainViewContextQuestionsItemContainer}>
    <View style ={addPost.mainViewContextQuestionsItemQuestionsView} >
         <Text style = {addPost.mainViewContextQuestionsItemQuestionsText}> {questions.key} </Text>
    </View>
    <View style ={addPost.mainViewContextQuestionsItemOptionsContainer} >
      <FlatList
        contentContainerStyle={addPost.mainViewContextQuestionsItemOptionsContentContainer}
        data={questions.option}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        extraData={selectedId}
      />
      </View>
    </SafeAreaView>
  );
};


const AddPost = () => {

  const navigation = useNavigation()
  const route = useRoute()
  const isFocused = useIsFocused();
  const [userId,userDetails, isLoggedIn] = React.useContext(AuthContext)
  

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
  const [daysUsed,setDaysUsed] = React.useState(1)
  
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
    Amplitude.logEventWithPropertiesAsync('ADD_POST_VISIT',{"userId" : userId.slice(1,13) , "productId" : productId })
    const defaultSearch = () => {
      setSearchLoading(true)
      
      axios.get(URL + "/search/default", {timeout : 2000})
        .then(res => res.data).then(function(responseData) {
            setSearchLoading(false)
          //  console.log("default" , responseData)
            setSearchArray(responseData)
          //  console.log(responseData)
      })
      .catch(function(error) {
            setSearchLoading(false)
      });
   
    }
    defaultSearch()
  

    if(productSelected) {
      const fetchPreviousReview = () => {
        axios.get(URL + "/post/review", {params:{product_id : productId, user_id : userId.slice(1,13) }} , {timeout : 5})
        .then(res => res.data).then(function(responseData) {
          //  console.log("Existing Review",responseData)
            if(responseData.length) {
              setExistingReviewExists(true)
              setExistingReview(responseData)
              setContextAnswersValid(true)
              setCategoryQuestions(responseData[0].category_ques)
              setCategoryAnswers(responseData[0].category_ans)
            } else {
              setContextAnswersValid(true)
            }
            setLoading(false) 
            
        })
        .catch(function(error) {
            // console.log("Reached to error")
            // console.log(error)
            setLoading(false)
            setError(true)
        });
    }
      fetchPreviousReview()

      const fetchPreviousUserCategory = () => {
        axios.get(URL + "/post/reviewcontext", {params:{category_id : categoryId, user_id : userId.slice(1,13) }} , {timeout : 5})
        .then(res => res.data).then(function(responseData) {
          //  console.log("PreviousUserCategory", responseData)
            if(responseData.length) {
              setCategoryAnsExists(true)
              setExistingCategoryInfo(responseData)
              setCategoryQuestions(responseData[0].category_ques_list)
              setCategoryAnswers(responseData[0].category_ans_list)
              setContextAnswersValid(true)
            }
            else {
              setContextAnswersValid(true)
            }
            setLoading(false) 
        })
        .catch(function(error) {
            // console.log("Reached to error")
            // console.log(error)
            setLoading(false)
            setError(true)
        });
    }
    

    const fetchEditorInfo = () => {
      axios.get(URL + "/post/editorinfo", {params:{product_id : productId }} , {timeout : 5})
      .then(res => res.data).then(function(responseData) {
          setEditorInfo(responseData)
          setCategoryId(responseData[0].category_id)
          setBrandId(responseData[0].brand_id)
          setCategoryName(responseData[0].category_name)
          setBrand(responseData[0].brand)
          setClaim(responseData[0].claim)
          setContextOptions(responseData[0].category_ques)
          fetchPreviousUserCategory()
          setLoading(false) 
      })
      .catch(function(error) {
        //  console.log("Reached to error")
          setLoading(false)
          setError(true)
      });
  }
  fetchEditorInfo()
  
  }
  else {

    }
    
  
  },[productSelected,productId,isFocused, categoryId , categoryAnsExists ])
  
  const onChangeDay = (text) => {
    let newText = '';
    let numbers = '0123456789';

    for (var i=0; i < text.length; i++) {
        if(numbers.indexOf(text[i]) > -1 ) {
            newText = newText + text[i];
        }
        else {
            ToastAndroid.show("Please enter numbers only",ToastAndroid.SHORT);
        }
    }
    //setDayValue(newText)
  }

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
    Amplitude.logEventWithPropertiesAsync('POST_SUBMIT',{"userId" : userId , "productId" : productId })
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
          navigation.navigate("Home")
        }, 500);
       
  }).catch((e) => console.log(e))
  } 
}


  const findMinMax = (arr) => {
    let min = arr[0], max = arr[0];
  
    for (let i = 1, len=arr.length; i < len; i++) {
      let v = arr[i];
      min = (v < min) ? v : min;
      max = (v > max) ? v : max;
    }
    return [min, max];
  }

  const onComplete = (photos) => {
    setPhotos(photos); // this will replace all previously submitted photos with the new ones
    setImageCount(true)
    setIsOpen(false);
  };

  const ReviewSummary = () => {

    var context = ""
    if(existingReview.length) {
      existingReview[0].category_ques.map((item,index)=>{
      context = context + "\n" + item + " : " + existingReview[0].category_ans[index]  
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

      {existingReview.length && existingReview[0].day_product_used_content.length ?
        <FlatList
        data={existingReview[0].day_product_used_content}
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
      {existingReview.length && existingReview[0].image_list.length ?
        <FlatList
        data={existingReview[0].image_list}
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
    if(existingCategoryInfo.length) {
    existingCategoryInfo[0].category_ques_list.map((item,index)=>{
      context = context + "\n" + item + " : " + existingCategoryInfo[0].category_ans_list[index]  
    })
    }
    return(
      <View style = {addPost.mainViewContextExistsItemContainer}>
        <Text style = {addPost.mainViewContextExistsItemHeader}>Contextual Information</Text>
        <Text style = {addPost.mainViewContextExistsItemText}>{context}</Text>
      </View>
    )
  }

  // const onProductSelected = () => {
  //   setProductSelected(true)
  //   const fetchProductDetails = () => {
  //     axios.get(URL + "/post/reviewcontext", {params:{category_id : categoryId, user_id : userId }} , {timeout : 5})
  //     .then(res => res.data).then(function(responseData) {
  //        // console.log(responseData)
  //         setCategoryAnsExists(true)
  //         setExistingCategoryInfo(responseData)
  //         setLoading(false) 
  //     })
  //     .catch(function(error) {
  //         // console.log("Reached to error")
  //         // console.log(error)
  //         setLoading(false)
  //         setError(true)
  //     });
  // }
  //   fetchProductDetails()
  // }



  const search = (text) => {
    setSearchText(text)
    setSearchLoading(true)
    
    axios.get(URL + "/search/product", {params:{str2Match : text }} , {timeout : 3000})
      .then(res => res.data).then(function(responseData) {
          console.log("SearchArray",responseData)
          setSearchLoading(false)
          setSearchArray(responseData)
      //    console.log("Reached Here response")
    })
    .catch(function(error) {
          setSearchLoading(false)
      //    console.log("Reached Here error")
    });
 
  }

  const onClickSearchItem = (item) => {
    const nanoid = customAlphabet('123456789', 10)
    const nanoid1 = customAlphabet('123456789', 4)
    if(item.product_name != "Other") {
      setInputFocus(false)
      setProductSelected(true)
      setSearchText(item.product_name)
      setProductName(item.product_name)
      setProductId(item.product_id)
    } else {
      setInputFocus(false)
      setProductSelected(true)
      setSearchText(searchText)
      setProductName(searchText)
      setProductSelectedOther(true)
      setProductId(nanoid())
      setCategoryId(nanoid1())
      setContextAnswersValid(true)
    }
   
  //  console.log(item)
  }

  const selectedAnswer = (question,answer,index) => {
  //  console.log("QUESTION", question, "ANSWER" , answer, "INDEX" , index)
  //  console.log("CATEGORY QUESTIONS", categoryQuestions)
  //  console.log('CATEGORY ANSWERS', categoryAnswers)
    let questionsArray = [...categoryQuestions]
    let answersArray = [...categoryAnswers]
    questionsArray[index] = question
    answersArray[index] = answer
   // setCategoryQuestions([...categoryQuestions,question])
   // setCategoryAnswers([...categoryAnswers,answer])
    setCategoryQuestions(questionsArray)
    setCategoryAnswers(answersArray)
    if(contextOptions.length ==  categoryQuestions.length+1) {
      setContextAnswersValid(true)
    }
  }

return(
<View style = {addPost.container}>
    <View style = {header.headerView}>
        <ModernHeader title="Add Review" titleStyle = {header.headerText}
          backgroundColor= {background} leftIconColor = {borderColor}
          leftDisable = {isOpen ? true : false}
          leftIconOnPress={() => {productSelected ? setProductSelected(false): navigation.goBack()}}
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
          {productSelected ? 
          (
            <TouchableOpacity style = {addPost.productSearchBarInactiveView } onPress = {() => setProductSelected(false)}>
              <Fontisto name = "search" size = {24} color = {theme} />
              <Text style = {addPost.productSearchBarInactiveText}>{searchText}</Text>
            </TouchableOpacity>
          ) : (
					<View style = {addPost.productSearchBarActiveView}>
            
						<TextInput 
              style = {addPost.productSearchBarActiveTextInput}
							placeholder = "Search or Add Product "
							onChangeText = {(text) => search(text)}
							onFocus = {()=>setInputFocus(true)}
              autoFocus
						/>
            <TouchableOpacity 
              style = {{borderWidth : 1 , borderColor : "#DDDDDD" , padding : 2 , paddingLeft : 10 , paddingRight : 10,}}
              onPress = {()=>onClickSearchItem({product_name : "Other"})} >
              <Entypo name = "add-to-list" size = {24} color = {theme} />
            </TouchableOpacity>
					</View>
          )}


					{inputFocus ?
						<View>
            <FlatList data={searchArray} keyExtractor = {item => item.product_id.toString()} 
              contentContainerStyle = {addPost.productSearchResultsContentContainer}
              renderItem = {({item})=>{
							return(<TouchableOpacity 
                style = {addPost.productSearchResultsButton}
                onPress = {()=>onClickSearchItem(item)} >
                <Text style = {addPost.productSearchResultsText}>{item.product_name}</Text>
							</TouchableOpacity>)
						}}
						/>
            </View> : productSelected ? 
            (
						<View>
							{existingReviewExists ? <ReviewSummary /> : null}
							
							<View style = {addPost.mainViewAddImagesContainer}>
								<TouchableOpacity style = {addPost.mainViewAddImagesButton} onPress={() => setIsOpen(true)}>
									<MaterialCommunityIcons name = "image-plus" size = {40} color = "#666"/>
									<Text style = {addPost.mainViewAddImagesText}>Add Photos</Text>
                  <Text style = {addPost.mainViewAddImagesText}>(Max 5)</Text>
								</TouchableOpacity>
								{!imageCount ? 
									<View style = {addPost.mainViewShowImagesEmptyContainer}>
										<Text></Text>
									</View> : 
									<FlatGrid itemDimension={50} data={photos} renderItem={({item}, i) => ((
										<Image
										  style={addPost.mainViewShowImagesItem}
										  source={{ uri: item.uri }}
										  key={i}
										/>))}/>}
							</View>

							{!productSelectedOther ? !existingReviewExists ? !categoryAnsExists ?
								<View style = {addPost.mainViewContextQuestionsContainer}>
									{contextOptions.slice(0,4).map((item,index) => {
										return <OptionsQuestions 
                      key = {item.id} 
                      questions = {contextOptions[index]} 
                      selectedAnswer = {(question,answer)=>selectedAnswer(question,answer,index)}
                    />
									})}
								</View> :  
								<CategoryAnsSummary /> : null : null
							}

             
			
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
							  <TextInput 
								placeholder = "Add your review ( Atleast 100 words)"
								style = {addPost.mainViewReviewWritingInput}  
								multiline
								autocomplete
								scrollEnabled
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
						</View>) : null
           
					}
				</View>)
			}
		</View>
  </ScrollView>
</View>

)}


export default AddPost;