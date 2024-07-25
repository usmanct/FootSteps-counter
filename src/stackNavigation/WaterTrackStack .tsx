import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WaterTrack from '../screens/WaterTrack';
import WaterTrackSetting from '../components/waterTrackScreen/WaterTrackSetting';

const Stack = createNativeStackNavigator();

const WaterTrackStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTitleAlign: 'center',
        headerShown: false,
      }}
      initialRouteName="WaterTrack"
    >
      <Stack.Screen name='WaterTrack' component={WaterTrack} />
      <Stack.Screen name='WaterTrackSetting' component={WaterTrackSetting} />
    </Stack.Navigator>
  );
}

export default WaterTrackStack;
