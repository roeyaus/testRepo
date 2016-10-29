import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import {connect} from 'react-redux'


const ParkzETA = ({user}) => (
	<View style={styles.eta}>
	<Text>Where : {user.selectedDestination.destString}</Text>
	<Text>Your ETA : {user.selectedDestination.etaToDestInMinutes}</Text>
    </View>
)

const mapStateToProps = (state) => ({
  user: state.user
})


export default connect(mapStateToProps)(ParkzETA)

const styles = StyleSheet.create({
    eta : {
        flex : 1,
        flexDirection : 'column',
        alignItems : 'center',
        justifyContent : 'flex-start'
    }
})