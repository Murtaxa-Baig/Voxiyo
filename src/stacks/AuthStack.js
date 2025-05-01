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
      <Stack.Screen name="full name" component={FullNameScreen} />
      <Stack.Screen name="country screen" component={CountryScreen} />
      <Stack.Screen name="email screen" component={EmailScreen} />
      <Stack.Screen name="password screen" component={PasswordSreen} />
      <Stack.Screen name="terms and condition" component={TermsAndConditions} />
      <Stack.Screen name="privacy policy" component={TermsAndConditions} />
      <Stack.Screen name="login mail" component={LoginEmail} />
      <Stack.Screen name="login password" component={LoginPassword} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="VerifyEmail" component={VerifyEmail} />
      {/* <Stack.Screen name="SetNewPassword" component={SetNewPassword} /> */}
    </Stack.Navigator>
  );
}
