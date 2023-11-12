// App.js
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import SearchBar from './SearchBar';

const App = () => {
  const handleSearch = (searchText) => {
    console.log(`Searching for: ${searchText}`);
    // You can perform further actions based on the search text
  };

  return (
    <View style={styles.container}>
      {/* Add your image component */}
      <Image
        source={require('/Users/habibojoye/SearchBar/image.png')}  // Update the path to your image
        style={styles.image}
      />

      <Text>Search For Available Parking Lots</Text>
      <SearchBar onSearch={handleSearch} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: -80,
  },
  image: {
    width: '40%',  // Adjust the width as needed
    height: 200, // Adjust the height as needed
    marginBottom: 20, // Add margin to separate the image from other content
  },

});

export default App;
