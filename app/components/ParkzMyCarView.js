import React, { Component } from 'react';
import {
StyleSheet,
View,
Text,
  TouchableHighlight,
  Image
} from 'react-native';

import ParkzButton from './ParkzButton'
const ParkzMyCarView = ({onPress}) => (
    <View style={{ justifyContent: 'center', backgroundColor : 'white' }}>
     <Image style={{width : 60, height : 60, position : 'absolute', right : 0, top : 0}}source={require('../assets/images/waze_icon.png')} />
      <ParkzButton buttonStyle = {{ backgroundColor: 'blue' }} text='Parkz My Car' width={200} onPress={onPress}  />
    </View>
)

export default ParkzMyCarView