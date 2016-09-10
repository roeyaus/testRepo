import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableHighlight,
    Image
} from 'react-native';

const NavButton = () => (
    <TouchableHighlight style={{  position: 'absolute', right: 0, top: -30 }}>
        <Image style={{width: 60, height: 60}} source={require('../assets/images/waze_icon.png') } />
    </TouchableHighlight>
)

export default NavButton