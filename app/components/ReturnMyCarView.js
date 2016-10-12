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
            <View View style={[style.overlayViewStyle, { height: 200 }]}>
                {this.getTextByOrderState()}
                {this.props.isParked || <Image source={require('../assets/images/falcon.jpg')} style= {{width : 100, height : 100}} />}
                <ParkzButton buttonStyle = {{ backgroundColor: 'green' }} text='Get My Car' width={200} onPress={() => this.props.onPress()}  />
            </View>
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
