import Logg from './Logg';
import {API_URL} from '../values/AppValue';

class FetchHelper {
  constructor() {
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
    this.isConnected = false;
    this.accessToken = null;
  }

  addDefaultHeader(key, value) {
    this.defaultHeaders[key] = value;
  }

  setToken(token) {
    this.accessToken = token;
    Logg.info('setToken', this.accessToken);
  }

  removeDefaultHeader(key) {
    delete this.defaultHeaders[key];
  }

  async fetch(input, init = {}) {
    let headers = init.headers;
    if (this.accessToken) {
      headers = {
        ...headers,
        Authorization: `bearer ${this.accessToken}`,
      };
    }
    let initWithDefaultHeaders = {
      ...init,
      headers: mergeWithDefaultHeaders(headers, this.defaultHeaders),
    };
    let response;
    try {
      response = await fetch.apply(null, [input, initWithDefaultHeaders]);
    } catch (e) {
      return [e, -1];
    }
    const responseStatus = response.status;
    let jsonData = null;
    try {
      jsonData = await response.json();
      return [jsonData, responseStatus];
    } catch (e) {
      console.warn(
        `Can not parse json from response of API "${input}" with code ${responseStatus}.`,
        e,
      );
      return [jsonData, responseStatus];
    }
  }
}

function mergeWithDefaultHeaders(headers = {}, defaultHeaders) {
  var headerObj = {};
  if (headers instanceof Headers) {
    for (let [key, value] of headers) {
      headerObj[key] = value;
    }
  } else {
    headerObj = headers;
  }

  return Object.assign({}, defaultHeaders, headerObj);
}

const FetchApi = new FetchHelper();
export default FetchApi;
