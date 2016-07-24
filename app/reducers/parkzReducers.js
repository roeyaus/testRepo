import { combineReducers } from 'redux'
import { SET_CURRENT_USER } from './parkzActions'

const initialState = {
    user : {
        firstName : "",
        lastName : "",
        picture : undefined,
        email : "",
        phone : "",
        paymentMethod : undefined,
        openOrder : undefined,
        orders : []
    }
}

function user(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
          return {
              ...state,
            user: action.user
          }
    default:
      return state
  }
}

const parkzReducer = combineReducers({
  user
})

export default parkzReducer
