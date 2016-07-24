
 //@flow

import React, { Component } from 'react';
import {
  Navigator,
  Text
} from 'react-native';

const Parkz = require('./Parkz.js')


module.exports = class ParkzNav extends React.Component {
    constructor(props) {
        super(props)

    }
  render() {
        return (
            <Navigator
            initialRoute={ {name : 'startScreen'} }
            renderScene={(route, navigator) => {
                if (route.name == 'startScreen')
                {
                    return <Parkz navigator={navigator} {...route.passProps}/>
                }
                if (route.name == 'signupScreen')
                {
                    return (<Text>Hi!</Text>)
                }


            }

            }/>
        );
    }
}
