import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from '../screens/MainScreen';
import FormScreen from '../screens/FormScreen';
import PokemonListScreen from '../screens/Pokemon/PokemonListScreen';
import PokemonDetailsScreen from '../screens/Pokemon/PokemonDetailsScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigationContainer() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Main'
          component={MainScreen}
          options={{ title: 'Home Screen' }}
        />
        <Stack.Screen
          name='Form'
          component={FormScreen}
          options={{ title: 'Contact Us' }}
        />
        <Stack.Screen
          name='PokemonList'
          component={PokemonListScreen}
          options={{ title: 'Pokedex' }}
        />
        <Stack.Screen
          name='PokemonDetails'
          component={PokemonDetailsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
