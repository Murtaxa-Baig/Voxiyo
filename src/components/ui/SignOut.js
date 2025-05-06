import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import auth from '@react-native-firebase/auth';
import storage from '../../utils/hooks/MmkvHook';
import {useMMKVStorage} from 'react-native-mmkv-storage';

export default function SignOut(props) {
  const [userData, setUserData] = useMMKVStorage('userData', storage);

  const signOut = async () => {
    try {
      await auth().signOut();
      // setUserData(undefined);
      storage.removeItem('userData');
      console.log('User signed out!');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Sign Out" onPress={signOut} />
    </DrawerContentScrollView>
  );
}
