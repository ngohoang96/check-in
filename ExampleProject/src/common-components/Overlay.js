import React from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {Colors} from '../theme';
import {AppNavigation} from '../app-navigation';
import MainText from './MainText';
import {Logg} from '../utils';
import moment from 'moment';

export default class OverlayComponent extends React.Component {
  _renderContent() {
    const {
      title,
      desc,
      submitText,
      cancelText,
      renderContent,
      componentId,
      dialog,
      isShowTime,
      error,
    } = this.props;
    if (renderContent) {
      return renderContent(componentId);
    }
    if (dialog) {
      return (
        <View>
          <View style={[styles.contentContainer, {paddingTop: 5}]}>
            <View
              style={{
                borderBottomColor: Colors.colorOpacity(3),
                borderBottomWidth: 0.5,
                alignSelf: 'stretch',
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 5,
              }}>
              <MainText
                style={[
                  styles.title,
                  {marginTop: 0, color: error ? 'red' : '#545455'},
                ]}>
                {title}
              </MainText>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <MainText
                style={[styles.desc, {color: error ? 'red' : '#545455'}]}>
                {desc}
              </MainText>
              {!!isShowTime && (
                <MainText style={styles.time}>
                  {moment(Date.now()).format('HH:mm')}
                </MainText>
              )}
            </View>
            <View style={styles.bottomView}>
              {!!cancelText && (
                <TouchableOpacity style={[styles.btn]} onPress={this._onCancel}>
                  <MainText style={styles.btnCancelText}>{cancelText}</MainText>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      );
    }
    return (
      <View>
        <View style={styles.contentContainer}>
          <MainText style={styles.title}>{title}</MainText>
          <MainText style={styles.desc}>{desc}</MainText>
          <View style={styles.bottomView}>
            <TouchableOpacity
              style={[
                styles.btn,
                styles.activeButton,
                {
                  borderRightWidth: 0.5,
                  borderColor: Colors.colorOpacity(2),
                  borderBottomLeftRadius: 5,
                },
              ]}
              onPress={this._onSubmit}>
              <MainText style={styles.btnSubmitText}>
                {submitText || 'Ok'}
              </MainText>
            </TouchableOpacity>
            {!!cancelText && (
              <TouchableOpacity style={[styles.btn]} onPress={this._onCancel}>
                <MainText style={styles.btnCancelText}>{cancelText}</MainText>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => this._close()}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
        {this._renderContent()}
      </View>
    );
  }

  _close = () => {
    const {tapToDismiss} = this.props;
    if (tapToDismiss) {
      AppNavigation.dismissOverlay(this.props.componentId);
    }
  };

  _onSubmit = () => {
    AppNavigation.dismissOverlay(this.props.componentId);
    const {onSubmit} = this.props;
    if (onSubmit) {
      onSubmit();
    }
  };

  _onCancel = () => {
    AppNavigation.dismissOverlay(this.props.componentId);
    const {onCancel} = this.props;
    if (onCancel) {
      onCancel();
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.colorOpacity(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    backgroundColor: '#fff',
    width: '80%',
    paddingTop: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  desc: {
    marginTop: 10,
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  bottomView: {
    flexDirection: 'row',
    marginTop: 10,
    borderTopWidth: 1,
    borderColor: Colors.colorOpacity(1),
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  activeButton: {
    backgroundColor: Colors.backgroundL1,
  },
  btnSubmitText: {
    color: Colors.selectedColor,
    fontWeight: 'bold',
    fontSize: 20,
  },
  btnCancelText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: Colors.mainColor,
  },
  time: {
    fontSize: 14,
    color: Colors.mainColor,
    marginTop: 10,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.colorOpacity(4),
  },
});
