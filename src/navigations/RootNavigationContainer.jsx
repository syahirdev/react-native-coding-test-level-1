import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from '../screens/MainScreen';
import FormScreen from '../screens/FormScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigationContainer() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Main' component={MainScreen}/>
        <Stack.Screen name='Form' component={FormScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
