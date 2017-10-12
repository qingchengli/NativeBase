Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _jsxFileName="src/basic/Tabs/SceneComponent.js";function _objectWithoutProperties(obj,keys){var target={};for(var i in obj){if(keys.indexOf(i)>=0)continue;if(!Object.prototype.hasOwnProperty.call(obj,i))continue;target[i]=obj[i];}return target;}var React=require("react");
var ReactNative=require("react-native");var
Component=React.Component;var
View=ReactNative.View,StyleSheet=ReactNative.StyleSheet;

var StaticContainer=require("./StaticContainer");

var SceneComponent=function SceneComponent(Props){var
shouldUpdated=Props.shouldUpdated,props=_objectWithoutProperties(Props,["shouldUpdated"]);
return(
React.createElement(View,_extends({},props,{__source:{fileName:_jsxFileName,lineNumber:11}}),
React.createElement(StaticContainer,{shouldUpdate:shouldUpdated,__source:{fileName:_jsxFileName,lineNumber:12}},
props.children)));



};exports.default=

SceneComponent;
//# sourceMappingURL=SceneComponent.js.map