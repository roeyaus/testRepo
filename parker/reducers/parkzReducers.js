import { combineReducers } from 'redux'
import { SET_CURRENT_USER, SET_ORDER, SET_VALET_DATA, CANCEL_ORDER } from './parkzActions'
import Immutable from 'seamless-immutable';
import { REHYDRATE } from 'redux-persist/constants';
import { orderStatusEnum } from '../utils/enums.js'
const initialUser = {
        loggedIn : false,
        firstName : "",
        lastName : "",
        picture : "",
        email : "",
        phone : "",
        password : "",
        paymentMethod : undefined,
        openOrderID : undefined,
        prevOrderIDs : []
}

function userReducer(user = initialUser, action) {
  
  switch (action.type) {
    case SET_CURRENT_USER:
          const newUser = Object.assign({}, user, action.user)
          newUser.loggedIn = true
          console.log("user logged in : ", newUser)
          return newUser
    default:
      return user
  }
}

const initialOrder = {
      orderID : "",
      serviceZoneID: 0,
      orderStatus : orderStatusEnum.none,
      userID: "",
      parkValetID: "valet01",
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
      pickupLocation: null,
      parkingLocation: null,
      handoffLocation: null,
      totalCost: 0,
      paidCost: 0,
      tip: 0,
      rating: 0,
      comments: "",
      valetETAInMinutes : 0
}

function orderReducer(order = initialOrder, action) {
  switch (action.type) {
    case SET_ORDER:
      const newOrder = Object.assign({}, order, action.order)
      console.log("setOrder : ", newOrder)
      return newOrder
    case CANCEL_ORDER:
      const cancelledOrder = Object.assign({}, order, action.order)
      console.log("order cancelled : ", cancelledOrder)
      return cancelledOrder
    default : 
    console.log("init order ",order)
    return order
  }
}

const initialValetData = {

} 

function valetDataReducer(valetData = initialValetData, action) {
    if (action.type == SET_VALET_DATA) {
      console.log("action.valetData : ", action.valetData, "valetData : ", valetData)
      const newValetData = Object.assign({}, valetData, action.valetData)
      console.log("valet data updated : ", newValetData)
      return newValetData
    }
    return valetData
}

const parkzReducer = combineReducers({
  user : userReducer,
  order : orderReducer,
  valetData : valetDataReducer
})

export default parkzReducer
