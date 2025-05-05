import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Platform} from 'react-native';
import {SvgXml} from 'react-native-svg';
import Home from '../../screens/app/Home';
import Starred from '../../screens/app/Starred';
import Chat from '../../screens/app/Chat';
import Folder from '../../screens/app/Folder';
// import {horizontalScale, verticalScale} from '../../utils/Metrics';
import Xmls from '../../utils/Xmls';

const Tab = createBottomTabNavigator();

export default function CustomBottomTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 115 : 80,
          backgroundColor: '#FFFFFF', // White background
          borderTopWidth: 0,
        },
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarVisibilityAnimationConfig: {
          show: {
            animation: 'timing',
            config: {
              duration: 0,
            },
          },
          hide: {
            animation: 'timing',
            config: {
              duration: 0,
            },
          },
        },
      }}
      initialRouteName="Home"
      backBehavior="initialRoute">
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <SvgXml
                xml={Xmls.homeIconFocused}
                // height={verticalScale(40)}
                // width={horizontalScale(54)}
              />
            ) : (
              <SvgXml
                xml={Xmls.homeIcon}
                height={verticalScale(24)}
                width={horizontalScale(24)}
              />
            ),
        }}
      />
      <Tab.Screen
        name="Starred"
        component={Starred}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <SvgXml
                xml={Xmls.starIconFocused}
                height={verticalScale(40)}
                width={horizontalScale(54)}
              />
            ) : (
              <SvgXml
                xml={Xmls.starIcon}
                height={verticalScale(24)}
                width={horizontalScale(24)}
              />
            ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <SvgXml
                xml={Xmls.chatIconFocused}
                height={verticalScale(40)}
                width={horizontalScale(54)}
              />
            ) : (
              <SvgXml
                xml={Xmls.chatIcon}
                height={verticalScale(24)}
                width={horizontalScale(24)}
              />
            ),
        }}
      />
      <Tab.Screen
        name="Folder"
        component={Folder}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <SvgXml
                xml={Xmls.folderIconFocused}
                height={verticalScale(40)}
                width={horizontalScale(54)}
              />
            ) : (
              <SvgXml
                xml={Xmls.folderIcon}
                height={verticalScale(24)}
                width={horizontalScale(24)}
              />
            ),
        }}
      />
    </Tab.Navigator>
  );
}
