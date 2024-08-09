import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import Header from './src/components/Header';
import Home from './src/screens/Home';
import ScreenNavigation from './src/stackNavigation/ScreenNavigation';
import { AppProvider } from './src/contextApi/AppContext';
import { BottomTabs } from './src/bottomNavigation/BottomTabs';
import { useEffect } from 'react';
import { NotificationProvider } from './src/components/notifications/NotificationContext';
import { registerBackgroundFetchAsync } from './src/BackgroundServices'
import * as Notifications from 'expo-notifications';

export default function App() {
  return (
    <AppProvider>
      <SafeAreaView style={styles.container}>
        <NotificationProvider>
          {/* <ScreenNavigation /> */}
          <BottomTabs />
        </NotificationProvider>
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
