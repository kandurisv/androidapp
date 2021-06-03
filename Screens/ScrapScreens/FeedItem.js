import React, { useRef } from "react";
import {findNodeHandle, Animated, Text, View, StyleSheet, Image, SafeAreaView, FlatList , TouchableOpacity , Dimensions} from "react-native";

import {useTheme,Avatar,Title,Caption,Paragraph,Drawer,TouchableRipple,Switch} from 'react-native-paper';

import {MaterialIcons, AntDesign , MaterialCommunityIcons, Entypo, Ionicons, SimpleLineIcons, Fontisto} from "@expo/vector-icons";

//import data



import faker from 'faker'

const FeedItem1 = () => {

  const GetItems = [
    {
            review_id : faker.datatype.uuid(),
            review : faker.lorem.paragraph(),
            category : faker.commerce.department(),
            product : faker.commerce.product(),
            upvotes : faker.datatype.number(),
            downvotes : faker.datatype.number(),
            username : faker.name.firstName(),
            time : faker.time.recent()
    },
    {
        review_id : faker.datatype.uuid(),
        review : faker.lorem.paragraph(),
        category : faker.commerce.department(),
        product : faker.commerce.product(),
        upvotes : faker.datatype.number(),
        downvotes : faker.datatype.number(),
        username : faker.name.firstName(),
        time : faker.time.recent()
},
{
    review_id : faker.datatype.uuid(),
    review : faker.lorem.paragraph(),
    category : faker.commerce.department(),
    product : faker.commerce.product(),
    upvotes : faker.datatype.number(),
    downvotes : faker.datatype.number(),
    username : faker.name.firstName(),
    time : faker.time.recent()
},
{
    review_id : faker.datatype.uuid(),
    review : faker.lorem.paragraph(),
    category : faker.commerce.department(),
    product : faker.commerce.product(),
    upvotes : faker.datatype.number(),
    downvotes : faker.datatype.number(),
    username : faker.name.firstName(),
    time : faker.time.recent()
},
{
    review_id : faker.datatype.uuid(),
    review : faker.lorem.paragraph(),
    category : faker.commerce.department(),
    product : faker.commerce.product(),
    upvotes : faker.datatype.number(),
    downvotes : faker.datatype.number(),
    username : faker.name.firstName(),
    time : faker.time.recent()
},
{
    review_id : faker.datatype.uuid(),
    review : faker.lorem.paragraph(),
    category : faker.commerce.department(),
    product : faker.commerce.product(),
    upvotes : faker.datatype.number(),
    downvotes : faker.datatype.number(),
    username : faker.name.firstName(),
    time : faker.time.recent()
},
{
    review_id : faker.datatype.uuid(),
    review : faker.lorem.paragraph(),
    category : faker.commerce.department(),
    product : faker.commerce.product(),
    upvotes : faker.datatype.number(),
    downvotes : faker.datatype.number(),
    username : faker.name.firstName(),
    time : faker.time.recent()
},
{
    review_id : faker.datatype.uuid(),
    review : faker.lorem.paragraph(),
    category : faker.commerce.department(),
    product : faker.commerce.product(),
    upvotes : faker.datatype.number(),
    downvotes : faker.datatype.number(),
    username : faker.name.firstName(),
    time : faker.time.recent()
},
{
    review_id : faker.datatype.uuid(),
    review : faker.lorem.paragraph(),
    category : faker.commerce.department(),
    product : faker.commerce.product(),
    upvotes : faker.datatype.number(),
    downvotes : faker.datatype.number(),
    username : faker.name.firstName(),
    time : faker.time.recent()
},
{
    review_id : faker.datatype.uuid(),
    review : faker.lorem.paragraph(),
    category : faker.commerce.department(),
    product : faker.commerce.product(),
    upvotes : faker.datatype.number(),
    downvotes : faker.datatype.number(),
    username : faker.name.firstName(),
    time : faker.time.recent()
},
{
    review_id : faker.datatype.uuid(),
    review : faker.lorem.paragraph(),
    category : faker.commerce.department(),
    product : faker.commerce.product(),
    upvotes : faker.datatype.number(),
    downvotes : faker.datatype.number(),
    username : faker.name.firstName(),
    time : faker.time.recent()
},
{
    review_id : faker.datatype.uuid(),
    review : faker.lorem.paragraph(),
    category : faker.commerce.department(),
    product : faker.commerce.product(),
    upvotes : faker.datatype.number(),
    downvotes : faker.datatype.number(),
    username : faker.name.firstName(),
    time : faker.time.recent()
},
{
    review_id : faker.datatype.uuid(),
    review : faker.lorem.paragraph(),
    category : faker.commerce.department(),
    product : faker.commerce.product(),
    upvotes : faker.datatype.number(),
    downvotes : faker.datatype.number(),
    username : faker.name.firstName(),
    time : faker.time.recent()
},
{
    review_id : faker.datatype.uuid(),
    review : faker.lorem.paragraph(),
    category : faker.commerce.department(),
    product : faker.commerce.product(),
    upvotes : faker.datatype.number(),
    downvotes : faker.datatype.number(),
    username : faker.name.firstName(),
    time : faker.time.recent()
},
{
    review_id : faker.datatype.uuid(),
    review : faker.lorem.paragraph(),
    category : faker.commerce.department(),
    product : faker.commerce.product(),
    upvotes : faker.datatype.number(),
    downvotes : faker.datatype.number(),
    username : faker.name.firstName(),
    time : faker.time.recent()
},
{
    review_id : faker.datatype.uuid(),
    review : faker.lorem.paragraph(),
    category : faker.commerce.department(),
    product : faker.commerce.product(),
    upvotes : faker.datatype.number(),
    downvotes : faker.datatype.number(),
    username : faker.name.firstName(),
    time : faker.time.recent()
},
{
    review_id : faker.datatype.uuid(),
    review : faker.lorem.paragraph(),
    category : faker.commerce.department(),
    product : faker.commerce.product(),
    upvotes : faker.datatype.number(),
    downvotes : faker.datatype.number(),
    username : faker.name.firstName(),
    time : faker.time.recent()
},
{
    review_id : faker.datatype.uuid(),
    review : faker.lorem.paragraph(),
    category : faker.commerce.department(),
    product : faker.commerce.product(),
    upvotes : faker.datatype.number(),
    downvotes : faker.datatype.number(),
    username : faker.name.firstName(),
    time : faker.time.recent()
},
{
    review_id : faker.datatype.uuid(),
    review : faker.lorem.paragraph(),
    category : faker.commerce.department(),
    product : faker.commerce.product(),
    upvotes : faker.datatype.number(),
    downvotes : faker.datatype.number(),
    username : faker.name.firstName(),
    time : faker.time.recent()
},
{
    review_id : faker.datatype.uuid(),
    review : faker.lorem.paragraph(),
    category : faker.commerce.department(),
    product : faker.commerce.product(),
    upvotes : faker.datatype.number(),
    downvotes : faker.datatype.number(),
    username : faker.name.firstName(),
    time : faker.time.recent()
},
{
    review_id : faker.datatype.uuid(),
    review : faker.lorem.paragraph(),
    category : faker.commerce.department(),
    product : faker.commerce.product(),
    upvotes : faker.datatype.number(),
    downvotes : faker.datatype.number(),
    username : faker.name.firstName(),
    time : faker.time.recent()
},
{
    review_id : faker.datatype.uuid(),
    review : faker.lorem.paragraph(),
    category : faker.commerce.department(),
    product : faker.commerce.product(),
    upvotes : faker.datatype.number(),
    downvotes : faker.datatype.number(),
    username : faker.name.firstName(),
    time : faker.time.recent()
},
{
    review_id : faker.datatype.uuid(),
    review : faker.lorem.paragraph(),
    category : faker.commerce.department(),
    product : faker.commerce.product(),
    upvotes : faker.datatype.number(),
    downvotes : faker.datatype.number(),
    username : faker.name.firstName(),
    time : faker.time.recent()
},
{
    review_id : faker.datatype.uuid(),
    review : faker.lorem.paragraph(),
    category : faker.commerce.department(),
    product : faker.commerce.product(),
    upvotes : faker.datatype.number(),
    downvotes : faker.datatype.number(),
    username : faker.name.firstName(),
    time : faker.time.recent()
},
{
    review_id : faker.datatype.uuid(),
    review : faker.lorem.paragraph(),
    category : faker.commerce.department(),
    product : faker.commerce.product(),
    upvotes : faker.datatype.number(),
    downvotes : faker.datatype.number(),
    username : faker.name.firstName(),
    time : faker.time.recent()
}
]

const ProfileContextInfo = [
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
    {
      id: "rtwdfasd-c1b1-46c2-aed5-3ad53abb28ba",
      title: "FOruth",
    },
    {
      id: "reqwrq-c605-48d3-a4f8-fbd91aa97f63",
      title: "Figth",
    },
    {
      id: "dfafsafas-3da1-471f-bd96-145571e29d72",
      title: "seixy",
    },

    {
      id: "ghghrgedwf-c1b1-46c2-aed5-3ad53abb28ba",
      title: "dadfa",
    },
    {
      id: "sdfaasda-c605-48d3-a4f8-fbd91aa97f63",
      title: "gsgrefds",
    },
    {
      id: "rwtetwvsd-3da1-471f-bd96-145571e29d72",
      title: "fwqrfsadf",
    },
]

const [reviewData, setReviewData] = React.useState([
  {
    id : 1,
    review : faker.lorem.paragraphs(),
    name : "REVIEW",
    ref : React.createRef()
  },
  {
    id : 2,
    review : faker.lorem.paragraph(),
    name : "CLAIM",
    ref : React.createRef()
  }
])

  const {width,height} = Dimensions.get("screen")
  const scrollX = React.useRef(new Animated.Value(0)).current
  const ref = React.useRef()
 // const scrollX = React.useState(new Animated.Value(0)).current
  const [productName,setProductName] = React.useState("HUL Bringha Hair Oil 100 ml ")
  const [firstRating,setFirstRating] = React.useState(2)
  const [secondRating,setSecondRating] = React.useState(5)
  const [thirdRating,setThirdRating] = React.useState(3)
  const [review,setReview] = React.useState(faker.lorem.paragraphs())
  const [claim,setClaim] = React.useState(faker.lorem.paragraph())
  const [reviewClick,setReviewClick] = React.useState(true)
  const [claimClick,setClaimClick] = React.useState(true)


  React.useEffect(()=>{
   
  },[])



  const Indicator = ({measures,scrollX}) => {
    const inputRange = reviewData.map((_,i)=>i*width)
    const indicatorWidth = scrollX.interpolate({
      inputRange,
      outputRange : measures.map((measure) => measure.width)
    })
    const translateX = scrollX.interpolate({
      inputRange,
      outputRange : measures.map((measure) => measure.x)
    })

    return <Animated.View style = {{
      height : 2,
      backgroundColor : 'purple',
      width : indicatorWidth,
      // left : 0,
      transform : [{
        translateX
      }],
    }}/>
}



  const Tab = React.forwardRef(({item,onItemPress},ref) => {
    
    return(
      <TouchableOpacity onPress= {onItemPress}>
        <View ref={ref}>
          <Text 
          style = {{
            fontWeight : 'bold',
            textTransform : "uppercase",
            color : 'purple'
          }}>{item.name}</Text>
        </View>
      </TouchableOpacity>
      )
  })
 


  const Tabs = ({scrollX,data, onItemPress}) => { 
    const [measures,setMeasures] = React.useState([])

    const containerRef = React.useRef()

    React.useEffect(()=>{
      const m = []
      data.forEach(item =>{
        item.ref.current.measureLayout(containerRef.current,
          (x,y,width,height) => {
           m.push({x,y,width,height})
           if (m.length === data.length) {
            setMeasures(m)
          }
        }
        )})
    },[])

    


    return(
      <View>
        <View 
        ref = {containerRef}
        style = {{
        flexDirection : 'row', 
        justifyContent : 'space-evenly',
        backgroundColor : 'white',
        }}>
        {data.map((item,index)=>{
          return (
          <Tab 
            key = {item.id} 
            item = {item} 
            ref={item.ref} 
            onItemPress = {()=>onItemPress(index)} 
            />
          )})}
      </View>
      {measures.length > 0 && <Indicator measures= {measures} scrollX = {scrollX} data= {reviewData} />}
      </View>
    )
  }



  const renderItem = ({item}) => {

    return(
      <View style = {styles.contextView}>
        <TouchableOpacity>
            <Text style = {styles.contextText}>{item.title}</Text>
        </TouchableOpacity>
        
      </View>
      )
}

    const onItemPress = React.useCallback(itemIndex => {
      ref?.current?.scrollToOffset({
        offset : itemIndex * (width * 0.85)
      })
     

    })




  return ( 

    
      <View style = {styles.container}>
        <View style = {styles.userDetailsView}>
          <View style = {styles.dp}>
            {GetItems[0].username ? 
              <Avatar.Image 
                    source={{
                    uri: 'https://ui-avatars.com/api/rounded=true&name='+ GetItems[0].username.replace(" ","+") + '&size=512'
                    }} size={60}/> :
              <Avatar.Image 
                    source={{
                    uri: 'https://ui-avatars.com/api/rounded=true&background=random&size=512'
                    }} size={60}/>}
          </View>
          <View style = {{flexDirection : 'column'}}>
              <View style = {{flex : 1}}>
              <TouchableOpacity style = {styles.username}>
                <Text style={styles.title} >{GetItems[0].username}</Text>
              </TouchableOpacity> 
              </View>
              <View style = {styles.FlatlistView}>
                <FlatList
                data = {ProfileContextInfo}
                keyExtractor = {(item,index) => item.id }
                horizontal
                showsHorizontalScrollIndicator = {false}
                renderItem = {renderItem}
                contentContainerStyle = {styles.contextFlatList}
                />    
               </View>
              
           </View>
         </View>
         <View style = {styles.productDetailsView}>
              <TouchableOpacity style = {styles.productNameView}>
                <Text style = {styles.productNameText}>{productName}</Text>
              </TouchableOpacity>
         </View>
         <View style = {styles.reviewsView}>
        
            <Tabs scrollX = {scrollX} data= {reviewData} onItemPress = {onItemPress}/>

            <Animated.FlatList 
              ref = {ref}
              data = {reviewData}
              keyExtractor = {item => item.id.toString()}
              renderItem = {({item})=>{
                return (
                <View style = {{width : width*0.85,marginLeft : 10, marginRight : 10 , paddingTop : 10 }}>
                  <Text>{item.review}</Text>
                </View>
              )}}
              horizontal
              showsHorizontalScrollIndicator = {false}
              pagingEnabled
              bounces = {false}
              onScroll = {
                Animated.event(
                [{nativeEvent: {contentOffset : {x : scrollX}}}],
                {useNativeDriver : false}
               
              )
            }
              snapToAlignment
              contentContainerStyle = {{backgroundColor : 'white'}}
            />
         </View> 
         <View style = {styles.voting}>
           <View style = {{flexDirection: 'row', alignItems : 'center'}}>
           <TouchableOpacity style = {{marginRight : 10}}>
              <Ionicons name = "chevron-up-circle-outline" size = {24} color = "green" />
           </TouchableOpacity>
            <Text>10</Text>
            <TouchableOpacity style = {{marginLeft : 10}}>
              <Ionicons name = "chevron-down-circle-outline" size = {24} color = "green" />
           </TouchableOpacity>
           </View>
           <TouchableOpacity>
            
           <View style = {{flexDirection : 'row' , alignItems : 'center'}}>
              <Fontisto name = "comments" size = {20} color = "green" />
              <Text style = {{marginLeft : 10}}>2 Comments</Text>
           </View>
           </TouchableOpacity>
           <TouchableOpacity>
           <View style = {{flexDirection : 'row' , alignItems : 'center'}}>
              <MaterialCommunityIcons name = "post" size = {20} color = "green" />
             <Text>View Post</Text>
            </View>
           </TouchableOpacity>
         </View>
       </View>
       
  );
}

