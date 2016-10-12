import React, { Component } from 'react';
import {
StyleSheet,
View,
Text,
  TouchableOpacity,
} from 'react-native';

const ParkzButton = ({ onPress, text, buttonStyle, textStyle }) => (
        <TouchableOpacity style={ [ styles.button, buttonStyle ]  }
            onPress = {onPress}>
          <Text style={[ styles.buttonText, textStyle ]}>{text}</Text>
          </TouchableOpacity>
    )


export default ParkzButton

const styles = StyleSheet.create({
    button : {
        height : 40,
        width : 100,
        borderRadius : 5,
        alignItems : "stretch",
        justifyContent : "center",
         shadowColor: "#000000",
              shadowRadius: 2,
              shadowOpacity: 0.5,
              shadowOffset: {
                height: 1,
                width: 1
              }
    },
    buttonText : {
        textAlign : "center",
        color : "white"
    }

})
