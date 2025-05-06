import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import LoginHeader from '../../components/ui/LoginHeader';

export default function VerifyEmail({navigation}) {
  return (
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
        </View>

        {/* Bottom Content */}
        <View style={styles.bottomContent}>
          <TouchableOpacity
            onPress={() => navigation.navigate('login')}
            style={styles.continueButton}>
            <Text style={styles.continueText}>Return to Login</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity>
            <Text style={styles.resendLink}>Resend link</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
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
    alignItems: 'center',
    width: '100%',
    marginBottom: 12,
  },
  continueText: {
    color: '#000',
    fontSize: 16,
  },
  bottomContent: {
    alignItems: 'center',
    paddingBottom: 24,
  },
  resendLink: {
    color: '#C0E863',
    textDecorationLine: 'underline',
    fontSize: 14,
  },
});
