import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import configureStore from './redux/configureStore';
import Router from './Router';
import './scss/global.scss';
import './scss/OverrideBootstrap.scss';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router />
        <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} hideProgressBar />
      </Provider>
    );
  }
}

export default App;
