import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as Speech from 'expo-speech';
import { saveSpeechSettings, loadSpeechSettings } from '../../utils/speechSettings';
import logo from '../../assets/images/logoConfigScreen.png';
import voiceIcon from '../../assets/images/voiceIcon.png';
import languageIcon from '../../assets/images/languageIcon.png';
import speedIcon from '../../assets/images/speedIcon.png';
import styles from "./styles";
import { useNavigation } from '@react-navigation/native';

export default function ConfigurateScreen() {
  const [voice, setVoice] = useState('');
  const [language, setLanguage] = useState('');
  const [speed, setSpeed] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    async function loadSettings() {
      const settings = await loadSpeechSettings();
      if (settings) {
        setVoice(settings.voice || '');
        setLanguage(settings.language || '');
        setSpeed(settings.speed || '');
      }
    }
    loadSettings();
  }, []);

  useEffect(() => {
    saveSpeechSettings({ voice, language, speed });
  }, [voice, language, speed]);

  const speakExample = () => {
    const options = {};
    if (language) options.language = language;
    if (speed) options.rate = parseFloat(speed);
    // Speech.speak('Este é um exemplo de fala com suas configurações.', options);
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} resizeMode="contain" />

      <View style={styles.row}>
        <Image source={voiceIcon} style={styles.icon} />
        <View style={styles.selectGroup}>
          <Text style={styles.selectLabel}>Voz</Text>
          <Picker
            selectedValue={voice}
            onValueChange={setVoice}
            style={styles.picker}
          >
            <Picker.Item label="Selecione..." value="" />
            <Picker.Item label="Feminina" value="feminina" />
            <Picker.Item label="Masculina" value="masculina" />
          </Picker>
        </View>
      </View>

      <View style={styles.row}>
        <Image source={languageIcon} style={styles.icon} />
        <View style={styles.selectGroup}>
          <Text style={styles.selectLabel}>Linguagem</Text>
          <Picker
            selectedValue={language}
            onValueChange={setLanguage}
            style={styles.picker}
          >
            <Picker.Item label="Selecione..." value="" />
            <Picker.Item label="Português" value="pt-BR" />
            <Picker.Item label="Inglês" value="en-US" />
            <Picker.Item label="Espanhol" value="es-ES" />
          </Picker>
        </View>
      </View>

      <View style={styles.row}>
        <Image source={speedIcon} style={styles.icon} />
        <View style={styles.selectGroup}>
          <Text style={styles.selectLabel}>Velocidade</Text>
          <Picker
            selectedValue={speed}
            onValueChange={setSpeed}
            style={styles.picker}
          >
            <Picker.Item label="Selecione..." value="" />
            <Picker.Item label="Lenta" value="0.5" />
            <Picker.Item label="Normal" value="1.0" />
            <Picker.Item label="Rápida" value="1.5" />
          </Picker>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => {
          speakExample();
          navigation.navigate('Camera');
        }}
      >
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}
