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

  const playerListenerRef = useRef(null);
  const addToFolderRef = useRef(null);
  const shareRef = useRef(null);

  const btnData = [
    {
      title: 'Eidt',
      icon: Xmls.editIcon,
    },
    {
      title: 'Tag',
      icon: Xmls.tagIcon,
    },
    {
      title: 'Create',
      icon: Xmls.createIcon,
    },
    {
      title: 'Copy Note',
      icon: Xmls.copyIcon,
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

        setPlaybackTime(audioRecorderPlayer.mmssss(current));
        setDuration(audioRecorderPlayer.mmssss(total));

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
              <Text style={{color: '#7C7F83', marginTop: 20}}>
                Volutpat sed sit orci nisi. Quis donec aliquet id et nunc massa
                sed vitae. Ut a elementum mollis arcu. Erat habitant ridiculus
                quam in tristique egestas elementum. Ultrices convallis aliquam
                mi sollicitudin varius et.
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 10,
              }}>
              {btnData.map((btn, index) => (
                <TouchableOpacity
                  key={index}
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
            </View>
            <View
              style={{borderWidth: 1, borderColor: '#E2E5E9', width: '100%'}}
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
                style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
                <SvgXml style={{marginRight: 4}} xml={Xmls.starIcon} />
                <TouchableOpacity onPress={() => toggleState()}>
                  <SvgXml
                    style={{marginRight: 4}}
                    xml={isCollapsOn ? Xmls.expandIcon : Xmls.collapsIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <Text style={{color: '#7C7F83'}}>30 July 2024 13.09</Text>
            {isCollapsOn ? null : (
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
                  <TouchableOpacity onPress={() => shareRef.current?.show()}>
                    <SvgXml xml={Xmls.ShareIcon} />
                  </TouchableOpacity>
                </View>
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
        {/* <AddToFolderComponent /> */}
        <TouchableOpacity style={style.continueButton}>
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
        <Text style={{color: '#7C7F83', marginVertical: 12}}>Suggested</Text>
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
          <View
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
          </View>
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
});
