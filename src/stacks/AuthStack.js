import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/auth/Login';
import FullNameScreen from '../screens/auth/FullNameScreen';
import CountryScreen from '../screens/auth/CountryScreen';
import EmailScreen from '../screens/auth/EmailScreen';
import PasswordSreen from '../screens/auth/PasswordSreen';
import TermsAndConditions from '../screens/auth/TermsAndConditions';
import LoginEmail from '../screens/auth/LoginEmail';
import LoginPassword from '../screens/auth/LoginPassword';
import ForgotPassword from '../screens/auth/ForgotPassword';
import SetNewPassword from '../screens/auth/SetNewPassword';
import VerifyEmail from '../screens/auth/VerifyEmail';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        headerShown: false,
      }}>
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="FullName" component={FullNameScreen} />
      <Stack.Screen name="CountryScreen" component={CountryScreen} />
      <Stack.Screen name="EmailScreen" component={EmailScreen} />
      <Stack.Screen name="PasswordScreen" component={PasswordSreen} />
      <Stack.Screen name="TermsAndCondition" component={TermsAndConditions} />
      <Stack.Screen name="PrivacyPolicy" component={TermsAndConditions} />
      <Stack.Screen name="LoginEmail" component={LoginEmail} />
      <Stack.Screen name="LoginPassword" component={LoginPassword} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="VerifyEmail" component={VerifyEmail} />
      {/* <Stack.Screen name="SetNewPassword" component={SetNewPassword} /> */}
    </Stack.Navigator>
  );
}
