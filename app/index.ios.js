import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import thunk from 'redux-thunk';
import parkzReducer from './reducers/parkzReducers'
// redux related book keeping
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(parkzReducer);

// screen related book keeping
import { registerScreens } from './screens';
registerScreens(store, Provider);


//react native navigation with redux requires this
export default class Application  {
  constructor(props)
  {
      Navigation.startSingleScreenApp({
        screen: {
          screen: 'Parkz.InitialScreen',
          title: 'Initial',
          navigatorStyle: {}
        },
        passProps: {
        }
      });
  }
}

const App = new Application()