const styles = StyleSheet.create({
  voting : {
    flexDirection : 'row',
    justifyContent : 'space-evenly'
  },
  reviewActiveButton : {
    elevation: 1,
    borderColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth : 2,

  },
  reviewInactiveButton : {
    elevation: 2,
    borderColor: "black",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12 ,
    borderBottomWidth : 2,
  },
  activeButtonText : {
    fontSize: 18,
    color: "#000",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  inactiveButtonText : {
    fontSize: 14,
    color: "#000",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  reviewTextContainer: {
    margin : 10,

  },
  reviewTextStyling : {
    fontSize : 15,

  },
  container: {
    flex : 1,
    borderWidth : 1,
    borderColor : 'black',
    borderRadius : 10,
    marginLeft : 20,
    marginRight : 20,
    marginTop : 10, 
    marginBottom : 10,
    


  },
  userDetailsView: {
    flexDirection: "row",
    marginTop : 30,
    margin : 5
   
  },
  username : {
    
    marginLeft : 20,
  },
  title : {
    fontWeight : 'bold',
    fontSize : 16,
  },
  dp : {
      

  },
  FlatlistView : {
    marginRight :  15,
    width : Dimensions.get("window").width * 0.7,
    left : 0,
    right : 30,

    

  },
  contextFlatList : {
    marginRight :  15,

  },
  contextView : {
    borderWidth : 1 , 
    borderColor : 'black' , 
    borderRadius : 10 , 
    padding : 3 , 
    paddingLeft : 8,
    paddingRight : 8,
    marginLeft : 15 , 
    
    backgroundColor : 'grey',
    elevation : 20,
    shadowRadius : 10,
    shadowColor : 'white'
   
  },
  contextText : {
    color : 'white'
  },

  productDetailsView: {
    
  },
  productNameView : {
    margin : 10,

  },
  productNameText : {
    fontWeight : 'bold',
    fontSize : 16,
    textAlign: 'center'
  },
  ratingsView: {
   flexDirection : 'row',
   alignItems : 'center',
   justifyContent : 'space-evenly'
  },
  ratingsContainer : {
    margin : 5,
    
    alignItems : 'center',
    justifyContent : 'center'
  },
  reviewsView: {
    
  },
  ratingText :  {
    fontWeight : 'bold'
  },
  reviewSelection : {
    flexDirection : 'row',
    justifyContent : 'space-evenly'
  },
 

  
});

export default FeedItem1;