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
const ParkzMyCarView = ({onPress}) => (
 
    <View style={[style.overlayViewStyle, {height : 50}]}>
    <NavButton />
      <ParkzButton buttonStyle = {{ backgroundColor: 'blue' }} text='Parkz My Car' width={200} onPress={onPress}  />
    </View>
)

export default ParkzMyCarView

