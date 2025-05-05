import {View, Text, StatusBar, StyleSheet} from 'react-native';
import React from 'react';
import CustomBottomTab from '../../components/ui/CustomBottomTab';

export default function Home() {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent />
      <View style={style.container}>
        <Text style={{color: '#000'}}>Home</Text>
      </View>
      {/* <CustomBottomTab /> */}
    </>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 12,
    paddingHorizontal: 24,
  },
});
