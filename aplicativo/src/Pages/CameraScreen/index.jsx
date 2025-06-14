import { useEffect, useState, useRef } from 'react';
import { View, Text } from 'react-native';
import { useCameraPermissions } from 'expo-camera';
import * as Speech from 'expo-speech';
import CameraViewComponent from '../../components/CameraViewComponent';
import PictureToBase64 from "../../utils/ConvertPictureToBase64";
import { getDescriptionImage } from '../../utils/apiAccess';
import { loadSpeechSettings } from '../../utils/speechSettings';

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [mute, setMute] = useState(false);
  const [lastSpeechText, setLastSpeechText] = useState('');
  const [speechOptions, setSpeechOptions] = useState(null);
  const [hasSpoken, setHasSpoken] = useState(false);

  useEffect(() => {
    async function fetchSpeechSettings() {
      const settings = await loadSpeechSettings();
      setSpeechOptions({
        language: settings.language || 'pt-BR',
        rate: settings.speed ? parseFloat(settings.speed) : 1,
      });
    }
    fetchSpeechSettings();
  }, []);

  useEffect(() => {
    if (permission && speechOptions && !hasSpoken) {
      if (!permission.granted) {
        requestPermission();
        Speech.speak('Permita o uso da câmera', speechOptions);
      } else {
        Speech.speak('Clique em qualquer lugar da tela para tirar a foto', speechOptions);
      }
      setHasSpoken(true);
    }
  }, [permission, speechOptions, hasSpoken]);

  const toggleMute = () => {
    if (mute) {
      if (lastSpeechText) {
        Speech.speak(lastSpeechText, speechOptions);
      }
      setMute(false);
    } else {
      Speech.stop();
      setMute(true);
    }
  };

  if (!permission) {
    return <View><Text>Carregando permissões...</Text></View>;
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();

      const base64Image = await PictureToBase64(photo);
      if (base64Image) {
        const description = await getDescriptionImage(base64Image);
        if (description) {
          setLastSpeechText(description);
          if (!mute && speechOptions) {
            Speech.speak(description, speechOptions);
          }
        }
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <CameraViewComponent
        cameraType="back"
        onTakePicture={takePicture}
        cameraRef={cameraRef}
        mute={mute}
        toggleMute={toggleMute}
        lastSpeechText={lastSpeechText}
      />
    </View>
  );
}
