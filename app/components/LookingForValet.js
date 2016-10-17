import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    Image
} from 'react-native';
import {connect} from 'react-redux'
import {overlayStyles} from '../style.js'
import ParkzButton from './ParkzButton'
import NavButton from './NavButton'
import ParkzDynamicOverlay from './ParkzDynamicOverlay'
import CallTextBar from './CallTextBar'
const LookingForValet = ({onCancel, order}) =>  (
     <ParkzDynamicOverlay expandable={false} summaryView={
            
            <View style={[overlayStyles.nonExpandableOverlayViewStyle]}>
            <NavButton />   
             <CallTextBar  />   
                <View style={{flex : 1, flexDirection : 'row'}}>
                <Text> We're setting you up with a valet... </Text>
                <Image source={require('../assets/images/spinning-wheel.gif')} style= {{width : 30, height : 30}} />
                
                </View>
                <ParkzButton buttonStyle = {{ backgroundColor: 'red' }} text='Cancel Order' width={200} onPress={() => onCancel()}  />
                
            </View>}/>
            
          
        )
    
const mapStateToProps = (state) => {
    return ({
    order: state.order 
})
}

export default connect(mapStateToProps)(LookingForValet)
