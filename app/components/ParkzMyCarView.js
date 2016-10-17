import React, { Component } from 'react';
import {
StyleSheet,
View,
Text,
  TouchableHighlight,
  Image
} from 'react-native';

import {overlayStyles} from '../style.js'
import NavButton from './NavButton'
import ParkzButton from './ParkzButton'
import ParkzDynamicOverlay from './ParkzDynamicOverlay'

const ParkzMyCarView = ({onPress}) => ( 
  <ParkzDynamicOverlay expandable={false} summaryView= {
    <View style={[overlayStyles.nonExpandableOverlayViewStyle]}>
    <NavButton />
      <ParkzButton buttonStyle = {{ backgroundColor: 'blue' }} text='Parkz My Car' width={200} onPress={onPress}  />
    </View>
    }/>)

export default ParkzMyCarView

