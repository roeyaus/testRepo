import React, { Component } from 'react';
import {
StyleSheet,
View,
TextInput,
Text
} from 'react-native';

const ParkzTextField = ({leftText, ...props}) => (
      <View style={styles.textInputView}>
            <Text>{leftText}</Text>
            <TextInput
            style={styles.textInputs}
            {...props}
            autoCorrect = {false}
              />
        
        </View>)

export default ParkzTextField

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

