
 //@flow

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  AsyncStorage
} from 'react-native';

const SideMenu = require('react-native-side-menu');
const ParkzMenu = require('./sideMenu.js')
const FirstUse = require('./firstUseScreen.js')
const MainScreen = require('./mainScreen.js')
const loggedIn = true

module.exports = class Parkz extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading : true,
            currentUser : null
        }
    }

    async componentWillMount() {
        current_user = await this._retrieveUser()
        this.setState( {
                isLoading : false,
                currentUser : current_user
        })
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
    const menu = <ParkzMenu/>;
        return (
            <Navigator
            initialRoute={{ id: loggedIn ? 'loggedIn' : 'notLoggedIn' }}
            renderScene={(route, navigator) => {
                    if (this.state.isLoading)
                    {
                        return (
                            <Text>Loading...</Text>
                        )
                    }
                    //console.log("currentUser : " + JSON.stringify(currentUser))
                    if (this.state.currentUser != null) {
                        return (
                            <SideMenu menu={menu}>
                              <MainScreen/>
                            </SideMenu>
                        )
                    }
                    else {
                        return (
                            <FirstUse/>
                        )
                    }

            }

            }/>
        );
    }
}
