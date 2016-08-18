// @flow
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput,
  Button,
  MapView,
  Linking,
  Image,
  Alert
} from 'react-native';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import ParkzButton from '../components/ParkzButton'
import ParkzMyCarView from '../components/ParkzMyCarView'
import {connect} from 'react-redux'
import { setOpenOrder } from '../reducers/parkzActions'

class MapScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      destination: "",
      destLat: 0.0,
      destLong: 0.0,
      canPlaceOrder: true,
      hasWaze : false
    }
  }

  componentWillMount() {

    //get and store current user's location'
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
        this.setState({ destLat: position.coords.latitude, destLong: position.coords.longitude });
        console.log(initialPosition)
      },
      (error) => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );

    //register for user location changes and update the state
    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lastPosition = JSON.stringify(position);
      this.setState({ lastPosition });
    }, (error) => {
      console.log(error)
    }, { distanceFilter: 10 });

    //check if Waze is available
    Linking.canOpenURL("waze://?ll=0,0&navigate=yes").then(supported => {
      if (!supported) {
        console.log('Waze not available')
      } else {
        console.log("Waze is available")
         this.setState({hasWaze : true})
      }
    }).catch(err => console.error('An error occurred', err));
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }


  onDrawerButtonClick() {
    console.log("drawer click")
    this.props.navigator.toggleDrawer({
      side: 'left', // the side of the drawer since you can have two, 'left' / 'right'
      animated: true, // does the toggle have transition animation or does it happen immediately (optional)
      to: 'open'
    });
  }


  //create a new order object
  createOrder(userID) {
    return ({
      serviceZoneID: 0,
      openOrder: true,
      userID: userID,
      parkValetID: 0,
      returnValetID: 0,
      carModel: "",
      carColor: "",
      carCode: "",
      licensePlateNumber: 0,
      orderTime: new Date().toDateString(),
      pickupTime: new Date().toDateString(), //need to change to actual time
      parkingStartTime: new Date().toDateString(),
      carRequestTime: new Date().toDateString(),
      parkingEndTime: new Date().toDateString(),
      handoffTime: new Date().toDateString(),
      pickupLocation: { destination: this.state.destination, destLat: this.state.destLat, destLong: this.state.destLong },
      handoffLocation: "",
      totalCost: 0,
      paidCost: 0,
      tip: 0,
      rating: 0,
      comments: ""
    })
  }
  // OrderID
  // ServiceZoneID
  // UserID
  // ParkValetID  - (valet that will park the car)
  // ReturnValetID - (valet that will return the car)
  // Car model
  // Car color
  // Car code
  // License plate number
  // Order placement Time - (when the order was placed)
  // Customer’s projected arrival time at pick-up - (when valet should pickup car)
  // Pick-up time - (when valet did pick up the car from customer )
  // Parking Begin time - (when the car was first parked)
  // Customer car request time - (when the customer requested the car back)
  // Parking End time - (when the car was taken out of the carpark)
  // Arrival time at hand-off - (when the car was handed back to the customer)
  // Parking rate (breakdown?)
  // Pick up Location
  // Hand-off location
  // TotalCost (breakdown?) - (what the customer should pay)
  // PaidCost - (what the customer did pay)
  // Gratuity/Tip to valets
  // PayMethod (UserID +PaymentMethodID)
  // Rating
  // Comments



  onOrderPlaced() {
    //update firebase with a new order
    // Get a key for a new Order.
      var _this = this
      const order = this.createOrder(firebase.auth().currentUser.uid)
      this.props.placeOrder(order).then(res => {
        Alert.alert("Order Placed")
      }).catch(error => {
        Alert.alert("Order Failed")
      })
  }

  render() {
    const ParkzMyCar = (<ParkzMyCarView onPress={() => this.onOrderPlaced()}/>)

    return (
      <View style={styles.container}>
        <MapView style={{ flex: 1 }} showsUserLocation={true}  followUserLocation = {true}
          overlays={[{
            coordinates: [
              { latitude: 32.096824, longitude: 34.774748 },
              { latitude: 32.098860, longitude: 34.801122 },
              { latitude: 32.069243, longitude: 34.787793 },
              { latitude: 32.073773, longitude: 34.765000 },
              { latitude: 32.096824, longitude: 34.774748 },
            ],
            strokeColor: '#f007',
            fillColor: '#f007',
            lineWidth: 3,
          }]}
          >

        </MapView>
        <View style = {{
          flex: 1, flexDirection: 'column', alignItems: 'stretch', justifyContent: 'space-between', position: 'absolute',
          top: 10,
          left: 10, width: 300
        }}>
      
          <GooglePlacesAutocomplete
            placeholder='Where are you driving to?'
            minLength={2} // minimum length of text to search 
            autoFocus={true}
            fetchDetails={true}
            enablePoweredByContainer = {false}
            onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true 
              console.log(data);
              console.log(details);
              console.log(details.geometry.location.lat, ",", details.geometry.location.lng)
              this.setState({ destination: data.description, destLat: details.geometry.location.lat, destLong: details.geometry.location.lng })
            } }
            getDefaultValue={() => {
              return ''; // text input default value 
            } }
            query={{
              // available options: https://developers.google.com/places/web-service/autocomplete 
              key: 'AIzaSyDheVyleROsqoQR7L6x8bFfMX-MZD12GUc',
              language: 'en' // language of the results 
              //types: '(cities)', // default: 'geocode' 
            }}
            styles={{
              description: {
                fontWeight: 'bold',
              },
              predefinedPlacesDescription: {
                color: '#1faadb',
              },
            }}

            currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list 
            currentLocationLabel="My current location"
            nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch 
            GoogleReverseGeocodingQuery={{
              // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro 
            }}
            GooglePlacesSearchQuery={{
              // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search 
              rankby: 'distance',
              types: 'food',
            }}


            />

        </View>
        <View style= {{bottom : 0, position : 'absolute', alignItems : 'stretch'}}>
        
        {this.state.canPlaceOrder && ParkzMyCar}
        </View>
       
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: 'nowrap',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  }
});



const mapDispatchToProps = (dispatch) => ({
    placeOrder : order => dispatch(setOpenOrder(order))
})

export default connect(null, mapDispatchToProps)(MapScreen)