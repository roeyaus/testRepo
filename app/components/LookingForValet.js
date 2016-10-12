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
import ParkzDynamicOverlay from './ParkzDynamicOverlay'
import CallTextBar from './CallTextBar'
const LookingForValet = ({onCancel, order}) =>  (
     <ParkzDynamicOverlay expandable={true} summaryView={
            
            <View style={[style.nonExpandableOverlayViewStyle]}>
            <NavButton />   
             <CallTextBar  />   
                <View style={{flex : 1, flexDirection : 'row', alignItems : 'center'}}>
                <Text> We're setting you up with a valet... </Text>
                <Image source={require('../assets/images/spinning-wheel.gif')} style= {{width : 30, height : 30}} />
                
                </View>
                <ParkzButton buttonStyle = {{ backgroundColor: 'red' }} text='Cancel Order' width={200} onPress={() => onCancel()}  />
                
            </View>}>
            
            <View style={[style.overlayViewStyle]}>
                <NavButton />
                <Text> We're setting you up with a valet... </Text>
                <Image source={require('../assets/images/spinning-wheel.gif')} style= {{width : 30, height : 30}} />
                <ParkzButton buttonStyle = {{ backgroundColor: 'red' }} text='Cancel Order' width={200} onPress={() => onCancel()}  />
            </View>
       </ParkzDynamicOverlay> 
        )
    
const mapStateToProps = (state) => {
    return ({
    order: state.order 
})
}

export default connect(mapStateToProps)(LookingForValet)
