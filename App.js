import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import {View,Text , TouchableOpacity} from 'react-native'
import axios from 'axios'
import {URL, FetchData , AuthProvider , firebaseConfig, LoadingPage} from './Screens/exports'
import Navigator from './Screens/Navigator'
import * as firebase from "firebase";

import { Amplitude  , Identify} from '@amplitude/react-native';
const ampInstance = Amplitude.getInstance();

ampInstance.init(af380775c59ead50c4c02536befef5e5);

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
              const identify = new Identify();
              identify.set("phoneNumber", user.phoneNumber)
              ampInstance.setUserId(user.phoneNumber)
              ampInstance.trackingSessionEvents(true); 
              ampInstance.identify(identify)
              console.log('App User!' , user.phoneNumber);

            }
          
            setLoading(false)
          })
            
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
