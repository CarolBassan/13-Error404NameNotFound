import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './Pages/WelcomeScreen';
import CameraScreen from './Pages/CameraScreen';
import ConfigurateScreen from './Pages/ConfigurateScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="Configurate" component={ConfigurateScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
