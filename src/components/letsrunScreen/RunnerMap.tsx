import { StyleSheet, Text, View, Dimensions } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';


const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const RunnerMap = ({ totalDistance, setTotalDistance, mapRef, errorMsg, location, routeCoordinates }: any) => {




    // useEffect(() => {
    //     const getPermissions = async () => {
    //         try {
    //             let { status } = await Location.requestForegroundPermissionsAsync();
    //             if (status !== 'granted') {
    //                 setErrorMsg('Permission to access location was denied');
    //                 return;
    //             }

    //             // Start tracking location
    //             Location.watchPositionAsync(
    //                 { accuracy: Location.Accuracy.High, timeInterval: 1000, distanceInterval: 1 },
    //                 (newLocation) => {
    //                     const { latitude, longitude } = newLocation.coords;

    //                     // Update location and route
    //                     setLocation(newLocation);
    //                     setRouteCoordinates((prev: any) => {
    //                         const newCoordinates = [...prev, { latitude, longitude }];

    //                         // Calculate the distance covered
    //                         if (newCoordinates.length > 1) {
    //                             const lastPoint = newCoordinates[newCoordinates.length - 2];
    //                             const distance = getDistance(lastPoint, { latitude, longitude });
    //                             setTotalDistance(prevDistance => prevDistance + distance);
    //                         }

    //                         return newCoordinates;
    //                     });

    //                     // Center map on the new location
    //                     if (mapRef.current) {
    //                         mapRef.current.animateToRegion({
    //                             latitude,
    //                             longitude,
    //                             latitudeDelta: 0.01,
    //                             longitudeDelta: 0.01,
    //                         });
    //                     }
    //                 }
    //             );
    //         } catch (error) {
    //             setErrorMsg('Failed to get location permissions');
    //         }
    //     };

    //     getPermissions();
    // }, []);

    return (
        <View style={styles.container}>
            {errorMsg ? (
                <Text>{errorMsg}</Text>
            ) : (
                <MapView
                    ref={mapRef}
                    style={styles.map}
                    initialRegion={{
                        latitude: location?.coords?.latitude || 37.78825,
                        longitude: location?.coords?.longitude || -122.4324,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                    showsUserLocation={true}
                >
                    <Marker coordinate={{
                        latitude: location?.coords?.latitude || 37.78825,
                        longitude: location?.coords?.longitude || -122.4324,
                    }} />
                    <Polyline
                        coordinates={routeCoordinates}
                        strokeColor="#000"
                        strokeWidth={6}
                    />
                </MapView>
            )}
            {/* <View style={styles.distanceContainer}>
                <Text style={styles.distanceText}>
                    Distance Covered: {(totalDistance / 1000).toFixed(2)} km
                </Text>
            </View> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor:'yellow'
    },
    map: {
        width: screenWidth,
        height: screenHeight / 2 - 20,
    },
    distanceContainer: {
        padding: 10,
    },
    distanceText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default RunnerMap;
