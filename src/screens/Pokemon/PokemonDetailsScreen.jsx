import { ActivityIndicator, Image, Text, View } from 'react-native';
import { useEffect, useLayoutEffect } from 'react';
import _ from 'lodash';
import Container from '../../components/Container';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { fetchPokemon } from '../../redux/features/pokemonSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function PokemonDetailsScreen({ route, navigation }) {
  // ROUTES
  const { name } = route.params.pokemon;

  // HOOKS
  const dispatch = useDispatch();
  const pokemon = useSelector((state) => state.pokemon);

  // LAYOUTS
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: _.capitalize(name)
    });
  }, [navigation]);

  // EFFECTS
  useEffect(() => {
    const controller = new AbortController();

    dispatch(fetchPokemon({ pokemonName: name }));

    return () => controller.abort();
  }, []);

  // VIEWS
  if(pokemon.loading) {
    return (
      <Container>
        <ActivityIndicator size='large'/>
        <Text>Loading...</Text>
      </Container>
    );
  }

  if(pokemon.error) {
    return (
      <Container>
        <Text>Something is wrong!</Text>
        <Text>:(</Text>
      </Container>
    );
  }

  if(pokemon.data) {
    return (
      <Container>
        {/*---Header---*/}
        <View className='items-end mb-5'>
          {/*Pokemon Name*/}
          <Text className='capitalize text-6xl font-extrabold'>
            {pokemon.data.name}
          </Text>

          {/*Types*/}
          <View className='flex-row items-center pb-1'>
            {pokemon.data.types.map(({ type, slot }) => (
              <Text
                key={slot}
                className='uppercase text-[10px] pl-2.5 pr-2 pt-1 pb-0.5 rounded-full border-2 border-gray-100 mr-2'>
                {type.name}
              </Text>
            ))}
          </View>
        </View>

        {/*---Image---*/}
        <Image
          className='w-48 h-48'
          source={{ uri: pokemon.data.sprites.other['official-artwork'].front_default }}
        />

        {/*---Height & Weight---*/}
        <View className='flex-row items-center'>
          <View
            className='flex-row space-x-1 items-center px-3 py-1 rounded-full border-2 border-gray-100 mr-2'>
            <Text className='text-xs'>{pokemon.data.height}M</Text>
            <Icon name='human-male-height-variant'/>
          </View>
          <View
            className='flex-row space-x-1 items-center px-3 py-1 rounded-full border-2 border-gray-100 mr-2'>
            <Text className='text-xs'>{pokemon.data.weight}KG</Text>
            <Icon name='weight'/>
          </View>
        </View>

        {/*---About---*/}
        <View className='min-w-[70vw] mt-5'>
          <Text className='text-3xl font-extrabold'>
            About
          </Text>
          <Text className='italic'>
            {pokemon.species.flavor_text_entries[0].flavor_text}
          </Text>
        </View>
      </Container>
    );
  }

  return (
    <Container>
      <Text>No data available</Text>
    </Container>
  );
}
