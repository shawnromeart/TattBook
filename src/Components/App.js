import React, {Component, useEffect} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {Provider} from 'react-redux';
import {createStore} from 'redux';
import RootReducer from '../Reducers';
import Navigator from './Navigator';

import codePush from 'react-native-code-push';

import AsyncStorage from '@react-native-async-storage/async-storage';
let store = createStore(RootReducer);

function App(props) {
  useEffect(() => {
    // AsyncStorage.clear()
  }, []);
  return (
    <>
      <Provider store={store}>
        <SafeAreaProvider>
          <Navigator />
        </SafeAreaProvider>
      </Provider>
    </>
  );
}

App = codePush(App);

export default App;
