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
import ParkzButton from '../components/ParkzButton'
import { orderStatusEnum } from '../utils/enums.js'

class OrderCompletedScreen extends React.Component {
    constructor(props) {
        super(props)
        console.log(props)
    }

    onPaymentPress() {
        //navigate to next payment screen ??
    }

    render() {
        return (
            <View style={style.overlayViewStyle}>
                <Text>Your valets: {this.props.parkValet.firstName} and {this.props.returnValet.firstName} </Text>
                <Text>{this.props.order.totalCost} NIS </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Image source={require('../assets/images/falcon.jpg') } style= {{ width: 100, height: 100 }} />
                    <Image source={require('../assets/images/myna.gif') } style= {{ width: 100, height: 100 }} />
                </View>
                <ParkzButton buttonStyle = {{ backgroundColor: 'blue' }} text='Payment' width={200} onPress={() => this.onPaymentPress() }  />
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return ({
        order: state.order,
        parkValet: state.valetData[state.order.parkValetID],
        returnValet: state.valetData[state.order.returnValetID]
    })
}

export default connect(mapStateToProps)(OrderCompletedScreen)
