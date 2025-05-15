import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {SvgXml} from 'react-native-svg';
import {Swipeable} from 'react-native-gesture-handler';
import Xmls from '../../utils/Xmls';
import ActionSheet from 'react-native-actions-sheet';

export default function Home({navigation}) {
  const [list, setList] = useState([1, 2]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSection, setIsSection] = useState(true);
  const [isGridView, setIsGridView] = useState(false);
  const [isSubmitFeedback, setIsSubmitFeedback] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState(true);

  const recentRef = useRef(null);
  const moreIconRef = useRef(null);
  const addToFolderRef = useRef(null);
  const createFolderRef = useRef(null);
  const createSectionRef = useRef(null);
  const feedbackRef = useRef(null);
  const tagRef = useRef(null);
  const shareRef = useRef(null);

  const recentOptions = ['Daily', 'Weekly', 'Monthly'];
  const data = [
    {
      icon: Xmls.creatingIcon,
      text: 'Regenerate Transcript',
      onPress: () => {
        moreIconRef.current.hide();
      },
    },
    {
      icon: Xmls.addToFolderIcon,
      text: 'Add to folder',
      onPress: () => {
        moreIconRef.current.hide();
        addToFolderRef.current.show();
      },
    },
    {
      icon: Xmls.tagIcon,
      text: 'Add Tags',
      onPress: () => {
        moreIconRef.current.hide();
        tagRef.current.show();
      },
    },
    {
      icon: Xmls.ShareIcon,
      text: 'Share',
      onPress: () => {
        moreIconRef.current.hide();
        shareRef.current.show();
      },
    },
    {
      icon: Xmls.deleteIcon,
      text: 'Delete',
      onPress: () => {
        moreIconRef.current.hide();
        setIsModalVisible(true);
      },
    },
  ];

  useEffect(() => {
    const oddLengths = [3, 5, 7, 9, 11, 13, 15];
    if (oddLengths.includes(list.length)) {
      feedbackRef.current.show();
    }
  }, []);

  const toggleState = () => {
    setIsGridView(prev => !prev);
  };

  const renderLeftActions = itemId => (
    <View style={{flexDirection: 'row', height: '100%'}}>
      <TouchableOpacity
        onPress={() => setIsModalVisible(true)}
        style={styles.actionButtonRed}>
        <SvgXml xml={Xmls.deleteWhiteIcon} />
        <Text style={styles.actionText}>Delete</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => addToFolderRef.current?.show()}
        style={styles.actionButtonBlue}>
        <SvgXml xml={Xmls.whiteFolderIcon} />
        <Text style={styles.actionText}>Move Folder</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => moreIconRef.current?.show()}
        style={styles.actionButtonGray}>
        <SvgXml xml={Xmls.moreIcon} />
        <Text style={{color: '#0D0F10', fontSize: 12, marginTop: 16}}>
          More
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent />
      <View style={style.container}>
        <View style={style.content}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Recording')}
            style={style.microPhoneConatiner}>
            <SvgXml xml={Xmls.hoverMicrophone} />
          </TouchableOpacity>

          {/* Search Bar */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 24,
            }}>
            <View style={style.searchBox}>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <SvgXml style={{marginHorizontal: 4}} xml={Xmls.menuIcon} />
              </TouchableOpacity>
              <TextInput
                style={{color: '#000', width: '78%'}}
                placeholder="Search"
                placeholderTextColor="#999"
              />
              <SvgXml style={{marginHorizontal: 4}} xml={Xmls.microphoneIcon} />
            </View>
            <SvgXml xml={Xmls.aiIcon} />
          </View>

          {/* No Data */}
          {list.length === 0 ? (
            <View style={style.emptyListContainer}>
              <Text style={style.Recording}>Tap to record</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Recording')}
                style={style.RecordingView}>
                <SvgXml xml={Xmls.microphoneIconBlack} />
              </TouchableOpacity>
            </View>
          ) : (
            <>
              {/* Header */}
              <View style={style.sectionHeader}>
                <TouchableOpacity
                  onPress={() => recentRef.current?.show()}
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <SvgXml xml={Xmls.recentIcon} />
                  <Text style={{color: '#000', marginLeft: 4}}>Recents</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleState}>
                  <SvgXml xml={isGridView ? Xmls.listIcon : Xmls.gridIcon} />
                </TouchableOpacity>
              </View>

              {/* List */}
              {isGridView ? (
                <View
                  style={{
                    paddingHorizontal: 24,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                  }}>
                  {list.map((item, index) => {
                    return (
                      <View key={index} style={style.girdSection}>
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
                            <SvgXml xml={Xmls.microPhoneSmall} />
                          </View>
                          <TouchableOpacity
                            style={{padding: 8}}
                            onPress={() => moreIconRef.current.show()}>
                            <SvgXml xml={Xmls.moreIcon} />
                          </TouchableOpacity>
                        </View>
                        <Text style={{color: '#000'}}>New Recording</Text>
                        <Text style={{color: '#7C7F83', fontSize: 12}}>
                          New Recording
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            alignSelf: 'flex-start',
                            padding: 4,
                            borderWidth: 1,
                            borderColor: '#E2E5E9',
                            borderRadius: 8,
                            marginTop: 4,
                          }}>
                          <SvgXml xml={Xmls.folderIcon} />
                          <Text style={{color: '#0D0F10', marginLeft: 4}}>
                            Folder
                          </Text>
                        </View>
                      </View>
                    );
                  })}
                </View>
              ) : (
                <ScrollView style={{marginBottom: 4}}>
                  {list.map((item, index) => (
                    <Swipeable
                      key={index}
                      renderLeftActions={() => renderLeftActions(item)}>
                      <View style={style.recordingItem}>
                        <View style={style.recordingItemHeader}>
                          <Text style={{color: '#0D0F10'}}>New Recording</Text>
                          <Text style={{color: '#7C7F83', fontSize: 12}}>
                            New Recording
                          </Text>
                        </View>
                        <Text style={style.recordingText}>
                          Volutpat sed sit orci nisi. Quis donec aliquet id...
                        </Text>
                        <Text style={style.tagsText}>#Tags #Tags</Text>
                        <View style={style.recordingItemFooter}>
                          <View style={style.folderBox}>
                            <SvgXml xml={Xmls.folderIcon} />
                            <Text style={{color: '#0D0F10', marginLeft: 4}}>
                              Folder
                            </Text>
                          </View>
                          <SvgXml xml={Xmls.voicePlayGrayIcon} />
                        </View>
                      </View>
                    </Swipeable>
                  ))}
                </ScrollView>
              )}
            </>
          )}
        </View>
      </View>
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

      <ActionSheet
        ref={addToFolderRef}
        gestureEnabled
        containerStyle={{
          height: '95%',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: '#fff',
          paddingHorizontal: 24,
        }}>
        {isSection ? (
          <>
            <TouchableOpacity
              onPress={() => {
                addToFolderRef.current.hide();
                createFolderRef.current?.show();
              }}
              style={style.continueButton}>
              <Text style={style.continueButtonText}>Create Folder</Text>
            </TouchableOpacity>
            <View style={style.inputFields}>
              <SvgXml xml={Xmls.searchIcon} style={{marginRight: 8}} />
              <TextInput
                style={style.input}
                placeholder="Find Folder"
                placeholderTextColor="#7C7F83"
              />
            </View>
            <Text style={{color: '#7C7F83', marginVertical: 12}}>
              Suggested
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <SvgXml xml={Xmls.starIcon} style={{marginRight: 8}} />
              <Text style={{color: '#000'}}>Starred</Text>
            </View>
            <Text style={{color: '#7C7F83', marginVertical: 12}}>Folder</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 6,
              }}>
              <SvgXml xml={Xmls.folderIcon} style={{marginRight: 8}} />
              <Text style={{color: '#000'}}>Folder</Text>
            </View>
            {[1, 2].map((item, index) => (
              <TouchableOpacity
                onPress={() => setIsSection(false)}
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
          </>
        ) : (
          <>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#fff',
                width: '100%',
                marginVertical: 8,
              }}>
              <TouchableOpacity
                style={style.backArrow}
                onPress={() => setIsSection(true)}>
                <SvgXml xml={Xmls.leftArrow} />
              </TouchableOpacity>
              <Text
                style={{
                  color: '#000',
                  fontSize: 12,
                  textAlign: 'center',
                  width: '60%',
                }}>
                Choose Section
              </Text>
            </View>
            {['Section 1', 'Section 2', 'Section 3', 'Section 4'].map(
              (item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setSelectedOption(item);
                    addToFolderRef.current?.hide();
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 6,
                    borderRadius: 8,
                    // backgroundColor:
                    //   selectedOption === item ? '#E5E5E5' : 'transparent',
                    marginVertical: 4,
                  }}>
                  <Text style={{color: '#000'}}>{item}</Text>
                  {/* {selectedOption === item && (
                    <SvgXml style={{marginHorizontal: 8}} xml={Xmls.selected} />
                  )} */}
                </TouchableOpacity>
              ),
            )}
            <TouchableOpacity
              onPress={() => {
                addToFolderRef.current.hide();
                createSectionRef.current?.show();
              }}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <SvgXml style={{marginHorizontal: 8}} xml={Xmls.createSection} />
              <Text style={{color: '#000'}}>Create Section</Text>
            </TouchableOpacity>
          </>
        )}
      </ActionSheet>

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
            onPress={() => item.onPress()}
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
                  onPress={() => setIsModalVisible(false)}
                  style={[styles.modalButton, styles.discardButton]}>
                  <Text style={styles.discardButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      ) : null}
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
          <Text style={{color: '#000'}}>Create Folder</Text>
        </TouchableOpacity>
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
        ref={feedbackRef}
        gestureEnabled
        containerStyle={{
          height: `${isSubmitFeedback ? '28%' : '40%'}`,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: '#fff',
          paddingHorizontal: 24,
        }}>
        {isSubmitFeedback ? (
          <View
          // style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <Text
              style={{
                color: '#0D0F10',
                fontSize: 20,
                marginTop: 16,
                textAlign: 'center',
              }}>
              Thank you!
            </Text>
            <Text
              style={{
                color: '#7C7F83',
                marginVertical: 12,
                textAlign: 'center',
              }}>
              Your feedback helps us improve. We appreciate the time you took.
            </Text>
            <TouchableOpacity
              onPress={() => feedbackRef.current.hide()}
              style={style.saveButton}>
              <Text style={{color: '#000'}}>Done</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <Text style={{color: '#0D0F10', fontSize: 20}}>
              Rate your experience
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginVertical: 6,
              }}>
              {['😒  Bad', '🙂  Decent', '😍  Love it!'].map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '32%',
                      borderWidth: 1,
                      borderColor: '#E2E5E9',
                      borderRadius: 8,
                      padding: 4,
                      height: 38,
                    }}>
                    <Text style={{color: '#0D0F10'}}>{item}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: '#E2E5E9',
                borderRadius: 8,
                height: 100,
                paddingHorizontal: 12,
                textAlignVertical: 'top',
              }}
              placeholder="Tell us more (Optional)"
              placeholderTextColor="#999"
              multiline={true}
            />
            <TouchableOpacity
              onPress={() => setIsSubmitFeedback(true)}
              style={style.saveButton}>
              <Text style={{color: '#000'}}>Submit feedback</Text>
            </TouchableOpacity>
          </>
        )}
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
        <View style={style.inputFields}>
          <SvgXml xml={Xmls.tagIcon} style={style.starIcon} />
          <TextInput
            style={style.input}
            placeholder="Add tags"
            placeholderTextColor="#7C7F83"
          />
        </View>
        <Text style={{color: '#7C7F83', marginVertical: 12}}>Suggested</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <SvgXml xml={Xmls.starIcon} style={style.icon} />
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
    </>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 12,
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchBox: {
    width: '88%',
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
  Recording: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
  },
  RecordingView: {
    height: 72,
    width: 72,
    backgroundColor: '#C0E863',
    borderRadius: 72,
    marginTop: 24,
    justifyContent: 'center',
    alignItems: 'center',
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
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
    paddingHorizontal: 24,
  },
  recordingItem: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 2,
    borderColor: '#E2E5E9',
    backgroundColor: 'white',
    paddingHorizontal: 24,
  },
  recordingItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  recordingText: {
    color: '#7C7F83',
    marginVertical: 4,
    fontSize: 14,
  },
  tagsText: {
    color: '#7C7F83',
    marginVertical: 4,
    fontSize: 12,
  },
  recordingItemFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  folderBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E5E9',
    padding: 4,
    paddingHorizontal: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
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

  continueButton: {
    backgroundColor: '#C0E863',
    paddingVertical: 12,
    borderRadius: 8,
    marginVertical: 16,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#000',
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

  input: {
    flex: 1,
    height: 43,
    fontSize: 16,
    color: '#000',
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
});

// Swipe Action Button Styles
const styles = StyleSheet.create({
  actionButtonRed: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 75,
  },
  actionButtonBlue: {
    backgroundColor: '#212529',
    justifyContent: 'center',
    alignItems: 'center',
    width: 85,
  },
  actionButtonGray: {
    backgroundColor: '#E2E5E9',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
  },
  actionText: {
    color: 'white',
    marginTop: 6,
    fontSize: 12,
    // fontWeight: 'bold',
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
