'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

const overlayDimensions = {
    minimizedViewHeight : 140,
    maximizedViewHeight : 400
}

const parkzColor = 'rgba(245, 135, 32, 1.0)'
const parkzIcon = require('./assets/images/carkeys.png')
const navBarStyle = {
    navBarBackgroundColor : 'rgba(245, 135, 32, 1.0)', 
    navBarTextColor : 'white'
}
const overlayStyles = StyleSheet.create({

overlayExpandedViewStyle : {
  flex : 1,
    flexDirection : 'column' ,
    justifyContent : 'space-around',  
    backgroundColor:'rgba(255,255,255,0.8)', 
    position : 'absolute',
    height : overlayDimensions.maximizedViewHeight,
    bottom : 0,
    right : 0,
    left : 0
},

overlayMinimizedViewStyle : {
    position : 'absolute',
    justifyContent : 'space-around',
    height : overlayDimensions.minimizedViewHeight,
    bottom : 0,
    right : 0,
    left : 0,
    marginTop : 10,
    marginBottom : 10
},

nonExpandableOverlayViewStyle : {
	flex : 1,
    flexDirection : 'column' , 
    backgroundColor:'rgba(255,255,255,0.8)', 
    alignItems : 'center',
    justifyContent : 'space-around',
    height : overlayDimensions.minimizedViewHeight,
    marginTop : 10,
    marginBottom : 10
},

overlayViewStyle : {
	 flex : 1,
    flexDirection : 'column' ,
    justifyContent : 'space-around',  
    backgroundColor:'rgba(255,255,255,0.8)', 
    alignItems : 'center',
    height : overlayDimensions.maximizedViewHeight
}




});


export { parkzColor,
parkzIcon,
navBarStyle,
overlayStyles}
