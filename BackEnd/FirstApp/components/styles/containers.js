import React, { createContext, useState } from 'react';
import { StyleSheet, Dimensions } from "react-native";
 


const containers = (appSettings) => {
  return StyleSheet.create({
    outerPage: {
      backgroundColor: ("backgroundColor" in appSettings) ? appSettings['backgroundColor'] : "#ffffff",
      color: ("foregroundColor" in appSettings) ? appSettings['foregroundColor'] : "#ffffff"
    //   height: Dimensions.get('window').height,
    //   width: Dimensions.get('window').width,
    },
  });
};

export default containers;