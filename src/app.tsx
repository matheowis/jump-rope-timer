import * as React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import MainPage from './pages/MainPage';
import './voiceManager';

const appElement = document.createElement('div');
document.body.append(appElement);

const jsx = (
  <Provider store={store}>
    <MainPage />
  </Provider>
)

ReactDOM.render(jsx, appElement);