import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screens/Home'
import BmiCalculations from '../screens/BmiCalculations'
import BmiResult from '../components/bmiScreen/BmiResult'
import Results from '../components/homeScreen/Results'
import LetsRun from '../screens/LetsRun'

import Account from '../screens/Account'
import Runningresult from '../components/letsrunScreen/Runningresult'

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
            <Stack.Screen name="LetsRun" component={LetsRun} />
            <Stack.Screen name='Account' component={Account} />
            <Stack.Screen name='BmiCalculations' component={BmiCalculations} />
            <Stack.Screen name='BmiResult' component={BmiResult} />
            <Stack.Screen name='Results' component={Results} />
            <Stack.Screen name='Runningresult' component={Runningresult} />
        </Stack.Navigator>
    )
}

export default ScreenNavigation