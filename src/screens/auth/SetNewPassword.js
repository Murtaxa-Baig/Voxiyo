import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SvgXml} from 'react-native-svg';
import Xmls from '../../utils/Xmls';

export default function SetNewPassword({navigation}) {
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
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
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent />
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <SvgXml xml={Xmls.backArrow} />
        </TouchableOpacity>
        <Text style={{color: '#0D0F10', marginVertical: 4, fontSize: 24}}>
          Set a new password
        </Text>
        <Text style={{color: '#7C7F83', fontSize: 14}}>
          Ensure it differs from previous ones for security
        </Text>
        <Text style={{color: 'black', marginTop: 12, marginBottom: 4}}>
          Create password
        </Text>
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
    </>
  );
}

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
});
