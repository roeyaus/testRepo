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

module.exports = class FirstUseScreen extends React.Component {
    constructor(props) {
        super(props)
    }
  render() {
      return (
      <View style={styles.menuView}>
          <Text>Hello,</Text>
          <View style={styles.buttonRowView}>
          <TouchableHighlight style={[styles.button, styles.loginButton]}
            onPress = {() => {this.props.navigator.push({ name : 'loginScreen'})}}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableHighlight>
          <TouchableHighlight style={[styles.button, styles.signupButton]}
            onPress = {() => {this.props.navigator.push({ name : 'signupScreen'})}}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableHighlight>
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
    buttonRowView : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        marginBottom : 30
    },
    button : {
        width : 80,
        height : 40,
        borderRadius : 5,
        alignItems : "center",
        justifyContent : "center",
        marginLeft : 50,
        marginRight : 50
    },
    loginButton : {
        backgroundColor : "red",
    },
    signupButton : {
        backgroundColor : "blue",
    },
    buttonText : {
        textAlign : "center",
        color : "white"
    }

})
