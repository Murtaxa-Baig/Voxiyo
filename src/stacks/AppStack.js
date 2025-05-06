import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Recording from '../screens/app/Recording';
import Uploading from '../screens/app/Uploading';
import Drawer from './Drawer';

const Stack = createStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        headerShown: false,
      }}
      initialRouteName="Drawer">
      <Stack.Screen name="Drawer" component={Drawer} />
      <Stack.Screen name="Recording" component={Recording} />
      <Stack.Screen name="Uploading" component={Uploading} />
    </Stack.Navigator>
  );
}
