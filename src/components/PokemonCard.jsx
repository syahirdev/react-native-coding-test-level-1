import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { convertHashtagNumber } from '../utils/convertHashtagNumber';
import classNames from 'classnames';

export default function PokemonCard({ pokemon, onPress }) {
  // STATES
  const [pokemonDetails, setPokemonDetails] = useState();

  // EFFECTS
  useEffect(() => {
    fetchData()
      .catch(console.error);
  }, [pokemon]);

  // FUNCTIONS
  const fetchData = async() => {
    if(pokemon?.url) {
      const result = await axios.get(pokemon.url);
      setPokemonDetails(result.data);
    }
  };

  // VIEWS
  if(!pokemonDetails) {
    return (
      <View className='flex-row items-center p-5 rounded-lg border-2 border-gray-100 min-h-[160]'>
        <Text className='text-gray-300'>Loading...</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity
      className='relative flex-row items-center p-5 rounded-lg border-2 border-gray-100'
      activeOpacity={0.5}
      onPress={onPress}
    >
      {/*---Image---*/}
      <View className='items-center mr-4'>
        <Image
          className='w-20 h-20'
          source={{ uri: pokemonDetails.sprites.front_default }}
        />
        <Text className='font-medium px-3 pt-2 pb-1 rounded-full border-2 border-gray-100'>
          #{convertHashtagNumber(pokemonDetails.id)}
        </Text>
      </View>

      {/*---Details---*/}
      <View>
        {/*Name*/}
        <Text className='font-medium capitalize text-lg pb-2'>
          {pokemonDetails.name}
        </Text>

        {/*Types*/}
        <View className='flex-row items-center pb-1'>
          {pokemonDetails.types.map(({ type, slot }) => (
            <Text
              key={slot}
              className='uppercase text-[10px] pl-2.5 pr-2 pt-1 pb-0.5 rounded-full border-2 border-gray-100 mr-2'
            >
              {type.name}
            </Text>
          ))}
        </View>

        {/*Abilities*/}
        <View className='flex-row items-center flex-wrap max-w-[200px]'>
          {pokemonDetails.abilities.map(({ ability, slot }, index) => (
            <Fragment key={slot}>
              <Text className='uppercase text-xs mr-2'>{ability.name}</Text>
              <View className={classNames({
                'h-1 w-1 bg-gray-700 rounded-full mr-2': true,
                'hidden': index + 1 === pokemonDetails.abilities.length
              })}/>
            </Fragment>
          ))}
        </View>
      </View>

      {/*Background Ids*/}
      <View className='absolute bottom-0 right-3 -z-10'>
        <Text className='font-bold text-9xl opacity-10 text-gray-300'>
          #{convertHashtagNumber(pokemonDetails.id)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
