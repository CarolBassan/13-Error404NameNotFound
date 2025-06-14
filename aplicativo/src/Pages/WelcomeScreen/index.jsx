import { useRef, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import logo from '../../assets/images/logoWellcomeScreen.png';
import seta from '../../assets/images/seta.png';
import { useNavigation } from '@react-navigation/native';
import styles from "./styles";
import * as Speech from 'expo-speech'; 
import { loadSpeechSettings } from '../../utils/speechSettings';


export default function WelcomeScreen() {
  const navigation = useNavigation();
  const modalizeRef = useRef(null);
  console.log('navigation:', navigation)

  useEffect(() => {
    modalizeRef.current?.open();
    async function speakWelcome() {
      const settings = await loadSpeechSettings();

      const options = {};
      if (settings?.language) options.language = settings.language;
      if (settings?.speed) options.rate = parseFloat(settings.speed);
      
      Speech.speak('Bem-vindo ao aplicativo viseAll', options);
    }

    speakWelcome();
  }, []);

  const handlePositionChange = (position) => {
    if (position === 'top') {
      navigation.replace('Camera');
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.background}>
        <Image source={logo} style={styles.icon} resizeMode="contain" />
        <Text style={styles.bigText}>Bem-Vindo</Text>
      </View>

      <View style={styles.container}>
        <Modalize
          ref={modalizeRef}
          snapPoint={300}
          modalHeight={600}
          handleStyle={styles.handle}
          closeOnOverlayTap={false}
          overlayStyle={{ backgroundColor: 'transparent' }}
          onPositionChange={handlePositionChange}
        >
          <View style={styles.content}>
            <Text style={styles.text}>Arraste para cima para iniciar</Text>
            <Image source={seta} style={styles.arrow} resizeMode="contain" />
          </View>
        </Modalize>
      </View>
    </GestureHandlerRootView>
  );
}
