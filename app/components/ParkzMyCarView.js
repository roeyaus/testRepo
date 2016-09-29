import React, { Component } from 'react';
import {
StyleSheet,
View,
Text,
  TouchableHighlight,
  Image
} from 'react-native';

import * as style from '../style.js'
import NavButton from './NavButton'
import ParkzButton from './ParkzButton'
import ParkzDynamicOverlay from './ParkzDynamicOverlay'

const ParkzMyCarView = ({onPress}) => ( 
  <ParkzDynamicOverlay expandable={false}>
    <View style={[style.nonExpandableOverlayViewStyle]}>
    <NavButton />
      <ParkzButton buttonStyle = {{ backgroundColor: 'blue' }} text='Parkz My Car' width={200} onPress={onPress}  />
    </View>
     </ParkzDynamicOverlay>
)

export default ParkzMyCarView

