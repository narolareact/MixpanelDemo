/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {
  SafeAreaView,
} from 'react-native';
import AppNavigation from './src/Routes';


const App = () => {
  console.disableYellowBox = true;
  return (
    <AppNavigation />
  );
};


export default App;
