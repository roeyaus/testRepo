// @flow
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput,
  Button
} from 'react-native';


import MapScreen from './MapScreen.js'
module.exports = class MainScreen extends React.Component {
constructor(props) {
    super(props)
    //enable navigator drawer 
}

render() {
  return <MapScreen/>
  }

  }
