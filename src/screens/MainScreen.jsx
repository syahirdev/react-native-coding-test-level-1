import { Button } from 'react-native';
import Container from '../components/Container';

export default function MainScreen({ navigation }) {
  // VIEWS
  return (
    <Container>
      <Button
        title='Contact Us'
        onPress={() => navigation.navigate('Form')}
      />
    </Container>
  );
}




