import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import Xmls from '../../utils/Xmls';

export default function Starred() {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent />

      <View style={style.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Recording')}
          style={style.microPhoneConatiner}>
          <SvgXml xml={Xmls.hoverMicrophone} />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 24,
          }}>
          <View style={style.searchBox}>
            <TouchableOpacity>
              <SvgXml style={{marginHorizontal: 4}} xml={Xmls.menuIcon} />
            </TouchableOpacity>
            <TextInput
              style={{color: '#000', width: '78%'}}
              placeholder="Search"
              placeholderTextColor="#999"
            />
            <SvgXml style={{marginHorizontal: 4}} xml={Xmls.microphoneIcon} />
          </View>
          <SvgXml xml={Xmls.aiIcon} />
        </View>
        <View style={style.emptyListContainer}>
          <Image
            style={style.img}
            source={require('../../assets/images/Group.png')}
          />
          <Text style={{color: '#0D0F10', fontWeight: '500', marginTop: 8}}>
            You have no starred voice note yet
          </Text>
          <Text style={{color: '#7C7F83', fontSize: 12}}>
            Your starred voice note will be here
          </Text>
        </View>
      </View>
    </>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 12,
  },
  searchBox: {
    width: '88%',
    height: 38,
    backgroundColor: '#F5F6F8',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  microPhoneConatiner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    right: 24,
    height: 56,
    width: 56,
    backgroundColor: '#C0E863',
    borderRadius: 56,
    zIndex: 1,
  },

  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 24,
  },
  img: {
    width: 75,
    height: 50,
  },
});
