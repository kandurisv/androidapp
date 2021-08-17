import React, { useState , useContext} from "react";
import {View,TouchableOpacity,Dimensions,StyleSheet, Animated, Text} from 'react-native';
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator } from "@react-navigation/drawer";
import AddPost from './AddPost'
import EditUserProfile from './EditUserProfile'
import Feed from './Feed'
import Home from './Home'
import Login from './Login'
import Pins from './Pins'
import Signout from './Signout'
import UserDetails from './UserDetails'
import PostDetails from './PostDetails'
import Brands from './Brands'

import Search from './Search'
import { AuthContext, background, borderColor, theme } from "./exports";
import HeroSearchFeed from "./HeroSearchFeed";
import ActivityNotification from "./ActivityNotification";
import UpdatePost from "./UpdatePost";
import DrawerContent from "./DrawerContent";
import BrandsPage from "./BrandsPage";
import PostLink from "./PostLink";




const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator()

const totalWidth = Dimensions.get("window").width;
const TAB_BAR_HEIGHT = 60
const TAB_ICON_SIZE = 24
const TAB_SLIDER_HEIGHT = 2
// const TAB_SLIDER_COLOR = "#C51E3A"
const TAB_SLIDER_COLOR = "#FFFFFF"
const TAB_ACTIVE_COLOR = theme
const TAB_INACTIVE_COLOR = "#888888"

const BottomMenu = ({ iconName, isCurrent , label}) => {
  return (
    <View
      style={{
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor :  'white',
        margin : 0,
        padding : 0,
      }}
    >
      <MaterialCommunityIcons
        name={iconName}
        size={TAB_ICON_SIZE}
        style={{ color:  isCurrent ? TAB_ACTIVE_COLOR : TAB_INACTIVE_COLOR }}
      />
      <Text 
      style = {{ color:  isCurrent ? TAB_ACTIVE_COLOR : TAB_INACTIVE_COLOR }}
      >{label}</Text>
    </View>
  );
};

const TabBar = ({state,descriptors,navigation}) => {
    const [translateValue] = useState(new Animated.Value(0));
    const tabWidth = totalWidth / state.routes.length;
    return (
    <View style={[style.tabContainer, { width: totalWidth }]}>
      <View style={{ flexDirection: "row" }}>
      <Animated.View
          style={[
            style.slider,
            {
              transform: [{ translateX: translateValue }],
              width: tabWidth - 30,
            },
          ]}
        />
    {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;
        const isFocused = state.index === index;
        const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
            Animated.spring(translateValue, {
                toValue: index * tabWidth,
                velocity: 10,
                useNativeDriver: true,
              }).start();
        }
        const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };
        return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityStates={isFocused ? ["selected"] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1 }}
              key={index}
            >
              <BottomMenu
                iconName={label.toString()}
                isCurrent={isFocused}
                label = {options.title}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

// const HomeStack = ({navigation}) => {
//     return (
//         <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
//           <Stack.Screen name="Home" component={Home}  /> 
//           <Stack.Screen name="ActivityNotification" component={ActivityNotification}  /> 
//           {/* <Stack.Screen name="AddPost" component={AddPost} />  */}
//           {/* <Stack.Screen name="EditUserProfile" component={Edit} />  */}
//           <Stack.Screen name="Feed" component={Feed} />  
//           {/* <Stack.Screen name="Pins" component={Pins} />   */}
//           <Stack.Screen name="UserDetails" component ={UserDetails} />
//           {/* <Stack.Screen name="PostDetails" component ={PostDetails} /> */}
//           <Stack.Screen name="HeroSearchFeed" component ={HeroSearchFeed} />
//           <Stack.Screen name="Login" component ={Login} />
//           <Stack.Screen name="Signout" component ={Signout} />
//         </Stack.Navigator>
//     );
// }

// const FeedStack = ({navigation}) => {
//   return (
//       <Stack.Navigator initialRouteName="Feed" screenOptions={{headerShown: false}}>
//         <Stack.Screen name="Home" component={Home}  /> 
//         <Stack.Screen name="AddPost" component={AddPost} /> 
        
