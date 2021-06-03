import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {  StyleSheet, Text, View  ,Image, ScrollView  , Dimensions, SafeAreaView, TouchableOpacity, FlatList} from 'react-native';
import Fontisto from "react-native-vector-icons/Fontisto";

const {width} = Dimensions.get("window");
const height = width * 1.35
const images = [
    'https://images.pexels.com/photos/4016173/pexels-photo-4016173.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'https://images.pexels.com/photos/3514150/pexels-photo-3514150.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'https://images.pexels.com/photos/3514150/pexels-photo-3514150.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
]

const Review = (props) => {
    return(
        <ScrollView>
            <View style = {styles.container2}>
                <StatusBar 
                height = {0}
                // backgroundColor = "#b3e6ff"  
                // hidden 
                translucent 
                backgroundColor='transparent'
                />
                <Text style ={styles.username2} >Username</Text>
        
                <ScrollView 
                pagingEnabled
                horizontal
                showsHorizontalScrollIndicator = {false}
                >
                    {images.map((image , index) => (
                        <Image
                        key = {index}
                        source = {{uri: image}}
                        style = {styles.image2}
                    />
                    ))}
            
                </ScrollView>
                <Text style ={styles.productTitle2} >Product Name</Text>
                <View style = {styles.heart2}>
                    <Fontisto name = "heart-alt" size = {25} color = {"#fff"} />
                </View>
                <View style = {styles.heartText2}>
                    <Text style = {styles.likeNumber2}>15</Text>
                </View>
                <View style = {styles.comment2}>
                    <Fontisto name = "comment" size = {25} color = {"#fff"} />
                </View>
                <View style = {styles.commentText2}>
                    <Text style = {styles.commentNumber2}>15</Text>
                </View>
            </View>
        </ScrollView>
    );
};

const listTab = [
    {
        status: 'Review'
    },

    {
        status: 'Claim'
    },

    {
        status: 'Context'
    }
]

const Data = [
    {
        status: 'Review',
        content : ' Review , Import your header.js file in the entry of your app, the App.js file, and include the following styles. For styling purposes, our app container has a background color of #eef'
    },

    {
        status: 'Claim',
        content : 'Claim , Import your header.js file in the entry of your app, the App.js file, and include the following styles. For styling purposes, our app container has a background color of #eef'
    },

    {
        status: 'Context',
        content : 'Context , Import your header.js file in the entry of your app, the App.js file, and include the following styles. For styling purposes, our app container has a background color of #eef'
    },
]

const Tab = (props) => {

    const [status, setStatus] = useState('Review');
    const [dataList , setDataList] = useState ([Data[0]]);

    const setStatusFilter = status => {
        setDataList([...Data.filter(e => e.status === status)]);
        setStatus(status);
    }

    const renderItem = ({item , index}) =>{
        return(
            <View key ={index} style = {styles.itemContainer1} >
                <Text style = {styles.textItem}>{item.content1}</Text>
            </View>
        )
    }

    return(
    
        <SafeAreaView style = {styles.container1}>
            <View style = {styles.listTab1}>
                {
                    listTab.map(e => (
                        <TouchableOpacity 
                        style = {[styles.btnTab1 , status === e.status && styles.btnTabActive1]}
                        onPress = {() => setStatusFilter(e.status)}
                        >
                            <Text 
                            style = {[styles.textTab1 , status === e.status && styles.textTabActive1]}>
                                {e.status}
                                </Text>
                        </TouchableOpacity>
                    )
                    )
                }
                
            </View>

            <FlatList 
                data = {dataList}
                keyExtractor = {(i,e) =>i.toString() }
                renderItem = {renderItem}
            />

        </SafeAreaView>
    );
};

const PostDetails = (props) => {
  return (
    <View style={styles.container}>
      <ScrollView>
      {/* <Post/>
      <Post/> */}
        <View style = {styles.review}>
          <Review/>
        </View>
        <View style = {styles.tab}>
          <Tab/>
        </View>
      {/* <Tab/> */}
      </ScrollView>
    </View>
  );
}

export default PostDetails

const styles = StyleSheet.create({
  container:{
    paddingTop: 50,
   },
   tinyLogo: {
    width: 50,
    height: 50,
  },
  tab:{
    // position:'absolute',
    // bottom:-60,
    marginTop:-23,
    zIndex: 101
  },

  review:{
    backgroundColor:'black'
  },

  container2:{
    marginTop: 0,
    width,
    height,
    // backgroundColor:'black'
},

image2:{
    width,
    height,
    // width:'100%',
    aspectRatio:2/3,
    resizeMode: 'cover',
    // borderRadius: 20,
    // margin: 10
},
productTitle2:{
    position:'absolute',
    bottom:0,
    color : 'white',
    marginBottom: 40,
    marginLeft: 10,
    fontSize:30,
    fontWeight:'bold'
    
},
content2:{
    position:'absolute',
    bottom:0,
    color : 'white',
    marginBottom: 15,
    marginLeft: 10,
    fontSize:15
},

username2:{
    position:'absolute',
    top:0,
    color : 'white',
    marginTop: 15,
    marginLeft: 15,
    fontSize:20,
    zIndex: 100
},

heart2:{
    position:'absolute',
    bottom:0,
    color : 'white',
    marginBottom: 150,
    marginLeft: width - 50,
    fontSize:20,
    zIndex: 100
},

heartText2:{
    position:'absolute',
    bottom:0,
    // backgroundColor : 'white',
    marginBottom: 120,
    marginLeft: width - 48,
    // fontSize:20,
//     zIndex: 101
},
likeNumber2:{
    fontSize:20,
    fontWeight:'bold',
    color:'#fff',
},

comment2:{
    position:'absolute',
    bottom:0,
    color : 'white',
    marginBottom: 60,
    marginLeft: width - 50,
    fontSize:20,
    zIndex: 100
},

commentText2:{
    position:'absolute',
    bottom:0,
    // backgroundColor : 'white',
    marginBottom: 30,
    marginLeft: width - 48,
    // fontSize:20,
//     zIndex: 101
},
commentNumber2:{
    fontSize:20,
    fontWeight:'bold',
    color:'#fff',
},

container1:{
    flex: 1,
    paddingHorizontal: 10,
    justifyContent:'center'
},

listTab1:{
    flexDirection: 'row',
    alignSelf:'center',
    marginBottom: 20
},

btnTab1:{
    width: Dimensions.get('window').width /5,
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor:'#EBEBEB',
    padding: 10,
    justifyContent: 'center',
    backgroundColor:'#fff'
},

textTab1:{
    fontSize: 16,
    color:'black'
},

btnTabActive1:{
    backgroundColor:'#E68380'
},

textTabActive1 :{
    color: '#fff'
},

itemContainer1:{
    width : '90%',
    alignSelf:'center'
},

textItem1:{
    fontSize: 16,

}


});
