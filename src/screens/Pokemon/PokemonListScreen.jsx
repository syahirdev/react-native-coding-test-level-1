import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useCallback, useEffect } from 'react';
import PokemonCard from '../../components/PokemonCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokedex } from '../../redux/features/pokedexSlice';
import Container from '../../components/Container';
import classNames from 'classnames';

export default function PokemonListScreen({ navigation }) {
  // HOOKS
  const dispatch = useDispatch();
  const pokedex = useSelector((state) => state.pokedex);

  // EFFECTS
  useEffect(() => {
    const controller = new AbortController();

    dispatch(fetchPokedex({}));

    return () => controller.abort();
  }, []);

  // FUNCTIONS
  const onFetchingPokedex = (isNext) => {
    dispatch(fetchPokedex({
      url: isNext ? pokedex.nextUrl : pokedex.previousUrl,
      pageNumber: isNext ? 1 : -1
    }));
  };

  // COMPONENTS
  const renderItem = useCallback(({ item: pokemon }) => {
    return (
      <PokemonCard
        pokemon={pokemon}
        onPress={() => navigation.navigate('PokemonDetails', { pokemon })}/>
    );
  }, []);

  const footerItem = useCallback(() => {
    return (
      <View className='flex-row justify-center items-center space-x-3 mt-3'>
        <TouchableOpacity
          className={classNames({
            'w-20 border-2 border-gray-200 bg-gray-50/50 rounded-md p-1': true,
            'bg-gray-100': !pokedex.previousUrl
          })}
          disabled={!pokedex.previousUrl}
          onPress={() => onFetchingPokedex(false)}>
          <Text className={classNames({
            'text-center': true,
            'text-gray-300': !pokedex.previousUrl
          })}>
            Previous
          </Text>
        </TouchableOpacity>
        <Text className='w-10 text-center'>{pokedex.page}</Text>
        <TouchableOpacity
          className={classNames({
            'w-20 border-2 border-gray-200 bg-gray-50/50 rounded-md p-1': true,
            'bg-gray-100': !pokedex.nextUrl
          })}
          disabled={!pokedex.nextUrl}
          onPress={() => onFetchingPokedex(true)}>
          <Text className={classNames({
            'text-center': true,
            'text-gray-300': !pokedex.nextUrl
          })}>
            Next
          </Text>
        </TouchableOpacity>
      </View>
    );
  }, [pokedex]);

  // VIEWS
  // if(pokedex.loading) {
  //   return (
  //     <Container>
  //       <ActivityIndicator size='large'/>
  //       <Text>Loading...</Text>
  //     </Container>
  //   );
  // }

  if(pokedex.error) {
    return (
      <Container>
        <Text>Something is wrong!</Text>
        <Text>:(</Text>
      </Container>
    );
  }

  return (
    <View className='flex-1 bg-white'>
      <FlatList
        data={pokedex.pokemonList}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View className='m-1.5'/>}
        contentContainerStyle={{ padding: 12 }}
        ListFooterComponent={() => footerItem()}
      />
    </View>
  );
}
