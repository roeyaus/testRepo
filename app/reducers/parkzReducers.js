import { combineReducers } from 'redux'
import { SET_CURRENT_USER } from './parkzActions'
import Immutable from 'seamless-immutable';
import { REHYDRATE } from 'redux-persist/constants';

const initialState = {
    user : {
        loggedIn : false,
        firstName : "",
        lastName : "",
        picture : "",
        email : "",
        phone : "",
        paymentMethod : undefined,
        openOrder : undefined,
        orders : []
    }
}

function userReducer(state = initialState, action) {
  console.log("user reducer. state : " + JSON.stringify(state) + ",action : " + JSON.stringify(action))
  switch (action.type) {
    case SET_CURRENT_USER:
          return Object.assign({}, state, { user : action.user})
    default:
      return state
  }
}

const parkzReducer = combineReducers({
  userReducer
})

export default parkzReducer
