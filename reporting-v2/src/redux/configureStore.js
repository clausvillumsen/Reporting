import { createStore, applyMiddleware } from 'redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import thunk from 'redux-thunk';

import rootReducer from './reducers';


const client = axios.create({
  baseURL: process.env.REACT_APP_API_HOST || 'https://log-in.kundedemo.dk/api/v1/',
  responseType: 'json'
});

// dispatch action hide loading
const onComplete = ({
  action: newAction,
  next, getState,
  dispatch
}, actionOptions) => {
  dispatch({ type: 'HIDE_LOADING' });
}

export default function configureStore() {
  return createStore(
    rootReducer,
    applyMiddleware(thunk, axiosMiddleware(client, { onComplete }))
  )
}
