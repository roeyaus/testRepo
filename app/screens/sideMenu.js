import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {parkzColor} from '../style'
export default class SideMenu extends React.Component {
  render() {
      return (
      <View style={styles.menuView}>
      <TouchableOpacity style={styles.touchOpStyle}>
      <Text style={styles.menuText}>Payment Info</Text>
      </TouchableOpacity>
       <TouchableOpacity style={styles.touchOpStyle}>
      <Text style={styles.menuText}>About</Text>
      </TouchableOpacity>
      </View>
)
  }
}

const styles = StyleSheet.create({
    menuView : {
        flex : 1,
        flexDirection : 'column',
        justifyContent : 'flex-start',
        marginTop : 30,
        backgroundColor : parkzColor
    },
    touchOpStyle : {
      marginTop : 10,
      marginBottom : 10
    },
    menuText : {
      color : 'white',
      fontSize : 20
    }
})
