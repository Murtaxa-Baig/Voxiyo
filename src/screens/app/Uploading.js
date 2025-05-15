import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import AppHeader from '../../components/ui/AppHeader';
import {SvgXml} from 'react-native-svg';
import Xmls from '../../utils/Xmls';
import * as Progress from 'react-native-progress';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import {getToken} from '../../../App';
import {BASE_URL} from '../../../urls';
import ActionSheet from 'react-native-actions-sheet';
import MainPoints from '../../components/ui/MainPoints';
import ToDoListComponent from '../../components/ui/ToDoListComponent';
import Summarize from '../../components/ui/Summarize';
import Default from '../../components/ui/Default';

const screenWidth = Dimensions.get('window').width - 40;
const audioRecorderPlayer = new AudioRecorderPlayer();

export default function Uploading({navigation, route}) {
  const [showCreating, setShowCreating] = useState(false);
  const [showError, setShowError] = useState(false);
  const [dots, setDots] = useState('');
  const [isCollapsOn, setIsCollapsOn] = useState(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackTime, setPlaybackTime] = useState('00:00');
  const [duration, setDuration] = useState('00:00');
  const [progress, setProgress] = useState(0);

  const [uploading, setUploading] = useState(null);
  const [translating, setTranslating] = useState('');
  const [error, setError] = useState(null);
  const [isLinkCopied, setIsLinkCopied] = useState(true);
  const [showCreateOptions, setShowCreateOptions] = useState(false);
  const [transcript, setTranscript] = useState(false);
  const [activeTab, setActiveTab] = useState('Default');
  const [isSection, setIsSection] = useState(true);
  const [selectedOption, setSelectedOption] = useState('Daily');
  const [isStarred, setIsStarred] = useState(false);
  const playerListenerRef = useRef(null);
  const addToFolderRef = useRef(null);
  const shareRef = useRef(null);
  const tagRef = useRef(null);
  const createFolderRef = useRef(null);
  const createSectionRef = useRef(null);

  const btnData = [
    {
      title: 'Edit',
      icon: Xmls.editIcon,
      onPress: () => navigation.navigate('EditTranscript'),
    },
    {
      title: 'Tag',
      icon: Xmls.tagIcon,
      onPress: () => tagRef.current?.show(),
    },
    {
      title: 'Create',
      icon: Xmls.createIcon,
      onPress: () => setShowCreateOptions(!showCreateOptions),
    },
    {
      title: 'Copy Note',
      icon: Xmls.copyIcon,
      onPress: () => console.log('Copy Note pressed'),
    },
  ];

  const createBtnData = [
    {
      title: 'Main Points',
      icon: Xmls.mainPoitsIcon,
      onPress: () => MainPoint(),
    },
    {
      title: 'To-Do List',
      icon: Xmls.todoListIcon,
      onPress: () => ToDoList(),
    },
    {
      title: 'Summarize',
      icon: Xmls.summarizeIcon,
      onPress: () => handleSummarize(),
    },
  ];

  const tabs = [
    {
      key: 'Default',
      label: 'Default',
      icon: Xmls.defaultIconACtive,
      content: <Default />,
    },
    {
      key: 'Main Points',
      label: 'Main Points',
      icon: Xmls.mainPoitsIcon,
      content: <MainPoints />,
    },
    {
      key: 'ToDoList',
      label: 'To-Do List',
      icon: Xmls.todoListIcon,
      content: <ToDoListComponent />,
    },
    {
      key: 'Summarize',
      label: 'Summarize',
      icon: Xmls.summarizeIcon,
      content: <Summarize />,
    },
  ];

  useEffect(() => {
    const creatingTimer = setTimeout(() => {
      setShowCreating(true);
      const errorTimer = setTimeout(() => {
        setShowError(true);
      }, 2000);
      return () => clearTimeout(errorTimer);
    }, 2000);
    return () => clearTimeout(creatingTimer);
  }, []);

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);
    return () => clearInterval(dotInterval);
  }, []);

  const toggleState = () => {
    setIsCollapsOn(prev => !prev);
  };
  const StarredToggleState = () => {
    setIsStarred(prev => !prev);
  };

  useEffect(() => {
    let isMounted = true;

    const getDuration = async () => {
      try {
        await audioRecorderPlayer.startPlayer(route.params.recordingPath);
        audioRecorderPlayer.setVolume(0); // mute so user doesn't hear

        playerListenerRef.current = audioRecorderPlayer.addPlayBackListener(
          e => {
            const total = e.duration;

            // if (!isNaN(total) && isMounted) {
            //   setDuration(audioRecorderPlayer.mmssss(total));
            // }

            if (!isNaN(total) && isMounted) {
              setDuration(formatTime(total));
            }

            // Stop immediately after getting duration
            audioRecorderPlayer.stopPlayer();
            audioRecorderPlayer.removePlayBackListener();
            playerListenerRef.current = null;
          },
        );
      } catch (error) {
        console.error('Error getting duration:', error);
      }
    };

    getDuration();

    return () => {
      isMounted = false;
      audioRecorderPlayer.stopPlayer();
      audioRecorderPlayer.removePlayBackListener();
      playerListenerRef.current = null;
    };
  }, [route.params.recordingPath]);

  useEffect(() => {
    return () => {
      onStopPlay();
    };
  }, []);

  const onStartPlay = async () => {
    try {
      await audioRecorderPlayer.startPlayer(route.params.recordingPath);
      audioRecorderPlayer.setVolume(1.0);

      playerListenerRef.current = audioRecorderPlayer.addPlayBackListener(e => {
        const current = e.currentPosition;
        const total = e.duration;

        if (isNaN(current) || isNaN(total)) return;

        // setPlaybackTime(audioRecorderPlayer.mmssss(current));
        // setDuration(audioRecorderPlayer.mmssss(total));

        setPlaybackTime(formatTime(current));
        setDuration(formatTime(total));

        const safeProgress = total > 0 ? current / total : 0;
        setProgress(safeProgress);
      });

      setIsPlaying(true);
    } catch (err) {
      console.warn('Play error:', err);
    }
  };

  const onPausePlay = async () => {
    try {
      await audioRecorderPlayer.pausePlayer();
      setIsPlaying(false);
    } catch (err) {
      console.warn('Pause error:', err);
    }
  };

  const onResumePlay = async () => {
    try {
      await audioRecorderPlayer.resumePlayer();
      setIsPlaying(true);
    } catch (err) {
      console.warn('Resume error:', err);
    }
  };

  const onStopPlay = async () => {
    try {
      await audioRecorderPlayer.stopPlayer();
      if (playerListenerRef.current) {
        playerListenerRef.current.remove();
        playerListenerRef.current = null;
      }
      setIsPlaying(false);
      setProgress(0);
      setPlaybackTime('00:00');
      setDuration('00:00');
    } catch (err) {
      console.warn('Stop error:', err);
    }
  };

  const handleAction = actionText => {
    if (actionText === 'Delete') {
      setIsModalVisible(true);
      console.log('Delete button pressed!');
    }
  };

  const MainPoint = () => {
    console.log('create btn trigred');
    setActiveTab('Main Points');
    setShowCreateOptions(false);
    setTranscript(true);
    toggleState();
  };

  const ToDoList = () => {
    console.log('create btn trigred');
    setActiveTab('ToDoList');
    setShowCreateOptions(false);
    setTranscript(true);
    toggleState();
  };

  const handleSummarize = () => {
    console.log('create btn trigred');
    setActiveTab('Summarize');
    setShowCreateOptions(false);
    setTranscript(true);
    toggleState();
  };
  const formatTime = millis => {
    const totalSeconds = Math.floor(millis / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent />
      <View style={style.content}>
        <AppHeader text={'New Recording'} />

        {!showCreating && !showError && (
          <View
            style={{marginTop: 8, flexDirection: 'row', alignItems: 'center'}}>
            <SvgXml xml={Xmls.uploadingIcon} />
            <Text style={{color: '#000', marginLeft: 10}}>
              Uploading your audio{dots}
            </Text>
          </View>
        )}

        {showCreating && !showError && (
          <View
            style={{marginTop: 8, flexDirection: 'row', alignItems: 'center'}}>
            <SvgXml xml={Xmls.creatingIcon} />
            <Text style={{color: '#000', marginLeft: 10}}>
              Creating transcript{dots}
            </Text>
          </View>
        )}

        {showError && (
          <>
            <View style={{flex: 1}}>
              {transcript && (
                <>
                  <View style={style.tabContainer}>
                    {tabs.map(tab => (
                      <TouchableOpacity
                        key={tab.key}
                        style={
                          activeTab === tab.key
                            ? style.activetabItem
                            : style.tabItem
                        }
                        onPress={() => setActiveTab(tab.key)}>
                        <SvgXml xml={tab.icon} />
                        {activeTab === tab.key && (
                          <Text style={style.tabText}>{tab.label}</Text>
                        )}
                      </TouchableOpacity>
                    ))}
                  </View>
                  {tabs.find(tab => tab.key === activeTab)?.content}
                </>
              )}
              {!transcript && (
                <Text style={{color: '#7C7F83', marginTop: 20}}>
                  Volutpat sed sit orci nisi. Quis donec aliquet id et nunc
                  massa sed vitae. Ut a elementum mollis arcu. Erat habitant
                  ridiculus quam in tristique egestas elementum. Ultrices
                  convallis aliquam mi sollicitudin varius et.
                </Text>
              )}
            </View>
            {activeTab !== 'ToDoList' && (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 10,
                  }}>
                  {btnData.map((btn, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => btn?.onPress()}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 8,
                        paddingVertical: 5,
                        width: 'auto',
                        marginTop: 20,
                        justifyContent: 'center',
                        borderWidth: 1,
                        borderColor: '#E2E5E9',
                        borderRadius: 8,
                        marginRight: 5,
                      }}>
                      <SvgXml style={{marginRight: 4}} xml={btn.icon} />
                      <Text style={{color: '#000'}}>{btn.title}</Text>
                    </TouchableOpacity>
                  ))}
                  {showCreateOptions && (
                    <View
                      style={{
                        position: 'absolute',
                        top: -100,
                        left: 135,
                        backgroundColor: '#fff',
                        borderWidth: 1,
                        borderColor: '#ccc',
                        borderRadius: 8,
                        padding: 10,
                        zIndex: 1000,
                      }}>
                      {createBtnData.map((item, idx) => (
                        <TouchableOpacity
                          key={idx}
                          onPress={() => item.onPress()}
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingVertical: 6,
                          }}>
                          <SvgXml
                            style={{marginHorizontal: 8}}
                            xml={item.icon}
                          />
                          <Text style={{color: '#000'}}>{item.title}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>

                <View
                  style={{
                    borderWidth: 1,
                    borderColor: '#E2E5E9',
                    width: '100%',
                  }}
                />

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 10,
                  }}>
                  <Text style={{color: '#000', fontWeight: '500'}}>
                    New Recording
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 4,
                    }}>
                    <TouchableOpacity onPress={() => StarredToggleState()}>
                      <SvgXml
                        style={{padding: 4}}
                        xml={isStarred ? Xmls.isStarredIcon : Xmls.starIcon}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => toggleState()}>
                      <SvgXml
                        style={{marginRight: 4}}
                        xml={isCollapsOn ? Xmls.expandIcon : Xmls.collapsIcon}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <Text style={{color: '#7C7F83'}}>30 July 2024 13.09</Text>

                {!isCollapsOn && (
                  <>
                    <Progress.Bar
                      progress={isNaN(progress) ? 0 : progress}
                      color="#0D0F10"
                      width={screenWidth}
                      borderWidth={0}
                      unfilledColor="#F5F6F8"
                      style={{marginTop: 10}}
                    />
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={{color: '#7C7F83'}}>{playbackTime}</Text>
                      <Text style={{color: '#7C7F83'}}>{duration}</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <SvgXml xml={Xmls.previousIcon} />
                      <TouchableOpacity
                        onPress={isPlaying ? onPausePlay : onStartPlay}
                        style={{marginHorizontal: 20}}>
                        <SvgXml
                          xml={
                            isPlaying
                              ? Xmls.pauseRcordingIcon
                              : Xmls.playRecordingIcon
                          }
                        />
                      </TouchableOpacity>
                      <SvgXml xml={Xmls.nextIcon} />
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: 5,
                      }}>
                      <TouchableOpacity
                        onPress={() => addToFolderRef.current?.show()}>
                        <SvgXml xml={Xmls.addToFolderIcon} />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => shareRef.current?.show()}>
                        <SvgXml xml={Xmls.ShareIcon} />
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </>
            )}
          </>
        )}
      </View>

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
              <SvgXml xml={Xmls.searchIcon} style={style.starIcon} />
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
              <SvgXml xml={Xmls.starIcon} style={style.icon} />
              <Text style={{color: '#000'}}>Starred</Text>
            </View>
            <Text style={{color: '#7C7F83', marginVertical: 12}}>Folder</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 6,
              }}>
              <SvgXml xml={Xmls.folderIcon} style={style.icon} />
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
                  <SvgXml xml={Xmls.folderIcon} style={style.icon} />
                  <Text style={{color: '#000'}}>Folder</Text>
                </View>
                <SvgXml xml={Xmls.rightArrow} style={style.icon} />
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
                    backgroundColor:
                      selectedOption === item ? '#E5E5E5' : 'transparent',
                    marginVertical: 4,
                  }}>
                  <Text style={{color: '#000'}}>{item}</Text>
                  {selectedOption === item && (
                    <SvgXml style={{marginHorizontal: 8}} xml={Xmls.selected} />
                  )}
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
  networkImage: {
    width: '100%',
    height: 110,
    resizeMode: 'contain',
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
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 43,
    fontSize: 16,
    color: '#000',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F5F6F8',
    justifyContent: 'space-between',
    padding: 4,
    height: 38,
    borderRadius: 34,
    marginVertical: 12,
  },
  activetabItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 34,
    paddingHorizontal: 6,
  },
  tabItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 6,
  },
  tabText: {
    fontSize: 12,
    marginHorizontal: 8,
    color: '#000',
  },
  backArrow: {
    width: '20%',
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
});
