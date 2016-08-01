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
module.exports = class MapScreen extends React.Component {
  onDrawerButtonClick() {
    console.log("drawer click")
    this.props.navigator.toggleDrawer({
      side: 'left', // the side of the drawer since you can have two, 'left' / 'right'
      animated: true, // does the toggle have transition animation or does it happen immediately (optional)
      to : 'open'
});
  }
  render() {
    return (
      <View style={styles.container}>
      <View>
           
               <GooglePlacesAutocomplete
        placeholder='Search'
        minLength={2} // minimum length of text to search 
        autoFocus={false}
        fetchDetails={true}
        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true 
          console.log(data);
          console.log(details);
        }}
        getDefaultValue={() => {
          return ''; // text input default value 
        }}
        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete 
          key: 'AIzaSyDheVyleROsqoQR7L6x8bFfMX-MZD12GUc',
          language: 'en', // language of the results 
          types: '(cities)', // default: 'geocode' 
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
        currentLocationLabel="Current location"
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
           <MapView style={{height : 500} } showsUserLocation={true}></MapView>
      </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection : 'column',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  topMenu : {
      backgroundColor : '#333333',
      flexDirection : 'row',
      justifyContent : 'space-between'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
