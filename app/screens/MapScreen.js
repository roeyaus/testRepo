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
  Linking,
  Image,
  Alert
} from 'react-native';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import ParkzButton from '../components/ParkzButton'
import ParkzMyCarView from '../components/ParkzMyCarView'
import PickupValetView from '../components/PickupValetView'
import ReturnMyCarView from '../components/ReturnMyCarView'
import {connect} from 'react-redux'
import { setOpenOrder, setUserLocation, setCancelOrder, startListenToValetFBEvents , startListenToOrderFBEvents } from '../reducers/parkzActions'
import MapView from 'react-native-maps'
import { orderStatusEnum } from '../utils/enums.js'
import { asyncGetETA} from '../utils/valetLocationUpdater.js'

class MapScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentLocation: {},
      destination: "",
      region : {
         latitude : 0,
         longitude : 0,
         latitudeDelta: 0.00922,
         longitudeDelta: 0.00421,
      },
      destLat: 0.0,
      destLong: 0.0,
      canPlaceOrder: true,
      hasWaze: false,
      valetData: []
    }
  }

  componentWillMount() {
    //get and store current user's location'
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
        this.setState({ region : { latitude : position.coords.latitude, longitude : position.coords.longitude,
          latitudeDelta : this.state.region.latitudeDelta, longitudeDelta : this.state.region.longitudeDelta } });
        console.log(initialPosition)
      },
      (error) => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );

    //register for user location changes and update the state
    this.watchID = navigator.geolocation.watchPosition((position) => {
      console.log(position.coords)
      this.setState({ currentLocation: position.coords, region : { latitude : position.coords.latitude, longitude : position.coords.longitude,
        latitudeDelta : this.state.region.latitudeDelta, longitudeDelta : this.state.region.longitudeDelta }});
      this.props.updateLocation(position.coords)

    }, (error) => {
      console.log(error)
    }, { distanceFilter: 10 });

    //check if Waze is available
    Linking.canOpenURL("waze://?ll=0,0&navigate=yes").then(supported => {
      if (!supported) {
        console.log('Waze not available')
      } else {
        console.log("Waze is available")
        this.setState({ hasWaze: true })
      }
    }).catch(err => console.error('An error occurred', err));

    this.props.startListenValetUpdates()
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
    const parkValetID = "valet01" //Who is the parking valet?
    const returnValetID = "valet01" //who is the returning valet?
    const pickupLocation = { destination: this.state.destination, latitude: this.state.region.latitude, longitude: this.state.region.longitude }
    const parkValet = this.props.valetData.filter((valet) => valet.id == parkValetID)

    return ({
      serviceZoneID: "",
      orderStatus : orderStatusEnum.none,
      userID: userID,
      parkValetID: "valet01",
      returnValetID: "",
      carCode: "",
      licensePlateNumber: "",
      orderTime: new Date().toDateString(),
      pickupTime: new Date().toDateString(), //need to change to actual time
      parkingStartTime: new Date().toDateString(),
      carRequestTime: new Date().toDateString(),
      parkingEndTime: new Date().toDateString(),
      handoffTime: new Date().toDateString(),
      pickupLocation: pickupLocation,
      parkingLocation : { destination: "Home", latitude: 0.0, longitude: 0.0 },
      handoffLocation: { destination: "", latitude: 0.0, longitude: 0.0 },
      totalCost: 0,
      paidCost: 0,
      tip: 0,
      rating: 0,
      comments: "",
      valetETAInMinutes : 0
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
      //once we place the order, we start listening for order updates from FB
      this.props.startListenOrderUpdates()
      //Alert.alert("Order Placed")
    }).catch(error => {
      Alert.alert("Sorry, something went wrong")
    })
  }

  //redraw our marker in the middle of the map
  onRegionChange(region) {
    //console.log(region)
   // this.setState({region})
  }

  onOrderCancelled() {
      this.props.cancelOrder(this.props.order).then(function(res) {
          //order has been cancelled
      }).catch(function(error){
        Alert.alert("Sorry, something went wrong")
      })
  }

  onReturnMyCarPressed() {

  }

  getOverlayView() {
    //this determines which view we will see according to the state of the current order
    switch (this.props.order.orderStatus) {
      case orderStatusEnum.none : 
      if (this.state.destination != "" && this.state.canPlaceOrder) {
        return (<ParkzMyCarView onPress={() => this.onOrderPlaced() }/>)
      }
      break
      case orderStatusEnum.open : 
        return (<PickupValetView onCancel={() => this.onOrderCancelled()}/>)
      case orderStatusEnum.carPickedup : 
      case orderStatusEnum.carParked :
        return (<ReturnMyCarView onPress={()=> this.onReturnMyCarPressed()}/>)  
    }
    //if no conditions match, we return no view
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView ref="mapView" style={{ flex: 1 }} showsUserLocation={true}  followsUserLocation = {true} showsCompass={false}
          region = {this.state.region}
          onRegionChange={(region) => this.onRegionChange(region)}
          >
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
            this.props.order.orderStatus == orderStatusEnum.carParked &&
            <MapView.Marker
              key = "car"
              coordinate={{ latitude : this.props.order.parkingLocation.latitude, longitude : this.props.order.parkingLocation.longitude}}
              title="My Car"
              image={require('../assets/images/car.png')}
              />
          }
          <MapView.Marker key="centerMarker" coordinate={{ latitude: this.state.region.latitude, longitude: this.state.region.longitude }} />
          {this.props.valetData.map(valet => (
            <MapView.Marker
              key = {valet.firstName}
              coordinate={valet.location}
              title={valet.firstName}
              image={  this.props.order.orderStatus == orderStatusEnum.carPickedup ? require('../assets/images/car.png') : require('../assets/images/valet.png')}
              />
          )) }
        </MapView>
        <View style = {{
          flex: 1, flexDirection: 'column', alignItems: 'stretch', justifyContent: 'space-between', position: 'absolute',
          top: 10,
          left: 10, width: 300
        }}>

          <GooglePlacesAutocomplete
            placeholder='Where are you driving to?'
            textInputProps={{
              autoCorrect : false
            }}
            minLength={2} // minimum length of text to search 
            // autoFocus={true}
            fetchDetails={true}
            enablePoweredByContainer = {false}
            onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true 
              console.log(data);
              console.log(details);
              console.log(details.geometry.location.lat, ",", details.geometry.location.lng)
              this.setState({ destination: data.description, region : { latitude : details.geometry.location.lat, longitude: details.geometry.location.lng,
                 latitudeDelta : this.state.region.latitudeDelta, longitudeDelta : this.state.region.longitudeDelta }})
            } }
            getDefaultValue={() => {
              return ''; // text input default value 
            } }
            query={{
              // available options: https://developers.google.com/places/web-service/autocomplete 
              key: 'AIzaSyCMJpcMKtuafU2buTcPb1T0jBym-hovsy8',
              language: 'en' // language of the results 
              //types: '(cities)', // default: 'geocode' 
            }}
            styles={{
              listView: {
                backgroundColor: 'white',
                borderRadius: 10,
                shadowColor: "#000000",
                shadowOpacity: 0.8,
                shadowRadius: 2,
                shadowOffset: {
                  height: 1,
                  width: 0
                }
              },
              separator: {
                height: 0
              },
              textInputContainer: {
                backgroundColor: 'transparent',
                borderTopWidth: 0,
                borderBottomWidth: 0
              },
              textInput: {
                height: 40,
                borderRadius: 10,
                borderWidth: 2,
                shadowColor: "#000000",
                shadowOpacity: 0.8,
                shadowRadius: 10,
                shadowOffset: {
                  height: 5,
                  width: 5
                }
              },
              description: {
                fontWeight: 'bold',
              },
              predefinedPlacesDescription: {
                color: '#1faadb',
              },
            }}

            currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list 
            currentLocationLabel="My current location"
            nearbyPlacesAPI='GoogleReverseGeocoding' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch 
            GoogleReverseGeocodingQuery={{
              // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro 
              latitude : this.state.region.latitude,
              longitude : this.state.region.longitude,
              key: 'AIzaSyCMJpcMKtuafU2buTcPb1T0jBym-hovsy8'
            }}
            GooglePlacesSearchQuery={{
              // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search 
            }}


            />

        </View>
        <View position='absolute' bottom = {0} left = {0} right={0} alignSelf = 'stretch' >
        { this.getOverlayView() }
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
  placeOrder: order => dispatch(setOpenOrder(order)),
  updateLocation: location => dispatch(setUserLocation(location)),
  cancelOrder : order => dispatch(setCancelOrder(order)),
  startListenValetUpdates : () => dispatch(startListenToValetFBEvents()),
  startListenOrderUpdates : () => dispatch(startListenToOrderFBEvents())
})

const mapStateToProps = (state) => ({
  valetData: Object.keys(state.valetData).map(key => state.valetData[key]),
  order : state.order
})

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen)