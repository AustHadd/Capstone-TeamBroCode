import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';

export default class Regform extends React.Component {
  render() {
    return (
      <View style={styles.regform}>
        <Text style={styles.header}>Registration</Text>
        <TextInput style={styles.textentry} placeholder="First name" underlineColorAndroid={'transparent'} />
        <TextInput style={styles.textentry} placeholder="Last Name" underlineColorAndroid={'transparent'} />
        <TextInput style={styles.textentry} placeholder="email" underlineColorAndroid={'transparent'} />
        <TextInput style={styles.textentry} placeholder="password" secureTextEntry={true} underlineColorAndroid={'transparent'} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button1}>
            <Text style={styles.btntext1}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button2}>
            <Text style={styles.btntext2}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  regform: {
    alignSelf: 'stretch'
  },
  header: {
    fontSize: 40,
    color: 'black',
    paddingBottom: 10,
    marginBottom: 40,
    borderBottomColor: 'azure',
    borderBottomWidth: 1,
  },
  textentry: {
    borderColor: 'gray',
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 30,
    height: '8%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  button1: {
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#59cbbd',
  },
  btntext1: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  button2: {
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#59cbbd',
  },
  btntext2: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'right',
  },
});
