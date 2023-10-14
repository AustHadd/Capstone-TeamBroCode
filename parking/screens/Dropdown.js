import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';

const Dropdown = ({ options, selectedValue, onSelect }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleDropdown = () => {
    setIsVisible(!isVisible);
  };

  const handleSelect = (option) => {
    onSelect(option);
    toggleDropdown();
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleDropdown}>
        <Text>{selectedValue}</Text>
      </TouchableOpacity>

      <Modal
        visible={isVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={toggleDropdown}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleSelect(option)}
                style={{
                  borderRadius:20,
                  alignContent: 'center',
                  width:124,
                  backgroundColor:'gainsboro',
                  height:50,
                  borderColor: 'black',
                  padding: 10,
                  borderBottomWidth: 1,
                  borderTopLeftRadius:1,
                  borderBottomColor: 'black',
                }}
              >
                <Text>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity onPress={toggleDropdown}>
            <View style={{
                  borderRadius:20,
                  alignContent: 'center',
                  width:60,
                  backgroundColor:'gainsboro',
                  height:40,
                  borderColor: 'black',
                  padding: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: 'black',
                }}> 
            <Text>Close</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default Dropdown;
