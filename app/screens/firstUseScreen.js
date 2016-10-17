// @flow
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput,
  Button,
  Image
} from 'react-native';
import { connect } from 'react-redux'
import ParkzButton from '../components/ParkzButton'
import { parkzIcon, parkzColor } from '../style'

class FirstUseScreen extends React.Component {
    constructor(props) {
        super(props)
    }
  render() {
      return (
      <View style={styles.container}>
      <View style={styles.iconView}>
          <Text style={{fontSize : 72, color : 'white'}}>Parkz</Text>
          <Image source={require('../assets/images/carkeys.png')}  />
      </View>
          <View style={styles.buttonRowView}>
          <ParkzButton text="Log In"
            onPress = {() => {this.props.navigator.push({
              title: "Log In",
              screen: "Parkz.LoginScreen",
              passProps: { }
            });
        }}/>

          <ParkzButton text="Sign Up"
            onPress = {() => {this.props.navigator.push({
              title: "Sign Up",
              screen: "Parkz.SignupScreen",
              passProps: { }
            });
        }}/>
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
    container : {
        flex : 1,
        flexDirection : 'column',
        justifyContent : 'space-around',
        backgroundColor : 'rgba(245, 135, 32, 1.0)'
    },
    iconView : {
      flex : 1,
      flexDirection : 'column',
      justifyContent : 'space-around',
      alignItems : 'center'
    },
    buttonRowView : {
        flexDirection : 'row',
        justifyContent : 'space-around',
        alignItems : 'center',
        marginBottom : 30,
        marginTop : 30
    },
    loginButton : {
        backgroundColor : "orange",
    },
    signupButton : {
        backgroundColor : "orange",
    },
    buttonText : {
        textAlign : "center",
        color : "white"
    }

})
