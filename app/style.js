'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

module.exports = StyleSheet.create({

overlayExpandedViewStyle : {
  flex : 1,
    flexDirection : 'column' ,
    justifyContent : 'space-around',  
    backgroundColor:'rgba(255,255,255,0.8)', 
    position : 'absolute',
    bottom : 0,
    right : 0,
    left : 0
},

overlayMinimizedViewStyle : {
  flex : 1,
    flexDirection : 'column' ,
    justifyContent : 'space-around',  
    backgroundColor:'rgba(255,255,255,0.8)', 
    position : 'absolute',
    bottom : -350,
    right : 0,
    left : 0
},

nonExpandableOverlayViewStyle : {
	flex : 1,
    flexDirection : 'column' ,
    justifyContent : 'space-around',  
    backgroundColor:'rgba(255,255,255,0.8)', 
    alignItems : 'center',
    height : 50
},

overlayViewStyle : {
	 flex : 1,
    flexDirection : 'column' ,
    justifyContent : 'space-around',  
    backgroundColor:'rgba(255,255,255,0.8)', 
    alignItems : 'center',
    height : 400
}



});
