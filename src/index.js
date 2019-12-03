import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './redux/reducers';
import thunkMiddleware from 'redux-thunk'
import wsMiddleware from './redux/middleware';
import WebSocketConnection from './redux/WebSocketConnection';
//const store = createStore(signInApp);
const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, wsMiddleware )
);
ReactDOM.render((
  <Provider store={store}>
    {/* <WebSocketConnection host={"ws://localhost:8080/ws"}> */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    {/* </WebSocketConnection> */}
    </Provider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
