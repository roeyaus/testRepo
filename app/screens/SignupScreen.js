import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text
} from 'react-native';
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation';
import ParkzTextField from '../components/ParkzTextField'
import ParkzButton from '../components/ParkzButton'
import * as ParkzActions from '../reducers/parkzActions'
class SignupScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "At Least 6 chars",
      error: ""
    }
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  validateFields() {
    return (this.state.firstName != "" && this.state.lastName != "" && this.validateEmail(this.state.email) && this.state.password != "" && this.state.phone != "")
  }

  signup() {
    //initiate firebase signup
    if (this.validateFields()) {
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(() => {
        //Sign up was succesful
        console.log("user signup for " + this.state.email + " successful")

        //update redux store with our signed up user
        let action = ParkzActions.setCurrentUser(this.state)
        this.props.onSubmit(action) 

        //before we navigate, we update our firebase user profile with the user's name and other details
        var user = firebase.auth().currentUser;

        user.updateProfile({
          displayName: this.state.firstName + " " + this.state.lastName,
          phone : this.state.phone
        }).then(function () {
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

        }, function (error) {
          // An error happened.
        });



      }, (error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("sign up user error : " + errorCode + ", " + errorMessage)
        this.setState({
          error: "Sorry, please try again"
        })
        // ...
      });


    }
    else //failed signup
    {
      this.setState({
        error: "Sorry, please fill in all fields"
      })
    }





  }
  render() {
    return (
      <View style={styles.menuView}>
        <ParkzTextField
          leftText={"First Name"}
          onFocus={() => {
            this.setState({
              error: ""
            })
          } }
          onChangeText={
            (text) => {
              this.setState({
                firstName: text
              })
            } }
          placeholder={this.state.firstName}
          autoFocus={true}
          returnKeyType='next' />
        <ParkzTextField
          leftText={"Last Name"}
          onFocus={() => {
            this.setState({
              error: ""
            })
          } }
          onChangeText={
            (text) => {
              this.setState({
                lastName: text
              })
            } }
          placeholder={this.state.lastName}
          autoFocus={true}
          returnKeyType='next' />
        <ParkzTextField
          leftText={"Email"}
          onFocus={() => {
            this.setState({
              error: ""
            })
          } }
          onChangeText={
            (text) => {
              this.setState({
                email: text
              })
            } }
          placeholder="your@email.com"
          returnKeyType='next' />
        <ParkzTextField
          leftText={"Phone"}
          onFocus={() => {
            this.setState({
              error: ""
            })
          } }
          onChangeText={
            (text) => {
              this.setState({
                phone: text
              })
            } }
          placeholder="050-123-4567"
          returnKeyType='next' />
        <ParkzTextField
          leftText={"Password"}
          onFocus={() => {
            this.setState({
              error: ""
            })
          } }
          onChangeText={
            (text) => {
              this.setState({
                password: text
              })
            } }
          placeholder="At Least 6 chars"
          returnKeyType='next' />
        <ParkzButton
          text='Sign Me Up'
          buttonStyle = {{ backgroundColor: 'red' }}
          onPress = {() => this.signup() }
          />
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
)(SignupScreen)


const styles = StyleSheet.create({
  menuView: {
    flex: 1,
    flexDirection: 'column'
  }
})