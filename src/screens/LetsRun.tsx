import { StyleSheet, Image, View, Text, ScrollView } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import Header from '../components/Header'
import RunnerMap from '../components/letsrunScreen/RunnerMap'
import RunnerActions from '../components/letsrunScreen/RunnerActions'
import * as Location from 'expo-location';
import { getDistance } from 'geolib';
import { AppContext } from '../contextApi/AppContext'
import { useThemeChange } from '../apptheme/ThemeChange'
import OverLayScreen from '../components/OverLayScreen'
const LetsRun = () => {

  const [timeDuration, settimeDuration] = useState({
    h: 0,
    m: 1
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
  const [timeReached, setTimeReached] = useState(false);
  const [showOverLay, setShowOverLay] = useState(false)
  const { currentType }: any = useContext(AppContext)
  const useCustomTheme = useThemeChange()

  useEffect(() => {
    const getPermissionsAndTrackLocation = async () => {
      try {
        // Request location permissions
        let { status } = await Location.requestForegroundPermissionsAsync();
        console.log('Location Status', status)
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }

        // Start tracking location
        console.log('Location')
        Location.watchPositionAsync(
          { accuracy: Location.Accuracy.High, timeInterval: 1000, distanceInterval: 1 },
          (newLocation) => {
            setLocation(newLocation);
            const { latitude, longitude } = newLocation.coords;

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
        console.error(error);
      }
    };

    getPermissionsAndTrackLocation();
    console.log('----------------------------------------------------------------')
  }, []);
  // useEffect(() => {
  //   const simulateMovementAndCalculate = () => {
  //     let counter = 0;
  //     const startTime: any = new Date();

  //     const interval = setInterval(() => {
  //       counter += 1;

  //       const newLatitude = location?.coords?.latitude + (counter * 0.0001);
  //       const newLongitude = location?.coords?.longitude + (counter * 0.0001);

  //       const newLocation = {
  //         latitude: newLatitude,
  //         longitude: newLongitude,
  //       };
  //       setRouteCoordinates((prev: any) => {
  //         const newCoordinates = [...prev, newLocation];

  //         // Calculate the distance covered
  //         if (newCoordinates.length > 1) {
  //           const lastPoint = newCoordinates[newCoordinates.length - 2];
  //           const distance = getDistance(lastPoint, { latitude: newLatitude, longitude: newLongitude });
  //           setTotalDistance(prevDistance => prevDistance + distance);
  //         }

  //         return newCoordinates;
  //       });

  //       // Calculate elapsed time
  //       const currentTime : any = new Date()
  //       const elapsedTime = (currentTime - startTime) / 1000; // In seconds
  //       setTotalTime(pre => pre+ elapsedTime);
  //       console.log("elapsed Time" , elapsedTime)

  //       // Center map on the new location
  //       if (mapRef.current) {
  //         mapRef.current.animateToRegion({
  //           ...newLocation,
  //           latitudeDelta: 0.01,
  //           longitudeDelta: 0.01,
  //         });
  //       }
  //       // Convert timeDuration to seconds
  //       const targetTimeInSeconds = (timeDuration.h * 3600) + (timeDuration.m * 60);
  //       console.log("targetTimeInSeconds" , targetTimeInSeconds)
  //       // Stop after reaching the target time

  //       if (totalTime >= targetTimeInSeconds) {
  //         setIsRunning(false)
  //         setRunningState(false)
  //         setTimeReached(!timeReached)
  //         clearInterval(interval!);
  //         return;
  //       }
  //     }, 1000); // Update every second

  //     return () => clearInterval(interval);
  //   };

  //   if (IsRunning && runningState) {
  //     simulateMovementAndCalculate();
  //   }
  // }, [IsRunning, runningState ]);



  useEffect(() => {
    const watchSteps = async () => {
      try {
        const startTime: any = new Date();
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
                  const distanceInKm = distance / 1000
                  setTotalDistance(prevDistance => prevDistance + distanceInKm);
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

    watchSteps();
  }, [IsRunning, runningState]);



  return (
    <ScrollView
      contentContainerStyle={{ ...styles.container, backgroundColor: currentType === 'dark' ? useCustomTheme.darkMode.bgcolor : 'white', position: 'relative' }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ ...styles.headerRow, backgroundColor: currentType === 'dark' ? useCustomTheme.darkMode.Header : useCustomTheme.lightMode.Header }}>
        <Text style={{ ...styles.headingText, color: currentType === 'dark' ? useCustomTheme.darkMode.Text : useCustomTheme.lightMode.Text }}>Daily Step Counter </Text>
        <Image
          source={require('../../assets/homeScreenAssets/step_icon.png')}
          style={{ height: 30, width: 30 }}
          resizeMode='contain'
        />
      </View>
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
        currentType={currentType}
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
        timeReached={timeReached}
        setTimeReached={setTimeReached}
        currentType={currentType}
        showOverLay={showOverLay}
        setShowOverLay={setShowOverLay}
      />
      <OverLayScreen showOverLay={showOverLay} />
    </ScrollView>
  )
}

export default LetsRun

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    // paddingHorizontal: 10,
    // paddingVertical: 15,

  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: 10,
    paddingVertical: 15,
    width: '100%'
  },
  headingText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  }

})