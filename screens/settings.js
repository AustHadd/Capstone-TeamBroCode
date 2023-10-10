import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import profileIcon from '../assets/profile.png';

// initialize array of objects which represent the settings options
const settingsOptions = [
    { id: 1, name: 'Profile', icon: profileIcon },
    { id: 2, name: 'Notifications', icon: profileIcon }, // Change icon
    { id: 3, name: 'Privacy', icon: profileIcon }, // Change icon
    // add more settings options
];

export default function SettingsScreen() {
    return (
        <View style={styles.container}>

            {/* Settings Buttons */}
            {settingsOptions.map(setting => (
                <TouchableOpacity key={setting.id} style={styles.button} onPress={() => alert(`Selected: ${setting.name}`)}>
                    <Image source={setting.icon} style={styles.icon} />
                    <Text style={styles.buttonText}>{setting.name}</Text>
                </TouchableOpacity>
            ))}

            {/* Info Button */}
            <TouchableOpacity style={styles.button} onPress={() => alert('About button pressed')}>
                <Text style={styles.buttonText}>About</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'aquamarine',
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
