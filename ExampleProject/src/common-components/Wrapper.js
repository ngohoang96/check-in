import React, {Component} from 'react';
import {ImageBackground, View} from 'react-native';
import {LoginIcon, HomeIcon} from '../assets';
import {Metrics} from '../theme';
import {AppNavigation} from '../app-navigation';
import CustomTopbar from './CustomTopbar';
export default class Wrapper extends Component {
  logout = () => {
    AppNavigation.loginScreen();
  };
  render() {
    const {containerStyle} = this.props;
    return (
      <ImageBackground source={LoginIcon.background} style={{flex: 1}}>
        <CustomTopbar
          iconLeft={HomeIcon.headerleft}
          iconRight={HomeIcon.logout}
          title={'CHẤM CÔNG NHANH'}
          onPressRight={this.logout}
        />
        <View style={containerStyle}>{this.props.children}</View>
      </ImageBackground>
    );
  }
}
