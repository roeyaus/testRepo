import {Navigation} from 'react-native-navigation';

import FirstUseScreen from './FirstUseScreen';
import InitialScreen from './InitialScreen';
import MainScreen from './MainScreen';

// register all screens of the app (including internal ones)
export function registerScreens(store, Provider) {
  Navigation.registerComponent('Parkz.FirstUseScreen', () => FirstUseScreen, store, Provider);
  Navigation.registerComponent('Parkz.InitialScreen', () => InitialScreen, store, Provider);
  Navigation.registerComponent('Parkz.MainScreen', () => MapScreen, store, Provider);

}
