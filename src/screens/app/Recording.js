import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
  Platform,
  Button,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SvgXml} from 'react-native-svg';
import Xmls from '../../utils/Xmls';
import AudioRecorderPlayer, {
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AVModeIOSOption,
  AudioSet,
} from 'react-native-audio-recorder-player';
import RNFS from 'react-native-fs';
import Toast from 'react-native-toast-message';
import Modal from 'react-native-modal';

const audioRecorderPlayer = new AudioRecorderPlayer();

export default function Recording({navigation}) {
  const [recordSecs, setRecordSecs] = useState(0);
  const [recordTime, setRecordTime] = useState('00:00');
  const [isRecording, setIsRecording] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingPath, setRecordingPath] = useState('');
  const [isRecorded, setIsRecorded] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);

        return Object.values(grants).every(
          res => res === PermissionsAndroid.RESULTS.GRANTED,
        );
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    const init = async () => {
      const granted = await requestPermissions();
      if (granted) {
        await startRecording();
      } else {
        Toast.show({
          type: 'error',
          text1: 'Permissions Denied',
          text2: 'Please allow microphone access.',
        });
      }
    };

    init();

    return () => {
      audioRecorderPlayer.removeRecordBackListener();
      audioRecorderPlayer.removePlayBackListener();
    };
  }, []);

  const startRecording = async () => {
    try {
      const dirs = RNFS.DocumentDirectoryPath;
      const fileName = `recording_${Date.now()}.m4a`;
      const path = `${dirs}/${fileName}`;
      setRecordingPath(path);

      const audioSet: AudioSet = {
        AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
        AudioSourceAndroid: AudioSourceAndroidType.MIC,
        AVModeIOS: AVModeIOSOption.measurement,
        AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
        AVNumberOfChannelsKeyIOS: 2,
        AVFormatIDKeyIOS: AVEncodingOption.aac,
      };

      const meteringEnabled = false;

      await audioRecorderPlayer.startRecorder(path, audioSet, meteringEnabled);

      audioRecorderPlayer.addRecordBackListener(e => {
        const current = Math.floor(e.currentPosition);
        setRecordSecs(current);
        setRecordTime(formatTime(current));
      });

      setIsRecording(true);
    } catch (err) {
      console.error('startRecording error:', err);
      Toast.show({
        type: 'error',
        text1: 'Recording failed',
        text2: err.message || 'An error occurred.',
      });
    }
  };

  const handlePauseResume = async () => {
    try {
      if (isRecording) {
        await audioRecorderPlayer.pauseRecorder();
        setIsPaused(true);
        setIsRecording(false);
      } else {
        await audioRecorderPlayer.resumeRecorder();
        setIsPaused(false);
        setIsRecording(true);
      }
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Could not pause/resume recording.',
      });
    }
  };

  const stopRecording = async () => {
    try {
      const result = await audioRecorderPlayer.stopRecorder();
      audioRecorderPlayer.removeRecordBackListener();
      setRecordSecs(0);
      setRecordTime('00:00');
      setIsRecorded(true);
      return result;
    } catch (err) {
      console.error('stopRecording error:', err);
      throw err;
    }
  };

  const handleDone = async () => {
    try {
      const finalPath = await stopRecording();
      navigation.navigate('Uploading', {recordingPath: finalPath});
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Save Failed',
        text2: 'Recording could not be saved.',
      });
    }
  };

  const handleModal = async () => {
    if (isRecording || !isPaused) {
      await audioRecorderPlayer.pauseRecorder();
      setIsPaused(true);
      setIsRecording(false);
    }
    setModalVisible(true);
  };

  const handleCancel = async () => {
    setModalVisible(false);
    await audioRecorderPlayer.resumeRecorder();
    setIsPaused(false);
    setIsRecording(true);
  };

  const handleDiscard = async () => {
    try {
      await audioRecorderPlayer.stopRecorder();
      audioRecorderPlayer.removeRecordBackListener();
      setRecordSecs(0);
      setRecordTime('00:00');
      setIsRecorded(false);

      if (recordingPath && (await RNFS.exists(recordingPath))) {
        await RNFS.unlink(recordingPath);
      }

      setModalVisible(false);
      navigation.goBack();
    } catch (err) {
      console.error('Discard error:', err);
      Toast.show({
        type: 'error',
        text1: 'Discard Failed',
        text2: 'Could not discard the recording.',
      });
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const formatTime = millis => {
    const totalSeconds = Math.floor(millis / 1000);
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <View style={style.content}>
      <View style={{flex: 1}}>
        <View style={style.header}>
          <TouchableOpacity onPress={() => handleModal()}>
            <SvgXml style={{marginHorizontal: 4}} xml={Xmls.crossIcon} />
          </TouchableOpacity>
          <Text style={{color: '#000', width: '80%', textAlign: 'center'}}>
            New Recording
          </Text>
        </View>

        <View style={style.visualizer}>
          <Image
            style={style.img}
            source={require('../../assets/images/recording.png')}
          />
          <View style={style.timerContainer}>
            <SvgXml style={{marginHorizontal: 6}} xml={Xmls.redDotIcon} />
            <Text style={style.timerText}>{recordTime}</Text>
          </View>
        </View>

        <View style={style.controls}>
          <TouchableOpacity
            onPress={handlePauseResume}
            style={[style.controlButton, style.secondaryButton]}>
            {isRecording ? (
              <>
                <SvgXml xml={Xmls.pauseIcon} />
                <Text style={style.buttonText}>Pause</Text>
              </>
            ) : (
              <>
                <SvgXml xml={Xmls.resumeIcon} />
                <Text style={style.buttonText}>Resume</Text>
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleDone}
            style={[style.controlButton, style.primaryButton]}>
            <SvgXml xml={Xmls.tickIcon} />
            <Text style={style.buttonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
      {isModalVisible ? (
        <Modal isVisible={isModalVisible}>
          <View style={style.modalContent}>
            <Text style={{color: '#000', textAlign: 'center', width: '100%'}}>
              Are you sure you don’t want to{'\n'}save new recording?
            </Text>

            <View style={style.modalButtonsContainer}>
              <TouchableOpacity
                onPress={handleCancel}
                style={[style.modalButton, style.cancelButton]}>
                <Text style={style.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleDiscard}
                style={[style.modalButton, style.discardButton]}>
                <Text style={style.discardButtonText}>Discard</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      ) : null}
    </View>
  );
}

const style = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 12,
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  visualizer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: '100%',
    height: 312,
    resizeMode: 'contain',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
  },
  timerText: {
    color: '#000',
    fontSize: 36,
    fontWeight: '500',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    gap: 10,
  },
  controlButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 8,
    flex: 1,
  },
  primaryButton: {
    backgroundColor: '#C0E863',
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
  },
  buttonText: {
    color: '#000',
    marginLeft: 6,
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
