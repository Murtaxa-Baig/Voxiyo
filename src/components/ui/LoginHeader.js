import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import Xmls from '../../utils/Xmls';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as Progress from 'react-native-progress';

export default function LoginHeader({navigation, progress}) {
  return (
    // <SafeAreaView>
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backArrow}
        onPress={() => navigation.goBack()}>
        <SvgXml xml={Xmls.backArrow} />
      </TouchableOpacity>
      <Progress.Bar
        progress={progress}
        color="#C0E863"
        width={180}
        borderWidth={0}
        unfilledColor="#F5F6F8"
      />
    </View>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%',
    marginTop: 8,
  },
  backArrow: {
    width: '20%',
  },
});
