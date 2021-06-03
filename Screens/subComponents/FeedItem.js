import React from 'react';
import { Pressable, StyleSheet, Text, View  ,Image, ScrollView  , Dimensions} from 'react-native';

const {width} = Dimensions.get("window");
const height = width * 1.2
const images = [
    'https://images.pexels.com/photos/4016173/pexels-photo-4016173.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'https://images.pexels.com/photos/3514150/pexels-photo-3514150.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'https://images.pexels.com/photos/3514150/pexels-photo-3514150.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'

]

const FeedItem = (props) => {
    return(
        <View style = {styles.container}>
        <Text style ={styles.username} >Username</Text>
        
        <ScrollView 
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator = {false}
        >
            {images.map((image , index) => (
                <Image
                key = {index}
                source = {{uri: image}}
                style = {styles.image}
            />
            ))}
            
        </ScrollView>
        <Text style ={styles.productTitle} >Product Name</Text>
        <Text style ={styles.content} >I have been using this product for ...</Text>
        
            
        </View>
    );
};

const styles = StyleSheet.create({
    
    container:{
        marginTop: 20,
        width,
        height,
        // backgroundColor:'black'
    },

    image:{
        width,
        height,
        // width:'100%',
        aspectRatio:2.5/3,
        resizeMode: 'cover',
        borderRadius: 20,
        // margin: 10
    },
    productTitle:{
        position:'absolute',
        bottom:0,
        color : 'white',
        marginBottom: 35,
        marginLeft: 10,
        fontSize:30,
        fontWeight:'bold'
        
    },
    content:{
        position:'absolute',
        bottom:0,
        color : 'white',
        marginBottom: 15,
        marginLeft: 10,
        fontSize:15
    },

    username:{
        position:'absolute',
        top:0,
        color : 'white',
        marginTop: 15,
        marginLeft: 15,
        fontSize:20,
        zIndex: 100
    }

});

export default FeedItem;
