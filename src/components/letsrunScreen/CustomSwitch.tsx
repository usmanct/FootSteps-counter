import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';

const CustomSwitch = ({ isEnabled, onValueChange }) => {
    const [thumbPosition] = useState(new Animated.Value(isEnabled ? 1 : 0));
    const trackWidth = 50; // Adjust this based on your design
    const thumbSize = 20;  // Adjust this based on your design

    const toggleSwitch = () => {
        const newValue = !isEnabled;
        onValueChange(newValue);

        Animated.timing(thumbPosition, {
            toValue: newValue ? 1 : 0,
            duration: 300,
            easing: Easing.out(Easing.exp),
            useNativeDriver: false,
        }).start();
    };

    const thumbTranslateX = thumbPosition.interpolate({
        inputRange: [0, 1],
        outputRange: [3, trackWidth - thumbSize -3],
    });

    return (
        <TouchableOpacity style={styles.container} onPress={toggleSwitch}>
            <View style={[styles.track, { backgroundColor: isEnabled ? '#2ecc71' : '#767577' }]}>
                <Animated.View
                    style={[
                        styles.thumb,
                        {
                            transform: [{ translateX: thumbTranslateX }],
                        },
                    ]}
                />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    track: {
        width: 50, // Track width
        height: 25, // Track height
        borderRadius: 15, // Border radius for track
        justifyContent: 'center',
        backgroundColor: '#767577',
        position: 'relative',
        overflow: 'hidden',
    },
    thumb: {
        width: 20, // Thumb width
        height: 20, // Thumb height
        borderRadius: 10, // Border radius for thumb
        backgroundColor: '#fff',
        position: 'absolute',
        top: 2.5, // Position thumb vertically centered
    },
});

export default CustomSwitch;
