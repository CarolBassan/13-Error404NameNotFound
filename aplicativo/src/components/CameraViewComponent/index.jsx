import { CameraView } from 'expo-camera';
import { TouchableOpacity, Text, View, Image } from 'react-native';
import Toast from 'react-native-toast-message';
import styles from './styles';
import { useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';
import logo from '../../assets/images/logoCameraScreen.png';
import iconConfig from '../../assets/images/config.png';
import iconMuteOn from '../../assets/images/mute.png';

export default function CameraViewComponent({ cameraType, onTakePicture, cameraRef, mute, toggleMute, lastSpeechText }) {
  const navigation = useNavigation();
  const onLeftIconPress = () => {
    navigation.navigate('Configurate');
  };

  const onRightIconPress = () => {
    toggleMute();
    Toast.show({
      type: 'info',
      text1: mute ? 'Som ativado' : 'Som mutado',
      position: 'bottom',
    });
  };

  useEffect(() => {
    if (lastSpeechText) {
      Toast.show({
        type: 'success',
        text1: lastSpeechText,
        position: 'bottom',
        visibilityTime: 4000,
      });
    }
  }, [lastSpeechText]);

  return (
    <CameraView style={styles.camera} facing={cameraType} ref={cameraRef}>

      <View style={styles.topContainer}>
        <Image source={logo} style={styles.iconCenter} resizeMode="contain" />

        <View style={styles.sideIconsContainer}>
          <TouchableOpacity onPress={onLeftIconPress} style={styles.sideIconTouchable}>
            <Image source={iconConfig} style={styles.sideIcon} resizeMode="contain" />
          </TouchableOpacity>

          <TouchableOpacity onPress={onRightIconPress} style={styles.sideIconTouchable}>
            <Image source={iconMuteOn} style={styles.sideIcon} resizeMode="contain" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={styles.fullscreenButton}
        onPress={() => onTakePicture(cameraRef)}
        activeOpacity={0.7}
        accessible={true}
        accessibilityLabel="Botão para tirar foto"
      >
        <View style={styles.textBoxShadow}>
          <Text style={styles.buttonText}>
            Clique em qualquer lugar da tela para fotografar
          </Text>
        </View>
      </TouchableOpacity>

      <Toast />
    </CameraView>
  );
}
