import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import Xmls from '../../utils/Xmls';

export default function Home({navigation}) {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent />
      <View style={style.container}>
        <View style={style.content}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                width: '88%',
                height: 38,
                backgroundColor: '#F5F6F8',
                borderRadius: 8,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <SvgXml style={{marginHorizontal: 4}} xml={Xmls.menuIcon} />
              </TouchableOpacity>
              <TextInput
                style={{color: '#000', width: '78%'}}
                placeholder="Search"
                placeholderTextColor="#999"
              />
              <SvgXml style={{marginHorizontal: 4}} xml={Xmls.microphoneIcon} />
            </View>
            <SvgXml style={{marginHorizontal: 4}} xml={Xmls.aiIcon} />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}>
            <Text style={style.Recording}>Tap to record</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Recording');
              }}
              style={style.RecordingView}>
              <SvgXml xml={Xmls.microphoneIconBlack} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 12,
    paddingHorizontal: 24,
  },
  Recording: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
  },
  RecordingView: {
    height: 72,
    width: 72,
    backgroundColor: '#C0E863',
    borderRadius: 72,
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
