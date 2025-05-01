import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import LoginHeader from '../../components/ui/LoginHeader';

export default function VerifyEmail({navigation}) {
  return (
    <>
      <View style={{flex: 1, backgroundColor: '#fff', paddingHorizontal: 24}}>
        <LoginHeader navigation={navigation} progress={1} />
        <View style={styles.container}>
          <View style={styles.centerContent}>
            <Text style={styles.infoText}>
              A Link has been shared to your email
            </Text>
            <Text style={styles.verifyText}>
              Please Verify your email address to Login
            </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate('login')}
              style={styles.continueButton}>
              <Text style={styles.continueText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  infoText: {
    color: 'black',
    textAlign: 'center',
  },
  verifyText: {
    color: '#000',
    marginVertical: 4,
    textAlign: 'center',
  },
  continueButton: {
    backgroundColor: '#C0E863',
    paddingVertical: 16,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
    width: '100%',
  },
  continueText: {
    color: '#000',
    fontSize: 16,
  },
});
