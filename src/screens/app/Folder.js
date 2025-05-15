import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {SvgXml} from 'react-native-svg';
import Xmls from '../../utils/Xmls';
import ActionSheet from 'react-native-actions-sheet';

export default function Folder({navigation}) {
  const [createFolderPressed, setCreateFolderPressed] = useState(false);
  const [isGridView, setIsGridView] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [folderName, setFolderName] = useState('');
  const createFolderRef = useRef(null);
  const moreIconRef = useRef(null);
  const createSectionRef = useRef(null);
  const moveToFolderRef = useRef(null);
  const shareRef = useRef(null);
  const recentRef = useRef(null);

  const recentOptions = ['Daily', 'Weekly', 'Monthly'];

  const data = [
    {
      icon: Xmls.plusIcon,
      text: 'Add Section',
      onPress: () => {
        moreIconRef.current?.hide();
        createSectionRef.current.show();
      },
    },
    {
      icon: Xmls.folderIcon,
      text: 'Move to',
      onPress: () => {
        moreIconRef.current?.hide();
        moveToFolderRef.current.show();
      },
    },
    {
      icon: Xmls.ShareIcon,
      text: 'Share',
      onPress: () => {
        moreIconRef.current?.hide();
        shareRef.current.show();
      },
    },
    {
      icon: Xmls.editIcon,
      text: 'Edit',
      onPress: () => {
        moreIconRef.current?.hide();
        createSectionRef.current.show();
      },
    },
    {
      icon: Xmls.deleteIcon,
      text: 'Delete',
      onPress: () => {
        moreIconRef.current?.hide();
        setIsModalVisible(true);
      },
    },
  ];

  const gridSetionData = [
    {title: 'Meeting', text: '2 sections · 19 Voicenote'},
    {title: 'Review Freelance Project', text: '24 Voicenote'},
    {title: 'Daily Task', text: '5 sections'},
  ];

  const toggleState = () => {
    setIsGridView(prev => !prev);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent />

      <View style={style.content}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Recording')}
          style={style.microPhoneConatiner}>
          <SvgXml xml={Xmls.hoverMicrophone} />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 24,
          }}>
          <View style={style.searchBox}>
            <TouchableOpacity
            // onPress={() => navigation.openDrawer()}
            >
              <SvgXml style={{marginHorizontal: 4}} xml={Xmls.menuIcon} />
            </TouchableOpacity>
            <TextInput
              style={{color: '#000', width: '78%'}}
              placeholder="Search"
              placeholderTextColor="#999"
            />
            <SvgXml style={{marginHorizontal: 4}} xml={Xmls.microphoneIcon} />
          </View>
          <SvgXml xml={Xmls.aiIcon} style={{marginHorizontal: 4}} />
          <TouchableOpacity
            onPress={() => {
              createFolderPressed
                ? moreIconRef.current?.show()
                : createFolderRef.current?.show();
            }}>
            <SvgXml xml={Xmls.plusIcon} style={{marginHorizontal: 4}} />
          </TouchableOpacity>
        </View>

        {createFolderPressed ? (
          <View>
            <View style={style.sectionHeader}>
              <TouchableOpacity
                onPress={() => recentRef.current?.show()}
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <SvgXml xml={Xmls.recentIcon} />
                <Text style={{color: '#000', marginLeft: 4}}>Recents</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => toggleState()}>
                <SvgXml xml={isGridView ? Xmls.listIcon : Xmls.gridIcon} />
              </TouchableOpacity>
            </View>
            <>
              {isGridView ? (
                <View
                  style={{
                    paddingHorizontal: 24,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                  }}>
                  {gridSetionData.map((item, index) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('InsideFolder', {
                            userData: {folderName: item},
                          });
                        }}
                        key={index}
                        style={style.girdSection}>
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
                              justifyContent: 'center',
                              height: 32,
                              width: 32,
                              borderRadius: 8,
                              backgroundColor: '#F5F6F8',
                            }}>
                            <SvgXml xml={Xmls.folderIcon} />
                          </View>
                          <TouchableOpacity
                            style={{padding: 8}}
                            onPress={() => moreIconRef.current.show()}>
                            <SvgXml xml={Xmls.moreIcon} />
                          </TouchableOpacity>
                        </View>
                        <Text style={{color: '#000'}}>{item.title}</Text>
                        <Text style={{color: '#7C7F83', fontSize: 12}}>
                          {item.text}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ) : (
                <View>
                  {['Meeting', 'Review Freelance', 'Daily Task'].map(
                    (item, index) => {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            navigation.navigate('InsideFolder', {
                              userData: {folderName: item},
                            });
                          }}
                          key={index}
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingHorizontal: 24,
                          }}>
                          <Text style={{color: '#0D0F10', paddingVertical: 8}}>
                            {item}
                          </Text>
                          <TouchableOpacity
                            style={{paddingHorizontal: 8}}
                            onPress={() => moreIconRef.current.show()}>
                            <SvgXml xml={Xmls.moreIconVertical} />
                          </TouchableOpacity>
                        </TouchableOpacity>
                      );
                    },
                  )}
                </View>
              )}
            </>
          </View>
        ) : (
          <View style={style.emptyListContainer}>
            <Image
              style={style.img}
              source={require('../../assets/images/folder.png')}
            />
            <Text style={{color: '#0D0F10', fontWeight: '500', marginTop: 8}}>
              No folder yet
            </Text>
            <Text style={{color: '#7C7F83', fontSize: 12}}>
              Create a folder to store your voice note
            </Text>
            <TouchableOpacity
              onPress={() => createFolderRef.current?.show()}
              style={style.createBtn}>
              <Text style={{color: '#0D0F10', fontSize: 14}}>
                Create Folder
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {isModalVisible && (
          <Modal isVisible={isModalVisible} transparent animationType="fade">
            <View style={style.modalBackground}>
              <View style={style.modalContent}>
                <Text
                  style={{color: '#000', textAlign: 'center', width: '100%'}}>
                  Are you sure to delete{'\n'}[Name of the folder]?
                </Text>

                <View style={style.modalButtonsContainer}>
                  <TouchableOpacity
                    onPress={() => setIsModalVisible(false)}
                    style={[style.modalButton, style.cancelButton]}>
                    <Text style={style.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    // onPress={handleDiscard}
                    style={[style.modalButton, style.discardButton]}>
                    <Text style={style.discardButtonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        )}
      </View>
      <ActionSheet
        ref={createFolderRef}
        gestureEnabled
        containerStyle={{
          height: '35%',
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
            onPress={() => createFolderRef.current?.hide()}>
            <SvgXml style={{marginHorizontal: 4}} xml={Xmls.crossIcon} />
          </TouchableOpacity>
        </View>
        <View style={style.separator} />
        <Text style={{color: '#000', marginVertical: 12}}>Folder Name</Text>
        <TextInput
          style={style.createFolderInput}
          placeholder="Enter text"
          placeholderTextColor="#7C7F83"
          value={folderName}
          onChangeText={text => setFolderName(text)}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}>
          <Text style={{color: '#7C7F83', marginTop: 4, fontSize: 14}}>
            0/50
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            if (folderName.trim().length > 0) {
              createFolderRef.current.hide();
              setCreateFolderPressed(true);
              setFolderName('');
            } else {
              // alert('Folder name cannot be empty.');
            }
          }}
          style={style.saveButton}>
          <Text style={{color: '#000'}}>Create Folder</Text>
        </TouchableOpacity>
      </ActionSheet>
      <ActionSheet
        ref={moreIconRef}
        gestureEnabled
        containerStyle={{
          height: '45%',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: '#fff',
        }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 12,
            paddingHorizontal: 24,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              height: 32,
              width: 32,
              borderRadius: 8,
              backgroundColor: '#F5F6F8',
            }}>
            <SvgXml xml={Xmls.folderIcon} />
          </View>
          <Text style={{color: '#000', marginLeft: 10}}>Meeting</Text>
        </TouchableOpacity>
        <View style={style.separator} />
        {data.map((item, index) => (
          <TouchableOpacity
            onPress={() => item.onPress()}
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 12,
              paddingHorizontal: 24,
            }}>
            <SvgXml xml={item.icon} />
            <Text style={{color: '#000', marginLeft: 10}}>{item.text}</Text>
          </TouchableOpacity>
        ))}
      </ActionSheet>
      <ActionSheet
        ref={createSectionRef}
        gestureEnabled
        containerStyle={{
          height: '35%',
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
            onPress={() => createSectionRef.current?.hide()}>
            <SvgXml style={{marginHorizontal: 4}} xml={Xmls.crossIcon} />
          </TouchableOpacity>
        </View>
        <View style={style.separator} />
        <Text style={{color: '#000', marginVertical: 12}}>Section Name</Text>
        <TextInput
          style={style.createFolderInput}
          placeholder="Enter text"
          placeholderTextColor="#7C7F83"
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}>
          <Text style={{color: '#7C7F83', marginTop: 4, fontSize: 14}}>
            0/50
          </Text>
        </View>
        <TouchableOpacity style={style.saveButton}>
          <Text style={{color: '#000'}}>Create Section</Text>
        </TouchableOpacity>
      </ActionSheet>
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
            <SvgXml xml={Xmls.copyIcon} style={style.icon} />
            <Text style={style.continueButtonText}>Copy Link</Text>
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
              <SvgXml xml={Xmls.copyIcon} style={style.icon} />
              <Text style={style.continueButtonText}>Copy Link</Text>
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
              <Text style={style.continueButtonText}>Unpublish</Text>
            </TouchableOpacity>
          </View>
        )}
      </ActionSheet>

      <ActionSheet
        ref={recentRef}
        gestureEnabled
        containerStyle={{
          height: '25%',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: '#fff',
          paddingHorizontal: 24,
        }}>
        {recentOptions.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              recentRef.current?.hide();
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 12,
              borderRadius: 8,
              marginVertical: 4,
            }}>
            <Text style={{color: '#000'}}>{item}</Text>
          </TouchableOpacity>
        ))}
      </ActionSheet>
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
  },

  searchBox: {
    width: '80%',
    height: 38,
    backgroundColor: '#F5F6F8',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },

  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 24,
  },
  img: {
    width: 75,
    height: 50,
  },
  createBtn: {
    marginTop: 12,
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
  },

  separator: {
    borderWidth: 1,
    height: 1,
    borderColor: '#E2E5E9',
  },

  createFolderInput: {
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

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 12,
    paddingHorizontal: 24,
  },

  microPhoneConatiner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    right: 24,
    height: 56,
    width: 56,
    backgroundColor: '#C0E863',
    borderRadius: 56,
    zIndex: 1,
  },
  girdSection: {
    borderWidth: 1,
    borderColor: '#E2E5E9',
    borderRadius: 12,
    paddingLeft: 12,
    paddingTop: 8,
    paddingRight: 4,
    paddingBottom: 12,
    width: '48%',
    marginVertical: 6,
  },
  continueButtonText: {
    color: '#000',
  },
  icon: {
    marginRight: 8,
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
