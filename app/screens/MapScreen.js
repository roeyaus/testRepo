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
  MapView
} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import ParkzButton from '../components/ParkzButton'


module.exports = class MapScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      destination: "",
      destLat: 0.0,
      destLong: 0.0,
      canPlaceOrder: false
    }
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
    return {
      serviceZoneID: 0,
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
      pickupLocation: "",
      handoffLocation: "",
      totalCost: 0,
      paidCost: 0,
      tip: 0,
      rating: 0,
      comments: ""
    }
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
    const order = createOrder(firebase.auth().currentUser)
    var newPostKey = firebase.database().ref().child('orders').push().key;

    var updates = {};
    updates['/posts/' + newPostKey] = postData;
    updates['/user-posts/' + uid + '/' + newPostKey] = postData;

    return firebase.database().ref().update(updates);

  }

  render() {
    const Button = (<View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <ParkzButton text="Parkz My Car" width={200} onPress={() => { this.onOrderPlaced() } } buttonStyle= { { backgroundColor: "black" }}  />
    </View>)

    return (
      <View style={styles.container}>
        <MapView style={{ flex: 1 }} showsUserLocation={true} region={{ latitude: this.state.destLat, longitude: this.state.destLong, latitudeDelta: 0.01, longitudeDelta: 0.01 }}>

        </MapView>
        <View style = {{
          flex: 1, flexDirection: 'column', alignItems: 'stretch', justifyContent: 'space-between', position: 'absolute',
          top: 10,
          left: 10, width: 300
        }}>
          <GooglePlacesAutocomplete
            placeholder='Where are you driving to?'
            minLength={2} // minimum length of text to search 
            autoFocus={false}
            fetchDetails={true}
            enablePoweredByContainer = {false}
            onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true 
              console.log(data);
              console.log(details);
              console.log(details.geometry.location.lat, ",", details.geometry.location.long)
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
        {this.state.canPlaceOrder && Button}

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
