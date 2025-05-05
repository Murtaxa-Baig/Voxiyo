import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import LoginHeader from '../../components/ui/LoginHeader';
import {countries_data} from '../../utils/countries_data';
import CustomDropdown from '../../components/ui/CustomDropdown';

export default function CountryScreen({navigation, route}) {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [error, setError] = useState('');

  const handleContinue = () => {
    if (!selectedCountry) {
      setError('You need to select country');
    } else {
      setError('');
      navigation.navigate('EmailScreen', {
        ...route.params.userData,
        country: selectedCountry,
      });
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <LoginHeader navigation={navigation} progress={0.4} />
          <CustomDropdown
            items={countries_data}
            value={selectedCountry}
            setValue={setSelectedCountry}
            label="Select country"
            setError={setError}
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleContinue}
            style={styles.continueButton}>
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  buttonContainer: {
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
  continueButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
});
