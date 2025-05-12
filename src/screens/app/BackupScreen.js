import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {SvgXml} from 'react-native-svg';
import Xmls from '../../utils/Xmls';
import ActionSheet from 'react-native-actions-sheet';

export default function BackupScreen({navigation}) {
  const [selectedOption, setSelectedOption] = useState('Daily');
  const backupOptionRef = useRef(null);

  const backUpOptions = ['Daily', 'Weekly', 'Monthly', 'Off'];

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent />
      <View style={style.content}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <SvgXml xml={Xmls.leftArrow} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => backupOptionRef.current?.show()}
          style={style.backupBtn}>
          <Text style={{color: '#000'}}>Backup</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{color: '#000'}}>{selectedOption}</Text>
            <SvgXml style={{marginHorizontal: 8}} xml={Xmls.rightArrow} />
          </View>
        </TouchableOpacity>

        <View style={style.userdata}>
          <SvgXml
            style={{marginHorizontal: 8, marginVertical: 12}}
            xml={Xmls.backUpIcon}
          />
          <Text style={{color: '#7C7F83', fontSize: 14}}>
            Back up your notes securely with your cloud provider. You're always
            in control—delete your VoiceNote account anytime. No strings
            attached.
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: 12,
            }}>
            <Text style={{color: '#000'}}>Last backup</Text>
            <Text style={{color: '#000'}}>10 Feb 2024</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: 12,
            }}>
            <Text style={{color: '#000'}}>Total Size</Text>
            <Text style={{color: '#000'}}>6,5 GB</Text>
          </View>
        </View>

        <TouchableOpacity style={style.backUpButton}>
          <Text style={{color: '#000'}}>Back Up</Text>
        </TouchableOpacity>
      </View>
      <ActionSheet
        ref={backupOptionRef}
        gestureEnabled
        containerStyle={{
          height: '35%',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: '#fff',
          paddingHorizontal: 24,
        }}>
        {backUpOptions.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              setSelectedOption(item);
              backupOptionRef.current?.hide();
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 12,
              borderRadius: 8,
              backgroundColor:
                selectedOption === item ? '#E5E5E5' : 'transparent',
              marginVertical: 4,
            }}>
            <Text style={{color: '#000'}}>{item}</Text>
            {selectedOption === item && (
              <SvgXml style={{marginHorizontal: 8}} xml={Xmls.selected} />
            )}
          </TouchableOpacity>
        ))}
      </ActionSheet>
    </>
  );
}

const style = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 12,
    paddingHorizontal: 24,
  },
  backupBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E2E5E9',
    padding: 12,
    borderRadius: 8,
    marginVertical: 12,
  },

  userdata: {
    borderWidth: 1,
    borderColor: '#E2E5E9',
    borderRadius: 8,
    padding: 12,
  },

  backUpButton: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#C0E863',
    alignItems: 'center',
    marginTop: 12,
  },
});
