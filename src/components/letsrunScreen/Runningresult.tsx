import { Dimensions, Pressable, StyleSheet, Text, View, Image } from 'react-native'
import React  from 'react'
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import StatsCard from '../homeScreen/StatsCard';
import { useNavigation } from '@react-navigation/native';
import { useThemeChange } from '../../apptheme/ThemeChange';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const Runningresult = ({ route }: any) => {
    const navigation = useNavigation();
    const {
        mapRef,
        location,
        routeCoordinates,
        kcalBurn,
        time,
        speed,
        setSpeed,
        totalDistance,
        setkcalBurn,
        setTotalDistance,
        currentType,
        setRouteCoordinates,
        setTimeReached,
        setDistanceAchieve,
        setKcalAchieve
    }: any = route.params
    const useCustomTheme = useThemeChange()
    const runAgainHandler = () => {
        navigation.navigate('LetsRun' as never)
        setSpeed(0)
        setkcalBurn(0)
        setTotalDistance(0)
        setRouteCoordinates([])
        setTimeReached(false)
        setDistanceAchieve(false)
        setKcalAchieve(false)
    }
    const formatTime = (seconds: number) => {
        const hours = String(Math.floor(seconds / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
        const sec = String(seconds % 60).padStart(2, '0');
        return `${hours}:${minutes}:${sec}`;
    };
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
        <View style={{ backgroundColor: currentType === 'dark' ? useCustomTheme.darkMode.bgcolor : 'white' }}>
            <View style={{ ...styles.headerRow, backgroundColor: currentType === 'dark' ? useCustomTheme.darkMode.Header : useCustomTheme.lightMode.Header }}>
                <Text style={{ ...styles.headingText, color: currentType === 'dark' ? useCustomTheme.darkMode.Text : useCustomTheme.lightMode.Text }}>Daily Step Counter </Text>
                <Image
                    source={require('../../../assets/homeScreenAssets/step_icon.png')}
                    style={{ height: 30, width: 30 }}
                    resizeMode='contain'
                />
            </View>
            <View style={styles.container}>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: currentType === 'dark' ? useCustomTheme.darkMode.Text : useCustomTheme.lightMode.Text }}>Results</Text>
                </View>
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
                <View style={styles.container1}>
                    <StatsCard
                        isFirst={true}
                        icon={require('../../../assets/letsRunScreenAssets/speed_icon.png')}
                        unit={'speed m/s'}
                        value={speed}
                        letsRunScreen={true}
                    />
                    <StatsCard
                        isFirst={undefined}
                        icon={require('../../../assets/letsRunScreenAssets/timer_icon.png')}
                        unit={'time'}
                        value={formatTime(time)}
                        letsRunScreen={true}
                        timeReached={route.params.timeReached}
                    />
                    <StatsCard
                        icon={require('../../../assets/letsRunScreenAssets/calories_icon.png')}
                        unit={'kcal'}
                        isFirst={true}
                        value={(kcalBurn).toFixed(2)}
                        letsRunScreen={true}
                        kcalAchieve={route.params.kcalAchieve}
                    />
                    <StatsCard
                        icon={require('../../../assets/letsRunScreenAssets/distance_icon.png')}
                        unit={'km'}
                        isFirst={undefined}
                        value={(totalDistance / 1000).toFixed(2)}
                        letsRunScreen={true}
                        distanceAchieve={route.params.distanceAchieve}
                    />
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Pressable
                        style={[styles.button, { backgroundColor: currentType === 'dark' ? useCustomTheme.darkMode.Btn1 : useCustomTheme.darkMode.bmiButton }]}
                        onPress={runAgainHandler}>
                        <Text style={styles.textStyle}>Run Again</Text>
                    </Pressable>
                </View>
            </View >
        </View>
    )
}
export default Runningresult

const styles = StyleSheet.create({

    container: {
        margin: 10,
        paddingVertical: 15,
        borderRadius: 8,
        gap: 15,
        paddingHorizontal: 10,
        height: screenHeight
    },
    container1: {

        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        margin: 10,
        marginTop: 5,
        paddingVertical: 15,
        borderRadius: 8,
        gap: 15,
        paddingHorizontal: 10,
    },

    map: {
        width: screenWidth - 40,
        height: screenHeight / 2 - 20,
    }
    ,
    button: {
        backgroundColor: '#0fb4fc',
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 10,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 14
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        backgroundColor: '#e9eaee',
        width: '100%'
    },
    headingText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    }
})