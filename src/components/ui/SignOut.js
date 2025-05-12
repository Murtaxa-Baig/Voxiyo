import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import storage from '../../utils/hooks/MmkvHook';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {SvgXml} from 'react-native-svg';
import Xmls from '../../utils/Xmls';

export default function SignOut(props) {
  const [userData] = useMMKVStorage('userData', storage);

  const signOut = async () => {
    try {
      await auth().signOut();
      storage.removeItem('userData');
      console.log('User signed out!');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'space-between'}}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem label="Sign Out" onPress={signOut} />
      </DrawerContentScrollView>

      <View style={styles.profileContainer}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('ProfileSetting')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              height: 32,
              width: 32,
              borderRadius: 32,
              backgroundColor: '#E2E5E9',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 4,
            }}>
            <SvgXml xml={Xmls.profile} />
          </View>
          <Text style={styles.profileText}>
            {userData?.email ?? 'User Profile'}
          </Text>
        </TouchableOpacity>
        <SvgXml xml={Xmls.moreIcon} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  profileText: {
    color: '#7C7F83',
  },
});
