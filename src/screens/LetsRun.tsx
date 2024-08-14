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
  const [targetKcalBurn, settargetKcalBurn] = useState(0)
  const [totalDistance, setTotalDistance] = useState(0);
  const [IsRunning, setIsRunning] = useState<boolean>(false)
  const [location, setLocation] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<any>(null);
  const [routeCoordinates, setRouteCoordinates] = useState<any>([]);
  const [speed, setSpeed] = useState<any>(0);
  const [totalTime, setTotalTime] = useState(0); // In seconds
  const [runningState, setRunningState] = useState<boolean>(false)
  const mapRef = useRef<any>(null);



  useEffect(() => {
    Location.watchPositionAsync(
      { accuracy: Location.Accuracy.High, timeInterval: 1000, distanceInterval: 1 },
      (newLocation) => {
        // console.log('Location tracking---------', newLocation);
        const { latitude, longitude } = newLocation.coords;
        // Update location and route
        setLocation(newLocation);
       
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
  }, [])


  useEffect(() => {
    const getPermissions = async () => {
      try {
        const startTime = new Date();
        // Start tracking location
        if (IsRunning && runningState) {
          Location.watchPositionAsync(
            { accuracy: Location.Accuracy.High, timeInterval: 1000, distanceInterval: 1 },
            (newLocation) => {
              // console.log('Location tracking', newLocation);
              const { latitude, longitude } = newLocation.coords;
              const elapsedTime = (new Date() - startTime) / 1000; // In seconds
              setTotalTime(elapsedTime);
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
        }
      } catch (error) {
        setErrorMsg('Failed to get location permissions');
        console.error(error);
      }
    };

    getPermissions();
  }, [IsRunning, runningState]);



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
        setErrorMsg={setErrorMsg}
        setRouteCoordinates={setRouteCoordinates}
        setLocation={setLocation}
        speed={speed}
        setSpeed={setSpeed}
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
        speed={speed}
        setSpeed={setSpeed}
        totalDistance={totalDistance}
        targetKcalBurn={targetKcalBurn}
        settargetKcalBurn={settargetKcalBurn}
        setTotalDistance={setTotalDistance}
        runningState={runningState}
        setRunningState={setRunningState}
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