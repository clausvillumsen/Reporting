import { createStore, applyMiddleware } from 'redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import thunk from 'redux-thunk';
import { toast } from 'react-toastify';

import rootReducer from './reducers';

const client = axios.create({
  baseURL: process.env.REACT_APP_API_HOST,
  responseType: 'json'
});

client.interceptors.response.use(
  response => response,
  (error) => {
    const { response: { status, ...rest } } = error;
    switch (status) {
      default:
        toast.error(rest.data && rest.data.Message)
        break;
    }
    // Do something with response error
    return Promise.reject(error);
  }
);


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
