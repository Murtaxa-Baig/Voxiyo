import React, {useEffect} from 'react';
import {ThemeProvider} from './src/components/Theme';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import AuthStack from './src/stacks/AuthStack';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import {Platform, SafeAreaView, StatusBar} from 'react-native';
import Toast from 'react-native-toast-message';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Web_Client_ID} from './urls';

export default function App() {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: `${Web_Client_ID}.apps.googleusercontent.com`,
    });
  }, []);

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ThemeProvider>
        <NavigationContainer onReady={() => SplashScreen.hide()}>
          <SafeAreaView
            style={{
              flex: 1,
              paddingTop:
                Platform.OS === 'android' ? StatusBar.currentHeight : 0,
            }}>
            <StatusBar
              barStyle="dark-content"
              backgroundColor="transparent"
              translucent
            />
            <AuthStack />
          </SafeAreaView>
        </NavigationContainer>
        <Toast />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
