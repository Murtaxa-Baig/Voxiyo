import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {SvgXml} from 'react-native-svg';
import Xmls from '../../utils/Xmls';

import ActionSheet from 'react-native-actions-sheet';

export default function AppHeader({text}) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState(true);

  const moreIconRef = useRef(null);
  const moveToFolderRef = useRef(null);
  const tagRef = useRef(null);
  const shareRef = useRef(null);

  const data = [
    {icon: Xmls.creatingIcon, text: 'Regenerate Transcript'},
    {icon: Xmls.addToFolderIcon, text: 'Add to folder'},
    {icon: Xmls.tagIcon, text: 'Add Tags'},
    {icon: Xmls.ShareIcon, text: 'Share'},
    {icon: Xmls.deleteIcon, text: 'Delete'},
  ];

  const handleAction = actionText => {
    if (actionText === 'Delete') {
      moreIconRef.current?.hide();
      setIsModalVisible(true);
    } else if (actionText === 'Add to folder') {
      moreIconRef.current?.hide();
      moveToFolderRef.current?.show();
    } else if (actionText === 'Add Tags') {
      moreIconRef.current.hide();
      tagRef.current?.show();
    } else if (actionText === 'Share') {
      moreIconRef.current.hide();
      shareRef.current?.show();
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
          onPress={() => moreIconRef.current?.show()}>
          <SvgXml xml={Xmls.moreIcon} />
        </TouchableOpacity>
      </View>
      <ActionSheet
        ref={moreIconRef}
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
      <ActionSheet
        ref={moveToFolderRef}
        gestureEnabled
        containerStyle={{
          height: '95%',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: '#fff',
          paddingHorizontal: 24,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#fff',
            width: '100%',
            marginVertical: 8,
          }}>
          <TouchableOpacity
            style={{width: '20%'}}
            onPress={() => moveToFolderRef.current.hide()}>
            <SvgXml xml={Xmls.leftArrow} />
          </TouchableOpacity>
          <Text
            style={{
              color: '#000',
              fontSize: 12,
              textAlign: 'center',
              width: '60%',
            }}>
            Move to
          </Text>
        </View>
        <Text style={{color: '#7C7F83', marginVertical: 12}}>Folder</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 6,
          }}>
          <SvgXml xml={Xmls.folderIcon} style={{marginRight: 8}} />
          <Text style={{color: '#000'}}>Review Freelance</Text>
        </View>
        {[1, 2].map((item, index) => (
          <TouchableOpacity
            // onPress={() => setIsSection(false)}
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 6,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <SvgXml xml={Xmls.folderIcon} style={{marginRight: 8}} />
              <Text style={{color: '#000'}}>Folder</Text>
            </View>
            <SvgXml xml={Xmls.rightArrow} style={{marginRight: 8}} />
          </TouchableOpacity>
        ))}
      </ActionSheet>
      <ActionSheet
        ref={tagRef}
        gestureEnabled
        containerStyle={{
          height: '95%',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: '#fff',
          paddingHorizontal: 24,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 12,
          }}>
          <TouchableOpacity onPress={() => tagRef.current?.hide()}>
            <Text style={{color: '#000'}}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              paddingVertical: 5,
              paddingHorizontal: 14,
              backgroundColor: '#C0E863',
              borderRadius: 8,
            }}>
            <Text style={{color: '#000'}}>Save</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputFields}>
          <SvgXml xml={Xmls.tagIcon} style={styles.starIcon} />
          <TextInput
            style={styles.input}
            placeholder="Add tags"
            placeholderTextColor="#7C7F83"
          />
        </View>
        <Text style={{color: '#7C7F83', marginVertical: 12}}>Suggested</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <SvgXml xml={Xmls.starIcon} style={styles.icon} />
          <Text style={{color: '#000'}}>Starred</Text>
        </View>
      </ActionSheet>
      <ActionSheet
        ref={shareRef}
        gestureEnabled
        containerStyle={{
          height: '30%',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: '#fff',
          paddingHorizontal: 24,
        }}>
        <Text style={{color: '#000', marginTop: 12}}>Share</Text>
        <Text style={{color: '#7C7F83', fontSize: 14}}>
          Anyone with the link can see the voice note.
        </Text>
        <View
          style={{
            borderWidth: 1,
            borderColor: '#D9D9D9',
            marginTop: 12,
            borderRadius: 8,
          }}>
          <Text
            style={{
              color: '#0D0F10',
              marginVertical: 12,
              width: '100%',
              textAlign: 'center',
            }}>
            {`https://www.voicenotes.com/3072002`}
          </Text>
        </View>
        {isLinkCopied ? (
          <TouchableOpacity
            onPress={() => setIsLinkCopied(false)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#C0E863',
              paddingVertical: 12,
              borderRadius: 8,
              marginVertical: 16,
              alignItems: 'center',
            }}>
            <SvgXml xml={Xmls.copyIcon} style={styles.icon} />
            <Text style={styles.continueButtonText}>Copy Link</Text>
          </TouchableOpacity>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#C0E863',
                paddingVertical: 12,
                borderRadius: 8,
                marginVertical: 16,
                alignItems: 'center',
                width: '48%',
              }}>
              <SvgXml xml={Xmls.copyIcon} style={styles.icon} />
              <Text style={styles.continueButtonText}>Copy Link</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                borderWidth: 1,
                paddingVertical: 12,
                borderRadius: 8,
                marginVertical: 16,
                alignItems: 'center',
                width: '48%',
              }}>
              <Text style={styles.continueButtonText}>Unpublish</Text>
            </TouchableOpacity>
          </View>
        )}
      </ActionSheet>
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
  inputFields: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 38,
    width: '100%',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 43,
    fontSize: 16,
    color: '#000',
  },

  continueButtonText: {
    color: '#000',
  },
});
