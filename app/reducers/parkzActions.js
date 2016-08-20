/*
 * action types
 */

export const SET_CURRENT_USER = 'SET_CURRENT_USER'
export const SET_ORDER = 'SET_ORDER'
export const SET_VALET_DATA = 'SET_VALET_DATA'
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

export function setUserLocation(location) {
  return function (dispatch, getState) {
    return new Promise(function (res, rej) {
      var update = {}
      update['users/' + firebase.auth().currentUser.uid + '/location'] = location
      firebase.database().ref().update(update).then(() => {
        //DB update was OK, now update our global state
        console.log("updated firebase with user location")
        res()
      }).catch(error => {
        console.log("faild to place order! DB error : ", error)
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
    updates['/open-orders-by-user/' + firebase.auth().currentUser.uid + '/' + newOrderKey] = true
    order.orderID = newOrderKey
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


