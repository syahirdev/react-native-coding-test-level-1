import Container from '../components/Container';
import Button from '../components/Button';
import { View } from 'react-native';

export default function MainScreen({ navigation }) {
  // VIEWS
  return (
    <Container>
      <View className='gap-2'>
        <Button onPress={() => navigation.navigate('Form')}>
          Contact Us
        </Button>

        <Button onPress={() => navigation.navigate('PokemonList')}>
          View Catalog
        </Button>
      </View>
    </Container>
  );
}




