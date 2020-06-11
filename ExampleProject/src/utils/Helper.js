import Logg from './Logg';
import {Dimensions, Platform, Linking} from 'react-native';
import moment from 'moment';
import {AppNavigation} from '../app-navigation';
const createReducer = (initialState: Object, handlers: Object) => (
  state: Object = initialState,
  action: Object,
) => {
  if (handlers.hasOwnProperty(action.type)) {
    // Logg.info(`handling action with \n\ttype = ${action.type} \n\tpayload = ${action.payload}`);
    return handlers[action.type]({state, action});
  } else {
    return state;
  }
};

export {createReducer};
export const LocaleString = () => {};
