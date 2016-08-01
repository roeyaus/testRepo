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
  constructor(props)
  {
    super(props)
    this.state = {
      firstName : "",
      lastName : "",
      email : "your@email.com",
      phone : "050-123-4567",
      password : "At Least 6 chars",
      confirmPassword : "At Least 6 chars",
      error : ""
    }
  }
  render() {
    return (
     <View style={styles.menuView}>
      <ParkzTextField 
            leftText={"First Name"}
            onFocus={() => {
              this.setState({
                error : ""
              })
            }}
            onChangeText={
                (text) => {
            this.setState({
                firstName : text
            })}}
            placeholder={this.state.firstName}
            autoFocus={true}
            returnKeyType='next' />
    <ParkzTextField 
            leftText={"Last Name"}
            onFocus={() => {
              this.setState({
                error : ""
              })
            }}
            onChangeText={
                (text) => {
            this.setState({
                lastName : text
            })}}
            placeholder={this.state.lastName}
            autoFocus={true}
            returnKeyType='next' />
    <ParkzTextField 
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
            returnKeyType='next' />
        <ParkzTextField 
            leftText={"Phone"}
            onFocus={() => {
              this.setState({
                error : ""
              })
            }}
            onChangeText={
                (text) => {
            this.setState({
                phone : text
            })}}
            placeholder={this.state.phone}
            returnKeyType='next' />
    <ParkzTextField 
            leftText={"Password"}
            onFocus={() => {
              this.setState({
                error : ""
              })
            }}
            onChangeText={
                (text) => {
            this.setState({
                password : text
            })}}
            placeholder={this.state.password}
            returnKeyType='next' />
        <ParkzButton 
          text='Sign Up'
          backgroundColor='red'
          onPress = {() => {
            //simulate a successful signup
            if (true)
              { 
                    let action = ParkzActions.setCurrentUser(Object.assign({}, this.state, { firstName : "R", lastName : "L"}))
                    console.log("action : " + JSON.stringify(action))
                   this.props.onSubmit(action) //update global state
                   Navigation.startSingleScreenApp({
                      screen: {
                        screen: 'Parkz.MainScreen',
                        title: 'Parkz',
                        navigatorStyle: {}
                      },
                       drawer : {
                             type : "MMDrawer",
                              animationType : "slide",
                         left : {
                           screen : "Parkz.SideMenu"
                         }
                       } ,
                      passProps: { 
                      }
                     });
              }
            else //failed signup
              {
                  this.setState({
                    error : "Sorry, please fill in all fields"
                  })
              }
            
//                firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(() => { 
//                   //Sign up was succesful
//                   console.log("user signup for " + this.state.email + " successful")
//                   //now we must update the application state with the logged in user
//                   let action = ParkzActions.setCurrentUser(this.state)
//                    this.props.onSubmit(action) //update global state
//                    this.props.navigator.push({
//                       title: "Parkz",
//                       screen: "Parkz.MainScreen",
//                       passProps: {  }
//                     });
                  
//                 },(error) => {
//                   // Handle Errors here.
//                   var errorCode = error.code;
//                   var errorMessage = error.message;
//                   console.log("sign up user error : " + errorCode + ", " + errorMessage)
//                   this.setState({
//                     error : "Sorry, please try again"
//                   })
//                   // ...
//                 });
                
          }}
          />
         <Text>{this.state.error}</Text>
    </View>
      )
  }
}
const mapDispatchToProps = (dispatch) => ( {
    onSubmit : (action) => dispatch(action) 
})

export default connect(
  null,mapDispatchToProps
)(SignupScreen)


const styles = StyleSheet.create({
    menuView : {
        flex : 1,
        flexDirection : 'column'
    }
})