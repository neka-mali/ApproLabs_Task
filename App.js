import React, { Component } from 'react';
import {View,ImageBackground,StyleSheet} from  "react-native";
import Draggable from './components/draggable';

const image = require("./assets/bg1.jpg")
export default class App extends Component {
  render() {
    return (
      <View style = {styles.container}>
      <ImageBackground source={image}
      resizeMode ="cover"
      style={styles.background}
    >
      <Draggable/>
      </ImageBackground>
      </View>
    );
  }
}




const styles = StyleSheet.create({
  container:{
   flex:1
  },
  background:{
    flex:1,
    justifyContent:"center"
  }
})
