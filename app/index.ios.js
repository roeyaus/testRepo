import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import thunk from 'redux-thunk';
import { connect } from 'react-redux'
var { AsyncStorage } = require('react-native')
import { compose } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import parkzReducer from './reducers/parkzReducers'

const store = createStore(parkzReducer, {}, compose(
applyMiddleware(thunk),
  autoRehydrate()
))

import * as firebase from 'firebase';

// screen related book keeping
import { registerScreens } from './screens';
registerScreens(store, Provider);

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCaQ7yE4b8d9mmIjcdWHqw1mQsD_6lQtEA",
    authDomain: "parkz-1363.firebaseapp.com",
    databaseURL: "https://parkz-1363.firebaseio.com",
    storageBucket: "parkz-1363.appspot.com",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

//react native navigation with redux requires this
export default class Application  {
  constructor(props)
  {
    //load the persisted store
   // persistStore(store, {storage: AsyncStorage}, null).purgeAll()
    persistStore(store, {storage: AsyncStorage}, () => {

      const state = store.getState()
      console.log("state restored : " + state + ", loading initial screen")
       let screen = ""
       let title = ""
       if (state.user == null)
        {
          screen = 'Parkz.FirstUseScreen'
          title = 'Hi!'
        }
      else {
          screen = 'Parkz.MainScreen'
          title = 'Parkz'
      }
      
      Navigation.startSingleScreenApp({
        screen: {
          screen: screen,
          title: title,
          navigatorStyle: {}
        },
        passProps: { 
        }
       });
    })
    //navigate immediately to the initialScreen
  }
  render() {
    return (<Text>Loading...</Text>)
  }
}

const App = new Application()
