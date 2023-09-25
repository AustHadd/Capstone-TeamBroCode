 import React, { Component, useState } from 'react';
import {Keyboard, View,KeyboardAvoidingView, Text, StyleSheet, ImageBackground, Image, StatusBar, TouchableOpacity, ScrollView, TextInput, Modal} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {imagesDATAURL} from './data';
import * as ImagePicker from "expo-image-picker"
import {MaterialIcons} from "@expo/vector-icons"
import DatePicker, {getFormatedDate} from 'react-native-modern-datepicker';
 
 import Dropdown from './Dropdown';

 
const ViewProfile = () => {

  const [selectedOption, setSelectedOption] = useState('Select an option');
  const dropdownOptions = ['Admin Access', 'Regular User'];
    const handleDropdownSelect = (option) => {
    setSelectedOption(option);
  };
  const [selectedImage, setSelectedImage] = useState(imagesDATAURL[0])
  

  const [name,setName] = useState("");
  const [editingName, setEditingName] = useState(false);

  const [email,setEmail] = useState("");
  const [editingEmail, setEditingEmail] = useState(false);
  
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const today = new Date();
  const startDate = getFormatedDate(
    today.setDate(today.getDate()+1),
    "YYYY/MM/DD"
  )
  const [selectedStartDate, setSelectedStartDate] = useState("01/01/1990");
  const [startedDate, setStartDate] = useState("12/12/2023");

  const handleChangeStartDate = (propDate) =>{
    setStartDate(propDate);
  }

  const handleOnPressStartDate = ()=>{
    setOpenStartDatePicker(!openStartDatePicker)
  }
  
const selectedImageObject = {
  source: {
    uri: selectedImage,
  },
  style: {
    height: 170,
    width: 170,
    borderRadius: 85,
    borderWidth: 2,
    borderColor: 'primary',
  },
};



 
  const handleImageSelection = async () => {
    Keyboard.dismiss();
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  console.log(result);

  if (!result.cancelled) {
    setSelectedImage(result.uri);
  }
};

 

{/* ============================================================================ */}
{/* ============================================================================ */}
// DATE 

  function renderDatePicker() {
  
    return (
    
    <Modal
      animationType='slide'
      transparent={true}
      visible={openStartDatePicker}
    >
      <View style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
      }}>
        <View style={{
          margin: 20,
          backgroundColor: 'primary',
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 20,
          padding: 35,
          width: "90%",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5
        }}>
          <DatePicker
            mode="calendar"
            minimumDate={startDate}
            selected={startedDate}
            onDateChanged={handleChangeStartDate}
            onSelectedChange={(date) => setSelectedStartDate(date)} // Fixed typo
            options={{
              backgroundColor: '#469ab6',
              textHeaderColor: 'black', // 
              textDefaultColor: 'white',
              selectedTextColor: 'white',
              mainColor:   'black', //'rgba(122,146,165,0.1)'
              textSecondaryColor: 'white',
              borderColor: "rgba(122,146,165,0.1)",
            }}
          />
          <TouchableOpacity onPress={handleOnPressStartDate}>
            <Text>close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

{/* ============================================================================ */}
  return (
<KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 22 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // Adjust the behavior as needed
    >
  <SafeAreaView style ={{
    flex:1,
    backgroundColor: 'white',
    paddingHorizontal:22
     }}>

  <ScrollView keyboardShouldPersistTaps="handled"> 
    <View style ={{
        alignItems: "center",
        marginVertical:22
      }}>
 <TouchableOpacity onPress={handleImageSelection}>
     <Image
      source={{ uri: selectedImage }}
     style={{
      height: 170,
      width: 170,
      borderRadius: 85,
      borderWidth: 2,
      borderColor: 'primary',
     }}
      />
 
    </TouchableOpacity>  

        <View style={{
          position: 'absolute',
          bottom: 0,
          right: 10,
          zIndex: 9999,
        }}/>
        <MaterialIcons
          name="photo-camera"
          size={32}
          color='primary'

        />   
       
        </View>
      <TouchableOpacity/>
    <View/>
     <View>
      
{/* ============================================================================ */}
{/* NAME */}
     {/* <SafeAreaView>  */}
    <View style={{
    flexDirection: 'column',
    marginBottom: 6,
  }}>
    <Text> Name</Text>
    <View style={{
      height: 44,
      width: '100%',
      borderColor: 'secondaryGrey',
      borderWidth: 1,
      borderRadius: 4,
      marginVertical: 6,
      justifyContent: 'center',
      paddingLeft: 8,
    }}>
      <TextInput
        placeholder="Robert Martins"
        value={name}
        onChangeText={(value) => setName(value)}
        style={{
          backgroundColor: 'transparent',
          borderWidth: 0,
          color: 'black',
        }}
      />
    </View>
  </View>
        {/* </SafeAreaView>  */}
{/* ============================================================================ */}
{/* EMAIL */}
{/* RoberDeMartin@gmail.com */}
    <View style={{
    flexDirection: 'column',
    marginBottom: 6,
  }}>
    <Text>Email</Text>
    <View style={{
      height: 44,
      width: '100%',
      borderColor: 'secondaryGrey',
      borderWidth: 1,
      borderRadius: 4,
      marginVertical: 6,
      justifyContent: 'center',
      paddingLeft: 8,
    }}>
      <TextInput
        placeholder="oberDeMartin@gmail.com "
        value={email}
        onChangeText={(value) => setEmail(value)}
        style={{
          backgroundColor: 'transparent',
          borderWidth: 0,
          color: 'black',
        }}
      />
    </View>
  </View>
{/* ============================================================================ */}
{/* PASSWORD */}
    <ScrollView>
      <View View style= {{
                height:44,
                width: "100%",
                borderColor: 'secondaryGrey',
                borderWidth: 1,
                borderRadius:4,
                marginVertical:6,
                justifyContent:"center",
                paddingLeft: 8
      }}>
        <Text>User Profile</Text>

        {/* Display the selected option */}
        {/* <Text>Selected  {selectedOption}</Text> */}

        {/* Use the Dropdown component */}
        <Dropdown
          options={dropdownOptions}
          selectedValue={selectedOption}
          onSelect={handleDropdownSelect}
        />
      </View>
    </ScrollView>



{/* ============================================================================ */}
{/* DATE OF BIRTH */}
        <View style = {{
            flexDirection: "Column",
            marginBottom: 6
           }}>
            <Text> Date or Birth</Text>
              <TouchableOpacity
                onPress={handleOnPressStartDate}
               style= {{
                height:44,
                width: "100%",
                borderColor: 'secondaryGrey',
                borderWidth: 1,
                borderRadius:4,
                marginVertical:6,
                justifyContent:"center",
                paddingLeft: 8
              }}>
                <Text>{selectedStartDate}</Text>
                
          </TouchableOpacity>
        </View>
     </View>
{/* ============================================================================ */}
{/* SAVE CHANGES  */}
     <TouchableOpacity style = {{ 
      backgroundColor: '#469ab6',
      height:44,
      borderRadius:6,
      alignItems: 'center',
      justifyContent: 'center',
     }}>
              <Text style = {{
                color: 'black'
         }}>Save changes</Text>
       </TouchableOpacity>
      {renderDatePicker()}
   </ScrollView>
  </SafeAreaView>
</KeyboardAvoidingView> 
  )
}
export default ViewProfile
 












