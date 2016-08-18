/*
 * action types
 */

export const SET_CURRENT_USER = 'SET_CURRENT_USER'
export const SET_ORDER = 'SET_ORDER'
/*
 * action creators
 */

export function setCurrentUser(user) {
  return { type: SET_CURRENT_USER, user }
}

export function setCurrentOrder(order) {
  return { type : SET_ORDER, order }
}

//this opens a new order in firebase, then continues to the reducer to update the state
export function setOpenOrder(order) {
return function(dispatch, getState){
  var newPostKey = firebase.database().ref().child('orders').push().key;
  console.log(newPostKey, ", order : ", order)
  var updates = {};
  updates['/orders/' + newPostKey] = order;
  updates['/user-orders/' + firebase.auth().currentUser.uid + '/' + newPostKey] = order;
  updates['/open-orders/' + newPostKey] = order
  return new Promise(function(res,rej) {
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


