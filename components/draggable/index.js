import React, { Component } from "react";
import {PanResponder, Animated,Image, } from "react-native";

import SuperButton from "../superButton";



const leaderBoard = require("../draggable/leaderboard.png")
const hire = require("../draggable/hire.png")
const bookGround = require("../draggable/bookGround.png")
const tournament = require("../draggable/tournament.png")
const scoreBook = require("../draggable/scoreBook.png")

export default class Dragger extends Component {
  constructor() {
    super();
    this.state = {
      pan: new Animated.ValueXY()
    };
  }

  componentWillMount() {
    this._animatedValueX = 0;
    this._animatedValueY = 0;
    this.state.pan.x.addListener(value => (this._animatedValueX = value.value));
    this.state.pan.y.addListener(value => (this._animatedValueY = value.value));

    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: (e, gestureState) => {
        this.state.pan.setOffset({
          x: this._animatedValueX,
          y: this._animatedValueY
        });
        this.state.pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event([
        null,
        { dx: this.state.pan.x, dy: this.state.pan.y }
      ]),
      onPanResponderRelease: () => {
        this.state.pan._flattenOffset;
      }
    });
  }

  componentWillUnmount() {
    this.state.pan.x.removeAllListeners();
    this.state.pan.y.removeAllListeners();
  }

  _flattenOffset = () => {
    this._value += this._offset;
    this._offset = 0;
  };

  handleLeaderBoard=()=>{
    console.warn("Leader Board Screen Pressed")
  }
  handleHire=()=>{
    console.warn("Hire Professional Screen Pressed")
  }
  handleScoreBook=()=>{

    console.warn("Score Book Screen Pressed")
  }
  handleTournaments=()=>{
    console.warn("Tournament Screen Pressed")
  }
  handleBookGround=()=>{
    console.warn("Book Ground Screen Pressed")
  }
  render() {
    const panStyle = {
      transform: this.state.pan.getTranslateTransform()
    };
    return (
      <Animated.View
        {...this._panResponder.panHandlers}
        style={[
          panStyle,
          {
            transform: [
              { translateX: this.state.pan.x },
              { translateY: this.state.pan.y }
            ]
          },
          { flex: 1 }
        ]}
      >
        <SuperButton buttonColor="red">
          <SuperButton.Item buttonColor='white'
          onPress={this.leaderBoard}>
            <Image source={leaderBoard}
            resizeMode = "contain"
            />
               
            
          </SuperButton.Item>
          <SuperButton.Item buttonColor='white' 
          onPress={this.handleHire}>
          <Image source={hire}
            resizeMode = "stretch"
            />
           
          </SuperButton.Item>
          <SuperButton.Item buttonColor='white'
          onPress={this.handleBookGround}>
          <Image source={bookGround}
            resizeMode = "stretch"
            />
            
          </SuperButton.Item>
          <SuperButton.Item buttonColor='white'  
           onPress={this.handleScoreBook}>
        <Image source={scoreBook}
          resizeMode = "stretch"
          />
          </SuperButton.Item>
          <SuperButton.Item buttonColor='white' title="!!!!" 
         onPress={this.handleTournaments}>
         <Image source={tournament}
           resizeMode = "stretch"
           />
          </SuperButton.Item>
        </SuperButton>
      </Animated.View>
    );
  }
}
