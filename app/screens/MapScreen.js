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

module.exports = class MapScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
      <View style={styles.topMenu}>
      <Text> Hi! </Text>
      <Text> Blat </Text>
      </View>
        <Text style={styles.welcome}>
          Welcome React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cm+R to reload,{'\n'}
          Cmd+Control+Z for dev menu
        </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop : 30,
    flexDirection : 'column',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  topMenu : {
      backgroundColor : '#333333',
      flexDirection : 'row',

      justifyContent : 'space-between'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
