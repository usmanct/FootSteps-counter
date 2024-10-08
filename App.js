import { Alert, SafeAreaView, StyleSheet, Platform  } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import { AppContext, AppProvider } from './src/contextApi/AppContext';
import { BottomTabs } from './src/bottomNavigation/BottomTabs';
import * as Location from 'expo-location';
import SplashScreen from './src/screens/SplashScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Linking from 'expo-linking';

export default function App() {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading process (e.g., fetching data, setting up the app)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 6000); // 3 seconds loading time

    // Cleanup the timer when the component is unmounted
    return () => clearTimeout(timer);
  }, []);


  //Reuesting to Access the Location of the device 
  const getPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    console.log('status', status);

    if (status !== 'granted') {
      Alert.alert(
        'Location Permission Denied',
        'To proceed, you need to allow location access in your device settings.',
        [
          {
            text: 'Open Settings',
            onPress: () => Linking.openSettings(), // Open the app's settings
          },
          {
            text: 'Allow Access to Location',
            onPress: () => Linking.openSettings(), // Open the app's settings
          }
        ],
        { cancelable: false } // Prevents dismissing the alert by tapping outside
      );
    }
  };
  const openBatteryOptimizationSettings = () => {
    if (Platform.OS === 'android') {
      const packageName = 'com.usmanct.FootStepscounter'; // Replace this with your app's package name

      Linking.openURL(`package:${packageName}`)
        .catch(() => {
          Alert.alert('Error', 'Unable to open battery optimization settings.');
        });
    } else {
      Alert.alert('Not supported', 'This feature is only available on Android.');
    }
  };

  useEffect(() => {
    getPermission();
    // openBatteryOptimizationSettings()
  }, []);


  return (
    <AppProvider>
      <SafeAreaView style={styles.container}>
        {/* <ScreenNavigation /> */}
        {isLoading ? <SplashScreen /> : <BottomTabs />}
        {/* <SplashScreen /> */}
      </SafeAreaView>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // marginTop: 30
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
