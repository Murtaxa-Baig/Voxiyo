import React, {useEffect} from 'react';
import {ThemeProvider} from './src/components/Theme';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import AuthStack from './src/stacks/AuthStack';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import {LogBox, Platform, SafeAreaView, StatusBar} from 'react-native';
import Toast from 'react-native-toast-message';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Web_Client_ID} from './urls';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import storage from './src/utils/hooks/MmkvHook';
import AppStack from './src/stacks/AppStack';

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

export default function App() {
  const [userData, setUserData] = useMMKVStorage('userData', storage);

  console.log('userdata is here', userData);

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
            {userData ? <AppStack /> : <AuthStack />}
          </SafeAreaView>
        </NavigationContainer>
        <Toast />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
