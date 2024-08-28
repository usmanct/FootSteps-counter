import { SafeAreaView, StyleSheet } from 'react-native';
import { useEffect , useState } from 'react';
import { AppProvider } from './src/contextApi/AppContext';
import { BottomTabs } from './src/bottomNavigation/BottomTabs';
import * as Location from 'expo-location';
import SplashScreen from './src/screens/SplashScreen';

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
      console.error('Permissons are not allowed')
      return;
    }
  }


  useEffect(() => {
    getPermission();
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
    backgroundColor: '#fff',
    marginTop: 40
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
