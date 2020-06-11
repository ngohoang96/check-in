import {Types} from './Constant';
import {SnackBar} from '../../utils/';
import {ROOT_API} from '../../values/AppValue';
import qs from 'query-string';
import FetchApi from '../../utils/FiFetch';
export function login = (params) => (dispatch) => {
    dispatch({type: types.LOGIN});
    return FetchApi.fetch(`${ROOT_API}users/sign-in`, {
      method: 'POST',
      body: JSON.stringify(params),
    }).then(([data, status]) => {
      if (status === 200) {
        dispatch({type: types.LOGIN_SUCCESS, userInfo: data});
      } else {
        dispatch({type: types.LOGIN_FAIL, data});
      }
    });
}
