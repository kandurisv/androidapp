import React, { useState } from "react";
import {View,TouchableOpacity,Dimensions,StyleSheet, Animated, Text} from 'react-native';
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import AddPost from './AddPost'
import EditUserProfile from './EditUserProfile'
import Feed from './Feed'
import Home from './Home'
import Login from './Login'
import Notifications from './Notifications'
import Signout from './Signout'
import TermsAndConditions from './TermsAndConditions'
import UserDetails from './UserDetails'
import PostDetails from './PostDetails'
import Validation from './Validation'


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const totalWidth = Dimensions.get("window").width;
const TAB_BAR_HEIGHT = 50
const TAB_ICON_SIZE = 24
const TAB_SLIDER_HEIGHT = 2
const TAB_SLIDER_COLOR = "#C51E3A"
const TAB_ACTIVE_COLOR = "#0080FF"
const TAB_INACTIVE_COLOR = "#888888"

const BottomMenu = ({ iconName, isCurrent , label}) => {
  return (
    <View
      style={{
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MaterialCommunityIcons
        name={iconName}
        size={TAB_ICON_SIZE}
        style={{ color: isCurrent ? TAB_ACTIVE_COLOR : TAB_INACTIVE_COLOR }}
      />
      <Text>{label}</Text>
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

const HomeStack = ({navigation}) => {
    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={Home}  /> 
          <Stack.Screen name="AddPost" component={AddPost} /> 
          <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} /> 
          <Stack.Screen name="EditUserProfile" component={EditUserProfile} /> 
          <Stack.Screen name="Feed" component={Feed} />  
          <Stack.Screen name="Notifications" component={Notifications} />  
          <Stack.Screen name="UserDetails" component ={UserDetails} />
          <Stack.Screen name="PostDetails" component ={PostDetails} />
          <Stack.Screen name="Validation" component ={Validation} />
          <Stack.Screen name="Login" component ={Login} />
          <Stack.Screen name="Signout" component ={Signout} />
        </Stack.Navigator>
    );
}

const FeedStack = ({navigation}) => {
  return (
      <Stack.Navigator initialRouteName="Feed" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home}  /> 
        <Stack.Screen name="AddPost" component={AddPost} /> 
        <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} /> 
        <Stack.Screen name="EditUserProfile" component={EditUserProfile} /> 
        <Stack.Screen name="Feed" component={Feed} />  
        <Stack.Screen name="Notifications" component={Notifications} />  
        <Stack.Screen name="UserDetails" component ={UserDetails} />
        <Stack.Screen name="PostDetails" component ={PostDetails} />
        <Stack.Screen name="Validation" component ={Validation} />
        <Stack.Screen name="Login" component ={Login} />
        <Stack.Screen name="Signout" component ={Signout} />
      </Stack.Navigator>
  );
}

const AddPostStack = ({navigation}) => {
  return (
      <Stack.Navigator initialRouteName="AddPost" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home}  /> 
        <Stack.Screen name="AddPost" component={AddPost} /> 
        <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} /> 
        <Stack.Screen name="EditUserProfile" component={EditUserProfile} /> 
        <Stack.Screen name="Feed" component={Feed} />  
        <Stack.Screen name="Notifications" component={Notifications} />  
        <Stack.Screen name="UserDetails" component ={UserDetails} />
        <Stack.Screen name="PostDetails" component ={PostDetails} />
        <Stack.Screen name="Validation" component ={Validation} />
        <Stack.Screen name="Login" component ={Login} />
        <Stack.Screen name="Signout" component ={Signout} />
      </Stack.Navigator>
  );
}

const NotificationsStack = ({navigation}) => {
  return (
      <Stack.Navigator initialRouteName="Notifications" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home}  /> 
        <Stack.Screen name="AddPost" component={AddPost} /> 
        <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} /> 
        <Stack.Screen name="EditUserProfile" component={EditUserProfile} /> 
        <Stack.Screen name="Feed" component={Feed} />  
        <Stack.Screen name="Notifications" component={Notifications} />  
        <Stack.Screen name="UserDetails" component ={UserDetails} />
        <Stack.Screen name="PostDetails" component ={PostDetails} />
        <Stack.Screen name="Validation" component ={Validation} />
        <Stack.Screen name="Login" component ={Login} />
        <Stack.Screen name="Signout" component ={Signout} />
      </Stack.Navigator>
  );
}

const UserDetailsStack = ({navigation}) => {
  return (
      <Stack.Navigator initialRouteName="UserDetails" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home}  /> 
        <Stack.Screen name="AddPost" component={AddPost} /> 
        <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} /> 
        <Stack.Screen name="EditUserProfile" component={EditUserProfile} /> 
        <Stack.Screen name="Feed" component={Feed} />  
        <Stack.Screen name="Notifications" component={Notifications} />  
        <Stack.Screen name="UserDetails" component ={UserDetails} />
        <Stack.Screen name="PostDetails" component ={PostDetails} />
        <Stack.Screen name="Validation" component ={Validation} />
        <Stack.Screen name="Login" component ={Login} />
        <Stack.Screen name="Signout" component ={Signout} />
      </Stack.Navigator>
  );
}


const TabNavigator = () => {
    return (
      <Tab.Navigator tabBarOptions = {tabBarOptions} tabBar={props => <TabBar {...props} />}>
        <Tab.Screen name="Home" component={HomeStack} options = {tab1Options} />
        <Tab.Screen name="Feed" component={FeedStack} options = {tab2Options} />
        <Tab.Screen name="Post" component={AddPostStack} options = {tab3Options} />
        <Tab.Screen name="Pins" component={NotificationsStack} options = {tab4Options} />
        <Tab.Screen name="User" component={UserDetailsStack} options = {tab5Options} />
      </Tab.Navigator>
    )
  }
  
export default TabNavigator;

  const style = StyleSheet.create({
    tabContainer: {
      height: TAB_BAR_HEIGHT,
      shadowOffset: {
        width: 0,
        height: -1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 2.0,
      backgroundColor: "white",
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
  }

  const tab1Options = {
    tabBarLabel: 'home',
    title : "Home",
    tabBarColor: 'orange',
      }

  const tab2Options = {
  //  tabBarLabel: 'card-plus',
    tabBarLabel: 'image-filter-tilt-shift',
    title : "Feed",
    tabBarColor: 'purple'
  }

  const tab3Options = {
    tabBarLabel: 'clipboard-plus-outline',
    
    title : "Post",
    tabBarColor: 'purple',
    tabBarIcon: ({color}) => (<MaterialCommunityIcons name="home" color ="blue"  size={26}/>),
    tabBarBadge : 2
  }

  const tab4Options = {
    tabBarLabel: 'heart-circle-outline',
    title : "Pins",
    tabBarColor: 'purple',
    tabBarIcon: ({color}) => (<MaterialCommunityIcons name="home" color ="blue"  size={26}/>),
    tabBarBadge : 2
  }

  const tab5Options = {
    tabBarLabel: 'account',
    title : "User",
    tabBarColor: 'purple',
    tabBarIcon: ({color}) => (<MaterialCommunityIcons name="home" color ="blue"  size={26}/>),
    tabBarBadge : 2
  }