
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import React, { useRef, useEffect } from 'react';
import { Animated } from 'react-native';
import {ImageBackground, ScrollView ,Image,SafeAreaView, StyleSheet, Text, Touchable, TouchableOpacity, View} from 'react-native';
import profile from '../assets/profile.png'
import home from '../assets/home.png'
import notifications from '../assets/notifications.png'
import settings from '../assets/settings.png'
import search from '../assets/search.png'
import rushHour from '../assets/rushHour.png'
import rating from '../assets/rating.png'
import colorBlind from '../assets/colorBlind.png'
import darkMode from '../assets/darkMode.png'
import parkingHistory from '../assets/parkingHistory.png'
import privacy from '../assets/privacy.png'
import helpCenter from '../assets/helpCenter.png'
import menu from '../assets/menu.png'

// import Navigator from './routes/homeStack';
 


export default function App() {
 const [currentTab, setCurrentTab] = useState("Home");
 //to get the current status of menu .. 
 const [showMenu, setShowMenu] = useState(false);
 //animated properties

 const offsetValue = useRef(new Animated.Value(0)).current;
//scale initially msut be 1  
 const scaleValue = useRef(new Animated.Value(1)).current;
 const closeButtonOffset = useRef(new Animated.Value(0)).current;


  return (
    <SafeAreaView style={styles.container}>
    
      <View styles={{justifyContent: 'flex-start', padding: 15}}>      
            <Image source={profile} style={{
             width: 60, //profile photo of the user 
             height: 60,
             borderRadius: 10,
             marginTop: 8,
             }}>   
             </Image>
 
            <Text style={{
               fontSize:20,//Name of the user 
               fontWeight: 'bold',
               color: 'black',
               marginTop: 20,
             }}>Nicolas Hidalgo</Text>

           <TouchableOpacity>
             <Text style ={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 12,
              paddingRight: 1,
              paddingHorizontal: 32,
              borderRadius: 4,
              borderWidth: 2,
              borderBottomRightRadius: 2,
              borderColor: 'black',
            }}>view profile</Text>
           </TouchableOpacity>

{/* ===================================This section is for the profile options, name, photo, view profile, etc navigation ======================================== */} 
              
             {/* <TabButton.  */}
               <View style={{flexGrow: 1, marginTop: 10}}>  
                { 
                  <ScrollView style={{ 
                    flexGrow: 1, 
                    marginTop: 10 
                        }}>
                    {TabButton(currentTab, setCurrentTab, "Home", home)}
                    {TabButton(currentTab, setCurrentTab, "Rush Hour", rushHour)} 
                    {TabButton(currentTab, setCurrentTab, "Color Blind Mode", colorBlind)}
                    {TabButton(currentTab, setCurrentTab, "Dark Mode", darkMode)} 
                    {TabButton(currentTab, setCurrentTab, "Parking History", parkingHistory)} 
                    {TabButton(currentTab, setCurrentTab, "Privacy and policy", privacy)} 
                    {TabButton(currentTab, setCurrentTab, "Help Center", helpCenter)} 
                    {TabButton(currentTab, setCurrentTab, "Search", search)}
                    {TabButton(currentTab, setCurrentTab, "Notifications", notifications)}
                    {TabButton(currentTab, setCurrentTab, "Rate Us", rating)}
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
                  duration: 300,
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
                  toValue: !showMenu ?-30 : 0,
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
                   marginTop: 40,
                  }}>   
                 </Image>
             
                  {/* home button*/}
              </TouchableOpacity>
               <Text style = {{
                fontSize: 20,
                fontWeight: 'bold',
                color: 'black',
                paddingTop: 20 
              }}>{currentTab}</Text>
      
              {/* the maing page from the home page */}
                  <Image source={{uri: 'https://reactjs.org/logo-og.png'}} style={{
                   width: '100%',
                   height: 300,
                   borderRadius:15, 
                   marginTop: 20
              }}></Image>
                    <Text style= {{
                      fontSize: 20,
                      fontWeight: 'bold',
                      paddingTop: 15,
                      paddingBottom: 8
                    }}> JENNA </Text>

                    <Text style= {{
                     
                     }}>This testing works perfectly</Text>
             </Animated.View>  
  {/* =============================================End Seconds Layout of the main screen ================================= */}
    </SafeAreaView>
  );
  
}
//TO BE FIXED 
const TabButton = (currentTab, setCurrentTab, title, image) =>{
  return (
     <TouchableOpacity onPress={()=>{ 
      if(title == "LogOut") {
        //do thte stuff 
      }else {
      setCurrentTab(title)
      }
     }}>
     {/* ========================================this manipulates the buttoms from the menu =============================== */}
        <View style = {{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 8,
                backgroundColor: currentTab == title ? 'white' : 'transparent',
                 paddingLeft: 13,
                paddingRight: 35,
                borderRadius:8,
                marginBottom: 15
        }}>
         <Image source={image} style={{
              width: 25,
              height: 25,
              borderRadius: 10,
              marginTop: 8,
             }}></Image>
         <Text style={{
            fontSize:15,
            fontWeight: 'bold',
            paddingLeft: 15
          }}>{title}</Text>
       </View>
 {/* ========================================this manipulates the buttoms from the menu =============================== */}

    </TouchableOpacity>
  )
}

//============================== this controls the background from the menu drawer==================================
const styles = StyleSheet.create({
  container: {
   flex:1,
   backgroundColor: 'aquamarine',
   alignItems: 'flex-start',
   justifyContent: 'flex-start',
  },
});

// const name = StyleSheet.create({
//               fontSize:20,
//               fontWeight: 'bold',
//               color: 'black',
//               marginTop: 20,
// });