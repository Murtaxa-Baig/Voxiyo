import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import Xmls from '../../utils/Xmls';
import {theme} from '../../components/Theme';

export default function Login({navigation}) {
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
        <Text style={{color: '#000'}}>Continue with email</Text>
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
        <TouchableOpacity style={styles.googleButton}>
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
