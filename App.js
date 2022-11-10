import RootNavigationContainer from './src/navigations/RootNavigationContainer';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <RootNavigationContainer/>
    </Provider>
  );
}

