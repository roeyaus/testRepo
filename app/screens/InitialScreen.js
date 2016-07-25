
 //@flow

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  AsyncStorage
} from 'react-native';

const loggedIn = true

module.exports = class InitialScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading : true,
            currentUser : null
        }
    }

    async componentWillMount() {
        current_user = await this._retrieveUser()
        //if we have a current_user, navigate to MainScreen, else to FirstUse
        if (current_user != null)
        {
            this.props.navigator.push({
              title: "MainScreen",
              screen: "Parkz.MainScreen",
              passProps: { current_user }
            });
        }
        else {
            this.props.navigator.push({
              title: "FirstUseScreen",
              screen: "Parkz.FirstUseScreen",
              passProps: { current_user }
            });
        }


    }
async _retrieveUser() {
    try {
        var value = await AsyncStorage.getItem('@Parkz:currentUser');
        if (value != null){
            // We have data!!
        }
    } catch (error) {
      // Error retrieving data
      console.log("error retrieving user : " + error)
    }
    console.log("retrieved user : " + value)
    return value
}
  render() {
    if (this.state.isLoading)
    {
        return (
            <Text>Loading...</Text>
        )
    }
    //console.log("currentUser : " + JSON.stringify(currentUser))

    }
}
