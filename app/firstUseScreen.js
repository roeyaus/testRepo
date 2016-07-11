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

module.exports = class FirstUse extends React.Component {
  render() {
      return (
      <View style={styles.menuView}>
          <Text>Parkz</Text>
          <View style={styles.buttonView}>
          <Text>Login</Text>
          <Text>SignUp</Text>
          </View>
      </View>
)
  }
}

const styles = StyleSheet.create({
    menuView : {
        flex : 1,
        flexDirection : 'column',
        justifyContent : 'space-between',
        alignItems : 'center',
        marginTop : 30
    },
    buttonView : {
        flexDirection : 'row',
        justifyContent : 'space-between'

    }

})
