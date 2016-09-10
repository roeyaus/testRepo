
// @flow
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image
} from 'react-native';
import {connect} from 'react-redux'
import MapView from 'react-native-maps'
import { orderStatusEnum } from '../utils/enums.js'

class ParkzMapView extends React.Component {
constructor(props) {
  super(props)
}
  getMarkerList() {
    //console.log(this.props.valetData)
    let markerList = []
    this.props.valetData.map((valet) => {
        markerList.push(Object.assign({}, valet, {image : require('../assets/images/valet-pickup.png')}))
    })

    
    switch (this.props.order.orderStatus) {
      case orderStatusEnum.carParked:
        markerList.push({
          id: "car",
          firstName: "My Car",
          location: {
            latitude: this.props.order.parkingLocation.latitude,
            longitude: this.props.order.parkingLocation.longitude
          },
          image: require('../assets/images/car.png')
        }
        )
        break;
      case orderStatusEnum.carPickedup:
        markerList.map((marker) => {
          if (marker.id == this.props.order.parkValetID) {
            marker.image = require('../assets/images/car.png')
          }
          else {
            marker.image = require('../assets/images/valet-pickup.png')
          }
        })
        break;
      case orderStatusEnum.carReturning:
        markerList.map((marker) => {
          if (marker.id == this.props.order.returnValetID) {
            marker.image = require('../assets/images/car.png')
          }
          else {
            marker.image = require('../assets/images/valet-pickup.png')
          }
        })
        break;


    }
    //console.log(markerList)
    return markerList
  }

  render() {
    var getList = () => { return this.getMarkerList()}
    return (
    <MapView  style={{ flex: 1 }} showsUserLocation={true}  followsUserLocation = {true} showsCompass={false}
      region = {this.props.state.region}>
      <MapView.Polygon
        coordinates = {[
          { latitude: 32.096824, longitude: 34.774748 },
          { latitude: 32.098860, longitude: 34.801122 },
          { latitude: 32.069243, longitude: 34.787793 },
          { latitude: 32.073773, longitude: 34.765000 },
          { latitude: 32.096824, longitude: 34.774748 },
        ]}
        strokeColor= '#f007'
        fillColor= '#f007'
        strokeWidth = {3}
        />
      <MapView.Marker key="centerMarker" coordinate={{ latitude: this.props.state.region.latitude, longitude: this.props.state.region.longitude }} />
      { getList().map(valet => {
        return (<MapView.Marker
          key = {valet.firstName}
          coordinate={valet.location}
          title={valet.firstName}>
          <Image style={{ width: 30, height: 30 }} source={ valet.image } />
        </MapView.Marker>
        )
      }) }
    </MapView>
    )
  }
}

const mapStateToProps = (state) => ({
  valetData: Object.keys(state.valetData).map(key => state.valetData[key]),
  order: state.order
})

export default connect(mapStateToProps)(ParkzMapView)