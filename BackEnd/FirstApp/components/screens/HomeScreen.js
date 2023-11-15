
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {MaterialIcons} from "@expo/vector-icons"
import { Image } from 'react-native';
import React, { useRef, useEffect } from 'react';
import { Animated } from 'react-native';
import {ImageBackground, ScrollView,SafeAreaView, StyleSheet, Text, Touchable, TouchableOpacity, View, Modal} from 'react-native';
import profile from '../MenuParkingImages/profile.png'
import menu from '../MenuParkingImages/menu.png'
import SettingsScreen from './SettingsScreen';
import SearchScreen from './SearchScreen';
import ColorBlindScreen from './ColorBlindScreen';
import DarkModeScreen from './DarkModeScreen';
import HelpCenterScreen from './HelpCenterScreen';
import ViewProfile from './ViewProfile';
import NotificationsScreen from './NotificationsScreen';
import ParkingHistoryScreen from './ParkingHistoryScreen';
import PrivacyScreen from './PrivacyScreen';
import RatingScreen from './RatingScreen';
import RushHourScreen from './RushHourScreen';
import HomeMenu from './home';
import selectedImage from './ViewProfile'; 
// import Navigator from './routes/homeStack';
import * as ImagePicker from 'expo-image-picker';
import { imagesDATAURL } from './data';
import viewProfile from './ViewProfile';
 import { AntDesign } from '@expo/vector-icons'

