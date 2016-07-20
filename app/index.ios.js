import React, { Component } from 'react';
import {
 AppRegistry
} from 'react-native';
//import { createStore, combineReducers } from 'redux';
//import { Provider } from 'react-redux';

var Parkz = require('./Parkz.js')
//import parkzReducer from './parkzReducers'
//let store = createStore(parkzReducer)

export default class Application extends Component {
  render() {
    return (
      //<Provider store={store}>
        <Parkz />
     // </Provider>
    );
  }
}
AppRegistry.registerComponent('Application', () => Application);
