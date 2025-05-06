import {View, Text, StatusBar, StyleSheet} from 'react-native';
import React from 'react';

export default function Starred() {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent />

      <View style={style.content}>
        <Text style={{color: '#000'}}>Starred Screen</Text>
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
});
