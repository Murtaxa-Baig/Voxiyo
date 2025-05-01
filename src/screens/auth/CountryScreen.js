// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   ScrollView,
//   StatusBar,
// } from 'react-native';
// import DropDownPicker from 'react-native-dropdown-picker';
// import LoginHeader from '../../components/ui/LoginHeader';
// import {countries_data} from '../../utils/countries_data';
// import {SvgXml} from 'react-native-svg';

// export default function CountryScreen({navigation}) {
//   const [error, setError] = useState('');
//   const [open, setOpen] = useState(false);
//   const [value, setValue] = useState(null);
//   const [items, setItems] = useState(
//     countries_data.sort((a, b) => a.label.localeCompare(b.label)),
//   );

//   const selectedCountry = countries_data.find(
//     country => country.value === value,
//   );

//   const handleContinue = () => {
//     if (!selectedCountry) {
//       setError('You need to select country');
//     } else {
//       setError('');
//       navigation.navigate('email screen');
//     }
//   };

//   return (
//     <>
//       <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent />
//       <ScrollView
//         keyboardShouldPersistTaps="handled"
//         contentContainerStyle={styles.scrollContainer}>
//         <View style={styles.container}>
//           <LoginHeader navigation={navigation} progress={0.5} />
//           <Text style={styles.label}>Select country</Text>

//           <View style={{flex: 1}}>
//             <View style={styles.inputFields}>
//               {selectedCountry ? (
//                 <Image
//                   source={{uri: selectedCountry.uri}}
//                   style={styles.countryFlag}
//                   resizeMode="cover"
//                 />
//               ) : (
//                 <View style={styles.countryView} />
//               )}

//               <DropDownPicker
//                 open={open}
//                 value={value}
//                 items={items}
//                 setOpen={setOpen}
//                 setValue={setValue}
//                 setItems={setItems}
//                 searchable={true}
//                 searchPlaceholder="Search your country..."
//                 searchTextInputProps={{
//                   autoCorrect: false,
//                 }}
//                 placeholder="Select one"
//                 style={styles.dropdownStyle}
//                 dropDownContainerStyle={styles.dropDownContainer}
//                 textStyle={{color: '#000'}}
//                 dropDownDirection="AUTO"
//                 searchContainerStyle={{
//                   borderBottomColor: '#dfdfdf',
//                 }}
//                 searchTextInputStyle={{
//                   borderWidth: 0,
//                   borderRadius: 8,
//                 }}
//               />
//             </View>
//             {error ? (
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                   marginTop: 4,
//                 }}>
//                 <SvgXml xml={Xmls.caution} style={styles.caution} />
//                 <Text style={styles.errorText}>{error}</Text>
//               </View>
//             ) : null}
//           </View>
//         </View>

//         <View style={styles.buttonContainer}>
//           <TouchableOpacity
//             onPress={handleContinue}
//             style={styles.continueButton}>
//             <Text style={styles.continueButtonText}>Continue</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   scrollContainer: {
//     flexGrow: 1,
//   },
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingHorizontal: 24,
//   },
//   label: {
//     color: 'black',
//     marginVertical: 4,
//   },
//   inputFields: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     width: '100%',
//     height: 38,
//     borderWidth: 1,
//     borderColor: '#000',
//     borderRadius: 8,
//     paddingHorizontal: 8,
//     backgroundColor: '#fff',
//   },
//   countryView: {
//     width: 21,
//     height: 15,
//     backgroundColor: '#E2E5E9',
//     borderRadius: 3,
//     marginRight: 8,
//   },
//   countryFlag: {
//     width: 21,
//     height: 15,
//     borderRadius: 3,
//     marginRight: 8,
//   },
//   dropdownStyle: {
//     borderWidth: 0,
//     width: '93%',
//     height: 30,
//     backgroundColor: 'transparent',
//     flex: 1,
//   },
//   dropDownContainer: {
//     borderWidth: 1,
//     borderColor: '#000',
//     borderRadius: 8,
//     width: '90%',
//     borderWidth: 0,
//     maxHeight: 300,
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 12,
//     marginTop: 4,
//   },
//   buttonContainer: {
//     backgroundColor: '#fff',
//   },
//   continueButton: {
//     backgroundColor: '#C0E863',
//     paddingVertical: 16,
//     borderRadius: 8,
//     marginBottom: 16,
//     alignItems: 'center',
//     marginHorizontal: 24,
//   },
//   continueButtonText: {
//     color: '#000',
//     fontWeight: 'bold',
//   },
//   caution: {
//     marginHorizontal: 4,
//     marginTop: 6,
//   },
// });

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

export default function CountryScreen({navigation}) {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [error, setError] = useState('');

  const handleContinue = () => {
    if (!selectedCountry) {
      setError('You need to select country');
    } else {
      setError('');
      navigation.navigate('email screen');
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
