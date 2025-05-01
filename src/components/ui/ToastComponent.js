import React from 'react';
import {View, Button} from 'react-native';
import Toast from 'react-native-toast-message';

const ToastComponent = () => {
  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Hello 👋',
      text2: 'This is a toast message 🚀',
    });
  };

  return (
    <View style={{marginTop: 100, paddingHorizontal: 20}}>
      <Button title="Show Toast" onPress={showToast} />
    </View>
  );
};

export default ToastComponent;
