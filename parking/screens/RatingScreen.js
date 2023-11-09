import React, { Component } from 'react';   // fixed text component error : 11/9 3:28 pm
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import UNT1 from '../assets/UNTbackground1.png'

export default class InitialPage extends Component {
    // initialize component state with constructor
    constructor(props) {
        super(props);
        this.state = {
            rating: 0,  // initialize rating
        };
    }

    // arrow methods allow for automatic binding of current instance 

    handleStarPress = (newRating) => {
        this.setState({ rating: newRating });   // newRating = star selected by user
    };

    // renderStars dynamically generates a row of stars based on the provided maxStars value
    renderStars = (maxStars) => {
        const stars = [];
        for (let i = 1; i <= maxStars; i++) {
            stars.push(
                <TouchableOpacity
                    key={i}
                    onPress={() => this.handleStarPress(i)}
                >
                    <Image
                        source={i <= this.state.rating ? require('../assets/filledStar.png') : require('../assets/emptyStar.png')}
                        style={{ width: 30, height: 30 }}
                    />
                </TouchableOpacity>
            );
        }
        return stars;
    };

    render() {
        return (
            <View style={{ flex: 1 }}>

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
