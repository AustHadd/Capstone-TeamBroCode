import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Animated, Dimensions, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
 
import Home from './screens/home'

const Tab = createMaterialTopTabNavigator();

export default function App(){
  return (
         <NavigationContainer>
          <Tab.Navigator>
               <Tab.Screen
                 name="Home"
                 component={Home}
                 options={{ tabBarLabel: 'Home' }}
               />
          </Tab.Navigator>
       </NavigationContainer>
  );
}



const styles = StyleSheet. create({
  container: {
    flex: 1,
    backgroundColor:'#',
    alignItems:'center',
    justifyContent: 'center',
  },
});