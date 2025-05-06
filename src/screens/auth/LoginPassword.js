import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import LoginHeader from '../../components/ui/LoginHeader';
import {SvgXml} from 'react-native-svg';
import Xmls from '../../utils/Xmls';
import Toast from 'react-native-toast-message';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import storage from '../../utils/hooks/MmkvHook';
import auth from '@react-native-firebase/auth';

export default function LoginPassword({navigation, route}) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useMMKVStorage('userData', storage);

  const routeParams = route?.params?.userData;
  const email = routeParams?.email || '';

  const handleLogin = async () => {
    setLoading(true);
    if (!password) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please enter your password',
      });
      setLoading(false);
      return;
    }

    try {
      await auth().signInWithEmailAndPassword(email, password);
      const currentUser = auth().currentUser;
      if (!currentUser) {
        throw new Error('User not found');
      }

      const simpleUserData = {
        uid: currentUser.uid,
        email: currentUser.email,
        displayName: currentUser.displayName,
      };
      console.log('setting data in mmkv stroage is here', simpleUserData);

      setUserData(simpleUserData);

      Toast.show({
        type: 'success',
        text1: 'Login Successful',
        text2: `Welcome back!`,
      });
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: 'Invalid credentials',
      });
      setLoading(false);
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent />
      <View style={styles.container}>
        <LoginHeader navigation={navigation} progress={1} />
        <Text style={{color: 'black', marginVertical: 4}}>
          Enter your password
        </Text>
        <View style={styles.inputFileds}>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="#7C7F83"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <SvgXml
              xml={showPassword ? Xmls.ShowEyeIcon : Xmls.hideEyeIcon}
              style={styles.profile}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginTop: 4,
          }}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ForgotPassword', {
                userData: {email: email},
              })
            }>
            <Text style={{color: '#7C7F83', fontSize: 12}}>
              Forgot password?
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{backgroundColor: '#fff'}}>
        <TouchableOpacity
          onPress={() => handleLogin()}
          style={styles.submitButton}>
          {loading ? (
            <ActivityIndicator size="small" color="#000" />
          ) : (
            <Text style={{color: '#000'}}>Submit</Text>
          )}
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
  },

  inputFileds: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 38,
    width: '100%',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 8,
  },

  input: {
    flex: 1,
    height: 43,
    fontSize: 16,
    color: '#000',
  },

  submitButton: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#C0E863',
    alignItems: 'center',
    marginHorizontal: 24,
  },
});
