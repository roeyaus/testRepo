import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    LayoutAnimation
} from 'react-native';

import {connect} from 'react-redux'
import {overlayStyles} from '../style.js'
import ParkzButton from './ParkzButton'
import { orderStatusEnum } from '../utils/enums.js'

//details overlay that's expandable to summaryView
export default class ParkzDynamicOverlay extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			expanded : this.props.expandable
		}
	}

	changeExpandedState() {
		LayoutAnimation.easeInEaseOut();
		this.setState({ 
					expanded : !this.state.expanded})
	}
	//props we require are : 
	// 1. this.props.summaryView - the 50 pixel high summary view of the overlay
	// 2. this.props.children - the main details view of the overlay
	componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }
	render() {
		const arrowImage = ( 
			<TouchableOpacity 
			style={[this.state.expanded ? {transform:[{rotate: '0 deg'}]} : {transform:[{rotate: '180 deg'}]}, 
			{position: 'absolute', left: 0, top: -25 }]} 
			onPress = {() => this.changeExpandedState()}>
			<Image style={{width: 50, height: 50}} source={require('../assets/images/down-arrow.png') } />
			</TouchableOpacity>
			)

		return (
			<View style={ this.state.expanded ? overlayStyles.overlayExpandedViewStyle : overlayStyles.overlayMinimizedViewStyle }>
				
				{this.state.expanded ? this.props.children : this.props.summaryView}
				{ this.props.expandable && arrowImage }
			</View>
			 
                

		)
	}
}