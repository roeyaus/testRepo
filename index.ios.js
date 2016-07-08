/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  MapView,
  TouchableHighlight,
  ListView,
  Alert,
  Linking
} from 'react-native';
var DOMParser = require('xmldom').DOMParser;

var showFreeIfUnderDuration = 10


class valet extends Component {
  constructor(props) {
super(props)
this.state = {
  query : {},
  dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
  initialPosition : { latitude : 0.00000, longitude : 0.00000},
  parkRadius : 4.0 //km
}

this._onPressButtonGetAvailable()
// setInterval( () =>  { //tick
//         this._onPressButtonGetAvailable()
//     }, 10000)
}

componentDidMount() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows( [{ name : "test", address: "testBlat 123", currentDuration : 15 }])
    })
}
_getCarparkInfo(carPark)
{
    //we get the carpark in the form of JSON from gisn.tel-aviv
    //we create a struct that contains only the info we want
    return {
        pricePerHour : carPark.attributes.tashlum == "לא" ?
            0 : 16,
        name : carPark.attributes.shem_hanyon,
        address : carPark.attributes.shem_rechov + " " + carPark.attributes.ms_bait +
        " תל אביב",
        ahuzatHof : false,
        currentDistance : 9999,
        currentDuration : 9999,
        vacancy : false
    }

}

 _getCarParks() {
   var _this = this;
    fetch(`https://gisn.tel-aviv.gov.il/wsgis/service.asmx/GetLayer?layerCode=970&layerWhere=&xmin=&ymin=&xmax=&ymax=&projection=`) //gets all Ahuzot Hof parking lots
    .then((response) => response.text())
    .then((responseData) => {
    var doc = new DOMParser().parseFromString(responseData, 'text/xml');
    var carparks = doc.getElementsByTagName('string')[0];
    try {
      var ahuzotHofJSON = JSON.parse(carparks.textContent)
    } catch (e) {
      Alert.alert("Error in getting parking information")
    } finally {

    }

    fetch(`https://gisn.tel-aviv.gov.il/wsgis/service.asmx/GetLayer?layerCode=556&layerWhere=&xmin=&ymin=&xmax=&ymax=&projection=`) //gets all public car parks (free or not)
    .then((response) => response.text())
    .then((repdData) => {

          var doc = new DOMParser().parseFromString(repdData, 'text/xml');
          var carparks = doc.getElementsByTagName('string')[0];
          try {
            var publicJSON = JSON.parse(carparks.textContent)
          } catch (e) {
            Alert.alert("Error in getting parking information")
          } finally {

          }
        var allParks = []
        //foreach free car park, if Ahuzat Hof, check availability
        for (var i in publicJSON.features)
        {
                allParks.push(_this._getCarparkInfo(publicJSON.features[i]))

        }
        console.log("number of carparks found : " + allParks.length)
        //now check if it's available
        for (var carPark in allParks)
        {
            for (var ahuzatHof in ahuzotHofJSON.features)
            {
                if (allParks[carPark].name ==  ahuzotHofJSON.features[ahuzatHof].attributes.shem_chenyon)
                {
                    allParks[carPark].ahuzatHof = true
                    if (ahuzotHofJSON.features[ahuzatHof].attributes.status_chenyon == "פנוי" || ahuzotHofJSON.features[ahuzatHof].attributes.status_chenyon == "מעט")
                    {

                        allParks[carPark].vacancy = true
                        console.log("car park : " + JSON.stringify(allParks[carPark]))
                    }
                }
            }
        }

        //now get the distances and travel times between our current location and each one of the car parks
        navigator.geolocation.getCurrentPosition(
      (position) => {
        //save initial position ( we only want to calculate park radius according to it)
        if (_this.state.initialPosition.latitude == 0 && _this.state.initialPosition.longitude == 0)
        {
            _this.setState({
                 initialPosition :
                 {
                     latitude : position.coords.latitude,
                     longitude : position.coords.longitude
                 }
             })
        }
        //query the google maps api
        var destString = ""
        var availableCarParks = allParks.filter( (a) => a.vacancy == true )
        console.log("availableCarParks : " + availableCarParks)
        for (var i in availableCarParks)
        {
            destString += availableCarParks[i].address + "|"
        }

//         Basel St 18-22
// Tel Aviv-Yafo
// 32.090084, 34.777745
        console.log("dest string : " + destString)
        var url = "http://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=" + position.coords.latitude +
            "," + position.coords.longitude + "&destinations=" + destString
        console.log("maps API url : " + url)
        fetch(url) //gets all public car parks (free or not)
        .then((response) => response.json())
        .then((data) => {
            console.log("google's response : " + JSON.stringify(data))
            //iterate over google's response and add distance to our carPark array
            for (i in data.rows[0].elements)
            {
                console.log(JSON.stringify(data.rows[0].elements[i]))
                if (data.rows[0].elements[i].status != "NOT_FOUND")
                {
                    availableCarParks[i].currentDuration = data.rows[0].elements[i].duration.value / 60
                }

            }
            //filter free parking if duration longer than showFreeIfUnderDuration
            availableCarParks = availableCarParks.filter((a) =>
                   (a.currentDuration <= showFreeIfUnderDuration &&
                       a.pricePerHour == 0)
                       || (a.pricePerHour != 0)
            )
            //now sort our array according to duration in 5 minute intervals then secondary sort according to pricePerHour
            availableCarParks.sort((a,b) => {
                return a.currentDuration - b.currentDuration
            })
            availableCarParks.sort((a,b) => {
                if ((a.currentDuration - b.currentDuration <= 5)
                    || (a.currentDuration - b.currentDuration > 5 && a.currentDuration - b.currentDuration <= 10)
                    || (a.currentDuration - b.currentDuration > 10 && a.currentDuration - b.currentDuration <= 15)
                    || (a.currentDuration - b.currentDuration > 15 && a.currentDuration - b.currentDuration <= 20))
                    {
                        return a.pricePerHour - b.pricePerHour
                    }
            })
            _this.setState({
              dataSource: this.state.dataSource.cloneWithRows(availableCarParks)
            })
        }).done()

      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );

      })
      .done()
}).done()
}

_rowPressed(address) {
    Linking.openURL("waze://?q=" + address).catch(err => console.error('An error occurred', err));
}

_onPressButtonGetAvailable = () => { this._getCarParks() }

renderPark(park) {
    return (
        <TouchableHighlight onPress={() => this._rowPressed(park.address)}
       underlayColor='#dddddd'>
      <View style={styles.cellView}>
          <Text style={styles.distanceText}>{park.currentDuration.toFixed(0)}</Text>
          <View style = {styles.infoView}>
          <Text style={styles.infoText}>{park.name}</Text>
          <Text style={styles.infoText}>{park.address}</Text>
          </View>
      </View>
      </TouchableHighlight>
    );
  }


  render() {
    return (
        <View style={styles.mainView}>
      <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderPark}
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    flexDirection : 'column',
    paddingTop:30,
    backgroundColor: '#F5FCFF',
},
  cellView: {
      backgroundColor: '#BAF2F5',
      flexDirection : 'row',
      paddingLeft:30,
      paddingBottom : 20,
      paddingTop : 20,
      paddingRight : 30,
      justifyContent :  'flex-start',
      borderRadius: 20,
      marginBottom : 5,
      marginTop : 5
  },
  distanceText : {
      fontFamily : 'arial',
      fontSize : 40,
      marginRight:30
  },
  infoText : {
      fontSize : 20
  },
  infoView: {
      flexDirection : 'column',
  }
});

AppRegistry.registerComponent('valet', () => valet);
