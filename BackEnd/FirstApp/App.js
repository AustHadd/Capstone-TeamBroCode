// import React from "react";
// import { NavigationContainer } from '@react-navigation/native';
// import { View } from 'react-native';
// import Navigator from './components/navigation/navigator.js'
// import { Context, Provider } from "./components/globalContext/globalContext.js";
// import containers from "./components/styles/containers"

// function App(props) {

//   return(
//     <Provider>
//       <View style={{flex:1}}>
//         <NavigationContainer>
//           <Navigator/>
//         </NavigationContainer>
//       </View>
//     </Provider>

//     )
// //  backend\FirstApp\components\screens




// }

// export default App;


import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Animated, Dimensions, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import selectedImage from './components/screens/ViewProfile';

import Home from './components/screens/home';
import ViewProfile from './components/screens/ViewProfile';
import HomeScreen from './components/screens/HomeScreen';
import RushHourScreen from './components/screens/RushHourScreen';
import RatingScreen from './components/screens/RatingScreen';
import ColorBlindScreen from './components/screens/ColorBlindScreen';
import DarkModeScreen from './components/screens/DarkModeScreen';
import ParkingHistoryScreen from './components/screens/ParkingHistoryScreen';
import PrivacyScreen from './components/screens/PrivacyScreen';
import HelpCenterScreen from './components/screens/HelpCenterScreen';
import SearchScreen from './components/screens/SearchScreen';
import NotificationsScreen from './components/screens/NotificationsScreen';
import SettingsScreen from './components/screens/SettingsScreen';

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
      <Stack.Screen name="Settings" component={SettingsScreen} />
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
