import React, { useState } from "react";
import {View , FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, TextInput, Dimensions, ScrollView, KeyboardAvoidingView } from "react-native";
import Slider from '@react-native-community/slider';
import ImagePicker from 'react-native-image-crop-picker';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'



const background = "white"
const selectedQuestionBackground = "#d1a485"
const borderColor = "white"
const DAYS_MINIMUM_VALUE = 0

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
  const [sliderValue,setSliderValue] = React.useState(0)
  const [absValue,setAbsValue] = React.useState(0)
  const left = absValue * (Dimensions.get("screen").width-30)/50;
  const sliderChange = (value) => {
    setAbsValue(value)
    if(value < 40) {
      setSliderValue(value)
    } else if (value === 40) {
      setSliderValue(60)
    } else if (value === 50) {
      setSliderValue(90)
    }
    
    console.log(value)
  }

  const addImage = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      } else {
        ImagePicker.openPicker({width: 300,height: 400,cropping: true}).then(image => {console.log(image)});
      }
    }
  }

  const addVideo = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      } else {
        ImagePicker.openPicker({mediaType: "video"}).then((video) => {console.log(video)});
      }
    }
  }

  return(
   <ScrollView>
    
      {/* <View style = {styles.FullPageContainer}> */}
        <View style = {styles.ProductContainer}>
          <Text> Product Search Bar </Text>
        </View>
        <View style = {styles.ContextContainer}>
          {ContextOptions.map((item,index) => {
            return <OptionsQuestions key = {item.id} questions = {ContextOptions[index]} />
          })}
        </View>
        <View style = {styles.timeSlideContainer}>
          <View style ={styles.question} >
            <Text style = {styles.questionText}> #Days Used </Text>
        </View>
        <View style = {styles.sliderValueView}>
          <Text style={[styles.sliderValueText, {left: left}] }>{sliderValue}</Text>
        </View>
          <Slider
          style={{width: Dimensions.get("screen").width, height: 20}}
          minimumValue={DAYS_MINIMUM_VALUE}
          maximumValue={50}
          step = {10}
          minimumTrackTintColor="blue"
          maximumTrackTintColor="red"
          value = {sliderValue}
          onValueChange = {value => sliderChange(value)}
          />
        </View>
        <View style = {styles.imagePickerView}>
          <TouchableOpacity style = {styles.imagePickerButton} onPress = {addImage}> 
            <Text style = {styles.imagePickerText}> Add Image </Text> 
          </TouchableOpacity>
          <TouchableOpacity style = {styles.imagePickerButton} onPress = {addVideo}> 
            <Text style = {styles.imagePickerText}> Add Video </Text> 
          </TouchableOpacity>
        </View>
        <View style = {styles.ReviewWritingContainer}>
          <TextInput 
            placeholder = "Add your review here in no less than 100 words"
            style = {styles.reviewInput}  
            multiline
            autocomplete
            scrollEnabled
            />
        </View>
    {/* </View> */}
    
  
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  FullPageContainer : {

  },
  ProductContainer : {
    justifyContent : 'center',
    alignItems : 'center',
    backgroundColor : 'pink',
    height : 50,
    marginTop : 10,

  },
  ContextContainer : {

  },
  timeSlideContainer : {

  },
  ReviewWritingContainer : {
    backgroundColor : '#FFF',
    margin : 10,
    height : 400,
    borderRadius : 5, 
    borderWidth : 1,
    borderColor : '#bbb'
  },
  sliderValueView : {
    

  },
  sliderValueText : { 
    width: 40, 
    textAlign: 'center', 
    fontSize : 24,
    fontWeight : 'bold',
    color : 'brown'
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
  },
  imagePickerText : {
    fontSize : 15, 
  },

  container: {
    backgroundColor: background,
    marginTop: StatusBar.currentHeight || 0,
  },

  question:{
    width:'100%',
    alignItems:'center',
    backgroundColor: background,
    padding:10,
    fontWeight:'bold',
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
    borderRadius : 20,
    borderWidth : 1,
    borderColor : borderColor
  },
  title: {
    fontSize: 12,
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
    fontSize : 18,
    padding : 5,
},
  
});

export default AddPost;