 import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import UNT1 from '../UNTbackground1.png'
export default class InitialPage extends Component {
  render() {
    return (
    <View style={{flex: 1}}>
  <ImageBackground source={UNT1} style={{
    flex: 1,
    width: '104%',
    height: '100%',
    justifyContent: 'center',
    resizeMode: 'contain',
    opacity: 0.3,
    padding: 10,
}}>
    <View>
        {/* Your content goes here */}
    </View>
</ImageBackground>


  <Text style= {{
          fontSize: 20,
          fontWeight: 'bold',
          paddingTop: 15,
          paddingBottom: 8
        }}> Dark Mode</Text>

  <Text style= {{}}>Dark Mode</Text>
</View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});