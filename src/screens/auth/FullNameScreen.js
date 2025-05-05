import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import Xmls from '../../utils/Xmls';
import LoginHeader from '../../components/ui/LoginHeader';
import {TextInput} from 'react-native-gesture-handler';
import React, {useState} from 'react';

export default function FullNameScreen({navigation}) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleContinue = () => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      setError('You need to fill out the name');
    } else if (trimmedName.length < 3) {
      setError('You need to fill out the name');
    } else {
      setError('');
      navigation.navigate('CountryScreen', {
        userData: {fullName: trimmedName},
      });
    }
  };
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent />
      <View style={styles.container}>
        <LoginHeader navigation={navigation} progress={0.2} />
        <Text style={{color: 'black', marginVertical: 4}}>Enter your name</Text>
        <View style={styles.inputFileds}>
          <SvgXml xml={Xmls.profile} style={styles.profile} />
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor="#7C7F83"
            value={name}
            onChangeText={text => {
              setName(text);
              if (error) setError('');
            }}
          />
          {name.length < 3 ? null : (
            <SvgXml xml={Xmls.validated} style={styles.profile} />
          )}
        </View>
        {error ? (
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 4}}>
            <SvgXml xml={Xmls.caution} style={styles.caution} />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}
      </View>
      <View style={{backgroundColor: '#fff'}}>
        <TouchableOpacity
          onPress={() => handleContinue()}
          style={styles.continueButton}>
          <Text style={{color: '#000'}}>Continue</Text>
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
  profile: {
    marginHorizontal: 8,
  },

  caution: {
    marginHorizontal: 4,
    marginTop: 6,
  },
  inputFileds: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 38,
    width: '100%',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
  },
  input: {
    flex: 1,
    height: 43,
    fontSize: 16,
    color: '#000',
  },
  continueButton: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#C0E863',
    alignItems: 'center',
    marginHorizontal: 24,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
});
