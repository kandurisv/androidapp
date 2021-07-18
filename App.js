import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import {View,Text , TouchableOpacity} from 'react-native'
import axios from 'axios'
import {URL, FetchData , AuthProvider , firebaseConfig, LoadingPage} from './Screens/exports'
import Navigator from './Screens/Navigator'
import * as firebase from "firebase";
import * as Sentry from 'sentry-expo';
import * as Amplitude from 'expo-analytics-amplitude';
// import * as Font from 'expo-font';
// import { AppLoading } from 'expo';
// import { useFonts } from 'expo-font';


Amplitude.initializeAsync("af380775c59ead50c4c02536befef5e5");

try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  // ignore app already initialized error in snack
}

Sentry.init({
  dsn: 'https://85b5a621eecd41cd871370cb96dec267@o878788.ingest.sentry.io/5830918',
  enableInExpoDevelopment: true,
  debug: false, // Sentry will try to print out useful debugging information if something goes wrong with sending an event. Set this to `false` in production.
});




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
    const [userDetails,setUserDetails] = React.useState({})
    const [isLoggedIn,setLoggedIn] = React.useState(false)

    const [fontLoaded,setFontLoaded] = React.useState(false)

    // const [loaded] = useFonts({
    //   'os-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    //   'os-italic': require('./assets/fonts/OpenSans-Italic.ttf'),
    //   'os-regular': require('./assets/fonts/OpenSans-Regular.ttf'),
    //   'os-boldItalic': require('./assets/fonts/OpenSans-BoldItalic.ttf'),
    //   'os-extraBoldItalic': require('./assets/fonts/OpenSans-ExtraBoldItalic.ttf'),
    //   'os-light': require('./assets/fonts/OpenSans-Light.ttf'),
    //   'os-lightItalic': require('./assets/fonts/OpenSans-LightItalic.ttf'),
    //   'os-semiBold': require('./assets/fonts/OpenSans-SemiBold.ttf'),
    //   'os-semiBoldItalic': require('./assets/fonts/OpenSans-SemiBoldItalic.ttf')
    // });
    
    // if (!loaded) {
    //   return null;
    // }
  
    



    React.useEffect( () => {

        
        const getData = async () => {
          firebase.auth().onAuthStateChanged(user => {
            if (user != null) {
            //  console.log("fireabase",user)
              setLoggedIn(true)
              setUserId(user.phoneNumber)
              Amplitude.setUserIdAsync(user.phoneNumber)
              Amplitude.logEventWithPropertiesAsync('USER_VISIT', {"userPhoneNumber": user.phoneNumber})
            //  console.log('App User!' , user.phoneNumber);

              axios.get(URL + "/user/info", {params:{user_id : user.phoneNumber.slice(1,13) }} , {timeout:5000})
                .then(res => res.data).then(function(responseData) {
              //    console.log("APP PAGE USER DETAILS", responseData)
                  setUserDetails(responseData[0])
                })
                .catch(function(error) {
                  //
                });
            }  
          })
          setLoading(false)
        }
       
        getData()
         
    //    console.log("loading ", isLoading)
        
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

      (
      <AuthProvider value = {[userId , userDetails, isLoggedIn]}>
       <NavigationContainer>
           <Navigator />
       </NavigationContainer>
      </AuthProvider>)
      
      }
    </View>
    )
}

export default App
