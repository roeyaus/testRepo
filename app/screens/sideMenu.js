import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

module.exports = class ParkzMenu extends React.Component {
  render() {
      return (
      <View style={styles.menuView}>
      <TouchableHighlight>
      <Text>Hi!</Text>
      </TouchableHighlight>
      </View>
)
  }
}

const styles = StyleSheet.create({
    menuView : {
        flex : 1,
        flexDirection : 'column',
        marginTop : 60
    }
})
