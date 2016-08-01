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
  Navigation.registerComponent('Parkz.FirstUseScreen', () => FirstUseScreen, store, Provider);
  //Navigation.registerComponent('Parkz.InitialScreen', () => InitialScreen, store, Provider);
  Navigation.registerComponent('Parkz.MainScreen', () => MapScreen, store, Provider);
  Navigation.registerComponent('Parkz.LoginScreen', () => LoginScreen, store, Provider);
  Navigation.registerComponent('Parkz.SignupScreen', () => SignupScreen, store, Provider);
  Navigation.registerComponent('Parkz.MapScreen', () => MapScreen, store, Provider);
  Navigation.registerComponent('Parkz.SideMenu', () => SideMenu, store, Provider);
}
