import { StyleSheet, Text, View, Dimensions } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import MapView, { Marker, Polyline , PROVIDER_GOOGLE } from 'react-native-maps';
import { getDistance } from 'geolib';
import * as Location from 'expo-location';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const RunnerMap = ({
    totalDistance,
    setTotalDistance,
    mapRef, errorMsg,
    location,
    routeCoordinates,
    setErrorMsg,
    setRouteCoordinates,
    setLocation,
    speed,
    setSpeed 
}: any) => {
    if (!location) {
        return (
          <View style={styles.container}>
            <Text>Loading map...</Text>
          </View>
        );
      }


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
                    provider={PROVIDER_GOOGLE}
                >
                    <Marker coordinate={{
                        latitude: location?.coords?.latitude || 37.78825,
                        longitude: location?.coords?.longitude || -122.4324,
                    }} />
                    <Polyline
                        coordinates={routeCoordinates}
                        strokeColor="#2ecc71"
                        strokeWidth={4}
                    />
                </MapView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
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
