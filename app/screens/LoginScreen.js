// @flow
import React, { Component } from 'react';
import {
StyleSheet,
View,
TextInput,
Text
} from 'react-native';
import ParkzTextField from '../components/ParkzTextField'

module.exports = class LoginScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email : "your@mail.com",
            password : "8 Characters Min.",
          error : ""
        }
    }
  render() {
      return (
          <View style={styles.menuView}>
          <ParkzTextField 
            ref = "Email"
            leftText={"Email"}
            onFocus={() => {
              this.setState({
                error : ""
              })
            }}
            onChangeText={
                (text) => {
            this.setState({
                email : text
            })}}
            placeholder={this.state.email}
            autoFocus={true}
            returnKeyType='next' />
       <ParkzTextField
         leftText={"Password"}
            onChangeText={(text) => {
            this.setState( {
                password : text
            })}}
            placeholder={this.state.password}
            borderWidth = {0}
            secureTextEntry={true}
            returnKeyType='done'
            onFocus={() => {
              this.setState({
                error : ""
              })
            }}
            onSubmitEditing={() => {
                _this = this
                firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(function () { 
                  //Sign in was succesful
                  console.log("user sign in for " + this.state.email + " successful")
                  //now we must update the app state with the signed in user
                  
                },function(error) {
                  // Handle Errors here.
                  var errorCode = error.code;
                  var errorMessage = error.message;
                  console.log("sign in user error : " + errorCode + ", " + errorMessage)
                  _this.setState({
                    error : "Sorry, please try again"
                  })
                  // ...
                });
            }}/>
          <Text>{this.state.error}</Text>
          </View>
      )
  }
}

const styles = StyleSheet.create({
    menuView : {
        flex : 1,
        flexDirection : 'column'
    }
})
