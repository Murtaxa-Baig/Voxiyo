import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {SvgXml} from 'react-native-svg';
import Xmls from '../../utils/Xmls';
import storage from '../../utils/hooks/MmkvHook';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import ActionSheet from 'react-native-actions-sheet';
import {TextInput} from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';

export default function ProfileSetting({navigation}) {
  const [userData, setUserData] = useMMKVStorage('userData', storage);
  const [name, setName] = useState(userData.name);
  const [loading, setLoading] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deleteLoading, setDaleteLoading] = useState(false);

  const nameRef = useRef(null);

  const handleSaveName = async () => {
    try {
      setLoading(true);
      const user = auth().currentUser;
      await user.updateProfile({displayName: name});
      const updatedData = {
        ...userData,
        name: name,
      };
      setUserData(updatedData);
      setLoading(false);
      Toast.show({
        type: 'success',
        text1: 'Name update',
        text2: 'Name update successfully.',
      });
      nameRef.current?.hide();
    } catch (error) {
      console.error('Error updating name:', error);
      setLoading(false);
    }
  };

  const Logout = async () => {
    try {
      setLogoutLoading(true);
      await auth().signOut();
      storage.removeItem('userData');
      Toast.show({
        type: 'success',
        text1: 'Logout',
        text2: 'Logout successfully.',
      });
      setLogoutLoading(false);
    } catch (error) {
      console.error('Error signing out: ', error);
      setLogoutLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setDaleteLoading(true);
      const user = auth().currentUser;

      if (user) {
        await user.delete();
        storage.clearStore();
        setDaleteLoading(false);
        Toast.show({
          type: 'success',
          text1: 'Delete Account',
          text2: 'Account deleted successfully.',
        });
      }
    } catch (error) {
      setDaleteLoading(false);
      console.error('Error deleting user:', error);
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent />
      <View style={style.content}>
        <TouchableOpacity
        //   onPress={() => navigation.openDrawer()}
        >
          <SvgXml style={{marginHorizontal: 4}} xml={Xmls.menuIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('BackupScreen')}
          style={style.backupBtn}>
          <Text style={{color: '#000'}}>Backup</Text>
          <SvgXml style={{marginHorizontal: 4}} xml={Xmls.rightArrow} />
        </TouchableOpacity>
        <View style={style.userdata}>
          <TouchableOpacity
            onPress={() => nameRef.current?.show()}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{color: '#000'}}>Name</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{color: '#000'}}>{userData.name}</Text>
              <SvgXml
                style={{marginHorizontal: 4, marginLeft: 20}}
                xml={Xmls.rightArrow}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: 12,
            }}>
            <Text style={{color: '#000'}}>Email</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{color: '#000'}}>{userData.email}</Text>
              <SvgXml
                style={{marginHorizontal: 4, marginLeft: 20}}
                xml={Xmls.rightArrow}
              />
            </View>
          </TouchableOpacity>
          <View style={style.separator} />
          <TouchableOpacity
            onPress={() => setIsModalVisible(true)}
            style={{marginVertical: 12}}>
            <Text style={{color: 'red'}}>Delete Account</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => Logout()} style={style.logoutButton}>
          {logoutLoading ? (
            <ActivityIndicator size="small" color="#000" />
          ) : (
            <Text style={{color: '#000'}}>Logout</Text>
          )}
        </TouchableOpacity>
      </View>
      <ActionSheet
        ref={nameRef}
        gestureEnabled
        containerStyle={{
          height: '30%',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: '#fff',
          paddingHorizontal: 24,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}>
          <TouchableOpacity
            style={{width: 30, height: 30}}
            onPress={() => nameRef.current?.hide()}>
            <SvgXml style={{marginHorizontal: 4}} xml={Xmls.crossIcon} />
          </TouchableOpacity>
        </View>
        <View style={style.separator} />
        <Text style={{color: '#000', marginVertical: 12}}>Name</Text>
        <TextInput
          style={style.input}
          placeholder="Enter your name"
          placeholderTextColor="#7C7F83"
          value={name}
          onChangeText={text => setName(text)}
        />
        <TouchableOpacity style={style.saveButton} onPress={handleSaveName}>
          {loading ? (
            <ActivityIndicator size="small" color="#000" />
          ) : (
            <Text style={{color: '#000'}}>Save</Text>
          )}
        </TouchableOpacity>
      </ActionSheet>
      {isModalVisible && (
        <Modal isVisible={isModalVisible} transparent animationType="fade">
          <View style={style.modalBackground}>
            <View style={style.modalContent}>
              <Text style={{color: '#000', textAlign: 'center', width: '100%'}}>
                Are you sure to delete{'\n'}your account?
              </Text>

              <View style={style.modalButtonsContainer}>
                <TouchableOpacity
                  onPress={() => setIsModalVisible(false)}
                  style={[style.modalButton, style.cancelButton]}>
                  <Text style={style.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleDeleteAccount()}
                  style={[style.modalButton, style.discardButton]}>
                  {loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text style={style.discardButtonText}>Delete</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
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
  separator: {
    borderWidth: 1,
    height: 1,
    borderColor: '#E2E5E9',
  },

  logoutButton: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#F5F6F8',
    alignItems: 'center',
    marginTop: 12,
  },
  input: {
    color: '#000',
    height: 38,
    width: '100%',
    padding: 8,
    borderWidth: 1,
    borderColor: '#E2E5E9',
    borderRadius: 8,
  },
  saveButton: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#C0E863',
    alignItems: 'center',
    marginTop: 12,
  },

  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    gap: 10,
  },

  modalButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
  },
  discardButton: {
    backgroundColor: 'red',
  },
  cancelButtonText: {
    color: '#000',
  },
  discardButtonText: {
    color: 'white',
  },
});
