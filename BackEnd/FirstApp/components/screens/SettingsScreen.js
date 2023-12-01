// 11/9 4:10pm
// updated to add navigation to 'about' button which takes the user to the HelpCenterScreen

// test with newer version of the front-end
import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native';
import UNT1 from '../assets/UNTbackground1.png'
import profileIcon from '../assets/profile.png'

// initialize array of objects which represent the settings options
const settingsOptions = [
    { id: 1, name: 'Profile' },  
    { id: 2, name: 'Notifications' }, // Change icon
    { id: 3, name: 'Privacy', }, // Change icon
    // add more settings options
];


export default function SettingsScreen() {

    const navigation = useNavigation();
    const navigateToHelpCenter = () => {
        navigation.navigate('HelpCenter');
    };

    return (
        <View style={styles.container}>

            {settingsOptions.map(setting => (
                <TouchableOpacity key={setting.id} style={styles.button} onPress={() => alert(`Selected: ${setting.name}`)}>
                    <Image source={setting.icon} style={styles.icon} />
                    <Text style={styles.buttonText}>{setting.name}</Text>
                </TouchableOpacity>
            ))}

            <TouchableOpacity style={styles.button} onPress={navigateToHelpCenter}>
                <Text style={styles.buttonText}>About</Text>
            </TouchableOpacity>
        </View>
    );
}


// old styling colors -- will change
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        padding: 10,
        borderRadius: 8,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        fontSize: 15,
        fontWeight: 'bold',
        paddingLeft: 10,
        color: 'black'
    },
    icon: {
        width: 25,
        height: 25
    }
});