import React, {useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';

export default function EditTranscript({navigation}) {
  const [transcript, setTranscript] = useState(
    `Volutpat sed sit orci nisi. Quis donec aliquet id et nunc massa sed vitae. Ut a elementum mollis arcu. Erat habitant ridiculus quam in tristique egestas elementum. Ultrices convallis aliquam mi sollicitudin varius et.`,
  );

  const handleSave = () => {
    navigation.goBack();
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent />
      <View style={style.content}>
        <View style={style.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={style.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSave} style={style.saveButton}>
            <Text style={style.saveText}>Save</Text>
          </TouchableOpacity>
        </View>

        <View style={style.separator} />

        <ScrollView
          contentContainerStyle={{paddingBottom: 30}}
          keyboardShouldPersistTaps="handled"
          style={style.scroll}>
          <TextInput
            value={transcript}
            onChangeText={setTranscript}
            style={style.textInput}
            multiline
            placeholder="Edit your transcript..."
            textAlignVertical="top"
          />
        </ScrollView>
      </View>
    </>
  );
}

const style = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 24,
    marginVertical: 16,
  },
  cancelText: {
    color: '#000',
  },
  saveButton: {
    paddingVertical: 5,
    paddingHorizontal: 14,
    backgroundColor: '#C0E863',
    borderRadius: 8,
  },
  saveText: {
    color: '#000',
  },
  separator: {
    borderWidth: 1,
    height: 1,
    borderColor: '#E2E5E9',
  },
  scroll: {
    flex: 1,
    marginHorizontal: 24,
    marginTop: 16,
  },
  textInput: {
    flex: 1,
    color: '#7C7F83',
  },
});
