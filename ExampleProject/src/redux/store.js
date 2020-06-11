import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducer";
import { persistReducer } from "redux-persist";
import AsyncStorage from '@react-native-community/async-storage';
const blacklist = ['login','home','history'];

const persistConfig = {
  key: "root",
  storage : AsyncStorage,
  blacklist
};

const persistedReducer = persistReducer(persistConfig, reducer);
const middlewares = [thunk,];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(...middlewares));

// Create store (not rehydrate yet)
const store = createStore(persistedReducer, enhancer);
export { store };