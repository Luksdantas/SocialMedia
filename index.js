import 'expo/build/Expo.fx';
import registerRootComponent from 'expo/build/launch/registerRootComponent';
import { activateKeepAwake } from 'expo-keep-awake';

import App from './src/App'

import React from 'react'
import { Provider } from 'react-redux'

import storeConfig from './src/store/storeConfig'

import axios from 'axios'
axios.defaults.baseURL = 'https://myinstagram-bcb08.firebaseio.com/'

const store = storeConfig()
const Redux = () => {
  return (
  <Provider store={store}>
    <App />
  </Provider>
  )
}


if (__DEV__) {
  activateKeepAwake();
}

registerRootComponent(Redux);
