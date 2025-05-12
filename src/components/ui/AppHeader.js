import {View, Text, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import React, {useRef, useState} from 'react';
import {SvgXml} from 'react-native-svg';
import Xmls from '../../utils/Xmls';

import ActionSheet from 'react-native-actions-sheet';

export default function AppHeader({text}) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const actionSheetRef = useRef(null);

  const data = [
    {icon: Xmls.creatingIcon, text: 'Regenerate Transcript'},
    {icon: Xmls.addToFolderIcon, text: 'Add to folder'},
    {icon: Xmls.tagIcon, text: 'Add Tags'},
    {icon: Xmls.ShareIcon, text: 'Share'},
    {icon: Xmls.deleteIcon, text: 'Delete'},
  ];

  const handleAction = actionText => {
    if (actionText === 'Delete') {
      actionSheetRef.current?.hide();
      setIsModalVisible(true);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity>
          <SvgXml xml={Xmls.dropIcon} />
        </TouchableOpacity>
        <Text style={{color: '#000'}}>{text}</Text>
        <TouchableOpacity
          style={{justifyContent: 'center', height: 24, width: 24}}
          onPress={() => actionSheetRef.current?.show()}>
          <SvgXml xml={Xmls.moreIcon} />
        </TouchableOpacity>
      </View>
      <ActionSheet
        ref={actionSheetRef}
        gestureEnabled
        containerStyle={{
          height: '45%',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: '#fff',
          paddingHorizontal: 24,
        }}>
        <Text style={{color: '#000', fontWeight: '500'}}>New Recording</Text>
        <Text style={{color: '#7C7F83', marginVertical: 12}}>
          30 July 2024 13.09
        </Text>
        {data.map((item, index) => (
          <TouchableOpacity
            onPress={() => handleAction(item.text)}
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 12,
            }}>
            <SvgXml xml={item.icon} />
            <Text style={{color: '#000', marginLeft: 10}}>{item.text}</Text>
          </TouchableOpacity>
        ))}
      </ActionSheet>
      {isModalVisible ? (
        <Modal isVisible={isModalVisible} transparent animationType="fade">
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              <Text style={{color: '#000', textAlign: 'center', width: '100%'}}>
                Are you sure to delete{'\n'}[Name of the Voice Note]?
              </Text>

              <View style={styles.modalButtonsContainer}>
                <TouchableOpacity
                  onPress={() => setIsModalVisible(false)}
                  style={[styles.modalButton, styles.cancelButton]}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  // onPress={handleDiscard}
                  style={[styles.modalButton, styles.discardButton]}>
                  <Text style={styles.discardButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    width: '100%',
    marginVertical: 6,
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
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
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
