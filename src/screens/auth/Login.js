import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {useState, React, useEffect} from 'react';
import {SvgXml} from 'react-native-svg';
import Xmls from '../../utils/Xmls';
import {theme} from '../../components/Theme';
import auth from '@react-native-firebase/auth';
import storage from '../../utils/hooks/MmkvHook';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

export default function Login({navigation}) {
  GoogleSignin.configure({
    webClientId:
      '499891627993-6d1c5hslvk6sja7orhdh41ac498n1tf5.apps.googleusercontent.com',
    offlineAccess: false,
  });

  const [userInfo, setUserInfo] = useMMKVStorage('userInfo', storage);
  const [loading, setLoading] = useState(false);

  async function onGoogleButtonPress() {
    try {
      setLoading(true);
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      // Get the user's ID token
      const idToken = await GoogleSignin.signIn();
      // console.log('idToken', idToken);

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(
        idToken?.data?.idToken,
      );

      const response = await auth().signInWithCredential(googleCredential);
      console.log('response', response.user);
      if (response.user) {
        const userData = {
          name: response.user.displayName,
          email: response.user.email,
          photo: response.user.photoURL,
          uid: response.user.uid,
        };
        console.log('userData', userData);
        setUserInfo(userData);
        // navigation.navigate('home');
      } else {
        console.log('User not found');
      }
      setLoading(false);
    } catch (error) {
      console.log('Google Sign-In error:', error);
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" translucent />
      <View style={{marginTop: 50}}>
        <View
          style={{
            height: 72,
            width: 70,
            backgroundColor: '#E2E5E9',
            borderRadius: 8,
            marginBottom: 32,
          }}
        />
        {/* <Logo /> */}
        <Text style={styles.heading}>Capture.</Text>
        <Text style={styles.heading}>Transcribe.</Text>
        <Text style={styles.heading}>Organize.</Text>
      </View>
      <View style={{flex: 1}} />
      <Text style={styles.terms}>
        By continuing, I agree with the {'\n'}
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('TermsAndCondition')}>
            <Text style={styles.link}>Terms & Conditions</Text>
          </TouchableOpacity>
          <Text style={{color: '#fff'}}> and </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('PrivacyPolicy')}>
            <Text style={styles.link}>Privacy Policy</Text>
          </TouchableOpacity>
        </View>
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('FullName')}
        style={styles.emailButton}>
        {loading ? (
          <ActivityIndicator size="small" color="#000" />
        ) : (
          <Text style={{color: '#000'}}>Continue with email</Text>
        )}
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}>
        <View
          style={{width: '43%', height: 1, backgroundColor: '#212529'}}></View>
        <Text style={styles.orText}>OR</Text>
        <View
          style={{width: '43%', height: 1, backgroundColor: '#212529'}}></View>
      </View>
      <View style={styles.socialContainer}>
        <TouchableOpacity
          style={styles.googleButton}
          onPress={() => onGoogleButtonPress()}>
          <SvgXml xml={Xmls.google} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginBottom: 20,
        }}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginEmail')}>
          <Text style={styles.link}>Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 24,
  },
  heading: {
    fontSize: 36,
    color: '#fff',
    fontFamily: theme.fontFamily.SFProDisplayMedium,
  },
  terms: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 12,
  },
  link: {
    color: '#fff',
    textDecorationLine: 'underline',
  },
  emailButton: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#C0E863',
    alignItems: 'center',
  },
  orText: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#fff',
    textAlign: 'center',
    marginVertical: 8,
  },
  googleButton: {
    backgroundColor: '#141619',
    paddingVertical: 16,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
});
