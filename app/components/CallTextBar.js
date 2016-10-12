import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image
} from 'react-native';

const CallTextBar = () => (
	<View style={{flex : 1, flexDirection : 'row', alignItems : 'center'}}>
	    <TouchableOpacity >
	        <Image style={{width: 30, height: 30, marginRight : 30}} source={require('../assets/images/phone.png') } />
	    </TouchableOpacity>
	     <TouchableOpacity >
	        <Image style={{width: 30, height: 30}} source={require('../assets/images/whatsapp-512.png') } />
	    </TouchableOpacity>
    </View>
)

export default CallTextBar