import { Navigation } from 'react-native-navigation';

import { connect } from 'react-redux'
import { persistStore } from 'redux-persist'
import parkzReducer from './reducers/parkzReducers'
import {registerForValetLocationUpdates, unregisterForValetLocationUpdates} from './utils/valetLocationUpdater.js'
import * as firebase from 'firebase';
var { AsyncStorage } = require('react-native')
import {createParkzStore, loadStore} from './storage/store.js'
import { Provider } from 'react-redux';
// screen related book keeping
import { registerScreens } from './screens';


// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCaQ7yE4b8d9mmIjcdWHqw1mQsD_6lQtEA",
  authDomain: "parkz-1363.firebaseapp.com",
  databaseURL: "https://parkz-1363.firebaseio.com",
  storageBucket: "parkz-1363.appspot.com",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

//react native navigation with redux requires this
export default class Application {
  constructor(props) {
    //load the persisted store
    const store = createParkzStore(parkzReducer)
    registerScreens(store, Provider);
    persistStore(store, { storage: AsyncStorage }, null).purge(['order'])
    persistStore(store, { storage: AsyncStorage }, null).purge(['valetData'])
    loadStore(store, () => {

      const state = store.getState()
      console.log("state restored : ", state, ", loading initial screen")
      var screen = "Parkz.FirstUseScreen"
      var title = "Hi!"
      if (!state.user || !state.user.loggedIn) {
        Navigation.startSingleScreenApp({
          screen: {
            screen: screen,
            title: title,
            navigatorStyle: {}
          },
          passProps: {
          }
        });
      }
      else { //we have user data store, and we were logged in before

        //must sign in to firebase to continue
        try {
          firebase.auth().signInWithEmailAndPassword(state.user.email, state.user.password).then(() => {
            screen = 'Parkz.MainScreen'
            title = 'Parkz'
            Navigation.startSingleScreenApp({
              screen: {
                screen: screen,
                title: title,
                navigatorStyle: {}
              },
              passProps: {
              }
            });

          }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console("firebase auth ", errorCode, ", ", errorMessage, ", going to firstUse")
            Navigation.startSingleScreenApp({
              screen: {
                screen: screen,
                title: title,
                navigatorStyle: {}
              },
              passProps: {
              }
            });
            // ...
          })
        }
        catch (error){
          console.log(error)
          Navigation.startSingleScreenApp({
            screen: {
              screen: screen,
              title: title,
              navigatorStyle: {}
            },
            passProps: {
            }
          });
        }


      }
    })
    //navigate immediately to the initialScreen
  }
  render() {
    return (<Text>Loading...</Text>)
  }
}

const App = new Application()
