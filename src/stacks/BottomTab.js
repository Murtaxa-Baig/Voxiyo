import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Platform, Text, TouchableOpacity, View} from 'react-native';
import {SvgXml} from 'react-native-svg';
import Xmls from '../utils/Xmls';
import Home from '../screens/app/Home';
import Starred from '../screens/app/Starred';
import Chat from '../screens/app/Chat';
import Folder from '../screens/app/Folder';

const Tab = createBottomTabNavigator();

const TabIcon = ({xml, label, focused}) => {
  const color = focused ? '#000' : '#A9A9A9';
  return (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <View
        style={{
          height: 2,
          width: 15,
          backgroundColor: focused ? '#000' : 'transparent',
          marginBottom: 6,
        }}
      />
      <SvgXml xml={xml} />
      <Text style={{color, fontSize: 9, marginTop: 4}}>{label}</Text>
    </View>
  );
};

export default function BottomTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 115 : 50,
          backgroundColor: '#FFF',
          borderTopWidth: 0,
        },
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarItemStyle: {
          width: '25%',
        },
        tabBarButton: props => (
          <TouchableOpacity {...props} activeOpacity={1} />
        ),
      }}
      initialRouteName="Home"
      backBehavior="initialRoute">
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon
              xml={focused ? Xmls.homeIconIsFocused : Xmls.homeIcon}
              label="Home"
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Starred"
        component={Starred}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon
              xml={focused ? Xmls.starredIconIsFocused : Xmls.sttaredIcon}
              label="Starred"
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon
              xml={focused ? Xmls.chatIconIsFocused : Xmls.chatIcon}
              label="Chat"
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Folder"
        component={Folder}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon
              xml={focused ? Xmls.folderIconIsFocused : Xmls.folderIcon}
              label="Folder"
              focused={focused}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
