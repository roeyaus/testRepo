import { combineReducers } from 'redux'
import { SET_CURRENT_USER } from './parkzActions'
import Immutable from 'seamless-immutable';
import { REHYDRATE } from 'redux-persist/constants';

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

const parkzReducer = combineReducers({
  user : userReducer
})

export default parkzReducer
