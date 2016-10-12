// @flow
import React, { Component } from 'react';
import {
StyleSheet,
View,
TextInput,
Text
} from 'react-native';
import ParkzTextField from '../components/ParkzTextField'
import * as firebase from 'firebase'
import { connect } from 'react-redux'
import ParkzButton from '../components/ParkzButton'
import * as ParkzActions from '../reducers/parkzActions'
import { Navigation } from 'react-native-navigation';

class LoginScreen extends React.Component {
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
            }}/>
           <ParkzButton
          text='Login'
          buttonStyle = {{ backgroundColor: 'blue' }}
          onPress = {() => {
            _this = this
           firebase.auth().signInWithEmailAndPassword(_this.state.email, _this.state.password).then(function () { 
                  //Sign in was succesful
                  console.log("user sign in for " + _this.state.email + " successful")
                  //now we must update the app state with the signed in user
                  //update redux store with our signed up user
                  var user = firebase.auth().currentUser;
                  let action = ParkzActions.setCurrentUser({
                    email : _this.state.email,
                    password : _this.state.password,
                    firstName : user.displayName,
                    phone : user.phone
                  })
                  _this.props.onSubmit(action) 
                  // Update successful, now we navigate
                  Navigation.startSingleScreenApp({
                    screen: {
                      screen: 'Parkz.MainScreen',
                      title: 'Parkz',
                      navigatorStyle: {}
                    },
                    drawer: {
                      type: "MMDrawer",
                      animationType: "slide",
                      left: {
                        screen: "Parkz.SideMenu"
                      }
                    },
                    passProps: {
                    }
                  });
                  
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

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (action) => dispatch(action)
})

export default connect(
  null, mapDispatchToProps
)(LoginScreen)

const styles = StyleSheet.create({
    menuView : {
        flex : 1,
        flexDirection : 'column'
    }
})
