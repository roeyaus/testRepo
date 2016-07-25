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


const SideMenu = require('react-native-side-menu');
const ParkzMenu = require('./sideMenu.js')
module.exports = class MainScreen extends React.Component {
constructor(props) {
    super(props)
}

render() {
  const menu = <ParkzMenu/>;
  if (this.state.isLoading)
  {
      return (
          <Text>Loading...</Text>
      )
  }
  //console.log("currentUser : " + JSON.stringify(currentUser))
  if (this.props.currentUser != null) {
      return (
          <SideMenu menu={menu}>
            <MapScreen/>
          </SideMenu>
      )
  }
  }

  }
