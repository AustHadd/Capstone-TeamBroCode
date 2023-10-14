import React from 'react';
import {StyleSheet,Button,View,SafeAreaView,Text,Alert, ImageBackground} from 'react-native'; // import libraries

const Separator = () => <View style={styles.separator} />; // provides seperation between each of the button classes

// main
const App = () => {
  return (
  <SafeAreaView style={{flex: 1}}>
    <View style={styles.container}>
    <ImageBackground style={styles.bgImage} source={{uri: 'https://i.imgur.com/H7Bd29y.png', }}> 
    <Text style={styles.textFont}>Select the Location You Wish to Park At.</Text>
    </ImageBackground>
        <Button style={buttonStyles.text}
          title="UNT - Main Campus"
          color="#32cd32"
          onPress={() => Alert.alert('MC Available Lots')}
        />
        <Button style={buttonStyles.text}
          title="UNT - Discovery Park"
          color="#008000"
          onPress={() => Alert.alert('DP Available Lots')}
        />
      </View>
      <Separator/>
      
  </SafeAreaView>
  
);
};

// button css
const buttonStyles = StyleSheet.create({
  button: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',

  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});

// global css 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    marginTop: 30,
    padding: 30,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  textFont:{
    top: 100,
    bottom: 0,
    left: 0,
    right: 100, 
    fontWeight: 'bold',
    color: 'black',
    fontSize: 30
  },
  imgWrapper: {
    height: 200,
    width: 200,
   // overflow: "hidden"
  },
  bgImage: {
    width: 372,
    height: 600,
    resizeMode: "contain",
  }
});

export default App;