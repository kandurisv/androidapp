const env = 2;

const bucketname = "mish-fit-user-post-images"

import axios from 'axios'
import React,{useEffect , createContext} from 'react'
import { View , Text, ScrollView, Dimensions, TouchableOpacity, ToastAndroid , ActivityIndicator, StyleSheet, Animated, Easing} from 'react-native'
import {S3} from 'aws-sdk'
import {decode} from 'base64-arraybuffer'
import * as fs from 'expo-file-system';
import LottieView from 'lottie-react-native';

export const AuthContext = createContext()
export const UserContext = createContext()

export const AuthProvider = AuthContext.Provider
export const AuthConsumer = AuthContext.Consumer
export const UserProvider = UserContext.Provider
export const UserConsumer = UserContext.Consumer
        
export const s3URL = "https://"+ bucketname+ ".s3.amazonaws.com/"
export const s3BucketName = bucketname

export const s3bucket = new S3({
  accessKeyId: "AKIAZRIYYTUVCCS2QIEJ",
  secretAccessKey: "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",
  Bucket: bucketname,
  signatureVersion: 'v4',
});

export const URL = "https://5k8l5ao5b5.execute-api.ap-south-1.amazonaws.com/prod2";
export const schema = 'https://www.getcandid.app/'
//export const URL = "https://5k8l5ao5b5.execute-api.ap-south-1.amazonaws.com/dev" ;
//export const schema = 'exp://192.168.43.31:19000/'
     


export const uploadImageOnS3 = async (name,uri) => {
 //   console.log("Reached S3 function")
    let contentType = 'image/jpeg';
    let contentDeposition = 'inline;filename="' + name + '"';
    const base641 = await fs.readAsStringAsync(uri, {encoding : fs.EncodingType.Base64});
    const arrayBuffer = decode(base641)
    s3bucket.createBucket(() => {
  //      console.log("Reached create bucket S3 function")
        const params = {
            Bucket: s3BucketName,
            Key: name,
            Body: arrayBuffer,
            ContentDisposition: contentDeposition,
            ContentType: contentType,
    };
    s3bucket.upload(params, (err, data) => {
        if (err) {
         //   console.log('error in callback');
        }
        });
    });
};

export const width = Dimensions.get('screen').width
export const height = Dimensions.get('screen').height

export const ErrorPage = ({duration}) => {
    const progress = React.useRef(new Animated.Value(0)).current
    React.useEffect(()=>{
        Animated.timing(progress, {
            toValue: 1,
            duration: duration,
            easing: Easing.linear,
            useNativeDriver : true
          },).start();
    },[])
    return (
        <View style = {{flex : 1 , justifyContent : 'center' , alignItems : 'center', width : Dimensions.get('screen').width , height : Dimensions.get('screen').height }}>
          <LottieView
              ref={animation => animation}
              progress = {progress}
              style={{ width: 200, height: 200, backgroundColor: 'transparent',}}
              source={require('../assets/animation/error.json')}
          />
        </View>
    )
}

export const TimeoutPage = ({duration}) => {
        const progress = React.useRef(new Animated.Value(0)).current
        React.useEffect(()=>{
            Animated.timing(progress, {
                toValue: 1,
                duration: duration,
                easing: Easing.linear,
                useNativeDriver : true
              },).start();
        },[])
        return (
            <View style = {{flex : 1 , justifyContent : 'center' , alignItems : 'center', width : Dimensions.get('screen').width , height : Dimensions.get('screen').height }}>
              <LottieView
                  ref={animation => animation}
                  progress = {progress}
                  style={{ width: 200, height: 200, backgroundColor: 'transparent',}}
                  source={require('../assets/animation/error.json')}
              />
            </View>
        )
}

export const LoadingPage = ({duration}) => {
    const progress = React.useRef(new Animated.Value(0)).current
        React.useEffect(()=>{
            Animated.loop(
                Animated.timing(progress, {
                    toValue: 1,
                    duration: 2000,
                    easing: Easing.linear,
                    useNativeDriver : true
                  },)
            ).start();
        },[])
        return (
            <View style = {{flex : 1 , justifyContent : 'center' , alignItems : 'center', width : Dimensions.get('screen').width , height : Dimensions.get('screen').height }}>
              <LottieView
                  ref={animation => animation}
                  progress = {progress}
                  style={{ width: 200, height: 200, backgroundColor: 'transparent',}}
                  source={require('../assets/animation/loading.json')}
              />
            </View>
        )
}


export const background = "#fafbf5"
export const theme = "#D7354A"
export const borderColor = "#222222"

export const firebaseConfig = {
    apiKey: 'AIzaSyCelzKVnbYY07aLtswA4EE9pF9mNeXJtRs',
      authDomain: 'mishreview-346c2.firebaseapp.com',
      databaseURL: 'https://mishreview-346c2.firebaseio.com',
      projectId: 'mishreview-346c2',
      storageBucket: 'mishreview-346c2.appspot.com',
      messagingSenderId: '934890083228',
      appId: '1:934890083228:android:d132693b4e14b139dbae59',
  }


export const headerStyle = StyleSheet.create({
    headerText : {
        fontSize: 18 , color : theme
    },
    headerText1 :{fontWeight : 'bold',fontSize: 18 , color : borderColor}
})



