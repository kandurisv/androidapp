import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import {View,Text , ActivityIndicator, TouchableOpacity} from 'react-native'
import axios from 'axios'
import {URL, FetchData} from './Screens/exports'
import Navigator from './Screens/Navigator'





const wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }
  
const Loader = () => (
    <View style={{ minHeight: 230, padding: 20 }}>
      <ActivityIndicator
        color="#000"
        size="large"
        style={{ alignSelf: "center" }}
      />
    </View>
  );


const App = () => {

    const [isLoading,setLoading] = React.useState(true)
    const [timed,setTimed] = React.useState(false)
    const [responseData,setResponseData] = React.useState({})
    const [error,setError] = React.useState(false)
    const [secs,setSecs] = React.useState(0)
    const [refresh,setRefresh] = React.useState(false)
    

    React.useEffect( () => {
        
       
        const getData = () => {
            axios.get(URL + "/user/info", {params:{user_id : 1}})
            .then(res => res.data).then(function(responseData) {
                setResponseData(responseData[0])
                setLoading(false)
                setRefresh(false)
            })
            .catch(function(error) {
                console.log(error)
                setLoading(false)
                setError(true)
            });
        }
        const timer = setTimeout(() => {
            getData()
          }, 10000);

        const timer1 = setTimeout(() => {
            setTimed(true)
          }, 5000);

          const timerId = setInterval(() => {
            setSecs(s => s + 1)
          }, 1000)
         
                   
        return () => {
            clearTimeout(timer)
            clearTimeout(timer1)
            clearInterval(timerId)
        };

    },[isLoading]);

    const onRefresh = () => {
        setRefresh(true)
        setSecs(0)
        setLoading(true)
        setTimed(false)
    }

    return (
       <NavigationContainer>
           <Navigator />
       </NavigationContainer>
    
    )
}

export default App
