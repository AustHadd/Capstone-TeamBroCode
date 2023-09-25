import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { Context } from "../assets/components/GlobalContext/GlobalContext.js"

import {Provider} from "../assets/components/GlobalContext/GlobalContext.js/"

function Landing(props){

  const globalContext = useContext(Context)
  const { isLoggedIn } = globalContext;

  return(
    <View>
      <Text>Hello User!</Text>
      <Text>You are {(isLoggedIn)? '' : "Not "}logged in</Text>
    </View>
  )



}

export default Landing;