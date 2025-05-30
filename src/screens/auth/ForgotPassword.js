import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SvgXml} from 'react-native-svg';
import Xmls from '../../utils/Xmls';
import Toast from 'react-native-toast-message';
// import {sendPasswordResetEmail} from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';

export default function ForgotPassword({navigation, route}) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const routeParams = route?.params?.userData;
    const resetPasswordEmail = routeParams?.email || '';
    setEmail(resetPasswordEmail);
  }, []);

  const validateEmail = email => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleContinue = async () => {
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setError('Please enter your email');
      return;
    }

    if (!validateEmail(trimmedEmail)) {
      setError('Please enter a valid email');
      return;
    }

    try {
      await auth().sendPasswordResetEmail(trimmedEmail);

      console.log('Password reset email sent to:', trimmedEmail);

      Toast.show({
        type: 'success',
        text1: 'Email sent',
        text2: 'Please check your inbox',
        position: 'top',
      });

      setTimeout(() => {
        navigation.navigate('login');
      }, 2000);
    } catch (error) {
      let errorMessage = 'Failed to send reset email. Please try again.';
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'No user found with this email.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address format.';
          break;
        case 'auth/network-request-failed':
          errorMessage =
            'Network error. Please check your internet connection.';
          break;
      }
      setError(errorMessage);
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent />
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <SvgXml xml={Xmls.backArrow} />
        </TouchableOpacity>
        <Text style={{color: '#0D0F10', marginVertical: 4, fontSize: 24}}>
          Forgot password?
        </Text>
        <Text style={{color: '#7C7F83', fontSize: 14}}>
          Please enter your email to reset the password
        </Text>
        <View style={styles.inputFields}>
          <SvgXml xml={Xmls.email} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="name@mail.com"
            placeholderTextColor="#7C7F83"
            value={email}
            onChangeText={text => {
              setEmail(text);
              if (error) {
                setError('');
              }
            }}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={handleContinue}
          style={styles.continueButton}>
          <Text style={styles.continueText}>Reset Password</Text>
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
  inputFields: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 38,
    width: '100%',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    paddingHorizontal: 8,
    marginTop: 4,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 43,
    fontSize: 16,
    color: '#000',
  },
  footer: {
    backgroundColor: '#fff',
  },
  continueButton: {
    backgroundColor: '#C0E863',
    paddingVertical: 16,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
    marginHorizontal: 24,
  },
  continueText: {
    color: '#000',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginTop: 8,
    fontSize: 13,
  },
});
