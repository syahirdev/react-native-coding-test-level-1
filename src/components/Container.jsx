import { StyleSheet, View } from 'react-native';

export default function Container({ children }) {
  // VIEWS
  return (
    <View style={styles.container}>
      {children}
    </View>
  );
}

// STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
