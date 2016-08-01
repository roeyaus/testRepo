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
import { connect } from 'react-redux'

class FirstUseScreen extends React.Component {
    constructor(props) {
        super(props)
    }
  render() {
      return (
      <View style={styles.menuView}>
          <Text>Hello, {this.props.user == null ? "guest" : this.props.user.firstName}</Text>
          <View style={styles.buttonRowView}>
          <TouchableHighlight style={[styles.button, styles.loginButton]}
            onPress = {() => {this.props.navigator.push({
              title: "Log In",
              screen: "Parkz.LoginScreen",
              passProps: { }
            });
        }}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableHighlight>
          <TouchableHighlight style={[styles.button, styles.signupButton]}
            onPress = {() => {this.props.navigator.push({
              title: "Sign Up",
              screen: "Parkz.SignupScreen",
              passProps: { }
            });
        }}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableHighlight>
          </View>
      </View>
)
  }
}

const mapStateToProps = (state) => ({
    user : state.user
})

export default connect(mapStateToProps)(FirstUseScreen)

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
