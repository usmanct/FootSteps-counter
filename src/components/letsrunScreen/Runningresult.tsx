import { Dimensions, Pressable, StyleSheet, Text, View , Image } from 'react-native'
import React, { useEffect, useRef } from 'react'
import Header from '../Header'
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import StatsCard from '../homeScreen/StatsCard';
import { useNavigation } from '@react-navigation/native';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const Runningresult = ({ route }: any) => {
    const navigation = useNavigation();
    const {
        mapRef,
        errorMsg,
        location,
        routeCoordinates,
        kcalBurn,
        distanceCovered,
        time,
        speed,
        setSpeed,
        totalDistance,
        setkcalBurn,
        setTotalDistance,
    }: any = route.params


    // useEffect(()=>{
    //     if (mapRef.current) {
    //         mapRef.current.takeSnapshot({
    //           width: 300,      // optional, when omitted the view-width is used
    //           height: 300,     // optional, when omitted the view-height is used
    //           region: null,    // iOS only, optional region to render
    //           format: 'png',   // image formats: 'png', 'jpg' (default: 'png')
    //           quality: 0.8,    // image quality: 0..1 (only relevant for jpg, default: 1)
    //           result: 'file'   // result types: 'file', 'base64' (default: 'file')
    //         }).then((uri: any) => {
    //           setMapSnapshot(uri);
    //         }).catch((error: any) => {
    //           console.error('Error taking snapshot', error);
    //         });
    //       }
    // } , [])

    const runAgainHandler = () => {
        navigation.navigate('LetsRun' as never)
        setSpeed(0)
        setkcalBurn(0)
        setTotalDistance(0)
    }

    const formatTime = (seconds: number) => {
        const hours = String(Math.floor(seconds / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
        const sec = String(seconds % 60).padStart(2, '0');
        return `${hours}:${minutes}:${sec}`;
    };


    return (<>
        <Header />
        <View style={styles.container}>
            <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Results</Text>
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
            <StatsCard isFirst={true} icon={<Ionicons name="speedometer" size={14} color="blue" />} unit={'speed m/s'} value={speed} />
            <StatsCard icon={<AntDesign name="clockcircleo" size={14} color="red" />} value={formatTime(time)} unit={'time'} isFirst={undefined} />
            <StatsCard icon={<SimpleLineIcons name="fire" size={14} color="red" />} value={(kcalBurn).toFixed(2)} unit={'kcal'} isFirst={undefined} />
            <StatsCard icon={<Octicons name="location" size={14} color="green" />} value={(totalDistance / 1000).toFixed(2)} unit={'km'} isFirst={undefined} />
        </View>
        <View style={{ alignItems: 'center' }}>
            <Pressable
                style={[styles.button]}
                onPress={runAgainHandler}>
                <Text style={styles.textStyle}>Run Again</Text>
            </Pressable>
        </View>
    </View >
    </>
    )
}
export default Runningresult

const styles = StyleSheet.create({

    container: {
        backgroundColor: 'white',
        margin: 10,
        paddingVertical: 15,
        borderRadius: 8,
        gap: 15,
        paddingHorizontal: 10,

    },
    container1: {

        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'white',
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
    },
    button: {
        backgroundColor: '#0cf249',
        paddingHorizontal: 50,
        paddingVertical: 15,
        borderRadius: 50,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10,
        // width: '100%',
        justifyContent: 'center',
        // alignItems: 'center',
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.8,
        // shadowRadius: 2,
        // elevation: 5,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
})