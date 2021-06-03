import axios from 'axios'

import React,{useEffect} from 'react'
import { View , Text, ScrollView, TouchableOpacity, ToastAndroid} from 'react-native'


const env = 1;

export const URL = env === 1 ? "https://5k8l5ao5b5.execute-api.ap-south-1.amazonaws.com/dev" : "https://5k8l5ao5b5.execute-api.ap-south-1.amazonaws.com/prod";

export const FetchData = env === 1 ? async (urlAdd, params) => {
    axios.get("https://5k8l5ao5b5.execute-api.ap-south-1.amazonaws.com/dev/" + urlAdd, {params:params})
        .then(res => res.data).then(function(responseData) {return responseData})
        .catch(function(error) {return error});
} : async (urlAdd, params) => {
    axios.get("https://5k8l5ao5b5.execute-api.ap-south-1.amazonaws.com/prod/" + urlAdd, {params:params})
        .then(res => res.data).then(function(responseData) {return responseData})
        .catch(function(error) {return error})}

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
