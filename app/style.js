'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

const overlayDimensions = {
    minimizedViewHeight : 100,
    maximizedViewHeight : 400
}

module.exports = StyleSheet.create({



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
    left : 0
},

nonExpandableOverlayViewStyle : {
	flex : 1,
    flexDirection : 'column' , 
    backgroundColor:'rgba(255,255,255,0.8)', 
    alignItems : 'center',
    justifyContent : 'space-around',
    height : overlayDimensions.minimizedViewHeight
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
