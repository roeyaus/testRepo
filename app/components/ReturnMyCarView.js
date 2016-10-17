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
import { orderStatusEnum } from '../utils/enums.js'
import ParkzDynamicOverlay from './ParkzDynamicOverlay'
import CallTextBar from './CallTextBar'
import {overlayStyles} from '../style'

class ReturnMyCarView extends React.Component {
    constructor(props) {
        super(props)
        console.log(props)
    }

    getTextByOrderState() {
        return (!this.props.isParked ? <Text> {this.props.valet.firstName } is parking your car...</Text> : 
            <Text> Your car is parked at { this.props.order.parkingLocation.destination }</Text>
        )
    }
    render() {
        return (
            <ParkzDynamicOverlay expandable={true} summaryView={        
            <View style={[overlayStyles.nonExpandableOverlayViewStyle]}>
            {this.props.isParked || <CallTextBar />}
            <View style={{flex : 1, flexDirection : 'row', alignItems : 'center'}}>
              
                {this.props.isParked || <Image source={require('../assets/images/falcon.jpg')} style= {{marginRight : 20, width : 60, height : 60}} />}
                {this.getTextByOrderState()}
            </View>
                <ParkzButton text='Get My Car'  onPress={() => this.props.onPress()}  />
            </View> }>
            <View style={[overlayStyles.overlayViewStyle]}>
                 {this.props.isParked || <CallTextBar />}
                {this.getTextByOrderState()}
                {this.props.isParked || <Image source={require('../assets/images/falcon.jpg')} style= {{width : 100, height : 100}} />}
                <ParkzButton text='Get My Car'  onPress={() => this.props.onPress()}  />
            </View>
            </ParkzDynamicOverlay>

        )
    }
}
const mapStateToProps = (state) => {
    return ({
    order: state.order,
    isParked : state.order.orderStatus == orderStatusEnum.carParked,
    valet: state.valetData[state.order.parkValetID] })
}

export default connect(mapStateToProps)(ReturnMyCarView)
