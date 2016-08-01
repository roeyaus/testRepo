
 //@flow

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  AsyncStorage
} from 'react-native';
import { connect } from 'react-redux'
const loggedIn = true

class InitialScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            stateRestored : false,
            user : null
        }
    }

 shouldComponentUpdate(nextState,nextProps)
  {
    console.log("ComponentWillMount resotred, props : " + JSON.stringify(this.nextProps))
     if (nextProps.stateRestored)
        {
          
              this.props.navigator.pop( {
                animated : false
              })
           
          return false
        }
     return true
    //console.log("currentUser : " + JSON.stringify(currentUser))

    }
  
  render() {
    return <Text>Loading...</Text>
  }
}

export default connect(
  (state) => {
    console.log("InitialScreen State change " + JSON.stringify(state))
     return ({
       stateRestored : true,
       user : state.user
     })
  }
)(InitialScreen)
