import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image
} from 'react-native';

const NavButton = () => (
    <TouchableOpacity style={{  position: 'absolute', right: 0, top: -30 }}>
        <Image style={{width: 60, height: 60}} source={require('../assets/images/waze_icon.png') } />
    </TouchableOpacity>
)

export default NavButton