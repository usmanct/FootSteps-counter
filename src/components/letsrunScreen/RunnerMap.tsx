import { StyleSheet, Text, View, Dimensions } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import MapView, { Marker, Polyline, Callout } from 'react-native-maps';
import * as Location from 'expo-location';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const RunnerMap = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [routeCoordinates, setRouteCoordinates] = useState([]);
    const mapRef = useRef(null);

    useEffect(() => {
        const getPermissions = async () => {
            try {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setErrorMsg('Permission to access location was denied');
                    return;
                }

                // Start tracking location
                Location.watchPositionAsync(
                    { accuracy: Location.Accuracy.High, timeInterval: 1000, distanceInterval: 1 },
                    (newLocation) => {
                        const { latitude, longitude } = newLocation.coords;

                        // Update location and route
                        setLocation(newLocation);
                        setRouteCoordinates((prev) => [...prev, { latitude, longitude }]);

                        // Center map on the new location
                        if (mapRef.current) {
                            mapRef.current.animateToRegion({
                                latitude,
                                longitude,
                                latitudeDelta: 0.01,
                                longitudeDelta: 0.01,
                            });
                        }
                    }
                );
            } catch (error) {
                setErrorMsg('Failed to get location permissions');
            }
        };

        getPermissions();
    }, []);

    return (
        <View style={styles.container}>
            {errorMsg ? (
                <Text>{errorMsg}</Text>
            ) : (
                <MapView
                    ref={mapRef}
                    style={styles.map}
                    provider={MapView.PROVIDER_GOOGLE}
                    initialRegion={{
                        latitude: location?.coords?.latitude || 37.78825,
                        longitude: location?.coords?.longitude || -122.4324,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                    showsUserLocation={true}
                >
                    {location && (
                        <>
                            <Marker coordinate={location.coords}>
                                <Callout>
                                    <Text>Current Location</Text>
                                </Callout>
                            </Marker>

                            <Polyline
                                coordinates={routeCoordinates}
                                strokeColor="#FF0000"
                                strokeWidth={5}
                            />
                        </>
                    )}
                </MapView>
            )}
        </View>
    );
};

export default RunnerMap;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
    },
    map: {
        width: screenWidth,
        height: screenHeight / 2 - 10,
    },
    calloutView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 200,
    },
    calloutText: {
        fontSize: 14,
        textAlign: 'center',
    },
});
