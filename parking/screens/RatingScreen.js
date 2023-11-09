// fixed text component error 11/9 2:30pm
// updated to remove extra {} that continued to produce text component errors 11/9 3:53pm
//     - updated styles and formatting for the rating stars

import React, { Component } from 'react';  
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
                        style={styles.starImage}
                    />
                </TouchableOpacity>
            );
        }
        return stars;
    };

    handleSubmission = () => {
        // Implement backend submission logic here
        console.log('Submit button pressed. Rating:', this.state.rating);
        
    };

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground
                    source={UNT1}
                    style={styles.imageBackground}
                >

                </ImageBackground>

                <Text style={styles.header}>Ratings</Text>

                <View style={styles.ratingContainer}>
                    {this.renderStars(5)}
                </View>

                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={this.handleSubmission}
                >
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingTop: 15,
        paddingBottom: 8,
    },
    imageBackground: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        resizeMode: 'contain',
        opacity: 0.3,
        padding: 10,
    },
    ratingContainer: {
        alignItems: 'center',
        paddingTop: 50,
    },
    starImage: {
        width: 30,
        height: 30,
    },
    submitButton: {
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    ratingContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 50,
    },
});
