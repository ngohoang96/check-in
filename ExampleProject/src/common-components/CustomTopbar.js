import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Metrics} from '../theme';
import {ifIphoneX} from '../utils/Helper';
import MainText from './MainText';
import {HEADER_HEIGHT} from '../values/AppValue';
export default class CustomTopbar extends Component {
  _renderLeft = () => {
    const {iconLeft, leftText, iconLeftStyle} = this.props;
    if (iconLeft) {
      return (
        <TouchableOpacity style={[styles.btn, {paddingBottom: 3}]}>
          <Image source={iconLeft} style={[styles.icon, iconLeftStyle]} />
        </TouchableOpacity>
      );
    } else if (leftText) {
      return <MainText>{leftText}</MainText>;
    } else {
      return <View style={styles.btn} />;
    }
  };

  _renderTitle = () => {
    const {title, titleStyle} = this.props;
    if (title) {
      return (
        <MainText style={[styles.txt_title, titleStyle]}>{title}</MainText>
      );
    } else {
      return <View />;
    }
  };

  _renderRight = () => {
    const {iconRight, textRight, onPressRight} = this.props;
    if (iconRight) {
      return (
        <TouchableOpacity style={[styles.btn]} onPress={onPressRight}>
          <Image source={iconRight} style={styles.icon} />
        </TouchableOpacity>
      );
    } else if (textRight) {
      return <MainText>{textRight}</MainText>;
    } else {
      return <View style={styles.btn} />;
    }
  };

  render() {
    return (
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={['#3AA84E', '#126138']}
        style={styles.container}>
        {this._renderLeft()}
        {this._renderTitle()}
        {this._renderRight()}
      </LinearGradient>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: Metrics.appWidth,
    height: Platform.OS === 'ios' ? ifIphoneX(109, HEADER_HEIGHT) : 65,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 15,
    paddingBottom: 6,
  },
  icon: {
    width: 45,
    height: 45,
  },
  btn: {
    width: 45,
    alignItems: 'center',
    paddingTop: 15,
  },
  txt_title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
});
