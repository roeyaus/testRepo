import {setValetData} from '../reducers/parkzActions.js'
var _store = null
var _userLocation = {
    latitude : 0,
    longitude : 0
}
export function registerForValetLocationUpdates(store) {
    _store = store
    firebase.database().ref('/valets/').on('value', onValetValueChange);
}

export function updateUserLocation(location) {
    _userLocation = location
}

const onValetValueChange = (value) => {
    let valet = value.val()[Object.keys(value.val())[0]]

    console.log("value.val " ,value.val())
    console.log(_userLocation)
    let destLat = _store.order && _store.order.pickupLocation ? _store.order.pickupLocation.latitude : _userLocation.latitude
    let destLong = _store.order && _store.order.pickupLocation ? _store.order.pickupLocation.longitude : _userLocation.longitude
     var url = "http://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=" + destLat +
            "," + destLong + "&mode=walking" + "&destinations=" + valet.location.latitude + "," + valet.location.longitude
        console.log(url)
        fetch(url, {method : "post"}) //gets all public car parks (free or not)
        .then((response) => response.json())
        .then((data) => {
            console.log("google's response : ", data)
            //iterate over google's response and add distance to our carPark array
                console.log(JSON.stringify(data.rows[0].elements[0]))
                if (data.rows[0].elements[0].status == "OK")
                {
                    valet.etaInMinutes = Math.ceil(data.rows[0].elements[0].duration.value / (60 * valet["isWalking"] ? 1 : 2))
                }
                _store.dispatch(setValetData(value.val()))
        }).catch(function(error)
        {
            console.log(error)
        })
    
}

export function unregisterForValetLocationUpdates() {
    firebase.database().ref('/valets/').off('value', onValetValueChange);
}