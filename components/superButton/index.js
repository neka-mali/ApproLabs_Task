import React, { Component } from "react";
import {
  View,
  Animated,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import styles from "./styles";
import SubButton from "../subButton";
import PropTypes from "prop-types";


const img = require("./cricketBall.jpg")
const alignMap = {
  center: {
    alignItems: "center",
    justifyContent: "flex-end",
    startDegree: 180,
    endDegree: 360
  },

  left: {
    alignItems: "flex-start",
    justifyContent: "flex-end",
    startDegree: 20,
    endDegree: 30
  },

  right: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    startDegree: 20,
    endDegree: 30
  }
};

export default class SuperButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: props.active,
      anim: new Animated.Value(props.active ? 1 : 0)
    };

    this.timeout = null;
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  getSuperButtonStyle() {
    return [styles.actionBarItem, this.getButtonSize()];
  }

  getActionContainerStyle() {
    const { alignItems, justifyContent } = alignMap[this.props.position];
    return [
      styles.overlay,
      styles.actionContainer,
      {
        alignItems,
        justifyContent
      }
    ];
  }
  getActionsStyle() {
    return [this.getButtonSize()];
  }

  getButtonSize() {
    return {
      width: 500,
      //height: this.props.size,
      height:500
    };
  }

  animateButton() {
    if (this.state.active) {
      this.reset();
      return;
    }

    Animated.spring(this.state.anim, {
      toValue: 1,
      duration: 250
    }).start();

    this.setState({ active: true });
  }

  reset() {
    Animated.spring(this.state.anim, {
      toValue: 0,
      duration: 250
    }).start();

    setTimeout(() => {
      this.setState({ active: false });
    }, 250);
  }

  renderButton() {
    return (
      <View style={this.getSuperButtonStyle()}>
        <TouchableOpacity
          activeOpacity={0.85}
          onLongPress={this.props.onLongPress}
          onPress={() => {
            this.props.onPress();
            if (this.props.children) {
              this.animateButton();
            }
          }}
        >
          <Animated.View
            style={[
              styles.btn,
              {
                //width and height of the mainRedButton
                width: 60,
                height: 60,
                borderRadius: 100,
                backgroundColor: this.state.anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [this.props.buttonColor, this.props.btnOutRange]
                }),
                transform: [
                  {
                    scale: this.state.anim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, this.props.outRangeScale]
                    })
                  },
                  {
                    rotate: this.state.anim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["0deg", this.props.degrees + "deg"]
                    })
                  }
                ]
              }
            ]}
          >
            {this.renderButtonIcon()}
          </Animated.View>
        </TouchableOpacity>
      </View>
    );
  }

  renderButtonIcon() {
    if (this.props.icon) {
      return this.props.icon;
    }

    return (
      <Animated.Text
        style={[
          styles.btnText,
          {
            color: this.state.anim.interpolate({
              inputRange: [0, 1],
              outputRange: [
                this.props.buttonTextColor,
                this.props.btnOutRangeTxt
              ]
            })
          }
        ]}
      >
       O
      </Animated.Text>
    );
  }

  renderActions() {
    if (!this.state.active) return null;
    const startDegree =
      this.props.startDegree || alignMap[this.props.position].startDegree;
    const endDegree =
      this.props.endDegree || alignMap[this.props.position].endDegree;
    const startRadian = startDegree * Math.PI / 180;
    const endRadian = endDegree * Math.PI / 180;

    const childrenCount = React.Children.count(this.props.children);
    let offset = 0;
    if (childrenCount !== 1) {
      offset = (endRadian - startRadian) / (childrenCount - 1);
    }

    return React.Children.map(this.props.children, (button, index) => {
      return (
        <View pointerEvents="box-none" style={this.getActionContainerStyle()}>
          <SubButton
            key={index}
            position={this.props.position}
            anim={this.state.anim}
            size={80} //size of subButton icon
            radius={120} //size of the radius
            angle={startRadian + index * offset}
            btnColor={this.props.btnOutRange}
            {...button.props}
            onPress={() => {
              if (this.props.autoInactive) {
                this.timeout = setTimeout(() => {
                  this.reset();
                }, 200);
              }
              button.props.onPress();
            }}
          />
        </View>
      );
    });
  }

  render() {
    let backdrop;
    if (this.state.active) {
      backdrop = (
        <TouchableWithoutFeedback
          style={styles.overlay}
          onPress={() => {
            this.reset();
            this.props.onOverlayPress();
          }}
        >
          <Animated.View
            style={{
              backgroundColor: this.props.bgColor,
              opacity: this.state.anim,
              flex: 1
            }}
          >
            {this.props.backdrop}
          </Animated.View>
        </TouchableWithoutFeedback>
      );
    }
    return (
      <View pointerEvents="box-none" style={styles.overlay}>
        {backdrop}

        {this.props.children && this.renderActions()}
        <View pointerEvents="box-none" style={this.getActionContainerStyle()}>
          {this.renderButton()}
        </View>
      </View>
    );
  }
}

SuperButton.Item = SubButton;

SuperButton.propTypes = {
  active: PropTypes.bool,
  bgColor: PropTypes.string,
  buttonColor: PropTypes.string,
  buttonTextColor: PropTypes.string,
  size: PropTypes.number,
  itemSize: PropTypes.number,
  autoInactive: PropTypes.bool,
  onPress: PropTypes.func,
  onOverlayPress: PropTypes.func,
  backdrop: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  startDegree: PropTypes.number,
  endDegree: PropTypes.number,
  radius: PropTypes.number,
  children: PropTypes.node,
  position: PropTypes.oneOf(["left", "center", "right"])
};

SuperButton.defaultProps = {
  active: false,
  bgColor: "transparent",
  buttonColor: "rgba(255,0,0,0.8)",
  buttonTextColor: "rgba(255,255,255,1)",
  position: "center",
  outRangeScale: 1,
  autoInactive: true,
  onPress: () => {},
  onOverlayPress: () => {},
  backdrop: false,
  degrees: 135,
  size: 63,
  itemSize: 50,
  radius: 100,
  btnOutRange: "rgba(225,0,0,1)",
  btnOutRangeTxt: "rgba(255,255,255,1)"
};
