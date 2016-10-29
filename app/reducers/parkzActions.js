import firebase from 'firebase'
import { orderStatusEnum } from '../utils/enums.js'
/*
 * action types
 */

export const SET_CURRENT_USER = 'SET_CURRENT_USER'
export const SET_ORDER = 'SET_ORDER'
export const SET_VALET_DATA = 'SET_VALET_DATA'
export const CANCEL_ORDER = 'CANCEL_ORDER'
export const SET_USER_LOCATION = 'SET_USER_LOCATION'
export const SET_USER_DEST = 'SET_USER_DEST'
/*
 * action creators
 */

export function setCurrentUser(user) {
  return { type: SET_CURRENT_USER, user }
}

export function setCurrentOrder(order) {
  return { type: SET_ORDER, order }
}

export function setValetData(valetData) {
  return { type: SET_VALET_DATA, valetData }
}

export function setUserLoc(location) {
  return { type: SET_USER_LOCATION, location }
}

export function setUserDest(destination) {
  return { type: SET_USER_DEST, destination }
}


/* 
* Thunks
*/

export function setUserDestAndETA(user, destination) {
  return function(dispatch, getState) {
    return new Promise(function (res, rej) {
      //we get the user's current location and calculate eta to the received destination
        var url = "http://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=" + user.location.lat +
            "," + user.location.long + "&destinations=" + destination.destString
        console.log("maps API url : " + url)
        fetch(url) //gets all public car parks (free or not)
        .then((response) => response.json())
        .then((data) => {
            console.log("google's response : " + JSON.stringify(data))
            //iterate over google's response and get the ETA
            for (i in data.rows[0].elements)
            {
                console.log(JSON.stringify(data.rows[0].elements[i]))
                if (data.rows[0].elements[i].status == "OK")
                {
                    destination.etaToDestInMinutes = data.rows[0].elements[i].duration.value / 60
                }

            }
           dispatch(setUserDest(destination))
           res()
        }).catch((error) => {
           console.log("An error occured trying to get ETA! ", error)
           rej()
        })
    })
  }
}


export function setUserLocation(location) {
  return function (dispatch, getState) {
    return new Promise(function (res, rej) {
      var update = {}
      if (firebase.auth().currentUser)
      {
        update['users/' + firebase.auth().currentUser.uid + '/location'] = location
        firebase.database().ref().update(update).then(() => {
          //DB update was OK, now update our global state
          console.log("updated firebase with user location")
          dispatch(setUserLoc({lat : location.latitude, long : location.longitude}))
          res()
        }).catch(error => {
          console.log("faild to update location : ", error)
          rej()
        })
      }
 
    })
  }
}

export function startListenToValetFBEvents() {
  return function (dispatch, getState) {
    firebase.database().ref('/valets/').on('value', (data) => {
      dispatch(setValetData(data.val()))
    });
  }
}

export function startListenToOrderFBEvents() {
  return function (dispatch, getState) {
    try
    {
         firebase.database().ref('/orders/' + getState().order.orderID).on('value', (data) => {
      dispatch(setCurrentOrder(data.val()))
    });
    }
    catch(error)
    {
      console.log(error)
    }
 
  }
}

export function setCancelOrder(order) {
    return function (dispatch, getState) {
      var updates = {}
      updates['/orders/' + order.orderID + '/orderStatus'] = orderStatusEnum.cancelled;
      updates['/open-orders-by-user/' + firebase.auth().currentUser.uid + '/' + order.orderID] = null
      updates['/open-orders-by-valet/']
      order.orderStatus = orderStatusEnum.none //return state to no order
      return new Promise(function (res, rej) {
      firebase.database().ref().update(updates).then(() => {
        //DB update was OK, now update our global state
        console.log("updated firebase with cancelled order")
        dispatch(setCurrentOrder(order))
        res()
      }).catch(error => {
        console.log("faild to cancel order! DB error : ", error)
        rej()
      })
    })
    }
}

//this opens a new order in firebase, then continues to the reducer to update the state
//we will need to move this logic to a lambda function that decides if an order can be created
export function setOpenOrder(order) {
  return function (dispatch, getState) {
    var newOrderKey = firebase.database().ref().child('orders').push().key;
    console.log(newOrderKey, ", order : ", order)
    var updates = {};
    updates['/orders/' + newOrderKey] = order;
    updates['/user-orders/' + firebase.auth().currentUser.uid + '/' + newOrderKey] = true
    order.orderID = newOrderKey
    order.orderStatus = orderStatusEnum.open
    return new Promise(function (res, rej) {
      firebase.database().ref().update(updates).then(() => {
        //DB update was OK, now update our global state
        console.log("updated firebase with new order")
        
        dispatch(setCurrentOrder(order))
        res()
      }).catch(error => {
        console.log("faild to place order! DB error : ", error)
        rej()
      })
    })
  }
}


