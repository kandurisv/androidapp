import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import {View,Text , TouchableOpacity} from 'react-native'
import axios from 'axios'
import {URL, FetchData , AuthProvider , firebaseConfig, LoadingPage} from './Screens/exports'
import Navigator from './Screens/Navigator'
import * as firebase from "firebase";

try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  // ignore app already initialized error in snack
}




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

    const [userId,setUserId] = React.useState("")
    

    React.useEffect( () => {
     
       
        const getData = () => {
          firebase.auth().onAuthStateChanged(user => {
            if (user != null) {
              setUserId(user.phoneNumber)
              setLoading(false)
              console.log('App User!' , user.phoneNumber);
            }
          
            // Do other things
          })
            axios.get(URL + "/user/info", {params:{user_id : 1}} , {timeout:5000})
            .then(res => res.data).then(function(responseData) {
                setResponseData(responseData[0])
                console.log("Came here")
                
                setRefresh(false)
            })
            .catch(function(error) {
                console.log(error)
                
                setError(true)
            });
        }
       
        getData()
         
        
        console.log("loading ", isLoading)
                   
      

        
    },[isLoading]);

    const onRefresh = () => {
        setRefresh(true)
        setSecs(0)
        setLoading(true)
        setTimed(false)
    }

    return (
      <View style = {{flex : 1}}>
      {isLoading ? <LoadingPage /> : 

      (<AuthProvider value = {userId}>
       <NavigationContainer>
           <Navigator />
       </NavigationContainer>
      </AuthProvider>)
      
      }
    </View>
    )
}

export default App
