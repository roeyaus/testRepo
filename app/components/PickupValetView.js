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
class PickupValetView extends React.Component {
    constructor(props) {
        super(props)
        console.log(props)
    }

    render() {
        return (
             <ParkzDynamicOverlay expandable={true} summaryView={
            
            <View style={[overlayStyles.nonExpandableOverlayViewStyle]}>
            <NavButton />     
            <CallTextBar  />
            <View style={{flex : 1, flexDirection : 'row', alignItems : 'center'}}>
            <Image source={require('../assets/images/falcon.jpg')} style= {{marginRight : 20, width : 60, height : 60}} />
                <Text>
                    {this.props.valet && this.props.valet.firstName}'s ETA is  : {this.props.order.valetETAInMinutes} minutes
                </Text>
            </View>
            <ParkzButton buttonStyle = {{ backgroundColor: 'red' }} text='Cancel Order' width={200} onPress={() => this.props.onCancel()}  />
     
            </View>}>
            
            <View style={[overlayStyles.overlayViewStyle]}>
                <NavButton />
                <CallTextBar  /> 
                <Text>
                    Your valet is: {this.props.valet && this.props.valet.firstName}
                </Text>
                <Image source={require('../assets/images/falcon.jpg')} style= {{width : 100, height : 100}} />
                <Text>
                    {this.props.valet && this.props.valet.firstName}'s ETA is  : {this.props.order.valetETAInMinutes} minutes
                </Text>
                <Text> Don't worry, you can cancel at any time until your car gets picked up </Text>
                <ParkzButton buttonStyle = {{ backgroundColor: 'red' }} text='Cancel Order' width={200} onPress={() => this.props.onCancel()}  />
       </View>
</ParkzDynamicOverlay>
        )
    }
}
const mapStateToProps = (state) => {
    return ({
    order: state.order,
    valet: state.valetData[state.order.parkValetID] })
}

export default connect(mapStateToProps)(PickupValetView)
