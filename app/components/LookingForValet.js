import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    Image
} from 'react-native';
import {connect} from 'react-redux'
import * as style from '../style.js'
import ParkzButton from './ParkzButton'
import NavButton from './NavButton'

const LookingForValet = ({onCancel, order}) =>  (
            <View View style={[style.overlayViewStyle, { height: 400 }]}>
                <NavButton />
                <Text> We're setting you up with a valet... </Text>
                <Image source={require('../assets/images/spinning-wheel.gif')} style= {{width : 30, height : 30}} />
                <Text>Now only </Text>
                <Text style={{ textAlign : 'center', fontWeight : 'bold', fontSize : 25}}> 25 NIS / Hour </Text>
                <Text> You can cancel for free at any time until your car gets picked up </Text>
                <ParkzButton buttonStyle = {{ backgroundColor: 'red' }} text='Cancel Order' width={200} onPress={() => onCancel()}  />
            </View>
        )
    
const mapStateToProps = (state) => {
    return ({
    order: state.order 
})
}

export default connect(mapStateToProps)(LookingForValet)
