/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';
const SideMenu = require('react-native-side-menu');
const ParkzMenu = require('./sideMenu.js')
const FirstUse = require('./firstUseScreen.js')
const MainScreen = require('./mainScreen.js')
const loggedIn = true


class Application extends React.Component {
  render() {
    const menu = <ParkzMenu/>;
        return (
            <Navigator
            initialRoute={{ id: loggedIn ? 'loggedIn' : 'notLoggedIn' }}
            renderScene={(route, navigator) => {
                switch (route.id)
                {
                    case 'loggedIn' :
                    return (
                        <SideMenu menu={menu}>
                          <MainScreen/>
                        </SideMenu>
                    )
                    case 'notLoggedIn' :
                    return (
                        <FirstUse/>
                    )
                }
            }

            }/>
        );
    }
}



AppRegistry.registerComponent('parkz', () => Application);
