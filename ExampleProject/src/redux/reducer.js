import {combineReducers} from 'redux';
import {homeReducer} from '../stores/home';
import {historyReducer} from '../stores/history';
import {loginReducer} from '../stores/login';
import {introductionReducer} from '../stores/intrucduction';
import {profileReducer} from '../stores/profile';
export default combineReducers({
  login: loginReducer,
  home: homeReducer,
  history: historyReducer,
  introduction: introductionReducer,
  profile: profileReducer,
});
