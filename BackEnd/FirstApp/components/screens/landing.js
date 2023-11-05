import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { Context } from "../globalContext/globalContext.js"
  import containers from "../styles/containers" 

 

function Landing(props){

  const globalContext = useContext(Context)
  const { isLoggedIn, appSettings} = globalContext;
  
  return(
    <View style ={containers(appSettings).outerPage}>
      <Text>Hello User!</Text>
      <Text>You are grewgerwgwre{(isLoggedIn)? '' : "Not "}logged in</Text>
    </View>
  )



}

export default Landing;
