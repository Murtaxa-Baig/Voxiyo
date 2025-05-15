import React, {useRef, useState} from 'react';
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
import * as Progress from 'react-native-progress';
import ActionSheet from 'react-native-actions-sheet';

export default function SignOut(props) {
  const [userData] = useMMKVStorage('userData', storage);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [upgradeOption, setUpgradeOption] = useState(false);
  const upgradeRef = useRef(null);

  const upgradedata = [
    {title: 'Yearly', amount: '100', duration: '/year'},
    {title: 'Monthly', amount: '10', duration: '/month'},
  ];

  const signOut = async () => {
    try {
      await auth().signOut();
      storage.removeItem('userData');
      console.log('User signed out!');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  const toggleState = () => {
    setShowUpgrade(prev => !prev);
  };
  const upgradeOptionState = () => {
    setUpgradeOption(prev => !prev);
  };

  return (
    <>
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
          <DrawerItem label="Sign Out" onPress={signOut} />
        </DrawerContentScrollView>

        {showUpgrade && (
          <View
            style={{
              margin: 12,
              padding: 12,
              backgroundColor: '#EBEEF0',
              borderRadius: 12,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 32,
                  width: 32,
                  borderRadius: 8,
                  backgroundColor: '#E2E5E9',
                }}>
                <SvgXml xml={Xmls.microPhoneSmall} />
              </View>
              <View style={{marginLeft: 12}}>
                <Text style={{color: '#7C7F83', fontSize: 14, marginBottom: 4}}>
                  0 of 300 minutes used
                </Text>
                <Progress.Bar
                  progress={0.1}
                  color="#000"
                  width={180}
                  borderWidth={0}
                  unfilledColor="#E2E5E9"
                />
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                props.navigation.closeDrawer();
                setShowUpgrade(false);
                upgradeRef.current.show();
              }}
              style={styles.continueButton}>
              <Text style={{color: '#000'}}>Upgrade</Text>
            </TouchableOpacity>
          </View>
        )}

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
          <TouchableOpacity onPress={() => toggleState()} style={{padding: 4}}>
            <SvgXml xml={Xmls.moreIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <ActionSheet
        ref={upgradeRef}
        gestureEnabled
        containerStyle={{
          height: '65%',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: '#fff',
          paddingHorizontal: 24,
        }}>
        <Text style={{color: '#0D0F10', fontSize: 24, marginTop: 12}}>
          Upgrade your plans.
        </Text>
        <Text style={{color: '#7C7F83', fontSize: 12}}>
          Upgrade your plans to experience the next level of communication with
          us.
        </Text>
        <View
          style={{backgroundColor: '#F3CCCC', borderRadius: 9, marginTop: 12}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginHorizontal: 12,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 4,
              }}>
              <SvgXml xml={Xmls.timeIcon} />
              <Text style={{color: '#C40000', marginLeft: 4}}>
                Limited Offer
              </Text>
            </View>
            <Text style={{color: '#C40000'}}>23:09:24</Text>
          </View>

          <View
            style={{
              backgroundColor: '#fff',
              padding: 12,
              borderRadius: 9,
              borderWidth: 1,
              borderColor: '#E2E5E9',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 12,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#fff',
                }}>
                <TouchableOpacity onPress={() => upgradeOptionState()}>
                  {upgradeOption ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#000',
                        height: 24,
                        width: 24,
                        borderRadius: 8,
                        marginRight: 4,
                      }}>
                      <SvgXml xml={Xmls.whiteTickIcon} />
                    </View>
                  ) : (
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: '#E2E5E9',
                        height: 24,
                        width: 24,
                        borderRadius: 8,
                        marginRight: 4,
                      }}></View>
                  )}
                </TouchableOpacity>
                <Text style={{color: '#000'}}>Lifetime</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{color: '#0D0F10'}}>$500</Text>
                <Text style={{color: '#7C7F83', fontSize: 12, marginLeft: 4}}>
                  Once
                </Text>
              </View>
            </View>
            {[1, 2, 3].map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 2,
                  }}>
                  <SvgXml xml={Xmls.checkIcon} style={{marginHorizontal: 4}} />
                  <Text style={{color: '#7C7F83', marginLeft: 6}}>
                    Non at mattis aliquam at faucibus.
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
        {upgradedata.map((item, index) => {
          return (
            <View
              key={index}
              style={{
                backgroundColor: '#fff',
                padding: 12,
                borderRadius: 9,
                borderWidth: 1,
                borderColor: '#E2E5E9',
                marginVertical: 4,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                  }}>
                  <TouchableOpacity onPress={() => upgradeOptionState()}>
                    {upgradeOption ? (
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: '#000',
                          height: 24,
                          width: 24,
                          borderRadius: 8,
                          marginRight: 4,
                        }}>
                        <SvgXml xml={Xmls.whiteTickIcon} />
                      </View>
                    ) : (
                      <View
                        style={{
                          borderWidth: 1,
                          borderColor: '#E2E5E9',
                          height: 24,
                          width: 24,
                          borderRadius: 8,
                          marginRight: 4,
                        }}></View>
                    )}
                  </TouchableOpacity>
                  <Text style={{color: '#000'}}>{item.title}</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{color: '#0D0F10'}}>${item.amount}</Text>
                  <Text style={{color: '#7C7F83', fontSize: 12, marginLeft: 4}}>
                    {item.duration}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
        <TouchableOpacity
          onPress={() => upgradeRef.current.hide()}
          style={styles.continueButton}>
          <Text style={{color: '#000'}}>Upgrade</Text>
        </TouchableOpacity>
      </ActionSheet>
    </>
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

  continueButton: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderRadius: 8,
    marginTop: 12,
    backgroundColor: '#C0E863',
    alignItems: 'center',
  },
});
