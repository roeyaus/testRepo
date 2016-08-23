
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
const ParkzMapView = ({state, order, valetData}) => (

<MapView  style={{ flex: 1 }} showsUserLocation={true}  followsUserLocation = {true} showsCompass={false}
          region = {state.region}>
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
          {
            order.orderStatus == orderStatusEnum.carParked &&
            <MapView.Marker
              key = "car"
              coordinate={{ latitude : order.parkingLocation.latitude, longitude : order.parkingLocation.longitude}}
              title="My Car"
              image={require('../assets/images/car.png')}
              />
          }
          <MapView.Marker key="centerMarker" coordinate={{ latitude: state.region.latitude, longitude: state.region.longitude }} />
          {valetData.map(valet => {
            let imageSource = ""
            if (order.orderStatus == orderStatusEnum.carRequested && valet.id == order.returnValetID)
            {
              imageSource =  require('../assets/images/valet-return.png')
            }
            if (valet.id == order.parkValetID)
            {
              imageSource =  require('../assets/images/valet-pickup.png')
            }
            else 
            {
              imageSource =  require('../assets/images/valet.png')
            }

          return ( <MapView.Marker
              key = {valet.firstName}
              coordinate={valet.location}
              title={valet.firstName}>
              <Image style={{width : 30, height : 30}} source={ imageSource } />  
              </MapView.Marker>
              )
        })}
        </MapView>
)

const mapStateToProps = (state) => ({
  valetData: Object.keys(state.valetData).map(key => state.valetData[key]),
  order : state.order
})

export default connect(mapStateToProps)(ParkzMapView)