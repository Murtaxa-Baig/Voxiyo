import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {useState, React} from 'react';
import {SvgXml} from 'react-native-svg';
import Xmls from '../../utils/Xmls';
import {theme} from '../../components/Theme';
import {
  auth,
  getAuth,
  signInWithCredential,
  GoogleAuthProvider,
} from '@react-native-firebase/auth';
import storage from '../../utils/hooks/MmkvHook';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

export default function Login({navigation}) {
  const [userInfo, setUserInfo] = useMMKVStorage('userInfo', storage);
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      // 1. Check Play Services
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});

      await GoogleSignin.signOut();

      // 2. Sign in with Google
      const {idToken, accessToken} = await GoogleSignin.signIn();

      console.log('Id token is here', idToken);
      console.log('Access token is here', accessToken);

      // 3. Validate tokens
      if (!idToken && !accessToken) {
        throw new Error('No authentication tokens received');
      }

      // 4. Create credential using ONLY idToken
      const credential = GoogleAuthProvider.credential(idToken);

      // 5. Firebase authentication
      const authInstance = getAuth();
      const userCredential = await signInWithCredential(
        authInstance,
        credential,
      );

      // 6. Handle navigation
      if (userCredential.additionalUserInfo?.isNewUser) {
        console.log('New user registered');
        // navigation.navigate('home');
      } else {
        console.log('Existing user');
        // navigation.navigate('home');
      }

      setLoading(false);
    } catch (error) {
      console.log('Google Sign-In Error:', error);
      setLoading(false);
    }
  };

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
            onPress={() => navigation.navigate('terms and condition')}>
            <Text style={styles.link}>Terms & Conditions</Text>
          </TouchableOpacity>
          <Text style={{color: '#fff'}}> and </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('privacy policy')}>
            <Text style={styles.link}>Privacy Policy</Text>
          </TouchableOpacity>
        </View>
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('full name')}
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
          onPress={handleGoogleSignIn}>
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
        <TouchableOpacity onPress={() => navigation.navigate('login mail')}>
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
