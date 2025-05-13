import {View, Text} from 'react-native';
import React from 'react';

export default function MainPoints() {
  return (
    <View>
      <View
        style={{flexDirection: 'row', alignItems: 'center', marginVertical: 4}}>
        <View style={{borderWidth: 2, borderRadius: 2, marginRight: 8}}></View>
        <Text style={{color: '#000'}}>Volutpat sed sit orci nisi. </Text>
      </View>
      <View
        style={{flexDirection: 'row', alignItems: 'center', marginVertical: 4}}>
        <View style={{borderWidth: 2, borderRadius: 2, marginRight: 8}}></View>
        <Text style={{color: '#000'}}>
          Quis donec aliquet massa sed vitae.{' '}
        </Text>
      </View>
      <View
        style={{flexDirection: 'row', alignItems: 'center', marginVertical: 4}}>
        <View style={{borderWidth: 2, borderRadius: 2, marginRight: 8}}></View>
        <Text style={{color: '#000'}}>Ut a elementum mollis arcu. </Text>
      </View>
      <View
        style={{flexDirection: 'row', alignItems: 'center', marginVertical: 4}}>
        <View style={{borderWidth: 2, borderRadius: 2, marginRight: 8}}></View>
        <Text style={{color: '#000'}}>Erat habitant egestas elementum. </Text>
      </View>
      <View
        style={{flexDirection: 'row', alignItems: 'center', marginVertical: 4}}>
        <View style={{borderWidth: 2, borderRadius: 2, marginRight: 8}}></View>
        <Text style={{color: '#000'}}>Ultrices convallis aliquam mi </Text>
      </View>
    </View>
  );
}