//         <Stack.Screen name="EditUserProfile" component={EditUserProfile} /> 
//         <Stack.Screen name="Feed" component={Feed} />  
//         <Stack.Screen name="Pins" component={Pins} />  
//         <Stack.Screen name="UserDetails" component ={UserDetails} />
//         <Stack.Screen name="PostDetails" component ={PostDetails} />
//         <Stack.Screen name="HeroSearchFeed" component ={HeroSearchFeed} />
//         <Stack.Screen name="Login" component ={Login} />
//         <Stack.Screen name="Signout" component ={Signout} />
//       </Stack.Navigator>
//   );
// }

// const AddPostStack = ({navigation}) => {
//   return (
//       <Stack.Navigator initialRouteName="AddPost" screenOptions={{headerShown: false}}>
//         {/* <Stack.Screen name="Home" component={Home}  />  */}
//         <Stack.Screen name="AddPost" component={AddPost} /> 
        
//         <Stack.Screen name="EditUserProfile" component={EditUserProfile} /> 
//         <Stack.Screen name="Feed" component={Feed} />  
//         <Stack.Screen name="Pins" component={Pins} />  
//         <Stack.Screen name="UserDetails" component ={UserDetails} />
//         {/* <Stack.Screen name="PostDetails" component ={PostDetails} /> */}
//         <Stack.Screen name="HeroSearchFeed" component ={HeroSearchFeed} />
//         <Stack.Screen name="Login" component ={Login} />
//         <Stack.Screen name="Signout" component ={Signout} />
//       </Stack.Navigator>
//   );
// }

// const PinsStack = ({navigation}) => {
//   return (
//       <Stack.Navigator initialRouteName="Pins" screenOptions={{headerShown: false}}>
//         <Stack.Screen name="Home" component={Home}  /> 
//         <Stack.Screen name="AddPost" component={AddPost} /> 
        
//         <Stack.Screen name="EditUserProfile" component={EditUserProfile} /> 
//         <Stack.Screen name="Feed" component={Feed} />  
//         <Stack.Screen name="Pins" component={Pins} />  
//         <Stack.Screen name="UserDetails" component ={UserDetails} />
//         <Stack.Screen name="PostDetails" component ={PostDetails} />
//         <Stack.Screen name="HeroSearchFeed" component ={HeroSearchFeed} />
//         <Stack.Screen name="Login" component ={Login} />
//         <Stack.Screen name="Signout" component ={Signout} />
       
//       </Stack.Navigator>
//   );
// }

const UserDetailsStack = ({navigation}) => {
  return (
      <Stack.Navigator initialRouteName="UserDetails" screenOptions={{headerShown: false}}>
        <Stack.Screen name="UserDetails" component ={UserDetails} />
        <Stack.Screen name="EditUserProfile" component={EditUserProfile} /> 
      </Stack.Navigator>
  );
}

const AuthStack = ({navigation}) => {
  return (
      <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={TabNavigator}  /> 
        <Stack.Screen name="Login" component ={Login} />
        {/* <Stack.Screen name="Signout" component ={Signout} /> */}
      </Stack.Navigator>
  );
}



