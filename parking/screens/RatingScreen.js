import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import UNT1 from '../assets/UNTbackground1.png';

export default function Rating() {
    const [rating, setRating] = useState(0);

    const handleStarPress = (newRating) => {
        // Update the rating when a star is pressed.
        setRating(newRating);
    };

    const renderStars = (maxStars) => {
        const stars = [];
        for (let i = 1; i <= maxStars; i++) {
            stars.push(
                <TouchableOpacity
                    key={i}
                    onPress={() => handleStarPress(i)}
                >
                    <Image
                        source={i <= rating ? require('../assets/filledStar.png') : require('../assets/emptyStar.png')}
                        style={{ width: 30, height: 30 }}
                    />
                </TouchableOpacity>
            );
        }
        return stars;
    }

    return (
        <View style={{ flex: 1 }}>
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
                    {/* Your content goes here */}
                </View>
            </ImageBackground>

            <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
                paddingTop: 15,
                paddingBottom: 8
            }}>Rate Us</Text>

            <View style={{ flexDirection: 'row' }}>
                {renderStars(5)} {/* You can adjust the number of stars here */}
            </View>
        </View>
    );
}
