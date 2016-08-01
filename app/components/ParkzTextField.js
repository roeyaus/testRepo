import React, { Component } from 'react';
import {
StyleSheet,
View,
TextInput,
Text
} from 'react-native';

module.exports = class ParkzTextField extends React.Component {
  render() {
    return (
      <View style={styles.textInputView}>
            <Text>{this.props.leftText}</Text>
            <TextInput
            style={styles.textInputs}
            onFocus={this.props.onFocus}
            onChangeText={this.props.onChangeText}
            placeholder={this.props.placeholder}
            autoFocus={this.props.autoFocus}
            returnKeyType={this.props.returnKeyType}
            borderWidth = {this.props.borderWidth}
            secureTextEntry={this.props.secureTextEntry}
            autoCorrect = {false}
              />
        
        </View>
    )
  }
}

const styles = StyleSheet.create({
    textInputView : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        borderWidth : 0.5,
        borderBottomColor : 'gray',
        borderLeftColor : 'white',
        borderRightColor : 'white'
    },
    textInputs : {
        height : 40,
        width : 200,
    }
})

