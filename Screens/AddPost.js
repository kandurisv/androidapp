import React, { useState } from "react";
import {View , FlatList, SafeAreaView,Image, Button,StatusBar, StyleSheet, Text, TouchableOpacity, TextInput, Dimensions, ScrollView, KeyboardAvoidingView, ToastAndroid, RecyclerViewBackedScrollView } from "react-native";
import Slider from '@react-native-community/slider';
import ImagePicker from 'react-native-image-crop-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { FlatGrid } from 'react-native-super-grid';
import {uploadImageOnS3, URL} from './exports'
import { useNavigation , useRoute , useIsFocused} from '@react-navigation/native';
import * as ImageManipulator from 'expo-image-manipulator';
import { ImageBrowser } from 'expo-image-picker-multiple';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from 'axios'
import LookupModal from 'react-native-lookup-modal';
import { ModernHeader } from "@freakycoder/react-native-header-view";



let users = [
  {
      id: 1,
      name: 'Brit Renfield',
      tel: '542-866-4301',
      email: 'brenfield0@gmail.com',
      country: 'Russia'
  },
  {
      id: 2,
      name: 'Alfonse Tesche',
      tel: '436-643-1234',
      email: 'atesche1@hotmail.com',
      country: 'Indonesia'
  },
  {
      id: 3,
      name: 'Chandler Follett',
      tel: '682-740-8794',
      email: 'cfollett2@boston.com',
      country: 'Greece'
  }
];


const ImageBrowserScreen = ({ onComplete }) => {

  const [header, setHeader] = React.useState();

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
          console.log(photo);
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
      <>
        <Text>{count} Photos Selected</Text>
        <Button
          title="Done"
          onPress={() => {
            console.log('pressed done');
            onSubmit();
          }}
        />
      </>
    );
  };

  const renderSelectedComponent = (number) => (
    <View style={styles.countBadge10}>
      <Text style={styles.countBadgeText10}>{number}</Text>
    </View>
  );

  const emptyStayComponent = (
    <Text style={styles.emptyStay10}>No Photos Selected</Text>
  );

  return (
    <View style={[styles.flex10, styles.container10]}>
      {header}
      <ImageBrowser
        max={5}
        onChange={updateHandler}
        callback={imagesCallback}
        renderSelectedComponent={renderSelectedComponent}
        emptyStayComponent={emptyStayComponent}
      />
    </View>
  );
};


const background = "#EEE"
const selectedQuestionBackground = "#d1a485"
const borderColor = "#CCC"
const DAYS_MINIMUM_VALUE = 0
const {width} = Dimensions.get("screen")

const ContextOptions = [
    {
        id : 1,
        property : "Hair Texture",
        options : [
            {
                id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
                title: "First",
              },
              {
                id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
                title: "Second",
              },
              {
                id: "58694a0f-3da1-471f-bd96-145571e29d72",
                title: "Third",
              },
        ]
    },
    {
      id : 2,
      property : "Face Texture",
      options : [
          {
              id: "bd7acbea-dfasfsd-46c2-aed5-3ad53abb28ba",
              title: "Soft",
            },
            {
              id: "3ac68afc-dgdfd-48d3-a4f8-fbd91aa97f63",
              title: "Hard",
            },
            {
              id: "58694a0f-3da1-fads-bd96-145571e29d72",
              title: "Matter",
            },
      ]
  },
  {
    id : 3,
    property : "Face Texture",
    options : [
        {
            id: "bd7acbea-dfasfsd-46c2-aed5-3ad53abb28ba",
            title: "Soft",
          },
          {
            id: "3ac68afc-dgdfd-48d3-a4f8-fbd91aa97f63",
            title: "Hard",
          },
          {
            id: "58694a0f-3da1-fads-bd96-145571e29d72",
            title: "Matter",
          },
    ]
},
{
  id : 4,
  property : "Face Texture",
  options : [
      {
          id: "bd7acbea-dfasfsd-46c2-aed5-3ad53abb28ba",
          title: "Soft",
        },
        {
          id: "3ac68afc-dgdfd-48d3-a4f8-fbd91aa97f63",
          title: "Hard",
        },
        {
          id: "58694a0f-3da1-fads-bd96-145571e29d72",
          title: "Matter",
        },
  ]
},
  ];
   

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.title}</Text>
  </TouchableOpacity>
);


