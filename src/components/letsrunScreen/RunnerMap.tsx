import { StyleSheet, Text, View, Dimensions, ActivityIndicator } from 'react-native';
import React  from 'react';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const RunnerMap = ({
    mapRef, errorMsg,
    location,
    routeCoordinates,
    currentType
}: any) => {
    // useEffect(() => {
    //     console.log("mapref", mapRef)
    //     console.log("location", location)
    //     console.log("routeCoordinates", routeCoordinates)
    // }, [])
    const darkModeMapStyle = [
        {
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#212121"  // Darker background color
                }
            ]
        },
        {
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"  // Hide map icons
                }
            ]
        },
        {
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#e0e0e0"  // Light gray text for better contrast
                }
            ]
        },
        {
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#212121"  // Darker stroke color
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#616161"  // Slightly lighter gray for administrative boundaries
                }
            ]
        },
        {
            "featureType": "administrative.country",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#b0b0b0"  // Lighter gray for country labels
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#303030"  // Darker color for landscapes
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#424242"  // Darker color for points of interest
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#000000"  // Black or very dark color for water
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#616161"  // Darker color for roads
                }
            ]
        }
    ];
    return (
        <View style={{ ...styles.map, justifyContent: 'center', alignItems: 'center' }}>
            {errorMsg ? (
                <Text>{errorMsg}</Text>
            ) : (

                !location ?
                    <ActivityIndicator size="large" color="#9c46fc" /> :
                    <MapView
                        ref={mapRef}
                        style={styles.map}
                        liteMode={false}
                        initialRegion={{
                            latitude: location?.coords?.latitude || 37.78825,
                            longitude: location?.coords?.longitude || -122.4324,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                        }}
                        showsUserLocation={true}
                        provider={PROVIDER_GOOGLE}
                        customMapStyle={currentType === 'dark' ? darkModeMapStyle : []}
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
export default RunnerMap;
const styles = StyleSheet.create({
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
