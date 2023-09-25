// src/store/index.js

import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import someReducer from './reducers';

const rootReducer = combineReducers({
  some: someReducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
