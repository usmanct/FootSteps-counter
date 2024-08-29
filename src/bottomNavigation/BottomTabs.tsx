import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Home from '../screens/Home';
import WaterTrack from '../screens/WaterTrack';
import LetsRun from '../screens/LetsRun';
import { Fontisto } from '@expo/vector-icons';

import Account from '../screens/Account';
import ScreenNavigation from '../stackNavigation/ScreenNavigation';
import WaterTrackStack from '../stackNavigation/WaterTrackStack ';
import { AppContext } from '../contextApi/AppContext';
import { useThemeChange } from '../apptheme/ThemeChange';





const Tab = createBottomTabNavigator();



function MyTabs() {

  const { currentType} : any = React.useContext(AppContext)
  const useCustomTheme = useThemeChange()

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: currentType ==='dark' ? useCustomTheme.darkMode.activeTint : useCustomTheme.lightMode.activeTint,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: currentType === 'dark' ? useCustomTheme.darkMode.Header : useCustomTheme.lightMode.Header,
        },
      }}
    >
      <Tab.Screen
        name="ScreenNavigation"
        component={ScreenNavigation}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="WaterTrack"
        component={WaterTrackStack}
        options={{
          tabBarLabel: 'WaterTrack',
          tabBarIcon: ({ color, size }) => (
            <Fontisto name="blood-drop" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="LetsRun"
        component={LetsRun}
        options={{
          tabBarLabel: 'LetsRun',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="run-fast" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export function BottomTabs() {
  return (
    <>
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
      {/* <ScreenNavigation /> */}
    </>
  );
}
