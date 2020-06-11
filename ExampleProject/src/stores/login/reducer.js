import {Types} from './Constant';
const initState = {
  userData: null,
  loginStatus: null,
  permission: null,
};

export default function loginReducer(state = initState, action) {
  switch (action.type) {
    case Types.LOGIN: {
      return {
        ...state,
        loginStatus: null,
      };
    }
    case Types.LOGIN_SUCCESS: {
      return {
        ...state,
        userData: action.payload,
        loginStatus: Types.LOGIN_SUCCESS,
      };
    }
    case Types.LOGIN_FAIL: {
      return {
        ...state,
        loginStatus: Types.LOGIN_FAIL,
      };
    }
    case Types.UPDATE_PERMISSION: {
      return {
        ...state,
        permission: action.payload,
      };
    }
    default:
      return state;
  }
}
