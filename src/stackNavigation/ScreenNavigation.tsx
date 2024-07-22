import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screens/Home'
import BmiCalculations from '../screens/BmiCalculations'
import BmiResult from '../components/bmiScreen/BmiResult'
import Results from '../components/homeScreen/Results'
import LetsRun from '../screens/LetsRun'
import WaterTrack from '../screens/WaterTrack'
import Account from '../screens/Account'
import { BottomTabs } from '../bottomNavigation/BottomTabs'
import WaterTrackSetting from '../components/waterTrackScreen/WaterTrackSetting'


const Stack = createNativeStackNavigator()


const ScreenNavigation = () => {
    return (
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        elevation: 0,
                        shadowOpacity: 0,
                        borderBottomWidth: 0,
                    },
                    headerTitleAlign: 'center',
                    headerShown: false
                }}
                initialRouteName="Home">
                <Stack.Screen name='Home' component={Home} />
                <Stack.Screen name='WaterTrack' component={WaterTrack} />
                <Stack.Screen name="LetsRun" component={LetsRun} />
                <Stack.Screen name='Account' component={Account} />
                <Stack.Screen name='BmiCalculations' component={BmiCalculations} />
                <Stack.Screen name='BmiResult' component={BmiResult} />
                <Stack.Screen name='Results' component={Results} />
                <Stack.Screen name='WaterTrackSetting' component={WaterTrackSetting} />
            </Stack.Navigator>
    )
}

export default ScreenNavigation