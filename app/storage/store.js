import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { persistStore, autoRehydrate } from 'redux-persist'
import { compose } from 'redux'
import thunk from 'redux-thunk';

var { AsyncStorage } = require('react-native')

export function createParkzStore(combineReducers) {
	const store = createStore(combineReducers, {}, compose(
  applyMiddleware(thunk),
  autoRehydrate()
))
	return store
}

//calls the callback the result of the hydrated store
export function loadStore(store, callBack) {
persistStore(store, { storage: AsyncStorage }, callBack)

}
