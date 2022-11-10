import { Text, TouchableOpacity } from 'react-native';

export default function Button(props) {
  // PROPS
  const { children, onPress } = props;

  // VIEWS
  return (
    <TouchableOpacity
      onPress={onPress}
      className='bg-indigo-500 px-4 py-2 rounded-md items-center'
      activeOpacity={0.5}
      {...props}
    >
      <Text className='text-white text-base font-medium'>
        {children}
      </Text>
    </TouchableOpacity>
  );
}
