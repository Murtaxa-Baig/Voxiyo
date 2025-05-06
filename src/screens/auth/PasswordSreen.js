import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import Xmls from '../../utils/Xmls';
import LoginHeader from '../../components/ui/LoginHeader';
import {TextInput} from 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';

export default function PasswordSreen({navigation, route}) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validations, setValidations] = useState({
    length: false,
    upperCase: false,
    specialChar: false,
    matched: false,
  });

  useEffect(() => {
    const length = password.length >= 8;
    const upperCase = /[A-Z]/.test(password);
    const specialChar = /[^A-Za-z0-9]/.test(password);
    const matched = password && confirmPassword && password === confirmPassword;

    setValidations({length, upperCase, specialChar, matched});
    if (confirmPassword && password !== confirmPassword) {
      setError('Password does not match');
    } else {
      setError('');
    }
  }, [password, confirmPassword]);

  const isFormValid =
    validations.length &&
    validations.upperCase &&
    validations.specialChar &&
    validations.matched;

  const handleEmail = async () => {
    setLoading(true);
    if (!isFormValid) {
      setError('Please fill out the form correctly');
      setLoading(false);
      return;
    }

    const email = route?.params?.email;

    if (!email) {
      setError('Email not found. Please go back and enter your email.');
      Toast.show({
        type: 'error',
        text1: 'Missing Email',
        text2: 'Email not found. Please go back and enter your email.',
      });
      setLoading(false);
      return;
    }

    setError('');

    try {
      // Create user
      await auth().createUserWithEmailAndPassword(email, password);
      console.log('User account created & signed in!');

      // Send verification email
      const currentUser = auth().currentUser;
      if (currentUser) {
        await currentUser.sendEmailVerification();
        console.log('Verification email sent!');
      }

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'User registered successfully! Please verify your email.',
      });
      setLoading(false);
      navigation.navigate('VerifyEmail');
    } catch (error) {
      let message = '';

      if (error.code === 'auth/email-already-in-use') {
        message = 'That email address is already in use!';
      } else if (error.code === 'auth/invalid-email') {
        message = 'That email address is invalid!';
      } else {
        message = error.message;
      }
      setLoading(false);
      setError(message);

      Toast.show({
        type: 'error',
        text1: 'Registration Error',
        text2: message,
      });

      console.error(error);
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent />
      <View style={styles.container}>
        <LoginHeader navigation={navigation} progress={0.8} />
        <Text style={{color: 'black', marginVertical: 4}}>Create password</Text>
        <View style={styles.inputFileds}>
          <TextInput
            style={styles.input}
            placeholder="Enter password"
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

        {/* Validation Checklist */}
        <ValidationRow
          isValid={validations.length}
          text="Must be longer than 8 characters"
        />
        <ValidationRow
          isValid={validations.upperCase}
          text="Contain upper case letter"
        />
        <ValidationRow
          isValid={validations.specialChar}
          text="Contain special character"
        />

        <Text style={{color: 'black', marginVertical: 4}}>
          Confirm password
        </Text>
        <View style={styles.inputFileds}>
          <TextInput
            style={styles.input}
            placeholder="Confirm password"
            placeholderTextColor="#7C7F83"
            secureTextEntry={!showConfirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            <SvgXml
              xml={showConfirmPassword ? Xmls.ShowEyeIcon : Xmls.hideEyeIcon}
              style={styles.profile}
            />
          </TouchableOpacity>
        </View>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>

      <View style={{backgroundColor: '#fff'}}>
        <TouchableOpacity
          style={[styles.continueButton, {backgroundColor: '#C0E863'}]}
          onPress={() => handleEmail()}>
          {loading ? (
            <ActivityIndicator size="small" color="#000" />
          ) : (
            <Text style={{color: '#000'}}>Continue</Text>
          )}
        </TouchableOpacity>
      </View>
    </>
  );
}

// Validation Checklist UI component
function ValidationRow({isValid, text}) {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <SvgXml
        xml={isValid ? Xmls.validated : Xmls.checkIcon}
        style={{marginRight: 8}}
      />
      <Text style={{color: '#7C7F83', marginVertical: 4}}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
  },
  profile: {
    marginHorizontal: 8,
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
  continueButton: {
    paddingVertical: 16,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
    marginHorizontal: 24,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
});
