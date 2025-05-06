import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {SvgXml} from 'react-native-svg';
import Xmls from '../../utils/Xmls';
import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';
import RNFS from 'react-native-fs';
import Toast from 'react-native-toast-message';

const audioRecorderPlayer = new AudioRecorderPlayer();

export default function Recording({navigation}) {
  const [recordSecs, setRecordSecs] = useState(0);
  const [recordTime, setRecordTime] = useState(null);
  const [isRecording, setIsRecording] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const recordSubscriptionRef = useRef(null);

  // Request Microphone Permission on Android
  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Microphone Permission',
            message: 'App needs access to your microphone to record audio.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      return true;
    }
  };

  useEffect(() => {
    const init = async () => {
      const hasPermission = await requestPermissions();
      if (hasPermission) {
        startRecording();
      } else {
        Toast.show({
          type: 'error',
          text1: 'Permission denied',
          text2: 'Microphone permission required.',
        });
        console.warn('Microphone permission not granted');
      }
    };
    init();

    return () => {
      audioRecorderPlayer.removeRecordBackListener();
    };
  }, []);

  const startRecording = async () => {
    const fileName = `recording_${Date.now()}.m4a`;
    const filePath = `${RNFS.DocumentDirectoryPath}/${fileName}`;

    const audioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    };

    try {
      const url = await audioRecorderPlayer.startRecorder(filePath, audioSet);

      recordSubscriptionRef.current = audioRecorderPlayer.addRecordBackListener(
        e => {
          // if (!isNaN(e.current_position)) {
          setRecordSecs(e.current_position);
          setRecordTime(
            audioRecorderPlayer.mmssss(Math.floor(e.current_position)),
          );
          console.log('url is here', url);

          // }
        },
      );
    } catch (err) {
      console.error('Recording failed to start:', err);
    }
  };

  const pauseRecording = async () => {
    await audioRecorderPlayer.pauseRecorder();
  };

  const resumeRecording = async () => {
    await audioRecorderPlayer.resumeRecorder();
  };

  const stopRecording = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    if (recordSubscriptionRef.current) {
      audioRecorderPlayer.removeRecordBackListener();
    }
    setRecordSecs(0);
    console.log('Recording file saved at:', result);
  };

  const handlePauseResume = async () => {
    if (isRecording) {
      setIsRecording(false);
      setIsPaused(true);
      try {
        await pauseRecording();
      } catch (err) {
        console.error('Pause error:', err);
        setIsRecording(true);
        setIsPaused(false);
      }
    } else {
      setIsRecording(true);
      setIsPaused(false);
      try {
        await resumeRecording();
      } catch (err) {
        console.error('Resume error:', err);
        setIsRecording(false);
        setIsPaused(true);
      }
    }
  };

  return (
    <View style={style.content}>
      <View style={style.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <SvgXml style={{marginHorizontal: 4}} xml={Xmls.crossIcon} />
        </TouchableOpacity>
        <Text style={{color: '#000', width: '80%', textAlign: 'center'}}>
          New Recording
        </Text>
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}>
        <Image
          style={style.img}
          source={require('../../assets/images/recording.png')}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 50,
          }}>
          <SvgXml style={{marginHorizontal: 6}} xml={Xmls.redDotIcon} />
          <Text style={{color: '#000', fontSize: 36}}>
            {recordTime ? recordTime : '00:00:00'}
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          marginBottom: 50,
        }}>
        <TouchableOpacity
          onPress={handlePauseResume}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '45%',
            height: 40,
            backgroundColor: '#fff',
            borderRadius: 8,
            borderWidth: 1,
            justifyContent: 'center',
          }}>
          {isRecording ? (
            <>
              <SvgXml style={{marginHorizontal: 6}} xml={Xmls.pauseIcon} />
              <Text style={{color: '#000'}}>Pause</Text>
            </>
          ) : (
            <>
              <SvgXml style={{marginHorizontal: 6}} xml={Xmls.resumeIcon} />
              <Text style={{color: '#000'}}>Resume</Text>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={async () => {
            await stopRecording();
            navigation.navigate('Uploading');
          }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '45%',
            height: 40,
            backgroundColor: '#C0E863',
            borderRadius: 8,
            justifyContent: 'center',
          }}>
          <SvgXml style={{marginHorizontal: 6}} xml={Xmls.tickIcon} />
          <Text style={{color: '#000'}}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    width: '100%',
    height: 312,
  },
});
