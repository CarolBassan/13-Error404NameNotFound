import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@speech_settings';

export async function saveSpeechSettings(settings) {
  try {
    const jsonValue = JSON.stringify(settings);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (e) {
    console.error('Erro ao salvar configurações de fala:', e);
  }
}

export async function loadSpeechSettings() {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Erro ao carregar configurações de fala:', e);
    return null;
  }
}
