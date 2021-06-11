const env = 1;

const bucketname = "mish-fit-user-post-images"


import axios from 'axios'
import React,{useEffect} from 'react'
import { View , Text, ScrollView, TouchableOpacity, ToastAndroid} from 'react-native'
import {S3} from 'aws-sdk'
import {decode} from 'base64-arraybuffer'
import * as fs from 'expo-file-system';
        
export const s3URL = "https://"+ bucketname+ ".s3.amazonaws.com/"
export const s3BucketName = bucketname

export const s3bucket = new S3({
  accessKeyId: "AKIAZRIYYTUVCCS2QIEJ",
  secretAccessKey: "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",
  Bucket: bucketname,
  signatureVersion: 'v4',
});

export const URL = env === 1 ? "https://5k8l5ao5b5.execute-api.ap-south-1.amazonaws.com/dev" : "https://5k8l5ao5b5.execute-api.ap-south-1.amazonaws.com/prod";

export const FetchData = env === 1 ? async (urlAdd, params) => {
    axios.get("https://5k8l5ao5b5.execute-api.ap-south-1.amazonaws.com/dev/" + urlAdd, {params:params})
        .then(res => res.data).then(function(responseData) {return responseData})
        .catch(function(error) {return error});
} : async (urlAdd, params) => {
    axios.get("https://5k8l5ao5b5.execute-api.ap-south-1.amazonaws.com/prod/" + urlAdd, {params:params})
        .then(res => res.data).then(function(responseData) {return responseData})
        .catch(function(error) {return error})}

        
export const uploadImageOnS3 = async (name,uri) => {
    console.log("Reached S3 function")
    let contentType = 'image/jpeg';
    let contentDeposition = 'inline;filename="' + name + '"';
    const base641 = await fs.readAsStringAsync(uri, {encoding : fs.EncodingType.Base64});
    const arrayBuffer = decode(base641)
    s3bucket.createBucket(() => {
        console.log("Reached create bucket S3 function")
        const params = {
            Bucket: s3BucketName,
            Key: name,
            Body: arrayBuffer,
            ContentDisposition: contentDeposition,
            ContentType: contentType,
    };
    s3bucket.upload(params, (err, data) => {
        if (err) {console.log('error in callback');}
        });
    });
};



export const ErrorPage = () => {

    return (
        <View>
            <Text>Error</Text>
        </View>
    )
}

export const TimeoutPage = () => {

    return (
        <View>
            <Text>Timeout</Text>
        </View>
    )
}

export const LoadingPage = () => {

    return (
        <View>
            <Text>Loading</Text>
        </View>
    )
}