//  import React, { Component, useState } from 'react';
// import { View, Text, StyleSheet, ImageBackground, Image, StatusBar, TouchableOpacity, ScrollView} from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import {imagesDATAURL} from './data';
// import * as ImagePicker from "expo-image-picker"
// import {MaterialIcons} from "@expo/vector-icons"
// // import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// const ViewProfile = () => {

//   const [selectedImage, setSelectedImage] = useState(imagesDATAURL[0])
//   const handleImageSelection = async() => {
//     let result = ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: true,
//       aspect: [4,3],
//       quality: 1
//     });

//     console.log(result);

//     if(!await result.cancelled) {
//       setSelectedImage(result.assets[0].uri)
//     }
//    };

//   return (
//    <SafeAreaView style ={{
//     flex:1,
//     backgroundColor: 'white',
//     paddingHorizontal:22
//    }}>

//    <ScrollView>
//     <View style ={{
//         alignItems: "center",
//         marginVertical:22
//       }}>
//         <TouchableOpacity
//              onPress={handleImageSelection}
//         />   
//         <Image
//           source = {{ uri: selectedImage}}
//           style={{
//             height: 170,
//             width: 170,
//             borderRadius: 85,
//             borderWidth: 2,
//             borderColor: 'primary'

//           }}
//         />   

//         <View style={{
//           position: 'absolute',
//           bottom: 0,
//           right: 10,
//           zIndex: 9999,
//         }}/>
//         <MaterialIcons
//           name="photo-camera"
//           size={32}
//           color='primary'

//         />   
       
//     </View>

//    </ScrollView>

//    </SafeAreaView>
//   )
// }
// export default ViewProfile