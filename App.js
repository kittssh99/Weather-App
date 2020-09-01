/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import Weather from './src/containers/weather/Weather'
import configurestore from './src/store'
import { Provider } from 'react-redux'

const store = configurestore();

const App = () => {
  return (
    <Provider store={store}>
      <Weather />
    </Provider>
  );
};


export default App;
