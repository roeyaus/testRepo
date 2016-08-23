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

class CarReturningView extends React.Component {
    constructor(props) {
        super(props)
        console.log(props)
    }

    getViewByState() {
       switch (this.props.order.orderStatus)
       {
           case orderStatusEnum.carRequested:
           return (      
                <Text> Allocating a valet to return your car </Text>
                <Text> Just a few moments..</Text>
           )
           case orderStatusEnum.carReturning:
           return (
                <Text> {this.props.valet.firstName } is returning your car.</Text>
                  {<Image source={require('../assets/images/falcon.jpg')} style= {{width : 100, height : 100}} />}
                <Text> {this.props.order.valetETAInMinutes } </Text>
           )
       }
    }

    render() {
        return (
            <View View style={[style.overlayViewStyle, { height: 200 }]}>
                {this.getViewByState()}
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return ({
    order: state.order,
    valet: state.valetData[state.order.returnValetID] })
}

export default connect(mapStateToProps)(CarReturningView)
