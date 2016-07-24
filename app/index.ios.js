import React, { Component } from 'react';
import {
 AppRegistry
} from 'react-native';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

var ParkzNav = require('./ParkzNav.js')
import parkzReducer from './reducers/parkzReducers'
let store = createStore(parkzReducer)

class Application extends Component {
  render() {
    return (
      <Provider store={store}>
        <ParkzNav />
      </Provider>
    );
  }
}
AppRegistry.registerComponent('parkz', () => Application);
