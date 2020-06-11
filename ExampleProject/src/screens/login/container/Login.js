import React, {Component} from 'react';
import {
  TouchableOpacity,
  View,
  ImageBackground,
  StyleSheet,
  Image,
  Alert,
  Clipboard,
  Platform,
  Linking,
} from 'react-native';
import {LoginIcon} from '../../../assets';
import {Metrics, Colors} from '../../../theme';
import MainText from '../../../common-components/MainText';
import InputLogin from '../component/InputLogin';
import LinearGradient from 'react-native-linear-gradient';
import {login} from '../../../stores/login/actions';
import {connect} from 'react-redux';
import {Types} from '../../../stores/login/Constant';
import {AppNavigation} from '../../../app-navigation';
import {getUniqueId} from 'react-native-device-info';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SnackBar, Logg} from '../../../utils';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import {subString} from '../../../utils/Helper';
import {getLanguages} from 'react-native-i18n';
const LOGO_WIDTH = Metrics.appWidth * 0.3;
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      password: '',
      uniqueId: '',
    };
  }

  dialogPermission = async () => {
    const {componentId} = this.props;
    getLanguages()
      .then((languages) => {
        if (!languages) return;
        if (languages?.includes('vi-VN') || languages?.includes('vi')) {
          return AppNavigation.showCommonDialog({
            componentId: componentId,
            title: 'Cấp quyền truy cập',
            desc: 'Cho phép thiết bị truy cập vị trí để xác định chấm công',
            submitText: 'Đồng ý',
            onSubmit: () => this.onSubmit(),
            cancelText: 'Đóng',
            interceptTouchOutside: false,
          });
        } else {
          return AppNavigation.showCommonDialog({
            componentId: componentId,
            title: 'Permission Request',
            desc:
              'Allow this app to access your location for check-in procedure',
            submitText: 'OK',
            onSubmit: () => this.onSubmit(),
            cancelText: 'CANCEL',
            interceptTouchOutside: false,
          });
        }
      })
      .catch((error) => Logg.error(error));
  };

  dismissOverlay = () => {
    return AppNavigation.dismissOverlay(this.props.componentId);
  };

  onSubmit = async () => {
    await AppNavigation.dismissOverlay(this.props.componentId);
    request(
      Platform.select({
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ios: PERMISSIONS.IOS.LOCATION_ALWAYS,
      }),
    )
      .then((res) => {
        if (res) {
        }
      })
      .catch((e) => Logg.error(e));
  };

  openSetting = () => {
    Linking.canOpenURL('app-settings:')
      .then((supported) => {
        if (!supported) {
          console.log("Can't handle settings url");
        } else {
          return Linking.openURL('app-settings:');
        }
      })
      .catch((err) => console.error('An error occurred', err));
  };

  async componentDidMount() {
    let uniqueId = await getUniqueId();
    if (uniqueId) {
      uniqueId = uniqueId.toUpperCase();
      if (Platform.OS === 'ios') {
        uniqueId = subString(uniqueId);
      }
      this.setState({uniqueId});
    }
    check(
      Platform.select({
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ios: PERMISSIONS.IOS.LOCATION_ALWAYS,
      }),
    )
      .then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            this.dialogPermission();
            break;
          case RESULTS.DENIED:
            this.dialogPermission();
            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            break;
          case RESULTS.BLOCKED:
            break;
        }
      })
      .catch((error) => {
        // …
      });
  }

  _copyId = () => {
    Clipboard.setString(this.state.uniqueId);
    SnackBar.showSuccess('Đã sao chép!');
  };

  onChangeId = (value) => {
    this.setState({
      id: value,
    });
  };

  onChangeName = (value) => {
    this.setState({
      name: value,
    });
  };

  onChangePassword = (value) => {
    this.setState({
      password: value,
    });
  };

  componentDidUpdate(prevProps) {
    const {loginStatus} = this.props;
    if (prevProps.loginStatus !== loginStatus) {
      if (loginStatus === Types.LOGIN_SUCCESS) {
        AppNavigation.goToMain();
      }
    }
  }

  _onLogin = () => {
    const {id, name, password, uniqueId} = this.state;
    const {login} = this.props;
    if (id && name && password) {
      let params = {
        id,
        name,
        password,
        uniqueId,
      };
      login(params);
    } else {
      Alert.alert(
        'Đăng nhập thất bại',
        'Vui lòng điền mã tài khoản, tên đăng nhập và mật khẩu',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    }
  };

  _renderLoginButton = () => {
    return (
      <TouchableOpacity
        style={{alignSelf: 'stretch', marginVertical: 5}}
        onPress={() => this._onLogin()}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={['#86CC95', '#699A86']}
          style={styles.gradient}>
          <MainText style={{fontSize: 17, fontWeight: '400'}}>
            Đăng nhập
          </MainText>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  render() {
    const {id, name, password} = this.state;
    return (
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        resetScrollToCoords={{x: 0, y: 0}}
        keyboardShouldPersistTaps="handled"
        scrollEnabled={true}>
        <ImageBackground source={LoginIcon.background} style={styles.container}>
          <Image source={LoginIcon.logo} style={styles.img} />
          <MainText style={styles.txt_title}>CHẤM CÔNG NHANH</MainText>
          <InputLogin
            placeholder={'Mã tài khoản'}
            value={id}
            onChangeText={this.onChangeId}
          />
          <InputLogin
            placeholder={'Tên đăng nhập'}
            value={name}
            onChangeText={this.onChangeName}
          />
          <InputLogin
            placeholder={'Mật khẩu'}
            value={password}
            onChangeText={this.onChangePassword}
            secureTextEntry={true}
          />
          {this._renderLoginButton()}
          <View
            style={{alignItems: 'center', width: '100%', paddingVertical: 30}}>
            <MainText
              style={{marginVertical: 10, textAlign: 'center', fontSize: 13}}>
              Thông số máy
            </MainText>
            <MainText style={{textAlign: 'center', fontSize: 13}}>
              {this.state.uniqueId}
            </MainText>
            <TouchableOpacity
              onPress={() => this._copyId()}
              style={{
                backgroundColor: Colors.mainColor,
                paddingVertical: 6,
                width: '40%',
                alignItems: 'center',
                marginTop: 20,
                borderRadius: 30,
              }}>
              <MainText style={{color: '#fff'}}>Sao chép</MainText>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </KeyboardAwareScrollView>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    loginStatus: state.login.loginStatus,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    login: (params) => dispatch(login(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
const styles = StyleSheet.create({
  container: {
    width: Metrics.appWidth,
    height: Metrics.appHeight,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 60,
  },
  img: {
    width: LOGO_WIDTH,
    height: LOGO_WIDTH,
  },
  gradient: {
    width: '100%',
    paddingVertical: 10,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt_title: {
    fontWeight: 'bold',
    color: '#5C5D5E',
    fontSize: 18,
    marginTop: 12,
    marginBottom: 15,
    fontFamily: 'Montserrat-Black',
  },
});
