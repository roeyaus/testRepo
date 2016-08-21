import {setValetData} from '../reducers/parkzActions.js'


//return a promise to get the ETA
//transport mode is a string ("walking", "driving", etc.)
export function asyncGetETA(originLocation, destLocation, transportMode = "walking") {
    return new Promise(function (res, rej) {
        let eta = 0
        const url = "http://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=" + originLocation.latitude +
            "," + originLocation.longitude + "&mode=" + transportMode + "&destinations=" + destLocation.latitude + "," + destLocation.longitude
        console.log(url)
        fetch(url, { method: "get" })
            .then((response) => response.json())
            .then((data) => {
                console.log("google's response : ", data)
                if (data.rows[0].elements[0].status == "OK") {
                    eta = Math.ceil(data.rows[0].elements[0].duration.value / 60)
                }
                res(eta)
                
            }).catch(function (error) {
                console.log(error)
                rej(error)
            })
    })
    //let destLat = _store.order && _store.order.pickupLocation ? _store.order.pickupLocation.latitude : _userLocation.latitude
    // let destLong = _store.order && _store.order.pickupLocation ? _store.order.pickupLocation.longitude : _userLocation.longitude


}


