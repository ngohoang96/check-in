import React, {Component} from 'react';
import {AppState} from 'react-native';
import R from 'ramda';
import hoistNonReactStatic from 'hoist-non-react-statics';
import {DefaultStyle} from './NavigatorStyle';
import TransitionState from './TransitionState';
import {createCustomPush, createPopFunc} from './customMethodCreators';
import DeviceInfo from 'react-native-device-info';
import {store} from '../redux/store';
import {checkForUpdate} from '../stores/home/actions';
import {showDialogUpdate, checkVersion} from '../utils/Helper';
const navigationDebounceDuration = 400;

// Helper functions to extract data
const getNavigatorStyle = R.pathOr(DefaultStyle, ['navigatorStyle']);

const screenHOC = (WrappedComponent) => {
  // Get component style or use a default if it doesn't have one
  const navigatorStyle = getNavigatorStyle(WrappedComponent);

  class Wrapper extends Component {
    static navigatorStyle = navigatorStyle;

    constructor(props) {
      super(props);
      this.navigator = {};
      this.appState = AppState.currentState;
      this.stopEvent = null;
    }

    componentDidMount() {
      setTimeout(TransitionState.stop, navigationDebounceDuration);
      AppState.addEventListener('change', this._handleAppStateChange);
    }

    componentWillUnmount() {
      AppState.removeEventListener('change', this._handleAppStateChange);
      this.stopEvent && this.stopEvent.remove();
    }

    _handleAppStateChange = async (nextAppState) => {
      const {componentId} = this.props;
      if (
        this.appState.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        if (componentId === 'Component8') {
          await store.dispatch(checkForUpdate());
        }
      }
      this.appState = nextAppState;
    };

    render() {
      const {componentId} = this.props;

      this.navigator._push = createCustomPush(componentId);
      this.navigator._pop = createPopFunc(componentId);
      return (
        <WrappedComponent
          {...this.props}
          navigator={this.navigator}
          navigatorKey={this.navigatorKey}
        />
      );
    }
  }

  // Copies non-react specific statics from a target component to the HOC component
  hoistNonReactStatic(Wrapper, WrappedComponent);
  return Wrapper;
};

export default screenHOC;
