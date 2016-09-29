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

//details overlay that's expandable to summaryView
export default class ParkzDynamicOverlay extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			expanded : this.props.expandable
		}
	}

	//props we require are : 
	// 1. this.props.summaryView - the 50 pixel high summary view of the overlay
	// 2. this.props.detailsView - the main details view of the overlay

	render() {
		const downArrowImage = ( <TouchableHighlight style={{  position: 'absolute', left: 0, top: 0 }} onPress={() => this.setState({ 
					expanded : !this.state.expanded})}>
		<Image style={{width: 30, height: 30}} source={require('../assets/images/down-arrow.png') } />
		</TouchableHighlight>)

		return (
			<View style={ this.state.expanded ? style.overlayExpandedViewStyle : style.overlayMinimizedViewStyle }>
				
				{ this.props.expandable && downArrowImage }
				
				{this.props.children}
			</View>
			 
                

		)
	}
}