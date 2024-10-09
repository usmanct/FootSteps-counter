import { StyleSheet, Image, View, Text, ScrollView } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
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
  const [distanceAchieve, setDistanceAchieve] = useState(false)
  const [kcalAchieve, setKcalAchieve] = useState(false)
  const [showOverLay, setShowOverLay] = useState(false)
  const { currentType }: any = useContext(AppContext)
  const useCustomTheme = useThemeChange()
  const animateToRegion = (latitude: number, longitude: number) => {
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  };

  useEffect(() => {
    const getPermissionsAndCurrentLocation = async () => {
      try {
        // Request location permissions
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
        // Get initial location
        const initialLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        const { latitude, longitude } = initialLocation.coords;
        setLocation(initialLocation);
        // Center map on the initial location when it's available and mapRef is ready
        animateToRegion(latitude, longitude);
      } catch (error) {
        setErrorMsg('Failed to get location permissions');
        console.error(error);
      }
    };
    getPermissionsAndCurrentLocation();
  }, []);
  useEffect(() => {
    let subscription: { remove: () => void };
    const watchSteps = async () => {
      try {
        const startTime: any = new Date();
        if (IsRunning && runningState) {
          subscription = await Location.watchPositionAsync(
            { accuracy: Location.Accuracy.High, timeInterval: 1000, distanceInterval: 1 },
            (newLocation) => {
              const { latitude, longitude } = newLocation.coords;
              // @ts-ignore
              const elapsedTime = (new Date() - startTime) / 1000; // In seconds
              setTotalTime(elapsedTime);

              setLocation(newLocation);

              setRouteCoordinates((prev: any) => {
                if (prev.length > 0) {
                  const lastPoint = prev[prev.length - 1];
                  const distance = getDistance(lastPoint, { latitude, longitude });

                  // Apply distance threshold to filter out minor changes
                  const thresholdDistance = 5; // Minimum distance in meters to count as movement
                  if (distance > thresholdDistance) {
                    console.log('Return the')
                    return prev; // Ignore minor movement
                  }

                  // Add new coordinate and calculate distance covered
                  const newCoordinates = [...prev, { latitude, longitude }];
                  const distanceInKm = distance / 1000;
                  setTotalDistance((prevDistance) => prevDistance + distanceInKm);
                  return newCoordinates;
                }
                // For the first coordinate, just add it without checking distance
                return [{ latitude, longitude }];
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
    return () => {
      if (subscription) {
        subscription.remove(); // Cleanup subscription
      }
    };
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
        setRouteCoordinates={setRouteCoordinates}
        distanceAchieve={distanceAchieve}
        setDistanceAchieve={setDistanceAchieve}
        kcalAAchieve={kcalAchieve}
        setKcalAchieve={setKcalAchieve}
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
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    width: '100%'
  },
  headingText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  }

})