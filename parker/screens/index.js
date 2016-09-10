import {Navigation} from 'react-native-navigation';

import FirstUseScreen from './FirstUseScreen';
//import InitialScreen from './InitialScreen';
import MainScreen from './MainScreen';
import LoginScreen from './LoginScreen'
import SignupScreen from './SignupScreen'
import MapScreen from './MapScreen'
import SideMenu from './SideMenu'
// register all screens of the app (including internal ones)
export function registerScreens(store, Provider) {
  Navigation.registerComponent('Parker.ConfirmAssignmentScreen', () => ConfirmAssignmentScreen, store, Provider);
  //Navigation.registerComponent('Parkz.InitialScreen', () => InitialScreen, store, Provider);
  Navigation.registerComponent('Parker.LoginScreen', () => LoginScreen, store, Provider);
}
