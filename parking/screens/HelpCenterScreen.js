import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import UNT1 from '../assets/UNTbackground1.png';

export default function HelpCenterScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                source={UNT1}
                style={{
                    flex: 1,
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    resizeMode: 'contain',
                    opacity: 0.3,
                    padding: 10,
                }}
            >
                <View>
                    {/* Your content */}
                    <Text style={styles.title}>About Us</Text>
                    <Text style={styles.content}>
                        Welcome to our parking availability application!
                        We are dedicated to making your parking experience easy and convenient.
                        Our app helps you find available parking spaces and provides real-time updates on parking availability.
                        We value your feedback and are committed to improving your parking experience.
                    </Text>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingTop: 15,
        paddingBottom: 8,
        color: 'black',
        textAlign: 'center',
    },
    content: {
        fontSize: 16,
        padding: 15,
        color: 'black',
        textAlign: 'left',
    },
});
