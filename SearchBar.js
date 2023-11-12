// SearchBar.js
import React, { useState } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

const SearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    // You can perform search-related logic here
    onSearch(searchText);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
        onSubmitEditing={handleSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10, // Adjust padding if necessary
    paddingBottom: 250, // Adjust paddingBottom to lower or raise the search bar
  },
  input: {
    height: 40,
    borderColor: 'green',
    borderWidth: 10,
    paddingLeft: 10,
    borderRadius: 80,
    width: '80%'
    
  },
});

export default SearchBar;


