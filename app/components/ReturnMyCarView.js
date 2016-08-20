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
class ReturnMyCarView extends React.Component {
    constructor(props) {
        super(props)
        console.log(props)
    }

    render() {
        return (
            <View View style={[style.overlayViewStyle, { height: 200 }]}>
                <NavButton />
                <Text>
                    Your valet is: {this.props.valet && this.props.valet.firstName}
                </Text>
                <Image source={require('../assets/images/falcon.jpg')} style= {{width : 100, height : 100}} />
                <Text>
                    {this.props.valet && this.props.valet.firstName}'s ETA is  : {this.props.valet.etaInMinutes} minutes
                </Text>
                <ParkzButton buttonStyle = {{ backgroundColor: 'red' }} text='Cancel Order' width={200} onPress={() => this.props.onCancel()}  />
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return ({
    order: state.order,
    valet: state.valetData[state.order.parkValetID] })
}

export default connect(mapStateToProps)(ReturnMyCarView)