const OptionsQuestions = ({questions}) => {
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? selectedQuestionBackground : background;
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
        />
        );
    };

  return (
    <SafeAreaView style={styles.container}>
    <View style ={styles.question} >
         <Text style = {styles.questionText}> {questions.property} </Text>
    </View>
    <View style ={styles.option} >
      <FlatList
        contentContainerStyle={styles.list}
        data={questions.options}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
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
  
  const [imageURL,setImageURL] = React.useState("sddfadsaasdsa")
  const [imageCount,setImageCount] = React.useState(false)
  const [dayValue, setDayValue] = useState(0);
  const [sliderValue,setSliderValue] = React.useState(0)
  const [absValue,setAbsValue] = React.useState(0)
  const [isOpen, setIsOpen] = React.useState(false);
  const [photos, setPhotos] = React.useState([]);
  const [categoryAnsExists,setCategoryAnsExists] = React.useState(false)
  const [existingReviewExists,setExistingReviewExists] = React.useState(false)
  const [loading,setLoading] = React.useState(false)
  const [error,setError] = React.useState(false)
  const [existingReview,setExistingReview] = React.useState([])
  const [existingCategoryInfo,setExistingCategoryInfo] = React.useState([])
  const [sliderMinValue,setSliderMinValue] = React.useState(0)

  const [userId,setUserId] = React.useState("1")
  const [productId,setProductId] = React.useState('1')
  const [categoryId,setCategoryId] = React.useState('1')

  const [productSelected,setProductSelected] = React.useState(false)

  const [user, setUser] = useState()

  React.useEffect(()=>{

    if(productSelected) {
      const fetchPreviousReview = () => {
        axios.get(URL + "/post/review", {params:{product_id : productId, user_id : userId }} , {timeout : 5})
        .then(res => res.data).then(function(responseData) {
            //console.log(responseData)
            setExistingReviewExists(true)
            setExistingReview(responseData)
            setLoading(false) 
            if(responseData[0].day_product_used_content.length > 0 ) {
              setAbsValue(findMinMax(responseData[0].day_product_used_content)[1])
              setSliderMinValue(findMinMax(responseData[0].day_product_used_content)[1])
            }
            
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
        axios.get(URL + "/post/reviewcontext", {params:{category_id : categoryId, user_id : userId }} , {timeout : 5})
        .then(res => res.data).then(function(responseData) {
           // console.log(responseData)
            setCategoryAnsExists(true)
            setExistingCategoryInfo(responseData)
            setLoading(false) 
        })
        .catch(function(error) {
            // console.log("Reached to error")
            // console.log(error)
            setLoading(false)
            setError(true)
        });
    }
    fetchPreviousUserCategory()
  
    }
    else {

    }
    
  
  },[productSelected])


  
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
    setDayValue(newText)
  }


  const left = absValue < 31 ? (absValue-2) * width/60 : (30 + (absValue-35)) * width/60  ;
  
  const sliderChange = (value) => {
    setAbsValue(value)
    if(value < 31) {setSliderValue(value)} 
    else  {setSliderValue(30 + (value-30)*2)}  
  }

  const onSubmitReview = () => {
    console.log("Review Submit")
    photos.map(({item},index) => {
      uploadImageOnS3(imageURL + index,item.uri )
    } )
    const body = {
        "review_sum_id": "13",
        "user_id": 1,
        "product_id": 3,
        "category_id": 2,
        "brand_id": 1,
        "username": "kandurisv",
        "product_name": "Wow green apple shampoo",
        "brand": "WOW",
        "category_name": "Hair Care",
        "category_ques": [
          "hair density",
          "hair type",
          "hair thickness"
        ],
        "category_ans": [
          "low",
          "curly",
          "low"
        ],
        "claim": "The smell of it is mildly pleasant.. It's not a very harsh fragrance. Which is very good. It does make you feel fresh after use.. But it isn't very moisturizing.. My skin feels dry after an hour of bathing.. So you'll need additional moisturizer if your skin is dry like mine.",
        "content": "Premium foaming body wash powered with premium skincare bioactive for a refreshing and toxin-free bathing experience wow skin science green apple body wash has a delightful fruity-crisp fragrance with mild spicy notes that makes your bathroom feel like an apple orchard.",
        "day_product_used": 1,
        "image": [
          "https://images.pexels.com/photos/4016173/pexels-photo-4016173.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
          "https://images.pexels.com/photos/4016173/pexels-photo-4016173.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
          "https://images.pexels.com/photos/4016173/pexels-photo-4016173.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        ]
    }

    axios({
      method: 'post',
      url: URL + '/post/feed',
      data: body
    })
  .then(res => {
      setMessage('')
}).catch((e) => console.log(e))

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
    return(
      <View>
        <Text>Context Questions</Text>
        <Text>Day X: Review fasdfas fasdas safas fsa asfsa fas asfas assa safas sa safsa sa sa</Text>
        <Text>Upload 4 photos</Text>
      </View>
      )
  }

  const CategoryAnsSummary = () => {
    return(
      <View>
        <Text>Context Questions</Text>
      </View>
      )
  }

  const onProductSelected = () => {
    setProductSelected(true)

    const fetchProductDetails = () => {
      axios.get(URL + "/post/reviewcontext", {params:{category_id : categoryId, user_id : userId }} , {timeout : 5})
      .then(res => res.data).then(function(responseData) {
         // console.log(responseData)
          setCategoryAnsExists(true)
          setExistingCategoryInfo(responseData)
          setLoading(false) 
      })
      .catch(function(error) {
          // console.log("Reached to error")
          // console.log(error)
          setLoading(false)
          setError(true)
      });
  }
    fetchProductDetails()


  }

  const [searchLoading,setSearchLoading] = React.useState(false)
  const [searchArray, setSearchArray] = React.useState([])
  const [inputFocus,setInputFocus] = React.useState(false)
  const [searchText,setSearchText] = React.useState("")

  const search = (text) => {
    setSearchText(text)
    setSearchLoading(true)
    
    axios.get(URL + "/search/product", {params:{str2Match : text }} , {timeout : 2})
      .then(res => res.data).then(function(responseData) {
          console.log("SearchArray",searchArray)
          setSearchLoading(false)
          setSearchArray(responseData)
          console.log("Reached Here response")
    })
    .catch(function(error) {
          setSearchLoading(false)
          console.log("Reached Here error")
    });
 
  }

  const onClickSearchItem = (item) => {
    setInputFocus(false)
    setProductSelected(true)
    setSearchText(item.product_id)
  }



return(
<View>
    <View>
        <ModernHeader title="Add Review" titleStyle = {{fontWeight : 'bold' , fontSize: 20}}
          backgroundColor= {background} leftIconOnPress={() => navigation.goBack()}/>
    </View>
    <ScrollView contentContainerStyle = {styles.FullPageContainer} style = {styles.FullPageContainer}>
        <View style={styles.flex10}>
			{isOpen ? (
			
				<ImageBrowserScreen onComplete={onComplete} />) : (
				
				<View style={styles.flex10}>
					<View style = {styles.ProductContainer}>
						<TextInput 
							placeholder = "Search for Product"
							onChangeText = {(text) => search(text)}
							onFocus = {()=>setInputFocus(true)}
						/>
					</View>
				
					{inputFocus ?
						<View>
            <FlatList data={searchArray} keyExtractor = {item => item.product_id.toString()} 
              contentContainerStyle = {{flex : 1, margin : 10,}}
              renderItem = {({item})=>{
							return(<TouchableOpacity 
                style = {{flex : 1, height : 30 , borderWidth : 1, borderColor : '#DDD',  marginTop : 10, padding : 10, justifyContent : 'center'}}
                onPress = {()=>onClickSearchItem(item)} styles = {{borderColor : 'red'}}>
                <Text style = {{fontSize :14}}>{item.product_name}</Text>
							</TouchableOpacity>)
						}}
						/>
            </View> : productSelected ? 
            (
						<View>
							{existingReviewExists ? <ReviewSummary /> : null}
							
							<View style = {{flexDirection : 'row'}}>
								<TouchableOpacity style = {styles.imagePickerButton} onPress={() => setIsOpen(true)}>
									<MaterialCommunityIcons name = "image-plus" size = {100} color = "grey"/>
									<Text style = {{ }}>Add Photos</Text>
								</TouchableOpacity>
								{!imageCount ? 
									<View style = {{flex : 1, justifyContent : 'center' , alignItems : 'center', marginLeft : 30 , borderWidth : 1, borderColor : background}}>
										<Text></Text>
									</View> : 
									<FlatGrid itemDimension={100} data={photos} renderItem={({item}, i) => ((
										<Image
										  style={{ height: 100, width: 100 }}
										  source={{ uri: item.uri }}
										  key={i}
										/>))}/>}
							</View>

							{!existingReviewExists ? !categoryAnsExists ?
								<View style = {styles.ContextContainer}>
									{ContextOptions.slice(0,2).map((item,index) => {
										return <OptionsQuestions key = {item.id} questions = {ContextOptions[index]} />
									})}
								</View> : 
								<CategoryAnsSummary /> : null
							}
			
							<View style = {styles.timeSlideContainer}>
								<View style ={styles.question} >
									<Text style = {styles.questionText}> #Days Used </Text>
								</View>
								<View style = {styles.sliderValueView}>
									<Text style={[styles.sliderValueText, {left: left}] }>{sliderValue}</Text>
								</View>
								<Slider
									style={{width: Dimensions.get("screen").width, height: 10}}
									minimumValue={sliderMinValue}
									maximumValue={60}
									step = {5}
									minimumTrackTintColor= {selectedQuestionBackground}
									maximumTrackTintColor= "#999"
									value = {absValue}
									onValueChange = {value => sliderChange(value)}
								/>
							</View>
	  
							<View style = {styles.ReviewWritingContainer}>
							  <TextInput 
								placeholder = "Add your review ( Atleast 100 words)"
								style = {styles.reviewInput}  
								multiline
								autocomplete
								scrollEnabled
								/>
							</View>

							<TouchableOpacity style = {styles.submitButton} onPress = {onSubmitReview}>
							  <Text style = {styles.submitText}>Submit</Text>
							</TouchableOpacity>
						</View>) : null
           
					}
				</View>)
			}
		</View>
  </ScrollView>
</View>

)}

const styles = StyleSheet.create({
  submitButton : {
    backgroundColor : 'green',
    elevation : 1, 
    alignItems : 'center',
    justifyContent : 'center',
    padding : 10,
    margin : 10,
    width : width*0.5,
    marginLeft : (width*0.5)-10,
    borderRadius : 5,

  },
  submitText : {
    fontSize : 16,
    fontWeight : 'bold',
    color : 'white'
  },
  FullPageContainer : {
    marginBottom : 130,
    backgroundColor : background
  },
  ProductContainer : {
    justifyContent : 'center',
    alignItems : 'center',
    backgroundColor : background,
    padding : 5,
    marginTop : 0,
    flexDirection : 'row',
    borderWidth : 1,
    borderColor : '#DDD',
    borderRadius : 5,
    marginLeft : 10,
    marginRight : 10,

  },
  ProductContainer1 : {
    justifyContent : 'space-between',
    alignItems : 'center',
    backgroundColor : background,
    padding : 5,
    flexDirection : 'row',
    flex : 1,
    width : Dimensions.get("screen").width*0.9
    
    
    

  },
  ContextContainer : {

  },
  timeSlideContainer : {
    marginTop : 20,
  },
  ReviewWritingContainer : {
    backgroundColor : '#FFF',
    margin : 10,
    height : 300,
    borderRadius : 5, 
    borderWidth : 1,
    borderColor : '#eee',
    marginTop : 20

  },
  sliderValueView : {
    

  },
  sliderValueText : { 
    width: 40, 
    textAlign: 'center', 
    fontSize : 20,
    fontWeight : 'bold',
    color : selectedQuestionBackground
  },
  imagePickerView : {
    alignItems : 'center',
    height : 40,
    flexDirection : 'row'

  },
  imagePickerButton : {
    backgroundColor : 'transparent',
    borderRadius : 5, 
    padding : 10 , 
    alignItems : 'center',
    justifyContent : 'center'
  },
  imagePickerText : {
    fontSize : 15, 
  },

  container: {
    backgroundColor: background,
    margin : 5,
    marginTop: 10,
    
  },

  question:{
    width:'100%',
    marginLeft : 20,
    backgroundColor: background,
    fontWeight:'bold',
    marginBottom : 5, 
  },

  option:{
    width:'100%',
    // justifyContent: 'center',
    alignItems:'center',
    backgroundColor: background
  },

  item: {
    padding: 20,
    paddingVertical : 15,
    marginHorizontal: 16,
    // width: 100 , 
    height: 6,
    // flexDirection:'row',
    backgroundColor:background,
    justifyContent: 'center',
    alignItems:'center',
    borderRadius : 5,
    borderWidth : 1,
    borderColor : borderColor
  },
  title: {
    fontSize: 14,
  },
  list:{
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius : 10,
  },
  question_list:{
    width: '100%' ,
    height: '20%'
},
  questionText : {
    fontWeight:'bold',
    fontSize : 15,
},
  reviewInput : {
    fontSize : 16,
    padding : 5,
},

flex10: {
  flex: 1,
},
container10: {
  position: 'relative',
},
emptyStay10: {
  textAlign: 'center',
},
countBadge10: {
  paddingHorizontal: 8.6,
  paddingVertical: 5,
  borderRadius: 50,
  position: 'absolute',
  right: 3,
  bottom: 3,
  justifyContent: 'center',
  backgroundColor: '#0580FF',
},
countBadgeText10: {
  fontWeight: 'bold',
  alignSelf: 'center',
  padding: 'auto',
  color: '#ffffff',
},
  
});

export default AddPost;