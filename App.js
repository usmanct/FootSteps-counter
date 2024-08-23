import { SafeAreaView, StyleSheet } from 'react-native';
import { useEffect } from 'react';
import { AppProvider } from './src/contextApi/AppContext';
import { BottomTabs } from './src/bottomNavigation/BottomTabs';
import * as Location from 'expo-location';


export default function App() {


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
        <BottomTabs />
      </SafeAreaView>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgrey',
    marginTop: 40
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