export default function Home() {
 const [currentTab, setCurrentTab] = useState("Home");
 //to get the current status of menu .. 
 const [showMenu, setShowMenu] = useState(false);
 //animated properties
  const offsetValue = useRef(new Animated.Value(0)).current;
//scale initially msut be 1  
 const scaleValue = useRef(new Animated.Value(1)).current;
 const closeButtonOffset = useRef(new Animated.Value(0)).current;
// const sharedImageSource = {uri:selectedImage};

   const cameraIcon = (
  <MaterialIcons
    name="photo-camera"
    size={32}
    color='primary'
  />
); 
  return (
    <SafeAreaView style={styles.container}>
    
      <View styles={{justifyContent: 'flex-start', padding: 15}}>      
    <Image
      source={profile}
      resizeMode='contain'
      style={{
          height:150,
          width:150,
          borderRadius:85,
          borderColor: 'primary',
          borderWidth:2,
          marginTop: 10
      }}

    />


   {/* <Image source={selectedImage} style={{
             width: 170, //profile photo of the user 
             height: 170,
             borderRadius: 85,
             borderWidth:2,
             borderColor:'primary',
            //  marginTop: 8,
             }}>   
             </Image>           */}
 
            <Text style={{
               fontSize:20,//Name of the user 
               fontWeight: 'bold',
               color: 'black',
               marginTop: 20,
             }}>Bob</Text>

           <TouchableOpacity>
            {TabButton(currentTab, setCurrentTab, "ViewProfile","person")}
           </TouchableOpacity>

{/* ===================================This section is for the profile options, name, photo, view profile, etc navigation ======================================== */} 
              
             {/* <TabButton.  */}
               <View style={{flexGrow: 1, marginTop: 10}}>  
                { 
                  <ScrollView style={{ 
                    flexGrow: 1, 
                    marginTop: 10 
                        }}>
                    {TabButton(currentTab, setCurrentTab, "Home", "home")}
                    {/* {TabButton(currentTab, setCurrentTab, "ViewProfile", home)} */}
                    {TabButton(currentTab, setCurrentTab, "Search", "search")}
                    {TabButton(currentTab, setCurrentTab, "Parking History", "parkingHistory")} 
                    {TabButton(currentTab, setCurrentTab, "Rush Hour", "")} 
                     {TabButton(currentTab, setCurrentTab, "Color Blind Mode", "eye")}
                    {TabButton(currentTab, setCurrentTab, "Dark Mode", "")} 
                    {TabButton(currentTab, setCurrentTab, "Settings", "settings")}
                     {TabButton(currentTab, setCurrentTab, "Sign Up", "sign-in")} 
                     {TabButton(currentTab, setCurrentTab, "Rate Us", "")} 
                     {/* {TabButton(currentTab, setCurrentTab, "Sign Up", privacy)}  */}
                    {TabButton(currentTab, setCurrentTab, "Help Center", "")} 
                    {TabButton(currentTab, setCurrentTab, "Notifications", "notifications")}
                   </ScrollView>
                }
            </View>

{/*==================================This sections is for menu buttons======================  */}
         

{/*==================================This sections is for menu buttons======================  */}
                <View>
                 {TabButton(currentTab, setCurrentTab, "LogOut")}
               </View>

      </View>
    {
      //Over Lay view...
    }
 {/* =============================================Seconds Layout of the main screen ================================= */}
    <Animated.View style = {{  //start of the second layout of the menu 
              flexGrow: 1,
              backgroundColor: 'white',
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              paddingHorizontal: 15,
              paddingVertical: 20,
              borderRadius: showMenu ? 15 : 0,
              //transforming view .. 
              transform: [
                {scale: 1}, //I have to change this to scaleValue
                {translateX: offsetValue}
              ]

             }}>
              {
                //maiin menu 
              }
              
              <TouchableOpacity onPress={()=>{
                //do actions here
                //scaling the view 
//=======================================================
                Animated.timing(scaleValue, {
                  toValue: showMenu ? 1 : 0.88,
                  duration: 600,
                  useNativeDriver: true
                })
                .start()
//=======================================================
                Animated.timing(offsetValue, {
                    //your random vale ...
                  toValue: showMenu ? 0 : 220,
                  duration: 300,
                  useNativeDriver: true
                })
                .start()
//=======================================================
                  Animated.timing(closeButtonOffset, {
                  toValue: !showMenu ?-30: 0,
                  duration: 300,
                  useNativeDriver: true
                })
                .start()
//=======================================================

                setShowMenu(!showMenu);
              }}>
                {/* this is the menu button style */}
                 <Image source={menu} style={{ 
                   width: 20,
                   height: 20,
                   tintColor: 'black',
                   marginTop: 15,
                  }}>   
                 </Image>
             
                  {/* home button*/}
              </TouchableOpacity>
{/* ============================================start This redirects all the tabs to differents pages of the files ================================================= */}
            {
              currentTab === 'Home' ? 
                (
                  <HomeMenu/>
                ):
                 currentTab === 'ViewProfile' ? 
                (
                  <ViewProfile/>
                ):
              currentTab === 'Settings' ? 
                (
                  <SettingsScreen/>
                ):
              currentTab === 'Rush Hour' ? 
               (
                 <RushHourScreen/>
               ):
               currentTab === 'Rate Us' ? 
                (
                  <RatingScreen/>
                ): 
              currentTab === 'Color' ?
               (
                <ColorBlindScreen/>
               ): 
              currentTab === 'Dark Mode' ? 
                (
                  <DarkModeScreen/>
                ):
              currentTab === 'Parking History' ?
               (
                <ParkingHistoryScreen/>
               ):
               currentTab === 'Color Blind Mode' ?
               (
                <ColorBlindScreen/>
               ):
              currentTab === 'Sign Up' ? 
               (
                <PrivacyScreen/>
               ):  
              currentTab === 'Help Center' ?
               (
                 <HelpCenterScreen/>
               ):
              currentTab === 'Notifications' ? 
                (
                  <NotificationsScreen/>
                ):
               
              currentTab === 'Search' ? 
                (
                  <SearchScreen/>
                ):
              (
                null
              )}
{/* ============================================end This redirects all the tabs to differents pages of the files ================================================= */}

               <Text style = {{
                fontSze: 20,
                fontWeight: 'bold',
                color: 'black',
                paddingTop: 20 
              }}>{currentTab}</Text>
      
              {/* the maing page from the home page */}         
             </Animated.View>  
  {/* =============================================End Seconds Layout of the main screen ================================= */}
    </SafeAreaView>
  );
  
}
//TO BE FIXED 
const TabButton = (currentTab, setCurrentTab, title, iconName) => {
  return (
    <TouchableOpacity onPress={() => setCurrentTab(title)}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 8,
          backgroundColor: currentTab === title ? "white" : "transparent",
          paddingLeft: 13,
          paddingRight: 35,
          borderRadius: 8,
          marginBottom: 15,
        }}
      >
        <MaterialIcons
          name={iconName}
          size={25} // Adjust the size as needed
          color={currentTab === title ? "black" : "white"}
          style={{ marginRight: 10 }} // Add some spacing between icon and text
        />
        <Text
          style={{
            fontSize: 15,
            fontWeight: "bold",
            color: "black",
            paddingLeft: 5, // Adjust the spacing between icon and text
          }}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

//============================== this controls the background from the menu drawer==================================
const styles = StyleSheet.create({
  container: {
   flex:1,
   backgroundColor: '#00853E',
   alignItems: 'flex-start',
   justifyContent: 'flex-start',
  },
});