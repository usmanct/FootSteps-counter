import { StyleSheet, Text, View, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const origin = { latitude: 37.3318456, longitude: -122.0296002 };
const destination = { latitude: 37.771707, longitude: -122.4053769 };
const GOOGLE_MAPS_APIKEY = 'AIzaSyB3qROyryNhLU9zE1pGs13HOtNCjRIjWoM';

const RunnerMap = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);


    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            // Get current position
            let location = await Location.getCurrentPositionAsync({});
            console.log('Location', location)
            setLocation(location.coords);
        })();
    }, []);


    return (
        <View style={styles.container}>
            <MapView style={styles.map}>
                <MapViewDirections
                    origin={origin}
                    destination={destination}
                    apikey={GOOGLE_MAPS_APIKEY}
                    mode='WALKING'
                    strokeWidth={3}
                    strokeColor="hotpink"
                />
            </MapView>
        </View >
    );
};

export default RunnerMap;

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    map: {
        width: screenWidth - 20,
        height: screenHeight / 2 - 10,
    },
    paragraph: {
        fontSize: 18,
        textAlign: 'center',
    },
});
