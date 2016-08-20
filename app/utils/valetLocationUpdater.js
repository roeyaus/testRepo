import {setValetData} from '../reducers/parkzActions.js'
var _store = null
export function registerForValetLocationUpdates(store) {
    _store = store
    firebase.database().ref('/valets/').on('value', onValetValueChange);
}

const onValetValueChange = (value) => {
    console.log(value.val())
    _store.dispatch(setValetData(value.val()))
}

export function unregisterForValetLocationUpdates() {
    firebase.database().ref('/valets/').off('value', onValetValueChange);
}