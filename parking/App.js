import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Animated, Dimensions, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import selectedImage from './screens/ViewProfile'

import Home from './screens/home';
import SettingsScreen from './screens/SettingsScreen';              // (Nathan's responsibility throughout sprint 1 has been the settings feature)
import ViewProfile from './screens/ViewProfile';
import HomeScreen from './screens/HomeScreen';
import RushHourScreen from './screens/RushHourScreen';
import RatingScreen from './screens/RatingScreen';
import ColorBlindScreen from './screens/ColorBlindScreen';
import DarkModeScreen from './screens/DarkModeScreen';
import ParkingHistoryScreen from './screens/ParkingHistoryScreen';
import PrivacyScreen from './screens/PrivacyScreen';
import HelpCenterScreen from './screens/HelpCenterScreen';
import SearchScreen from './screens/SearchScreen';
import NotificationsScreen from './screens/NotificationsScreen';

 const Stack = createStackNavigator();



function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Parking availability" component={HomeScreen} options={{
        headerStyle: {
          backgroundColor: '#00853E',
        },
      }} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="ViewProfile" component={ViewProfile}/>
      <Stack.Screen name="RushHour" component={RushHourScreen} />
      <Stack.Screen name="RateUs" component={RatingScreen} />
      <Stack.Screen name="ColorBlindMode" component={ColorBlindScreen} />
      <Stack.Screen name="DarkMode" component={DarkModeScreen} />
      <Stack.Screen name="ParkingHistory" component={ParkingHistoryScreen} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyScreen} />
      <Stack.Screen name="HelpCenter" component={HelpCenterScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />       
    </Stack.Navigator>
  );
}

export default function App(){
  return (
         <NavigationContainer>
          <HomeStack/>
       </NavigationContainer>
  );
}

// =============================EVERYTHING ABOVE ORIGINAL CODE ======================

// import React, {useContext,useState, useEffect} from 'react';
// import { View, StyleSheet, Text } from 'react-native';
// import {Context} from "./assets/components/GlobalContext/GlobalContext.js/"

 
//   import React from "react";
// import { NavigationContainer } from '@react-navigation/native';
// import { View } from 'react-native';
// import Navigator from './assets/components/GlobalContext/Navigator.js'

 


//  import {Context, Provider} from "./assets/components/GlobalContext/GlobalContext.js"

// function App(props) {

//   return(
//     <Provider>
//       <View style={{flex:1}}>
//         <NavigationContainer>
//           {/* <Navigator /> */}
//         </NavigationContainer>
//       </View>
//     </Provider>

//     )





// }

// export default App;