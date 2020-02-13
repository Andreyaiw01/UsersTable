import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducers from './reducers/index';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { loadState, saveState } from './connectivity/localStorage'
import throttle from 'lodash/throttle'; 

const persistedState = loadState();
//const store = createStore(rootReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const store = createStore(rootReducers, persistedState);

store.subscribe(throttle(() => {
    saveState({
      users: store.getState().users
    });
  }, 1000));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
