import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {TextInput} from 'react-native-gesture-handler';
import Xmls from '../../utils/Xmls';
import LoginHeader from '../../components/ui/LoginHeader';

export default function LoginEmail({navigation}) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validateEmail = email => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const trimmedEmail = email.trim();
  const handleContinue = () => {
    if (!trimmedEmail) {
      setError('Please enter your email');
    } else if (!validateEmail(trimmedEmail)) {
      setError('Please enter a valid email');
    } else {
      setError('');
      navigation.navigate('login password');
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent />
      <View style={styles.container}>
        <LoginHeader navigation={navigation} progress={0.5} />
        <Text style={styles.title}>Enter your email</Text>
        <View style={styles.inputFields}>
          <SvgXml xml={Xmls.email} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="name@mail.com"
            placeholderTextColor="#7C7F83"
            value={email}
            onChangeText={text => {
              setEmail(text);
              if (error) setError('');
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
          <Text style={styles.continueText}>Continue</Text>
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
  title: {
    color: 'black',
    marginVertical: 4,
    fontSize: 16,
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
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
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
});
