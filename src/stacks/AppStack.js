import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Recording from '../screens/app/Recording';
import Uploading from '../screens/app/Uploading';
import Drawer from './Drawer';
import EditTranscript from '../screens/app/EditTranscript';
import ProfileSetting from '../screens/app/ProfileSetting';
import BackupScreen from '../screens/app/BackupScreen';

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
      <Stack.Screen name="EditTranscript" component={EditTranscript} />
      <Stack.Screen name="ProfileSetting" component={ProfileSetting} />
      <Stack.Screen name="BackupScreen" component={BackupScreen} />
    </Stack.Navigator>
  );
}
