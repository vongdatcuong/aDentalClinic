import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './layouts/App/App';
import reportWebVitals from './reportWebVitals';
// i18n
import './i18n';
// react-day-picker
import 'react-day-picker/lib/style.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
