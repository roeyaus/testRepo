import React, { Component } from 'react';
import {
StyleSheet,
View,
Text,
  TouchableHighlight,
} from 'react-native';

module.exports = class ParkzButton extends React.Component {
  render() {
    return (
        <TouchableHighlight style={ [ styles.button, 
        {backgroundColor : 
          this.props.backgroundColor
        }]
        }
            onPress = {this.props.onPress}>
          <Text style={styles.buttonText}>{this.props.text}</Text>
          </TouchableHighlight>
    )
  }
}


const styles = StyleSheet.create({

    button : {
        width : 80,
        height : 40,
        borderRadius : 5,
        alignItems : "center",
        justifyContent : "center",
        marginLeft : 50,
        marginRight : 50
    },
    buttonText : {
        textAlign : "center",
        color : "white"
    }

})
