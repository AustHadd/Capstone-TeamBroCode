 import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
  import Onboarding from '../assets/Onboarding';

export default class InitialPage extends Component {
  render() {
    return (
      <View style={styles.container}>
         <Onboarding></Onboarding>
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