const TabNavigator = () => {
    return (
      <Tab.Navigator 
        screenOptions = {{
        "tabBarActiveTintColor": "green",
        "tabBarStyle": [{"display": "flex"},null],
        "headerShown" : false,
      }}

       
        options = {{unmountOnBlur : true , tabBarHideOnKeyboard : false }}
        tabBar={props => <TabBar {...props} />}
        initialRouteName = "Home"  
      >
        <Tab.Screen name="Home" component={Home} options = {tab1Options} />
        <Tab.Screen name="Feed" component={Feed} options = {tab2Options} />
        <Tab.Screen name="Post" component={AddPost} options = {tab3Options} />
        <Tab.Screen name="Brands" component={Brands} options = {tab4Options} />
        <Tab.Screen name="Pins" component={Pins} options = {tab5Options} />
        
      </Tab.Navigator>
    )
  }

  const HomeStackNavigator = () => {
    const [userAuth,setUserAuth] = React.useState(true)
    const userId = useContext(AuthContext)

    React.useEffect(()=>{
   //   console.log("navigator", userId)
    },[])
    return (
      <Stack.Navigator 
        initialRouteName = {userId === "" ? "Auth" : "Tab"}
        screenOptions={{headerShown: false}}
      >
        <Stack.Screen name="Auth" component={AuthStack} />
        <Stack.Screen name="Tab" component={TabNavigator} />
        <Stack.Screen name="Signout" component ={Signout} />
        <Stack.Screen name="PostDetails" component ={PostDetails} />
        <Stack.Screen name="PostLink" component ={PostLink} />
        <Stack.Screen name="UpdatePost" component={UpdatePost} /> 
        <Stack.Screen name="HeroSearchFeed" component ={HeroSearchFeed} />
        <Stack.Screen name="Search" component ={Search} />
        <Stack.Screen name="ActivityNotification" component ={ActivityNotification} />
        <Stack.Screen name="Brands" component ={Brands} />
        <Stack.Screen name="BrandsPage" component ={BrandsPage} />
      </Stack.Navigator>
    );
  }


  const Navigator = () => {




    return (
      <Drawer.Navigator
        screenOptions={{headerShown : false}}
        drawerContent = {props => <DrawerContent {...props}/>}
        >
        <Drawer.Screen name="HomeDrawer" component={HomeStackNavigator} />
        <Drawer.Screen name="UserDetails" component={UserDetailsStack} />
        {/* <Drawer.Screen name="EditUserProfile" component={EditUserProfile} /> */}
        <Drawer.Screen name="SignOut" component={Signout} />
      </Drawer.Navigator>
    );
  }

  
export default Navigator;

  const style = StyleSheet.create({
    tabContainer: {
      height: TAB_BAR_HEIGHT,
      shadowOffset: {
        width: 0,
        height: -1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 2.0,
      backgroundColor: background,
      borderTopRightRadius: 5,
      borderTopLeftRadius: 5,
      elevation: 5,
      position: "absolute",
      bottom: 0,
    },
    slider: {
      height: TAB_SLIDER_HEIGHT,
      position: "absolute",
      top: 0,
      left: 13,
      backgroundColor: TAB_SLIDER_COLOR,
      borderRadius: 10,
      width: 50
  },
  });
  

  const tabBarOptions = {
    activeTintColor : 'green',
    tabBarHideOnKeyboard : true
  }

  const tab1Options = {
    tabBarLabel: 'home',
    title : "Home",
    tabBarColor: 'orange',
    tabBarHideOnKeyboard : false
      }

  const tab2Options = {
  //  tabBarLabel: 'card-plus',
    tabBarLabel: 'book-open',
    title : "Feed",
    tabBarColor: 'purple',
    tabBarHideOnKeyboard : true,
    tabBarStyle : {display : 'none'}
  }

  const tab3Options = {
    tabBarLabel: 'clipboard-plus-outline',
    
    title : "Post",
    tabBarColor: 'purple',
    tabBarIcon: ({color}) => (<MaterialCommunityIcons name="home" color ="blue"  size={26}/>),
    tabBarBadge : 2,
    tabBarHideOnKeyboard : false
  }

  const tab5Options = {
    tabBarLabel: 'bookmark',
    title : "Pins",
    tabBarColor: 'purple',
    tabBarIcon: ({color}) => (<MaterialCommunityIcons name="home" color ="blue"  size={26}/>),
    tabBarBadge : 2,
    tabBarHideOnKeyboard : false
  }

  const tab4Options = {
    tabBarLabel: 'apps',
    title : "Brands",
    tabBarColor: 'purple',
    tabBarIcon: ({color}) => (<MaterialCommunityIcons name="home" color ="blue"  size={26}/>),
    tabBarBadge : 2,
    tabBarHideOnKeyboard : false
  }