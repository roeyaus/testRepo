import React, { Component } from 'react';
import {
StyleSheet,
View,
Text,
  TouchableOpacity,
} from 'react-native';

const ParkzButton = ({ onPress, text, buttonStyle, textStyle }) => (
        <TouchableOpacity style={ [ styles.button ]  }
            onPress = {onPress}>
          <Text style={[ styles.buttonText, textStyle ]}>{text}</Text>
          </TouchableOpacity>
    )


export default ParkzButton

const styles = StyleSheet.create({
    button : {
        height : 40,
        width : 150,
        borderRadius : 5,
        alignItems : "center",
        justifyContent : "center",
        backgroundColor : 'orange',
        borderRadius: 10,
        borderWidth: 2,
        borderColor : 'orange',
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 5,
        shadowOffset: {
          height: 5,
          width: 5
        }
    },
    buttonText : {
        textAlign : "center",
        color : "white"
    }

})
