import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import BottomTab from './BottomTab';
import SignOut from '../components/ui/SignOut';

const DrawerNav = createDrawerNavigator();

export default function Drawer() {
  return (
    <DrawerNav.Navigator
      initialRouteName="All"
      drawerContent={props => <SignOut {...props} />}
      screenOptions={{headerShown: false}}>
      <DrawerNav.Screen name="All" component={BottomTab} />
    </DrawerNav.Navigator>
  );
}
