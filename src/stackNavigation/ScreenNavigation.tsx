import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screens/Home'
import BmiCalculations from '../screens/BmiCalculations'
import BmiResult from '../components/bmiScreen/BmiResult'


const Stack = createNativeStackNavigator()

const ScreenNavigation = () => {
    return (
        <NavigationContainer>
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
                initialRouteName="Tic Tac Toe">
                <Stack.Screen name='Home' component={Home} />
                <Stack.Screen name='BmiCalculations' component={BmiCalculations} />
                <Stack.Screen name='BmiResult' component={BmiResult} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default ScreenNavigation