/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
    AppRegistry,
    StatusBarIOS
} from 'react-native';
import ooolink from './app';

StatusBarIOS.setHidden(true);
AppRegistry.registerComponent('ooolink', () => ooolink);
