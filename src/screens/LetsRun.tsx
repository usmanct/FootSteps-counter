import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Header from '../components/Header'
import RunnerMap from '../components/letsrunScreen/RunnerMap'
import RunnerActions from '../components/letsrunScreen/RunnerActions'
import * as Location from 'expo-location';
import { getDistance } from 'geolib';
const LetsRun = () => {

  const [timeDuration, settimeDuration] = useState({
    h: 0,
    m: 0
  })
  const [distanceCovered, setDsitanceCovered] = useState(0)
  const [kcalBurn, setkcalBurn] = useState(0)
  const [totalDistance, setTotalDistance] = useState(0);
  const [IsRunning, setIsRunning] = useState<boolean>(false)
  const [location, setLocation] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<any>(null);
  const [routeCoordinates, setRouteCoordinates] = useState<any>([]);
  const mapRef = useRef<any>(null);
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
            setRouteCoordinates((prev: any) => {
              const newCoordinates = [...prev, { latitude, longitude }];

              // Calculate the distance covered
              if (newCoordinates.length > 1) {
                const lastPoint = newCoordinates[newCoordinates.length - 2];
                const distance = getDistance(lastPoint, { latitude, longitude });
                setTotalDistance(prevDistance => prevDistance + distance);
              }

              return newCoordinates;
            });

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
      <Header />
      <RunnerMap
        totalDistance={totalDistance}
        setTotalDistance={setTotalDistance}
        mapRef={mapRef}
        errorMsg={errorMsg}
        location={location}
        routeCoordinates={routeCoordinates}
      />
      <RunnerActions
        timeDuration={timeDuration}
        settimeDuration={settimeDuration}
        distanceCovered={distanceCovered}
        setDsitanceCovered={setDsitanceCovered}
        kcalBurn={kcalBurn}
        setkcalBurn={setkcalBurn}
        IsRunning={IsRunning}
        setIsRunning={setIsRunning}
        mapRef={mapRef}
        errorMsg={errorMsg}
        location={location}
        routeCoordinates={routeCoordinates}
      />
    </View>
  )
}

export default LetsRun

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,

  },

})