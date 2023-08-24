 import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, StatusBar} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import UNT1 from '../assets/UNTbackground1.png'
export default class InitialPage extends Component {
  render() {
    return (
    <View style={{flex: 1}}>

      <SafeAreaView style={styles.container}>
        <StatusBar style= "auto"/>
       </SafeAreaView>

      
 
</View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});